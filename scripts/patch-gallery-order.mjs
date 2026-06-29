import fs from 'node:fs/promises';

const file = 'src/components/sections/Gallery.astro';
let source = await fs.readFile(file, 'utf8');

const start = source.indexOf('const photos = [');
const end = source.indexOf('];', start);

const photosArray = `const photos = [
  {
    src: imagePath('Clean Fade.jpg'),
    alt: 'Clean fade haircut at Mattz Barbers',
    caption: 'Clean Fade.',
    rotate: '-1.8deg',
  },
  {
    src: imagePath('Clean Fade1.jpg'),
    alt: 'Fresh clean fade from Mattz Barbers',
    caption: 'Fresh Finish.',
    rotate: '1.5deg',
  },
  {
    src: imagePath('Fade.jpg'),
    alt: 'Fade haircut detail at Mattz Barbers',
    caption: 'The Fade.',
    rotate: '-1deg',
  },
  {
    src: imagePath('Shop Interior.jpg'),
    alt: 'Mattz Barbers shop interior',
    caption: 'Inside the Shop.',
    rotate: '2deg',
  },
  {
    src: imagePath('Shape Up.jpg'),
    alt: 'Sharp shape up haircut at Mattz Barbers',
    caption: 'The Shape-Up.',
    rotate: '-1.5deg',
  },
  {
    src: imagePath('Logo.jpg'),
    alt: 'Mattz Barbers logo',
    caption: 'Mattz Barbers.',
    rotate: '0.8deg',
  },
  {
    src: imagePath('Group Photo.jpg'),
    alt: 'Group photo at Mattz Barbers',
    caption: 'The Team.',
    rotate: '-0.6deg',
  },
]`;

if (start !== -1 && end !== -1) {
  source = source.slice(0, start) + photosArray + source.slice(end + 1);
  await fs.writeFile(file, source);
  console.log('Patched gallery image order');
}
