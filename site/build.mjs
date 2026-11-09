import { mkdir, readFile, readdir, writeFile } from 'node:fs/promises';
import { dirname } from 'node:path';
import { portfolio, projects } from './content.mjs';
import { detail, escape, home, page, projectPath, redirect } from './templates.mjs';

const root = new URL('../', import.meta.url);
const check = process.argv.includes('--check');
const output = new Map([
  ['index.html', page({
    title: 'Ngo Quoc Huy · Engineering Portfolio',
    description: 'Projects in mechanical design, experimental mechanics, and engineering software by Ngo Quoc Huy, a mechanical designer based in Vietnam.',
    path: '', prefix: '', home: true, main: home(),
  })],
  ['work_exp.html', redirect('./#experience')],
  ['education.html', redirect('./#experience')],
  ['aboutme.html', redirect('./#about')],
]);

const publicPaths = [''];
for (const project of projects) {
  const path = projectPath(project);
  publicPaths.push(path);
  output.set(path + 'index.html', page({
    title: project.title + ' · Ngo Quoc Huy',
    description: project.summary,
    path, prefix: '../../', main: detail(project),
  }));
  if (project.legacy) output.set(project.legacy, redirect(path));
}
output.set('sitemap.xml', [
  '<?xml version="1.0" encoding="UTF-8"?>',
  '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
  ...publicPaths.map((path) => '  <url><loc>' + escape(new URL(path, portfolio.url).href) + '</loc></url>'),
  '</urlset>',
  '',
].join('\n'));

const issues = [];
const sitePaths = [...output.keys()];
for (const [path, rendered] of output) {
  const html = rendered.replace(/[ \t]+$/gm, '');
  const target = new URL(path, root);
  if (check) {
    const existing = await readFile(target, 'utf8').catch((error) => {
      if (error.code === 'ENOENT') return null;
      throw error;
    });
    if (existing !== html) issues.push(path + ' is missing or out of date');
  } else {
    await mkdir(dirname(target.pathname), { recursive: true });
    await writeFile(target, html);
  }
}

const slugs = await readdir(new URL('projects/', root), { withFileTypes: true });
for (const slug of slugs) {
  if (slug.isDirectory() && !sitePaths.includes('projects/' + slug.name + '/index.html')) {
    issues.push('Remove the stale generated project folder projects/' + slug.name);
  }
}

if (issues.length) {
  for (const issue of issues) process.stderr.write(issue + '\n');
  process.exitCode = 1;
} else {
  process.stdout.write((check ? 'Verified ' : 'Built ') + output.size + ' generated files.\n');
}
