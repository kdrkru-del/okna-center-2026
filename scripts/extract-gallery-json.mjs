import fs from 'fs';

const html = fs.readFileSync('scripts/site_dump.html', 'utf8');

// Find all JSON arrays containing "image" and "url"
const jsonMatches = [...html.matchAll(/(\[\{"image":[\s\S]*?\}\])/gi)];
console.log('JSON matches found:', jsonMatches.length);

const allParsed = [];

for (let i = 0; i < jsonMatches.length; i++) {
  try {
    const data = JSON.parse(jsonMatches[i][1]);
    console.log(`\n--- JSON Block ${i+1}: ${data.length} items ---`);
    for (let j = 0; j < data.length; j++) {
      const item = data[j];
      const title = item.title?.content || '';
      const subtitle = item.subtitle?.content || '';
      const url = item.image?.url || '';
      console.log(`  [${j+1}] title="${title}" subtitle="${subtitle}" url="${url}"`);
      allParsed.push({
        blockIndex: i,
        title,
        subtitle,
        url
      });
    }
  } catch (err) {
    console.log(`Error parsing block ${i+1}:`, err.message);
  }
}

// Also check page4_lodzhii for similar JSON
const p4Html = fs.readFileSync('scripts/page4_lodzhii.html', 'utf8');
const p4Matches = [...p4Html.matchAll(/(\[\{"image":[\s\S]*?\}\])/gi)];
console.log('\nPage4 JSON matches found:', p4Matches.length);
for (let i = 0; i < p4Matches.length; i++) {
  try {
    const data = JSON.parse(p4Matches[i][1]);
    console.log(`\n--- Page4 JSON Block ${i+1}: ${data.length} items ---`);
    for (let j = 0; j < data.length; j++) {
      const item = data[j];
      const title = item.title?.content || '';
      const subtitle = item.subtitle?.content || '';
      const url = item.image?.url || '';
      console.log(`  [${j+1}] title="${title}" subtitle="${subtitle}" url="${url}"`);
    }
  } catch (err) {
    console.log(`Error parsing p4 block ${i+1}:`, err.message);
  }
}
