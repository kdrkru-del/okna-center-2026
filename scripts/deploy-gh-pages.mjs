import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

const outDir = path.join(process.cwd(), 'out');

if (!fs.existsSync(outDir)) {
  console.error('Error: out directory does not exist. Run build first.');
  process.exit(1);
}

// Ensure .nojekyll exists
fs.writeFileSync(path.join(outDir, '.nojekyll'), '');

console.log('Deploying out/ to gh-pages branch on kdrkru-del/okna-center-2026...');

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
execOut('git commit -m "Deploy Okna Center 2026 preview to GitHub Pages"');
execOut('git push -f origin gh-pages');

// Cleanup .git inside out
fs.rmSync(dotGit, { recursive: true, force: true });
console.log('Successfully pushed to gh-pages branch!');
