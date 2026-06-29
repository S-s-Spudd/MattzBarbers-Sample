import fs from 'node:fs/promises';

const file = 'src/components/sections/Gallery.astro';
let source = await fs.readFile(file, 'utf8');

const start = source.indexOf('const photos = [');
const end = source.indexOf('];', start);

const photosArray = `const photos = [
  {
    src: imagePath('clean-fade.webp'),
    alt: 'Clean fade haircut at Mattz Barbers',
    caption: 'Clean Fade.',
    rotate: '-1.8deg',
  },
  {
    src: imagePath('clean-fade-1.webp'),
    alt: 'Fresh clean fade from Mattz Barbers',
    caption: 'Fresh Finish.',
    rotate: '1.5deg',
  },
  {
    src: imagePath('fade.webp'),
    alt: 'Fade haircut detail at Mattz Barbers',
    caption: 'The Fade.',
    rotate: '-1deg',
  },
  {
    src: imagePath('shop-interior.webp'),
    alt: 'Mattz Barbers shop interior',
    caption: 'Inside the Shop.',
    rotate: '2deg',
  },
  {
    src: imagePath('shape-up.webp'),
    alt: 'Sharp shape up haircut at Mattz Barbers',
    caption: 'The Shape-Up.',
    rotate: '-1.5deg',
  },
  {
    src: imagePath('logo.webp'),
    alt: 'Mattz Barbers logo',
    caption: 'Mattz Barbers.',
    rotate: '0.8deg',
  },
  {
    src: imagePath('group-photo.webp'),
    alt: 'Group photo at Mattz Barbers',
    caption: 'The Team.',
    rotate: '-0.6deg',
  },
]`;

if (start !== -1 && end !== -1) {
  source = source.slice(0, start) + photosArray + source.slice(end + 1);
}

source = source.replace('Captured between<br/>the before &amp; after.', 'Gallery');
source = source.replace('Captured between<br />the before &amp; after.', 'Gallery');
source = source.replace(
  'class="w-full h-full object-cover object-top block" loading="lazy"',
  'class="w-full h-full object-cover block" style="object-position:50% 64%;" loading="lazy"'
);
source = source.replace('max-w-full max-h-full object-contain block', 'w-full h-full object-cover block');
source = source.replace(' flex items-center justify-center bg-black/40 p-8', '');

await fs.writeFile(file, source);
console.log('Patched gallery image order, heading, and fit');
