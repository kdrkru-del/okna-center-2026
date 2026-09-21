import fs from 'fs';

const html = fs.readFileSync('scripts/portfolio.html', 'utf8');

// Find where "Каплунова 10" is
const idx = html.indexOf('Каплунова 10');
console.log('Index of Каплунова 10:', idx);

// Print 2000 chars around it
console.log('--- Context around Каплунова 10 ---');
console.log(html.slice(Math.max(0, idx - 1500), Math.min(html.length, idx + 1500)));
