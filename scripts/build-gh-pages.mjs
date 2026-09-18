import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

process.env.GITHUB_PAGES = 'true';
console.log('Building Next.js export for GitHub Pages (basePath: /okna-center-2026)...');

execSync('npx next build --webpack', {
  stdio: 'inherit',
  env: { ...process.env, GITHUB_PAGES: 'true' }
});

// Create .nojekyll in out/ to ensure GitHub Pages serves _next/ assets
const nojekyllPath = path.join(process.cwd(), 'out', '.nojekyll');
fs.writeFileSync(nojekyllPath, '');
console.log('Successfully created .nojekyll in out/');
