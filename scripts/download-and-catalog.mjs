import fs from 'fs';
import path from 'path';

// Clean directories in public/images/portfolio
const baseDir = path.resolve('public/images/portfolio');
fs.mkdirSync(path.join(baseDir, 'key-objects'), { recursive: true });
fs.mkdirSync(path.join(baseDir, 'works'), { recursive: true });
fs.mkdirSync(path.join(baseDir, 'balconies'), { recursive: true });

async function downloadFile(url, destPath) {
  try {
    const cleanUrl = url.startsWith('http') ? url : 'https:' + url;
    const res = await fetch(cleanUrl);
    if (!res.ok) {
      console.error(`Failed ${cleanUrl}: ${res.status}`);
      return false;
    }
    const buffer = Buffer.from(await res.arrayBuffer());
    fs.writeFileSync(destPath, buffer);
    return true;
  } catch (err) {
    console.error(`Error downloading ${url}:`, err.message);
    return false;
  }
}

async function main() {
  console.log('Downloading Key Objects photos...');
  const keyObjects = [
    {
      id: 'kaplunova-10',
      name: 'Каплунова 10 (Владивосток)',
      desc: 'Многоквартирный жилой дом, 24 этажа. Заказчик СЗ «Ремстройцентр». Монтаж светопрозрачных конструкций 4100 м² (2019–2020 гг.)',
      url: 'https://m-files.cdn1.cc/lpfile/2/6/b/26bc12a8e28b09af00f98236b6955bc3/-/resize/1920/f.png'
    },
    {
      id: 'lineynaya-20',
      name: 'Линейная 20 (Владивосток)',
      desc: '4-этажный многоквартирный дом. Заказчик СЗ «Ремстройцентр». Монтаж светопрозрачных конструкций (2021 г.)',
      url: 'https://m-files.cdn1.cc/lpfile/5/2/f/52f31367401b61077cc5f2f4c8b20548/-/resize/1920/f.png'
    },
    {
      id: 'sergeevka-msd',
      name: 'Казармы 127 мотострелковой дивизии',
      desc: 'Остекление казарм 127 МСД с. Сергеевка. Заказчик — Министерство обороны РФ',
      url: 'https://m-files.cdn1.cc/lpfile/7/4/0/740c4bfc962c41944d1ef1cee768eed3/-/resize/1920/f.png'
    },
    {
      id: 'sadgorodskaya-23d',
      name: 'Садгородская 23Д (Владивосток)',
      desc: '4-этажный многоквартирный дом. Заказчик СЗ «Ремстройцентр». Монтаж светопрозрачных конструкций (2021 г.)',
      url: 'https://m-files.cdn1.cc/lpfile/0/d/f/0dfb498614e79b371f284bf2fa8e142c/-/resize/1920/f.jpg'
    },
    {
      id: 'sadgorodskaya-23v',
      name: 'Садгородская 23В (Владивосток)',
      desc: '4-этажный многоквартирный дом. Заказчик СЗ «Ремстройцентр». Монтаж светопрозрачных конструкций (2021 г.)',
      url: 'https://m-files.cdn1.cc/lpfile/d/b/b/dbb79d9572ddd535c6636e5f88134a82/-/resize/1920/f.jpg'
    },
    {
      id: 'kashtanovy-dvor',
      name: 'ЖК «Каштановый двор» (литер 4)',
      desc: 'Остекление 25-этажного многоквартирного дома. Заказчик: «Девелопмент-Юг», генподрядчик ООО «ПСК-Восток»',
      url: 'https://m-files.cdn1.cc/lpfile/3/5/1/351cd634fb1661fc0df63cc10cbb20f5/-/resize/1920/f.png'
    },
    {
      id: 'ussuriysk-raduzhny',
      name: 'ЖК «Радужный» (г. Уссурийск)',
      desc: 'Остекление жилого комплекса по ул. Солнечная, 7а в Уссурийске',
      url: 'https://m-files.cdn1.cc/lpfile/7/f/2/7f2aaf398c3cfc5d0d9142d3faab76ca/-/resize/1920/f.png'
    },
  ];

  for (const ko of keyObjects) {
    const ext = ko.url.endsWith('.jpg') ? '.jpg' : '.png';
    const filePath = path.join(baseDir, 'key-objects', `${ko.id}${ext}`);
    console.log(`Downloading ${ko.id}...`);
    await downloadFile(ko.url, filePath);
    const stat = fs.existsSync(filePath) ? fs.statSync(filePath) : null;
    console.log(`Saved ${ko.id}${ext}: ${stat ? (stat.size / 1024).toFixed(1) + ' KB' : 'ERROR'}`);
  }

  // 2. Download all 32 photos of general works from main page
  console.log('\nDownloading General Works photos...');
  const mainHtml = fs.readFileSync('scripts/site_dump.html', 'utf8');
  const mainImgs = [...mainHtml.matchAll(/(?:https?:)?\/\/m-files[^\s"'<>]+?\.(?:jpe?g|png)/gi)].map(m => m[0]);
  
  // Group by unique ID
  const map = new Map();
  for (const u of mainImgs) {
    const full = u.startsWith('http') ? u : 'https:' + u;
    const match = full.match(/\/([a-f0-9]{32})/i);
    if (match) {
      const id = match[1];
      if (!map.has(id)) map.set(id, []);
      map.get(id).push(full);
    }
  }

  // Exclude key objects and decorative icons
  const excludeIds = new Set([
    'af2cebc2', '161486d3', '80df82b3', 'b3496804', 'dc1bdd1f', 'd357be03', 'c1403cf0', '1e310119', 'b3cb4915', '8c52e39f', '982e2cf0',
    '03843a3a', '25cc8ff8', '55208d0d', 'c34bbc3a', '8cc53528', '042b6a56', '6da2a7ae'
  ]);

  let workIdx = 1;
  const downloadedWorks = [];
  for (const [id, urls] of map.entries()) {
    if (excludeIds.has(id)) continue;
    // Get highest resolution
    let best = urls.find(u => u.includes('/1600/')) || urls.find(u => u.includes('/1200/')) || urls[0];
    best = best.replace(/\?[0-9]+$/, '').replace(/\/resize\/\d+\//, '/resize/1600/');
    const ext = best.endsWith('.png') ? '.png' : '.jpg';
    const filename = `work-${String(workIdx).padStart(2, '0')}-${id.slice(0, 8)}${ext}`;
    const filePath = path.join(baseDir, 'works', filename);
    await downloadFile(best, filePath);
    const stat = fs.existsSync(filePath) ? fs.statSync(filePath) : null;
    console.log(`Work ${workIdx}: ${filename} (${stat ? (stat.size / 1024).toFixed(1) + ' KB' : 'ERROR'})`);
    downloadedWorks.push({
      id,
      filename,
      url: best
    });
    workIdx++;
  }

  // 3. Download balconies from page4
  console.log('\nDownloading Balconies & Loggias photos...');
  const page4Html = fs.readFileSync('scripts/page4_lodzhii.html', 'utf8');
  const page4Imgs = [...page4Html.matchAll(/(?:https?:)?\/\/m-files[^\s"'<>]+?\.(?:jpe?g|png)/gi)].map(m => m[0]);
  const p4Map = new Map();
  for (const u of page4Imgs) {
    const full = u.startsWith('http') ? u : 'https:' + u;
    const match = full.match(/\/([a-f0-9]{32})/i);
    if (match) {
      const id = match[1];
      if (!p4Map.has(id)) p4Map.set(id, []);
      p4Map.get(id).push(full);
    }
  }

  let balconyIdx = 1;
  for (const [id, urls] of p4Map.entries()) {
    if (excludeIds.has(id) || map.has(id)) continue;
    let best = urls.find(u => u.includes('/1600/')) || urls.find(u => u.includes('/1170/')) || urls[0];
    best = best.replace(/\?[0-9]+$/, '').replace(/\/resize\/\d+\//, '/resize/1600/');
    const ext = best.endsWith('.png') ? '.png' : '.jpg';
    const filename = `balcony-${String(balconyIdx).padStart(2, '0')}-${id.slice(0, 8)}${ext}`;
    const filePath = path.join(baseDir, 'balconies', filename);
    await downloadFile(best, filePath);
    const stat = fs.existsSync(filePath) ? fs.statSync(filePath) : null;
    console.log(`Balcony ${balconyIdx}: ${filename} (${stat ? (stat.size / 1024).toFixed(1) + ' KB' : 'ERROR'})`);
    balconyIdx++;
  }

  console.log('\nALL DOWNLOADS COMPLETE!');
}

main().catch(console.error);
