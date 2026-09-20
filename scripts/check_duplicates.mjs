import fs from 'fs';
import crypto from 'crypto';
import path from 'path';

const content = fs.readFileSync('src/data/gallery_data.ts', 'utf8');
const items = eval(content.match(/export const galleryItems: GalleryItem\[\] = (\[[\s\S]*?\]);/)[1]);

const hashMap = new Map();
const duplicates = [];

items.forEach((item, index) => {
  const filePath = path.join('public', item.src);
  if (!fs.existsSync(filePath)) {
    console.log('MISSING:', filePath);
    return;
  }
  const buf = fs.readFileSync(filePath);
  const hash = crypto.createHash('md5').update(buf).digest('hex');
  if (hashMap.has(hash)) {
    duplicates.push({
      original: hashMap.get(hash),
      duplicate: { index: index + 1, item, filePath }
    });
  } else {
    hashMap.set(hash, { index: index + 1, item, filePath });
  }
});

console.log('Total items in gallery:', items.length);
console.log('Unique hashes:', hashMap.size);
console.log('Exact binary duplicates:', duplicates.length);
duplicates.forEach(d => {
  console.log('DUPLICATE FOUND:');
  console.log(`  Original: #${d.original.index} ${d.original.item.src} (${d.original.item.title})`);
  console.log(`  Duplicate: #${d.duplicate.index} ${d.duplicate.item.src} (${d.duplicate.item.title})`);
});
