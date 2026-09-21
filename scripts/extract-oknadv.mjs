import fs from 'fs';

const filePath = 'C:/Users/roman/.gemini/antigravity/brain/cba1de3a-7f16-4d2e-95ef-e7e89b05a3b5/.system_generated/steps/5628/content.md';
const content = fs.readFileSync(filePath, 'utf8');

// Search for any occurrence of jpg, png, webp
const extRegex = /https?:\/\/[^\s"'<>]+\.(?:jpg|jpeg|png|webp)/gi;
const mFilesRegex = /\/\/[^\s"'<>]+\.(?:jpg|jpeg|png|webp)/gi;

const matches = new Set([
  ...(content.match(extRegex) || []),
  ...(content.match(mFilesRegex) || []),
]);

console.log('Matches with extensions:', matches.size);
for (const m of matches) {
  console.log(m);
}

// Also let's check what words appear around "работ" or "объект" or "фото"
const textSnippets = [];
const words = ['работ', 'объект', 'галере', 'остеклен', 'фото'];
for (const w of words) {
  let idx = 0;
  while ((idx = content.toLowerCase().indexOf(w, idx)) !== -1) {
    textSnippets.push(content.slice(Math.max(0, idx - 100), Math.min(content.length, idx + 200)));
    idx += w.length + 50;
    if (textSnippets.length > 20) break;
  }
}
console.log('\n--- Text Snippets Found: ---');
for (const s of textSnippets.slice(0, 10)) {
  console.log('---');
  console.log(s.replace(/\s+/g, ' '));
}
