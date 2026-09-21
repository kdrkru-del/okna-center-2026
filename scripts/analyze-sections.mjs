import fs from 'fs';

const html = fs.readFileSync('scripts/site_dump.html', 'utf8');

// Look for blk_section or id or data-id
const blockMatches = [...html.matchAll(/<(div|section)[^>]*class=["']([^"']*blk_section[^"']*)["'][^>]*data-id=["']([^"']*)["'][^>]*>([\s\S]*?)(?=(?:<(?:div|section)[^>]*class=["'][^"']*blk_section[^"']*["'])|$)/gi)];

console.log('Block sections found:', blockMatches.length);

for (let i = 0; i < blockMatches.length; i++) {
  const [_, tag, cls, dataId, body] = blockMatches[i];
  
  // Extract headings
  const headings = [...body.matchAll(/<h[1-6][^>]*>([\s\S]*?)<\/h[1-6]>/gi)].map(m => m[1].replace(/<[^>]+>/g, '').trim()).filter(Boolean);
  
  // Extract text fields
  const texts = [...body.matchAll(/<div[^>]*class=["'][^"']*(?:text-field-data|m-header|m-subheader)[^"']*["'][^>]*>([\s\S]*?)<\/div>/gi)].map(m => m[1].replace(/<[^>]+>/g, '').trim()).filter(Boolean);

  // Extract images
  const imgs = [...body.matchAll(/(?:https?:)?\/\/[^\s"'<>]+?\.(?:jpg|jpeg|png|webp|gif)/gi)].map(m => m[0]);
  const uniqueImgs = [...new Set(imgs)];
  
  // Filter for unique file paths without resize duplicates
  const baseFiles = new Set();
  for (const img of uniqueImgs) {
    // e.g. //m-files.cdn1.cc/lpfile/0/d/7/0d7a38989a734c99095ebf884328b1f2/-/resize/1200/f.jpeg
    const m = img.match(/\/lpfile\/([a-f0-9\/]+)\/([a-f0-9]+)\.(?:jpe?g|png|webp)/i) || 
              img.match(/\/lpfile\/([a-f0-9\/]+)\/([a-f0-9]+)\/-\/resize\/\d+\/f\.(?:jpe?g|png|webp)/i);
    if (m) {
      baseFiles.add(m[2]);
    } else {
      baseFiles.add(img);
    }
  }

  console.log(`\n================== SECTION ${i}: ${dataId} ==================`);
  if (headings.length) console.log('  Headings:', headings);
  if (texts.length) console.log('  Texts:', texts.slice(0, 5));
  console.log(`  Images: ${uniqueImgs.length} URLs (${baseFiles.size} unique base images)`);
  
  // Print some images with their containers or alt
  const imgTags = [...body.matchAll(/<img[^>]+>/gi)].map(m => m[0]);
  if (imgTags.length) {
    console.log(`  Img tags count: ${imgTags.length}`);
    for (const tag of imgTags.slice(0, 5)) {
      console.log('    ', tag.slice(0, 150));
    }
  }
}
