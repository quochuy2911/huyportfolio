import { createReadStream } from 'node:fs';
import { stat } from 'node:fs/promises';
import { createServer } from 'node:http';
import { extname, resolve, sep } from 'node:path';
import { fileURLToPath } from 'node:url';
import { parseArgs } from 'node:util';

const root = fileURLToPath(new URL('../', import.meta.url));
const base = '/huyportfolio';
const { values } = parseArgs({ options: { host: { type: 'string' }, port: { type: 'string' }, strictPort: { type: 'boolean' } } });
const port = Number(values.port || process.env.PORT || 3000);
const types = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.xml': 'application/xml; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.jpg': 'image/jpeg',
  '.webp': 'image/webp',
};

createServer(async (request, response) => {
  try {
    const url = new URL(request.url, 'http://localhost');
    if (url.pathname === base) {
      response.writeHead(308, { Location: base + '/' + url.search }).end();
      return;
    }
    const path = decodeURIComponent(url.pathname.startsWith(base + '/')
      ? url.pathname.slice(base.length) : url.pathname);
    const filename = resolve(root, '.' + (path.endsWith('/') ? path + 'index.html' : path));
    const contentType = types[extname(filename)];
    if (!filename.startsWith(resolve(root) + sep) || !contentType || !(await stat(filename)).isFile()) {
      response.writeHead(404).end('Not found');
      return;
    }
    response.writeHead(200, { 'Content-Type': contentType });
    if (request.method === 'HEAD') response.end();
    else createReadStream(filename).pipe(response);
  } catch {
    response.writeHead(404).end('Not found');
  }
}).listen(port, values.host || 'localhost', () => {
  process.stdout.write('Portfolio preview: http://localhost:' + port + '/huyportfolio/\n');
});
