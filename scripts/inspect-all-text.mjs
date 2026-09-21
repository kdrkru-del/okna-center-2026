import fs from 'fs';

const html = fs.readFileSync('scripts/site_dump.html', 'utf8');

// Strip styles and scripts
const clean = html.replace(/<style[\s\S]*?<\/style>/gi, '')
                  .replace(/<script[\s\S]*?<\/script>/gi, '');

// Extract all visible text blocks with more than 3 chars
const lines = clean.replace(/<[^>]+>/g, '\n')
                   .split('\n')
                   .map(s => s.trim())
                   .filter(s => s.length > 2 && !s.startsWith('&nbsp;'));

console.log('--- ALL VISIBLE TEXT ON SITE ---');
const uniqueLines = [];
for (const line of lines) {
  if (!uniqueLines.includes(line)) {
    uniqueLines.push(line);
  }
}
console.log(uniqueLines.join('\n'));
