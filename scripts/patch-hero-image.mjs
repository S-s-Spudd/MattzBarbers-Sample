import fs from 'node:fs/promises';

const file = 'src/components/sections/Opening.astro';
let source = await fs.readFile(file, 'utf8');

source = source.replace("src={imagePath('Trim.jpg')}", "src={imagePath('trim.webp')}");
source = source.replace('object-cover parallax-img scale-[1.1]', 'object-cover object-center parallax-img');
source = source.replace('object-contain parallax-img', 'object-cover object-center parallax-img');
source = source.replace('Images/${encodeURIComponent(fileName)}', 'Images/${fileName}');

const googleText = '5.0 · Google';
const googleIndex = source.indexOf(googleText);
if (googleIndex !== -1) {
  const blockStart = source.lastIndexOf('<div class="flex items-center gap-3">', googleIndex);
  const blockEnd = source.indexOf('</div>', googleIndex);
  if (blockStart !== -1 && blockEnd !== -1) {
    source = source.slice(0, blockStart) + source.slice(blockEnd + 6);
  }
}

const badgeText = 'Google Rating';
const badgeIndex = source.indexOf(badgeText);
if (badgeIndex !== -1) {
  const blockStart = source.lastIndexOf('<!-- Floating stat -->', badgeIndex);
  const blockEnd = source.indexOf('</div>', badgeIndex);
  if (blockStart !== -1 && blockEnd !== -1) {
    source = source.slice(0, blockStart) + source.slice(blockEnd + 6);
  }
}

await fs.writeFile(file, source);
console.log('Patched hero image and removed Google rating displays');
