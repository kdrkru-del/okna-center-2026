import fs from 'fs';
import path from 'path';
import crypto from 'crypto';

const imagesDir = path.resolve('public/images');
const srcDir = path.resolve('src');
const outDir = path.resolve('out');

function getAllFiles(dir, exts) {
  let res = [];
  if (!fs.existsSync(dir)) return res;
  const list = fs.readdirSync(dir);
  for (const f of list) {
    const p = path.join(dir, f);
    const s = fs.statSync(p);
    if (s.isDirectory()) res = res.concat(getAllFiles(p, exts));
    else if (exts.some(ext => f.toLowerCase().endsWith(ext))) res.push(p);
  }
  return res;
}

const allImgFiles = getAllFiles(imagesDir, ['.jpg', '.jpeg', '.png', '.webp', '.svg', '.gif']);
console.log('Total image files in public/images:', allImgFiles.length);

const hashes = new Map();
let over1MB = 0;

for (const f of allImgFiles) {
  const stat = fs.statSync(f);
  if (stat.size > 1024 * 1024) over1MB++;
  const buf = fs.readFileSync(f);
  const hash = crypto.createHash('md5').update(buf).digest('hex');
  if (!hashes.has(hash)) hashes.set(hash, []);
  hashes.get(hash).push(f);
}

console.log('Unique hashes:', hashes.size);
console.log('Images > 1MB:', over1MB);

// Check references in src and out
const textFiles = getAllFiles(srcDir, ['.ts', '.tsx', '.json', '.css']).concat(getAllFiles(outDir, ['.html']));
const allText = textFiles.map(f => fs.readFileSync(f, 'utf8')).join('\n');

let usedCount = 0;
let unusedCount = 0;
const unusedList = [];

for (const f of allImgFiles) {
  const base = path.basename(f);
  const rel = path.relative(path.resolve('public'), f).replace(/\\/g, '/');
  if (allText.includes(base) || allText.includes(rel) || allText.includes('/' + rel)) {
    usedCount++;
  } else {
    unusedCount++;
    unusedList.push(rel);
  }
}

console.log('Used images:', usedCount);
console.log('Unused images:', unusedCount);
console.log('Sample unused:', unusedList.slice(0, 5));
