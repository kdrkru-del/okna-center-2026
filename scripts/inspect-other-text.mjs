import fs from 'fs';

for (const name of ['page4_lodzhii', 'ustanovka']) {
  const html = fs.readFileSync(`scripts/${name}.html`, 'utf8');
  const clean = html.replace(/<style[\s\S]*?<\/style>/gi, '').replace(/<script[\s\S]*?<\/script>/gi, '');
  const lines = clean.replace(/<[^>]+>/g, '\n').split('\n').map(s => s.trim()).filter(s => s.length > 2 && !s.startsWith('&nbsp;'));
  const unique = [];
  for (const l of lines) {
    if (!unique.includes(l)) unique.push(l);
  }
  console.log(`\n=== ${name.toUpperCase()} PAGE TEXT ===`);
  console.log(unique.join('\n'));
}
