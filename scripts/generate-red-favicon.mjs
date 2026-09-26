import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

// Clean, high-contrast, perfectly centered red architectural emblem SVG
function getSvg(size = 512) {
  // Ratio based on 512x512 grid
  const rSquircle = Math.round(size * 0.23); // ~118px on 512
  const padding = Math.round(size * 0.16); // ~82px
  const winSize = size - padding * 2; // ~348px
  const winX = padding;
  const winY = padding;
  const winRx = Math.round(size * 0.05); // ~26px
  const strokeW = Math.round(size * 0.075); // ~38px stroke
  const center = Math.round(size / 2); // 256

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}">
  <defs>
    <linearGradient id="redGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#DC2626"/>
      <stop offset="50%" stop-color="#E11D48"/>
      <stop offset="100%" stop-color="#B91C1C"/>
    </linearGradient>
  </defs>
  <!-- Red squircle badge -->
  <rect width="${size}" height="${size}" rx="${rSquircle}" fill="url(#redGrad)"/>
  <!-- White architectural window frame -->
  <rect x="${winX}" y="${winY}" width="${winSize}" height="${winSize}" rx="${winRx}" fill="none" stroke="#FFFFFF" stroke-width="${strokeW}" stroke-linecap="round" stroke-linejoin="round"/>
  <!-- Window mullions (vertical and horizontal cross dividers) -->
  <line x1="${center}" y1="${winY}" x2="${center}" y2="${winY + winSize}" stroke="#FFFFFF" stroke-width="${strokeW}" stroke-linecap="round"/>
  <line x1="${winX}" y1="${center}" x2="${winX + winSize}" y2="${center}" stroke="#FFFFFF" stroke-width="${strokeW}" stroke-linecap="round"/>
</svg>`;
}

function createIcoFromPngs(pngBuffers) {
  const count = pngBuffers.length;
  const headerSize = 6 + count * 16;
  let offset = headerSize;
  
  const header = Buffer.alloc(headerSize);
  header.writeUInt16LE(0, 0); // reserved
  header.writeUInt16LE(1, 2); // type 1 = icon
  header.writeUInt16LE(count, 4); // count

  for (let i = 0; i < count; i++) {
    const { width, height, buffer } = pngBuffers[i];
    const entryOffset = 6 + i * 16;
    header.writeUInt8(width >= 256 ? 0 : width, entryOffset);
    header.writeUInt8(height >= 256 ? 0 : height, entryOffset + 1);
    header.writeUInt8(0, entryOffset + 2); // colors
    header.writeUInt8(0, entryOffset + 3); // reserved
    header.writeUInt16LE(1, entryOffset + 4); // planes
    header.writeUInt16LE(32, entryOffset + 6); // bpp
    header.writeUInt32LE(buffer.length, entryOffset + 8); // size
    header.writeUInt32LE(offset, entryOffset + 12); // offset
    offset += buffer.length;
  }

  return Buffer.concat([header, ...pngBuffers.map(p => p.buffer)]);
}

async function generate() {
  console.log('Generating red logo favicons...');

  // 1. Write SVG
  const svgContent = getSvg(512);
  fs.writeFileSync('public/favicon.svg', svgContent);
  console.log('✓ public/favicon.svg created');

  // 2. Generate PNGs at required sizes
  const sizes = [16, 32, 48, 64, 180, 192, 512];
  const pngs = {};

  for (const s of sizes) {
    const svgForSize = getSvg(s >= 64 ? 512 : (s === 16 ? 64 : 128));
    const buf = await sharp(Buffer.from(svgForSize))
      .resize(s, s)
      .png()
      .toBuffer();
    pngs[s] = buf;
  }

  // 3. Write individual PNG icons
  fs.writeFileSync('public/apple-icon.png', pngs[180]);
  fs.writeFileSync('public/icon.png', pngs[32]);
  fs.writeFileSync('public/icon-192.png', pngs[192]);
  fs.writeFileSync('public/icon-512.png', pngs[512]);
  console.log('✓ Apple and PWA icons created');

  // 4. Create multi-resolution ICO file (16, 32, 48)
  const icoBuf = createIcoFromPngs([
    { width: 16, height: 16, buffer: pngs[16] },
    { width: 32, height: 32, buffer: pngs[32] },
    { width: 48, height: 48, buffer: pngs[48] },
  ]);

  fs.writeFileSync('public/favicon.ico', icoBuf);
  fs.writeFileSync('src/app/favicon.ico', icoBuf);
  console.log('✓ public/favicon.ico & src/app/favicon.ico created');

  // Cleanup test files
  const cleanFiles = [
    'public/test-logo-orig-64.png',
    'public/test-header-emblem-64.png',
    'public/test-emblem-32.png',
    'public/test-emblem-16.png',
    'public/test-orig-32.png',
    'public/test-orig-16.png',
  ];
  cleanFiles.forEach(f => {
    if (fs.existsSync(f)) fs.unlinkSync(f);
  });

  console.log('🎉 Favicon generation completed!');
}

generate().catch(console.error);
