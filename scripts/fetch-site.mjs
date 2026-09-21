import fs from 'fs';

async function main() {
  const url = 'https://xn----7sbhhd2avcezv9b.xn--p1ai/';
  console.log('Fetching:', url);
  const res = await fetch(url, {
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
      'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8',
      'Accept-Language': 'ru-RU,ru;q=0.9,en-US;q=0.8,en;q=0.7',
    }
  });
  console.log('Status:', res.status, res.statusText);
  const html = await res.text();
  console.log('HTML Length:', html.length);
  fs.writeFileSync('scripts/site_dump.html', html);
  
  // Find scripts or JSON data
  const scripts = [...html.matchAll(/<script\b[^>]*>([\s\S]*?)<\/script>/gi)];
  console.log('Scripts count:', scripts.length);
  for (let i = 0; i < scripts.length; i++) {
    const s = scripts[i][1];
    if (s.includes('photos') || s.includes('gallery') || s.includes('images') || s.includes('objects') || s.includes('cdn') || s.length > 500) {
      console.log(`Script ${i} length: ${s.length}, sample: ${s.slice(0, 200)}...`);
    }
  }

  // Find all URLs inside HTML
  const allUrls = html.match(/(?:https?:)?\/\/[^\s"'<>]+?\.(?:jpg|jpeg|png|webp|gif)/gi) || [];
  console.log('Images found in raw HTML:', allUrls.length);
  console.log([...new Set(allUrls)]);
}

main().catch(console.error);
