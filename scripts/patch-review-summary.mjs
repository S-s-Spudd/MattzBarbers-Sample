import fs from 'node:fs/promises';

const file = 'src/components/sections/Testimonials.astro';
let source = await fs.readFile(file, 'utf8');

source = source.replace("{ label: '5 stars', pct: 94 }", "{ label: '5 stars', pct: 99, count: 138 }");
source = source.replace("{ label: '4 stars', pct: 5  }", "{ label: '4 stars', pct: 1, count: 1 }");
source = source.replace("{ label: '3 stars', pct: 1  }", "{ label: '3 stars', pct: 0, count: 0 }");
source = source.replace("{ label: '2 stars', pct: 0  }", "{ label: '2 stars', pct: 0, count: 0 }");
source = source.replace("{ label: '1 star',  pct: 0  }", "{ label: '1 star', pct: 0, count: 0 }");
source = source.replace('Based on 60+ reviews', 'Based on 139 Fresha reviews');
source = source.replace('via Fresha', 'Google: 5.0 based on 204 reviews');
source = source.replace('ratingBreakdown.map(({ label, pct }) =>', 'ratingBreakdown.map(({ label, pct, count }) =>');
source = source.replace('{pct}%</span>', '{count}</span>');
source = source.replace('w-7 text-right', 'w-10 text-right');

await fs.writeFile(file, source);
console.log('Patched factual review summary');
