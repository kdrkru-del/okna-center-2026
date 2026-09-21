import fs from 'fs';

const html = fs.readFileSync('scripts/portfolio.html', 'utf8');

// Megagroup CMS structure for two-column project items:
// Look for sections containing m-columns
const sections = [...html.matchAll(/<div blk_class="section"[^>]*data-id="([^"]+)"[^>]*>([\s\S]*?)(?=<div blk_class="section"|$)/gi)];
console.log('Total sections in portfolio:', sections.length);

const projects = [];

for (let i = 0; i < sections.length; i++) {
  const [_, secId, body] = sections[i];
  
  // Extract text
  const textMatches = [...body.matchAll(/class=["'][^"']*font-20[46][^"']*["'][^>]*>([\s\S]*?)<\/div>/gi)]
    .map(m => m[1].replace(/<br\s*\/?>/gi, ' — ').replace(/<[^>]+>/g, '').trim())
    .filter(Boolean);
  
  // Also any other text if font-204/206 not matched
  const allTexts = [...body.matchAll(/<(?:span|p|div)[^>]*class=["'][^"']*texteditor-[^"']*["'][^>]*>([\s\S]*?)<\/(?:span|p|div)>/gi)]
    .map(m => m[1].replace(/<[^>]+>/g, '').trim())
    .filter(Boolean);

  const combinedTexts = [...new Set([...textMatches, ...allTexts])];

  // Extract all images in this section
  const imgs = [...body.matchAll(/(?:https?:)?\/\/m-files[^\s"'<>]+?\.(?:jpe?g|png)/gi)].map(m => m[0]);
  const cleanImgs = [...new Set(imgs.filter(u => !u.includes('.svg') && !u.includes('favicon')))];

  if (combinedTexts.length || cleanImgs.length) {
    // Pick the best image (1920 or unresized)
    const bestImg = cleanImgs.find(u => u.includes('1920')) || cleanImgs[0];
    projects.push({
      index: i,
      secId,
      texts: combinedTexts,
      bestImg: bestImg ? (bestImg.startsWith('http') ? bestImg : 'https:' + bestImg) : null,
      allImgs: cleanImgs
    });
  }
}

console.log('\n--- DETAILED PROJECT ITEMS FOUND ---');
for (const p of projects) {
  if (p.texts.length > 0 && p.bestImg) {
    console.log(`\n[Section ${p.index}]`);
    console.log('  Texts:', p.texts);
    console.log('  Best Image:', p.bestImg);
  }
}
