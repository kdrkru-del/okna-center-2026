import fs from 'fs';
import path from 'path';

// Load all HTML dumps
const portfolioHtml = fs.readFileSync('scripts/portfolio.html', 'utf8');
const mainHtml = fs.readFileSync('scripts/site_dump.html', 'utf8');
const page4Html = fs.readFileSync('scripts/page4_lodzhii.html', 'utf8');

// Function to get clean high-res URL
function getBestUrl(raw) {
  let u = raw.startsWith('http') ? raw : 'https:' + raw;
  u = u.replace(/\?[0-9]+$/, ''); // remove cache busters
  // If it has /resize/166/ or /resize/348/, change to /resize/1600/ or remove resize
  if (u.includes('/resize/')) {
    // For portfolio images with double resize: /resize/345/-/resize/1920/f.png -> keep 1920
    if (u.includes('/resize/1920/')) {
      return u;
    }
    // replace any small resize with 1600
    u = u.replace(/\/resize\/\d+\//, '/resize/1600/');
  }
  return u;
}

// 1. Parse Key Objects from portfolioHtml
// Let's find each object card in portfolio
console.log('--- Analyzing Key Objects ---');
const objMatches = [
  {
    name: 'Каплунова 10',
    desc: 'Многоквартирный жилой дом, 24 этажа. Заказчик СЗ «Ремстройцентр». Монтаж светопрозрачных конструкций 4100 м² (2019–2020 гг.)',
    marker: 'Каплунова 10'
  },
  {
    name: 'Линейная 20',
    desc: '4-этажный многоквартирный дом. Монтаж светопрозрачных конструкций (2021 г.)',
    marker: 'Линейная 20'
  },
  {
    name: 'Казармы 127 мотострелковой дивизии',
    desc: 'Остекление казарм 127 МСД с. Сергеевка. Заказчик — Министерство обороны РФ',
    marker: '127 мотострелковой'
  },
  {
    name: 'Садгородская 23Д',
    desc: '4-этажный многоквартирный дом. Остекление фасадов и квартир',
    marker: 'Садгородская 23Д'
  },
  {
    name: 'Садгородская 23В',
    desc: '4-этажный многоквартирный дом. Светопрозрачные конструкции',
    marker: 'Садгородская 23В'
  },
  {
    name: 'ЖК «Каштановый двор» (литер 4)',
    desc: '25-этажный многоквартирный дом. Заказчик: «Девелопмент-Юг», генподрядчик ООО «ПСК-Восток»',
    marker: 'Каштановый двор'
  },
  {
    name: 'ЖК «Радужный» (г. Уссурийск)',
    desc: 'Жилой комплекс по ул. Солнечная, 7а в Уссурийске. Остекление многоквартирного фонда',
    marker: 'Солнечная 7а'
  }
];

const keyObjectsData = [];

for (const obj of objMatches) {
  const idx = portfolioHtml.indexOf(obj.marker);
  if (idx !== -1) {
    // Look for image within 1000 characters before or after
    const chunk = portfolioHtml.slice(Math.max(0, idx - 800), Math.min(portfolioHtml.length, idx + 800));
    const imgs = [...chunk.matchAll(/(?:https?:)?\/\/m-files[^\s"'<>]+?\.(?:jpe?g|png)/gi)].map(m => getBestUrl(m[0]));
    const unique = [...new Set(imgs)].filter(u => !u.includes('.svg') && !u.includes('favicon'));
    keyObjectsData.push({
      ...obj,
      images: unique
    });
  }
}

console.log('Found key objects:', keyObjectsData.length);
for (const ko of keyObjectsData) {
  console.log(`\nОбъект: ${ko.name}`);
  console.log(`Описание: ${ko.desc}`);
  console.log(`Фото (${ko.images.length}):`, ko.images);
}
