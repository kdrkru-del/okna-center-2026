import fs from 'fs';

const pages = [
  { name: 'main', url: 'https://xn----7sbhhd2avcezv9b.xn--p1ai/' },
  { name: 'portfolio', url: 'https://xn----7sbhhd2avcezv9b.xn--p1ai/portfolio' },
  { name: 'ustanovka', url: 'https://xn----7sbhhd2avcezv9b.xn--p1ai/%D1%83%D1%81%D1%82%D0%B0%D0%BD%D0%BE%D0%B2%D0%BA%D0%B0' },
  { name: 'page4_lodzhii', url: 'https://xn----7sbhhd2avcezv9b.xn--p1ai/page4' },
];

async function fetchPage(p) {
  console.log(`\nFetching ${p.name}: ${p.url}...`);
  try {
    const res = await fetch(p.url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
      }
    });
    console.log(`Status: ${res.status}`);
    if (!res.ok) return null;
    const html = await res.text();
    fs.writeFileSync(`scripts/${p.name}.html`, html);
    
    // Find all images
    const imgUrls = [...html.matchAll(/(?:https?:)?\/\/m-files[^\s"'<>]+?\.(?:jpe?g|png)/gi)].map(m => m[0]);
    const unique = new Map();
    for (const u of imgUrls) {
      const full = u.startsWith('http') ? u : 'https:' + u;
      const idMatch = full.match(/\/([a-f0-9]{32})/i);
      const id = idMatch ? idMatch[1] : full;
      if (!unique.has(id)) unique.set(id, []);
      unique.get(id).push(full);
    }
    
    // Extract headers and titles
    const headers = [...html.matchAll(/<h[1-6][^>]*>([\s\S]*?)<\/h[1-6]>/gi)]
      .map(m => m[1].replace(/<[^>]+>/g, '').trim())
      .filter(Boolean);

    console.log(`Page: ${p.name} | HTML len: ${html.length} | Unique images: ${unique.size}`);
    console.log('Headers:', headers);
    return { name: p.name, uniqueImages: unique, headers };
  } catch (err) {
    console.error(`Error fetching ${p.name}:`, err.message);
    return null;
  }
}

async function main() {
  const allResults = [];
  for (const p of pages) {
    const r = await fetchPage(p);
    if (r) allResults.push(r);
  }
  
  // Total unique images across all pages
  const totalMap = new Map();
  for (const r of allResults) {
    for (const [id, urls] of r.uniqueImages.entries()) {
      if (!totalMap.has(id)) {
        // Pick best resolution
        const best = urls.find(u => u.includes('/1600/')) || urls.find(u => u.includes('/1200/')) || urls.find(u => !u.includes('/resize/')) || urls[0];
        totalMap.set(id, { best, pages: [r.name] });
      } else {
        totalMap.get(id).pages.push(r.name);
      }
    }
  }

  console.log(`\n=============================================`);
  console.log(`TOTAL UNIQUE IMAGES ACROSS ALL 4 PAGES: ${totalMap.size}`);
  console.log(`=============================================`);
  for (const [id, info] of totalMap.entries()) {
    console.log(`[${id.slice(0, 8)}] (${info.pages.join(', ')}): ${info.best}`);
  }
}

main();
