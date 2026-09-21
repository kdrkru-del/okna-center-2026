import fs from 'fs';

const html = fs.readFileSync('scripts/site_dump.html', 'utf8');

const targetSections = [
  's-a5a167a8b7e440a1b39f5b1bf9008393',
  's-2dd1aed0e1954ab3b8c8580ef73db6e6',
  's-b11a191473424ad5a85fcb1e5019eefe',
  's-465968ffa543409386a7cd53c75c06bf'
];

for (const secId of targetSections) {
  const startIdx = html.indexOf(`data-id="${secId}"`);
  if (startIdx === -1) continue;
  
  // Find where the next section begins
  const nextSecIdx = html.indexOf('class="blk_section', startIdx + 50);
  const chunk = html.slice(startIdx, nextSecIdx !== -1 ? nextSecIdx : startIdx + 50000);
  
  console.log(`\n=================== SECTION: ${secId} ===================`);
  
  // Look for titles, captions, descriptions
  const titles = [...chunk.matchAll(/class=["'][^"']*(?:header|title|caption|desc|text)[^"']*["'][^>]*>([\s\S]*?)<\/(?:div|h[1-6]|p|span)>/gi)]
    .map(m => m[1].replace(/<[^>]+>/g, '').trim())
    .filter(t => t.length > 2 && !t.includes('{') && !t.includes('function'));
  
  console.log('Text Elements:', [...new Set(titles)].slice(0, 10));

  // Find images (original / high-res)
  const imgs = [...chunk.matchAll(/(?:https?:)?\/\/m-files[^\s"'<>]+?\.(?:jpe?g|png)/gi)].map(m => m[0]);
  
  // Group by unique image ID
  const map = new Map();
  for (const u of imgs) {
    const cleanUrl = u.startsWith('http') ? u : 'https:' + u;
    // Extract base key
    const match = cleanUrl.match(/\/([a-f0-9]{32})/i);
    const key = match ? match[1] : cleanUrl;
    if (!map.has(key)) {
      map.set(key, []);
    }
    map.get(key).push(cleanUrl);
  }

  console.log(`Unique images found: ${map.size}`);
  for (const [k, urls] of map.entries()) {
    // Pick the best resolution (1600 or unresized)
    const best = urls.find(u => u.includes('/1600/')) || urls.find(u => u.includes('/1200/')) || urls[0];
    console.log(` - [${k.slice(0, 8)}]: ${best}`);
  }
}
