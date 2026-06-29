import fs from 'node:fs/promises';
import path from 'node:path';

const distDir = path.resolve('dist');
const textExtensions = new Set(['.html', '.js', '.css']);

const replacements = [
  ['href="/"', 'href="/MattzBarbers-Sample/"'],
  ['href="/services"', 'href="/MattzBarbers-Sample/services"'],
  ['href="/reviews"', 'href="/MattzBarbers-Sample/reviews"'],
  ['href="/find-us"', 'href="/MattzBarbers-Sample/find-us"'],
  ['src="/images/logo.webp"', 'src="/MattzBarbers-Sample/images/logo.webp"'],
  ['src="/images/', 'src="/MattzBarbers-Sample/images/'],
  ['/MattzBarbers-SampleImages/', '/MattzBarbers-Sample/Images/'],
  ['Clean%20Fade.jpg', 'clean-fade.webp'],
  ['Clean%20Fade1.jpg', 'clean-fade-1.webp'],
  ['Fade.jpg', 'fade.webp'],
  ['Shape%20Up.jpg', 'shape-up.webp'],
  ['Shop%20Interior.jpg', 'shop-interior.webp'],
  ['Group%20Photo.jpg', 'group-photo.webp'],
  ['Logo.jpg', 'logo.webp'],
  ['https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=900&amp;q=85&amp;auto=format&amp;fit=crop', '/MattzBarbers-Sample/Images/clean-fade.webp'],
  ['https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=900&q=85&auto=format&fit=crop', '/MattzBarbers-Sample/Images/clean-fade.webp'],
];

async function walk(dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      await walk(fullPath);
      continue;
    }

    if (!textExtensions.has(path.extname(entry.name).toLowerCase())) continue;

    let content = await fs.readFile(fullPath, 'utf8');
    const before = content;

    for (const [from, to] of replacements) {
      content = content.split(from).join(to);
    }

    if (content !== before) {
      await fs.writeFile(fullPath, content);
      console.log(`Rewrote ${path.relative(process.cwd(), fullPath)}`);
    }
  }
}

await walk(distDir);
console.log('GitHub Pages dist rewrite complete');
