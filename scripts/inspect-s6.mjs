import fs from 'fs';

const html = fs.readFileSync('scripts/site_dump.html', 'utf8');
const s6 = html.slice(html.indexOf('data-id="s-a5a167a8b7e440a1b39f5b1bf9008393"'), html.indexOf('data-id="s-2dd1aed0e1954ab3b8c8580ef73db6e6"'));

// Find text and images in order
const items = [...s6.matchAll(/<div[^>]*class=["'][^"']*m-images-gallery__item[^"']*["'][\s\S]*?(?=(?:<div[^>]*class=["'][^"']*m-images-gallery__item|$))/gi)];
console.log('Items in s6:', items.length);

for (let i = 0; i < items.length; i++) {
  const item = items[i][0];
  const srcMatch = item.match(/src=["']([^"']+)["']/);
  const titleMatch = item.match(/title=["']([^"']+)["']/) || item.match(/alt=["']([^"']+)["']/);
  console.log(`Item ${i+1}: src=${srcMatch ? srcMatch[1].slice(0, 70) : 'none'} title=${titleMatch ? titleMatch[1] : ''}`);
}
