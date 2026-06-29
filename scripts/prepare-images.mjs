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
  ['Trim.jpg', 'trim.webp'],
];

await fs.mkdir(outputDir, { recursive: true });

async function generateDefaultWebp(inputPath, outputPath) {
  await sharp(inputPath, { failOn: 'none' })
    .rotate()
    .toColorspace('srgb')
    .resize({ width: 1800, height: 1800, fit: 'inside', withoutEnlargement: true })
    .webp({ quality: 84, effort: 6 })
    .toFile(outputPath);
}

async function generateShopInteriorWebp(inputPath, outputPath) {
  const image = sharp(inputPath, { failOn: 'none' }).rotate().toColorspace('srgb');
  const metadata = await image.metadata();
  const width = metadata.width;
  const height = metadata.height;

  if (!width || !height) {
    throw new Error(`Could not read dimensions for ${inputPath}`);
  }

  const targetRatio = 4;
  const cropWidth = width;
  const cropHeight = Math.min(height, Math.round(cropWidth / targetRatio));
  const maxTop = Math.max(0, height - cropHeight);
  const top = Math.round(maxTop * 0.52);

  await sharp(inputPath, { failOn: 'none' })
    .rotate()
    .toColorspace('srgb')
    .extract({ left: 0, top, width: cropWidth, height: cropHeight })
    .resize({ width: 1800, height: 450, fit: 'cover' })
    .webp({ quality: 84, effort: 6 })
    .toFile(outputPath);
}

for (const [inputName, outputName] of images) {
  const inputPath = path.join(sourceDir, inputName);
  const outputPath = path.join(outputDir, outputName);

  if (inputName === 'Shop Interior.jpg') {
    await generateShopInteriorWebp(inputPath, outputPath);
  } else {
    await generateDefaultWebp(inputPath, outputPath);
  }

  console.log(`Generated ${path.relative(process.cwd(), outputPath)}`);
}
