#!/usr/bin/env python3
"""Protect the project archive while validating the Home/background update."""
from html.parser import HTMLParser
from pathlib import Path
import re
import subprocess
import sys
from urllib.parse import unquote, urlsplit

ROOT = Path(__file__).resolve().parents[1]
BASE = sys.argv[1] if len(sys.argv) > 1 else '6850983fe4b5f6276ad044b6c9fcef2645a98880'
PROJECT_BASE = 'ddfe3f7afed9ba35351eaab6dd04d9c527eb49da'
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
pages = sorted(p.name for p in ROOT.glob('*.html'))
assert set(pages) == {name for name in original_files if name.endswith('.html')} | {'projects.html'}, 'Keep all legacy page URLs'


def snapshot(name, ref=PROJECT_BASE):
    return subprocess.check_output(['git', 'show', f'{ref}:{name}'], cwd=ROOT, text=True)


def without_navigation(source):
    return re.sub(r'<ul class="links">[\s\S]*?</ul>', '', source, count=1)


protected = [name for name in pages if re.match(r'0[0-6]_', name)]
for name in protected:
    assert without_navigation(snapshot(name)) == without_navigation((ROOT / name).read_text()), f'{name}: changes outside shared navigation'
old_posts = re.search(r'<section class="posts">[\s\S]*?</section>', snapshot('index.html')).group()
new_posts = re.search(r'<section class="posts">[\s\S]*?</section>', (ROOT / 'projects.html').read_text()).group()
assert old_posts == new_posts, 'Project listing content or markup changed'
assert (ROOT / 'assets/css/portfolio.css').read_text().startswith(snapshot('assets/css/portfolio.css')), 'Existing project styles changed'
assert (ROOT / 'assets/js/portfolio.js').read_text() == snapshot('assets/js/portfolio.js'), 'Existing project interactions changed'

for name in pages:
    new_source = (ROOT / name).read_text()
    new = Page(new_source)
    if name != 'aboutme.html':
        nav = re.search(r'<ul class="links">[\s\S]*?</ul>', new_source).group()
        assert re.findall(r'href="([^"]+)"', nav) == ['index.html', 'projects.html', 'work_exp.html', 'education.html'], f'{name}: inconsistent navigation'
        assert 'About Me' not in nav, f'{name}: obsolete About Me tab'
        old_ga = re.findall(r'<script\b[^>]*>[\s\S]*?</script>', snapshot('index.html'))
        new_ga = re.findall(r'<script\b[^>]*>[\s\S]*?</script>', new_source)
        assert old_ga[:2] == new_ga[:2], f'{name}: Analytics configuration changed'
    for resource in new.resources + new.links:
        url = urlsplit(resource)
        if url.scheme or url.netloc:
            continue
        target = (ROOT / unquote(url.path)) if url.path else (ROOT / name)
        assert target.exists(), f'{name}: missing local resource {resource}'
        if url.fragment and target.suffix == '.html':
            assert url.fragment in Page(target.read_text()).ids, f'{name}: missing anchor {resource}'

alias = (ROOT / 'aboutme.html').read_text()
assert 'content="0; url=index.html#about"' in alias, 'Legacy About Me URL must redirect to Home'
assert 'about' in Page((ROOT / 'index.html').read_text()).ids, 'Home must include the merged background'
assert 'class="posts"' not in (ROOT / 'index.html').read_text(), 'Project listing belongs on its own page'

# Original photographs and résumé must remain byte-for-byte unchanged.
assets = [name for name in original_files if name.startswith(('images/', 'files/'))]
for name in assets:
    old = subprocess.check_output(['git', 'rev-parse', f'{BASE}:{name}'], cwd=ROOT, text=True).strip()
    new = subprocess.check_output(['git', 'hash-object', str(ROOT / name)], cwd=ROOT, text=True).strip()
    assert old == new, f'Original asset changed: {name}'

print('PASS: six project pages, template, listing markup, styles and interactions unchanged except shared navigation')
print(f'PASS: navigation, Analytics, Home/About redirect and local resources across {len(pages)} pages')
print(f'PASS: {len(assets)} original assets, including the résumé, remain unchanged')
