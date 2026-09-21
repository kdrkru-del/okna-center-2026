import fs from 'fs';

const html = fs.readFileSync('scripts/site_dump.html', 'utf8');

const targetSections = [
  's-a5a167a8b7e440a1b39f5b1bf9008393',
  's-2dd1aed0e1954ab3b8c8580ef73db6e6',
  's-b11a191473424ad5a85fcb1e5019eefe',
  's-465968ffa543409386a7cd53c75c06bf'
];

for (let i = 0; i < targetSections.length; i++) {
  const secId = targetSections[i];
  const startIdx = html.indexOf(`data-id="${secId}"`);
  const nextSecIdx = html.indexOf('class="blk_section', startIdx + 50);
  const chunk = html.slice(startIdx, nextSecIdx !== -1 ? nextSecIdx : startIdx + 30000);
  
  console.log(`\n=================== GALLERY BLOCK ${i+1}: ${secId} ===================`);
  
  // Find all items with their img and text
  // In Megagroup / m-images-gallery, let's see the item structure
  const items = [...chunk.matchAll(/class=["'][^"']*m-images-gallery__item[^"']*["'][\s\S]*?(?=(?:class=["'][^"']*m-images-gallery__item|$))/gi)];
  console.log(`Gallery items matched: ${items.length}`);
  
  // Also look for popup items: image-popup-item
  const popupItems = [...chunk.matchAll(/class=["'][^"']*image-popup-item[^"']*["']([\s\S]*?)<\/div>\s*<\/div>/gi)];
  console.log(`Popup items matched: ${popupItems.length}`);

  for (let j = 0; j < popupItems.length; j++) {
    const pChunk = popupItems[j][1];
    const imgMatch = pChunk.match(/src=["']([^"']+)["']/i);
    const textMatch = pChunk.match(/class=["'][^"']*image-popup-text[^"']*["'][^>]*>([\s\S]*?)<\/div>/i);
    const text = textMatch ? textMatch[1].replace(/<[^>]+>/g, '').trim() : '';
    const img = imgMatch ? imgMatch[1] : '';
    console.log(`  Photo ${j+1}: text="${text}" | img=${img.slice(0, 80)}`);
  }
}
