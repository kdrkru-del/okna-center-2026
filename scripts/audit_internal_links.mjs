import fs from 'fs';
import path from 'path';

const outDir = path.resolve('out');

function getHtmlFiles(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  for (const file of list) {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    if (stat && stat.isDirectory()) {
      results = results.concat(getHtmlFiles(filePath));
    } else if (file.endsWith('.html')) {
      results.push(filePath);
    }
  }
  return results;
}

const htmlFiles = getHtmlFiles(outDir);
console.log('Total HTML files in out/:', htmlFiles.length);

const linksFound = [];
const incomingLinks = {};

for (const file of htmlFiles) {
  const relFile = path.relative(outDir, file).replace(/\\/g, '/');
  const content = fs.readFileSync(file, 'utf8');
  
  const hrefRegex = /href=["']([^"']+)["']/g;
  let match;
  while ((match = hrefRegex.exec(content)) !== null) {
    const href = match[1];
    if (href.startsWith('/') && !href.startsWith('//') && !href.startsWith('/_next') && !href.startsWith('/images') && !href.startsWith('/favicon')) {
      linksFound.push({ source: relFile, target: href });
      const targetNorm = href.split('?')[0].split('#')[0];
      incomingLinks[targetNorm] = (incomingLinks[targetNorm] || 0) + 1;
    }
  }
}

console.log('Total internal link occurrences found:', linksFound.length);

let broken = 0;
const checkedTargets = new Set();

for (const link of linksFound) {
  const targetNorm = link.target.split('?')[0].split('#')[0];
  if (checkedTargets.has(targetNorm)) continue;
  checkedTargets.add(targetNorm);

  let targetPath = path.join(outDir, targetNorm);
  if (targetNorm.endsWith('/')) {
    targetPath = path.join(targetPath, 'index.html');
  } else if (!targetNorm.endsWith('.html') && !targetNorm.endsWith('.xml') && !targetNorm.endsWith('.txt')) {
    targetPath = path.join(targetPath, 'index.html');
  }

  const exists = fs.existsSync(targetPath) || fs.existsSync(path.join(outDir, targetNorm, 'index.html')) || fs.existsSync(path.join(outDir, targetNorm + '.html'));
  if (!exists) {
    console.log('BROKEN LINK:', link.source, '->', link.target);
    broken++;
  }
}

console.log('Broken internal links count:', broken);

// Check orphan canonical pages
const canonicalSlugs = [
  '/',
  '/contacts',
  '/ghalierieia_rabot',
  '/zaiavka_na_uslughi_kompanii_oknatsientr',
  '/kupit_plastikovye_okna_vladivostok',
  '/ustanovka_plastikovykh_okon_vo_vladivostokie',
  '/zamena_plastic_okon_vladivostok',
  '/okna_pod_derevo_vladivostok',
  '/okna_dlya_dachi_vladivostok',
  '/profil_dlya_okon',
  '/osteklenie_balkona_vladivostok',
  '/lodgia_pod_klyuch_vladivostok',
  '/riemont_balkonov_vo_vladivostokie',
  '/riemont_lodzhii_vo_vladivostokie',
  '/uteplenie_lodgiy_vladivostok',
  '/otdielochnyie_matierialy',
  '/panieli_khani',
  '/vinilovyi_saidingh',
  '/ievro_zhaliuzi',
  '/alyuminievye_okna_vladivostok',
  '/aliuminiievyie_okna_i_dvieri',
  '/remont_plastikovyh_okon_vladivostok',
  '/regulirovka_plastikovykh_okon_vladivostok',
  '/okonnaia_kompaniia_vladivostok',
];

console.log('\n--- ORPHAN PAGES CHECK ---');
let orphanCount = 0;
for (const slug of canonicalSlugs) {
  const norm1 = slug;
  const norm2 = slug === '/' ? '/' : slug + '/';
  const count = (incomingLinks[norm1] || 0) + (incomingLinks[norm2] || 0);
  if (count === 0) {
    console.log('ORPHAN PAGE:', slug);
    orphanCount++;
  } else {
    // console.log(OK:  has  incoming links);
  }
}
console.log('Total orphan canonical pages:', orphanCount);
