import http from 'http';
import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';

const outDir = path.resolve('out');

const mimeTypes = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'application/javascript',
  '.css': 'text/css',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.avif': 'image/avif',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.txt': 'text/plain; charset=utf-8',
  '.xml': 'application/xml; charset=utf-8',
  '.woff2': 'font/woff2',
};

const server = http.createServer((req, res) => {
  let reqPath = req.url.split('?')[0];
  if (reqPath.endsWith('/')) reqPath += 'index.html';
  else if (!path.extname(reqPath)) reqPath += '/index.html';

  let filePath = path.join(outDir, reqPath);
  if (!fs.existsSync(filePath) && reqPath.includes('.__PAGE__.txt')) {
    const rscPath = reqPath.replace(/\.__PAGE__\.txt$/, '/__PAGE__.txt');
    if (fs.existsSync(path.join(outDir, rscPath))) {
      filePath = path.join(outDir, rscPath);
    }
  }

  if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
    const ext = path.extname(filePath).toLowerCase();
    res.writeHead(200, { 'Content-Type': mimeTypes[ext] || 'application/octet-stream' });
    fs.createReadStream(filePath).pipe(res);
  } else {
    res.writeHead(404, { 'Content-Type': 'text/html' });
    res.end('404 Not Found');
  }
});

import { spawn } from 'child_process';

server.listen(3333, () => {
  console.log('Static server listening on http://localhost:3333');
  process.env.CHROME_PATH = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
  console.log('Running Lighthouse mobile audit asynchronously...');

  const lhArgs = [
    'lighthouse',
    'http://localhost:3333/',
    '--output=json',
    '--output-path=./lighthouse-report.json',
    '--form-factor=mobile',
    '--screenEmulation.mobile=true',
    '--throttling-method=provided',
    '--chrome-flags="--headless --no-sandbox --disable-gpu"',
  ];

  const lh = spawn('npx.cmd', lhArgs, {
    stdio: 'inherit',
    shell: true,
  });

  lh.on('close', (code) => {
    console.log(`Lighthouse process exited with code ${code}`);
    server.close(() => {
      if (fs.existsSync('./lighthouse-report.json')) {
        const data = JSON.parse(fs.readFileSync('./lighthouse-report.json', 'utf8'));
        const cats = data.categories;
        const audits = data.audits;
        console.log('\n========================================');
        console.log('--- LIGHTHOUSE RESULTS (MOBILE) ---');
        console.log('========================================');
        console.log('Performance:   ', Math.round(cats.performance.score * 100));
        console.log('Accessibility: ', Math.round(cats.accessibility.score * 100));
        console.log('Best Practices:', Math.round(cats['best-practices'].score * 100));
        console.log('SEO:           ', Math.round(cats.seo.score * 100));
        console.log('----------------------------------------');
        console.log('LCP: ', audits['largest-contentful-paint']?.displayValue);
        console.log('FCP: ', audits['first-contentful-paint']?.displayValue);
        console.log('CLS: ', audits['cumulative-layout-shift']?.displayValue);
        console.log('TBT: ', audits['total-blocking-time']?.displayValue);
        console.log('Speed Index: ', audits['speed-index']?.displayValue);
        console.log('========================================\n');
      }
      process.exit(code || 0);
    });
  });

  lh.on('error', (err) => {
    console.error('Failed to start Lighthouse:', err);
    server.close(() => process.exit(1));
  });
});
