import fs from 'node:fs/promises';

const file = 'src/components/sections/Opening.astro';
let source = await fs.readFile(file, 'utf8');

source = source.replace("src={imagePath('Trim.jpg')}", "src={imagePath('trim.webp')}");
source = source.replace('object-cover parallax-img scale-[1.1]', 'object-contain parallax-img');
source = source.replace('Images/${encodeURIComponent(fileName)}', 'Images/${fileName}');

await fs.writeFile(file, source);
console.log('Patched hero image');
