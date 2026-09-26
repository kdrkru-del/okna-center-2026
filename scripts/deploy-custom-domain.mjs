/**
 * deploy-custom-domain.mjs
 * 
 * Builds and deploys the site to GitHub Pages with a CUSTOM DOMAIN (окнацентр.рф).
 * - No basePath (/okna-center-2026) — paths are root-level
 * - robots.txt is OPEN for Yandex indexing
 * - CNAME file is included automatically (from public/CNAME)
 */

import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

const outDir = path.join(process.cwd(), 'out');

// 1. Build without GITHUB_PAGES flag (no basePath, open robots.txt)
console.log('Building for custom domain (окнацентр.рф)...');
execSync('npx next build --webpack', {
  stdio: 'inherit',
  env: { ...process.env }  // NO GITHUB_PAGES=true → no basePath, robots open
});

// 2. Create .nojekyll so GitHub Pages serves _next/ assets
fs.writeFileSync(path.join(outDir, '.nojekyll'), '');
console.log('✓ .nojekyll created');

// 3. Verify CNAME is present (copied from public/CNAME by Next.js)
const cnamePath = path.join(outDir, 'CNAME');
if (!fs.existsSync(cnamePath)) {
  fs.writeFileSync(cnamePath, 'xn--80aknmcbtp7a.xn--p1ai');
  console.log('✓ CNAME created (xn--80aknmcbtp7a.xn--p1ai)');
} else {
  // Ensure it has punycode
  fs.writeFileSync(cnamePath, 'xn--80aknmcbtp7a.xn--p1ai');
  console.log('✓ CNAME set to Punycode:', fs.readFileSync(cnamePath, 'utf-8').trim());
}

// 4. Deploy to gh-pages branch
console.log('\nDeploying to gh-pages branch...');

const execOut = (cmd) => {
  console.log(`> ${cmd}`);
  execSync(cmd, { cwd: outDir, stdio: 'inherit' });
};

// Remove any existing .git in out
const dotGit = path.join(outDir, '.git');
if (fs.existsSync(dotGit)) {
  fs.rmSync(dotGit, { recursive: true, force: true });
}

execOut('git init -b gh-pages');
execOut('git config user.name "Antigravity"');
execOut('git config user.email "antigravity@google.com"');
execOut('git remote add origin https://github.com/kdrkru-del/okna-center-2026.git');
execOut('git add -A');
execOut('git commit -m "Deploy: custom domain окнацентр.рф (no basePath, Yandex indexing open)"');
execOut('git push -f origin gh-pages');

// Cleanup
fs.rmSync(dotGit, { recursive: true, force: true });

console.log('\n✅ Done! Site deployed to gh-pages.');
console.log('📌 Next step: in GitHub repo Settings → Pages → Custom domain → enter: окнацентр.рф');
console.log('📌 Then change DNS A-records for окнацентр.рф to GitHub Pages IPs:');
console.log('   185.199.108.153');
console.log('   185.199.109.153');
console.log('   185.199.110.153');
console.log('   185.199.111.153');
