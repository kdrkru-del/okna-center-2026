import fs from 'fs';

const html = fs.readFileSync('scripts/portfolio.html', 'utf8');

// Strip styles and scripts
const clean = html.replace(/<style[\s\S]*?<\/style>/gi, '')
                  .replace(/<script[\s\S]*?<\/script>/gi, '');

// Extract visible text
const lines = clean.replace(/<[^>]+>/g, '\n')
                   .split('\n')
                   .map(s => s.trim())
                   .filter(s => s.length > 2 && !s.startsWith('&nbsp;'));

const unique = [];
for (const l of lines) {
  if (!unique.includes(l)) unique.push(l);
}

console.log('=== PORTFOLIO PAGE TEXT ===');
console.log(unique.join('\n'));
