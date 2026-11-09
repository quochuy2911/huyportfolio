#!/usr/bin/env python3
"""Verify this presentation refresh against the original main-branch content."""
from collections import Counter
from html.parser import HTMLParser
from pathlib import Path
import re
import subprocess
import sys
from urllib.parse import unquote, urlsplit

ROOT = Path(__file__).resolve().parents[1]
BASE = sys.argv[1] if len(sys.argv) > 1 else '6850983fe4b5f6276ad044b6c9fcef2645a98880'
LANDMARKS = {'intro', 'header', 'nav', 'main', 'footer', 'copyright'}
VOID = {'area', 'base', 'br', 'col', 'embed', 'hr', 'img', 'input', 'link', 'meta', 'param', 'source', 'track', 'wbr'}


class Page(HTMLParser):
    def __init__(self, source):
        super().__init__(convert_charrefs=True)
        self.stack = []
        self.text = {key: [] for key in LANDMARKS}
        self.links = []
        self.images = []
        self.resources = []
        self.ids = set()
        self.feed(source)

    def handle_starttag(self, tag, attrs):
        attrs = dict(attrs)
        if 'id' in attrs:
            self.ids.add(attrs['id'])
        if tag == 'a' and 'href' in attrs and attrs.get('class') != 'skip-link':
            self.links.append(attrs['href'])
        if tag == 'img' and 'data-decorative' not in attrs:
            self.images.append(attrs.get('src'))
        if tag in ('img', 'script', 'link'):
            self.resources.append(attrs.get('src', attrs.get('href', '')))
        if tag not in VOID:
            self.stack.append((tag, attrs.get('id')))

    def handle_startendtag(self, tag, attrs):
        self.handle_starttag(tag, attrs)
        if tag not in VOID:
            self.handle_endtag(tag)

    def handle_endtag(self, tag):
        for i in range(len(self.stack) - 1, -1, -1):
            if self.stack[i][0] == tag:
                del self.stack[i:]
                break

    def handle_data(self, data):
        if any(tag in ('head', 'script', 'style', 'noscript') for tag, _ in self.stack):
            return
        for _, identity in self.stack:
            if identity in LANDMARKS:
                self.text[identity].append(data)

    def copy(self, key):
        return re.sub(r'\s+', ' ', ''.join(self.text[key])).strip()


original_files = subprocess.check_output(['git', 'ls-tree', '-r', '--name-only', BASE], cwd=ROOT, text=True).splitlines()
pages = [name for name in original_files if name.endswith('.html')]
assert {p.name for p in ROOT.glob('*.html')} == set(pages), 'The original page URLs must remain present'
image_count = 0
for name in pages:
    old_source = subprocess.check_output(['git', 'show', f'{BASE}:{name}'], cwd=ROOT, text=True)
    new_source = (ROOT / name).read_text()
    old, new = Page(old_source), Page(new_source)
    for key in LANDMARKS:
        assert old.copy(key) == new.copy(key), f'{name}: original text changed in #{key}'
    expected_links = ['#main' if name == 'index.html' and link == '#header' else link for link in old.links]
    assert Counter(expected_links) == Counter(new.links), f'{name}: original links changed'
    assert old.images == new.images, f'{name}: original photos or their order changed'
    image_count += len(old.images)
    old_ga = re.findall(r'<script\b[^>]*>[\s\S]*?</script>', old_source)
    new_ga = re.findall(r'<script\b[^>]*>[\s\S]*?</script>', new_source)
    assert old_ga[:2] == new_ga[:2], f'{name}: original Analytics configuration changed'
    for resource in new.resources + new.links:
        url = urlsplit(resource)
        if url.scheme or url.netloc:
            continue
        target = (ROOT / unquote(url.path)) if url.path else (ROOT / name)
        assert target.exists(), f'{name}: missing local resource {resource}'
        if url.fragment and target.suffix == '.html':
            assert url.fragment in Page(target.read_text()).ids, f'{name}: missing anchor {resource}'

# Original photographs and résumé must remain byte-for-byte unchanged.
assets = [name for name in original_files if name.startswith(('images/', 'files/'))]
for name in assets:
    old = subprocess.check_output(['git', 'rev-parse', f'{BASE}:{name}'], cwd=ROOT, text=True).strip()
    new = subprocess.check_output(['git', 'hash-object', str(ROOT / name)], cwd=ROOT, text=True).strip()
    assert old == new, f'Original asset changed: {name}'

print(f'PASS: original text, links, Analytics and {image_count} image placements across {len(pages)} pages')
print(f'PASS: {len(assets)} original assets, including the résumé, unchanged; local links and resources resolve')
