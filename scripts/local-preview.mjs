import { createReadStream, existsSync, statSync } from 'node:fs';
import { readFile } from 'node:fs/promises';
import { createServer } from 'node:http';
import { extname, join, normalize } from 'node:path';
import { Readable } from 'node:stream';
import worker from '../dist/server/index.js';

const port = 3000;
const clientRoot = join(process.cwd(), 'dist', 'client');

const contentTypes = {
  '.css': 'text/css; charset=utf-8',
  '.gif': 'image/gif',
  '.html': 'text/html; charset=utf-8',
  '.ico': 'image/x-icon',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.mp4': 'video/mp4',
  '.png': 'image/png',
  '.svg': 'image/svg+xml',
  '.webp': 'image/webp',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
};

function resolveAsset(url) {
  const pathname = decodeURIComponent(new URL(url).pathname);
  const relative = normalize(pathname).replace(/^([/\\])+/, '');
  const candidate = join(clientRoot, relative);
  return candidate.startsWith(clientRoot) && existsSync(candidate) && statSync(candidate).isFile()
    ? candidate
    : null;
}

async function assetResponse(request) {
  const file = resolveAsset(request.url);
  if (!file) return new Response('Not found', { status: 404 });
  const body = await readFile(file);
  return new Response(body, {
    headers: {
      'content-type': contentTypes[extname(file).toLowerCase()] || 'application/octet-stream',
      'cache-control': 'no-cache',
    },
  });
}

const server = createServer(async (req, res) => {
  try {
    const url = `http://localhost:${port}${req.url || '/'}`;
    const asset = resolveAsset(url);

    if (asset && req.method !== 'HEAD') {
      res.statusCode = 200;
      res.setHeader('content-type', contentTypes[extname(asset).toLowerCase()] || 'application/octet-stream');
      res.setHeader('cache-control', 'no-cache');
      createReadStream(asset).pipe(res);
      return;
    }

    const request = new Request(url, {
      method: req.method,
      headers: req.headers,
    });
    const response = await worker.fetch(
      request,
      { ASSETS: { fetch: assetResponse } },
      { waitUntil: promise => promise.catch(console.error) },
    );

    res.statusCode = response.status;
    response.headers.forEach((value, key) => res.setHeader(key, value));
    if (!response.body || req.method === 'HEAD') {
      res.end();
      return;
    }
    Readable.fromWeb(response.body).pipe(res);
  } catch (error) {
    console.error(error);
    res.statusCode = 500;
    res.end('Local preview error');
  }
});

server.listen(port, '127.0.0.1', () => {
  console.log(`Local portfolio preview: http://localhost:${port}/`);
});

