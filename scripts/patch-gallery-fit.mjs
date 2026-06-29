import fs from 'node:fs/promises';

const file = 'src/components/sections/Gallery.astro';
let source = await fs.readFile(file, 'utf8');

source = source.replace('object-cover object-top block', 'object-cover object-center block');
source = source.replace('object-contain block', 'object-cover object-center block');

await fs.writeFile(file, source);
console.log('Patched gallery image fit');
