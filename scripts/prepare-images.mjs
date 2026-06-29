import fs from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const sourceDir = path.resolve('Images');
const outputDir = path.resolve('public', 'Images');

const images = [
  ['Clean Fade.jpg', 'clean-fade.webp'],
  ['Clean Fade1.jpg', 'clean-fade-1.webp'],
  ['Fade.jpg', 'fade.webp'],
  ['Group Photo.jpg', 'group-photo.webp'],
  ['Logo.jpg', 'logo.webp'],
  ['Shape Up.jpg', 'shape-up.webp'],
  ['Shop Interior.jpg', 'shop-interior.webp'],
];

await fs.mkdir(outputDir, { recursive: true });

for (const [inputName, outputName] of images) {
  const inputPath = path.join(sourceDir, inputName);
  const outputPath = path.join(outputDir, outputName);

  await sharp(inputPath, { failOn: 'none' })
    .rotate()
    .toColorspace('srgb')
    .resize({ width: 1800, height: 1800, fit: 'inside', withoutEnlargement: true })
    .webp({ quality: 84, effort: 6 })
    .toFile(outputPath);

  console.log(`Generated ${path.relative(process.cwd(), outputPath)}`);
}
