import fs from 'fs';

const html = fs.readFileSync('scripts/site_dump.html', 'utf8');

// Find all links in the header or menu
const menuLinks = [...html.matchAll(/<a[^>]+href=["']([^"']+)["'][^>]*>([\s\S]*?)<\/a>/gi)]
  .map(m => ({
    href: m[1],
    text: m[2].replace(/<[^>]+>/g, '').trim()
  }))
  .filter(l => l.text.length > 0);

console.log('Menu links found:', menuLinks);
