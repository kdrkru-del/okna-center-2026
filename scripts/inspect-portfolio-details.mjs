import fs from 'fs';
import path from 'path';

// Parse portfolio.html specifically to match images with object names
const portfolioHtml = fs.readFileSync('scripts/portfolio.html', 'utf8');

// Match each block/card in portfolio
const blocks = [...portfolioHtml.matchAll(/<(?:div|section)[^>]*class=["'][^"']*(?:blk-data|block-content|m-wrapper|item|card|col)[^"']*["'][\s\S]*?(?=(?:<(?:div|section)[^>]*class=["'][^"']*(?:blk-data|block-content|m-wrapper|item|card|col)[^"']*["'])|$)/gi)];

// Let's find all images on portfolio.html and their preceding/following texts
const imgMatches = [...portfolioHtml.matchAll(/<img[^>]+src=["']([^"']+)["'][^>]*>/gi)];
console.log('Images on portfolio.html:', imgMatches.length);

for (const m of imgMatches) {
  const src = m[1];
  const idx = m.index;
  // Get surrounding text
  const context = portfolioHtml.slice(Math.max(0, idx - 400), Math.min(portfolioHtml.length, idx + 400));
  const textOnly = context.replace(/<style[\s\S]*?<\/style>/gi, '')
                          .replace(/<script[\s\S]*?<\/script>/gi, '')
                          .replace(/<[^>]+>/g, ' ')
                          .replace(/\s+/g, ' ')
                          .trim();
  console.log(`\nIMG: ${src}`);
  console.log(`CONTEXT: ${textOnly.slice(0, 300)}`);
}
