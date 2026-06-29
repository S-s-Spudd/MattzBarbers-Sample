import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  site: 'https://s-s-spudd.github.io',
  base: '/MattzBarbers-Sample',
  output: 'static',
  integrations: [react()],
  prefetch: false,
  vite: {
    plugins: [tailwindcss()],
    optimizeDeps: {
      include: ['gsap', 'lenis'],
    },
  },
});
