import fs from 'fs';

const html = fs.readFileSync('scripts/site_dump.html', 'utf8');
const start = html.indexOf('data-id="s-a5a167a8b7e440a1b39f5b1bf9008393"');
const end = html.indexOf('data-id="s-2dd1aed0e1954ab3b8c8580ef73db6e6"');
const block1 = html.slice(start, end);

// Let's print all text in block1 and all img tags
console.log('--- BLOCK 1 TEXT ---');
const stripped = block1.replace(/<style[\s\S]*?<\/style>/gi, '')
                       .replace(/<script[\s\S]*?<\/script>/gi, '')
                       .replace(/<[^>]+>/g, '\n')
                       .split('\n')
                       .map(s => s.trim())
                       .filter(s => s.length > 0);
console.log([...new Set(stripped)]);
