import fs from 'fs';

const html = fs.readFileSync('scripts/site_dump.html', 'utf8');

const targetSections = [
  's-a5a167a8b7e440a1b39f5b1bf9008393',
  's-2dd1aed0e1954ab3b8c8580ef73db6e6',
  's-b11a191473424ad5a85fcb1e5019eefe',
  's-465968ffa543409386a7cd53c75c06bf'
];

for (let i = 0; i < targetSections.length; i++) {
  const start = html.indexOf(`data-id="${targetSections[i]}"`);
  const next = i < targetSections.length - 1 ? html.indexOf(`data-id="${targetSections[i+1]}"`) : html.indexOf('class="blk_section', start + 100);
  const block = html.slice(start, next !== -1 ? next : start + 30000);
  
  const stripped = block.replace(/<style[\s\S]*?<\/style>/gi, '')
                       .replace(/<script[\s\S]*?<\/script>/gi, '')
                       .replace(/<[^>]+>/g, '\n')
                       .split('\n')
                       .map(s => s.trim())
                       .filter(s => s.length > 0 && !s.startsWith('data-') && !s.startsWith('pos=') && !s.startsWith('<') && s !== '>');
  console.log(`\n--- BLOCK ${i+1} (${targetSections[i]}) ---`);
  console.log([...new Set(stripped)]);
}
