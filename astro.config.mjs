// @ts-check
import { defineConfig } from 'astro/config';

// SITE and BASE let the same build serve a custom domain or a GitHub Pages
// project path (BASE=/freemix-site).
export default defineConfig({
  site: process.env.SITE ?? 'https://shixzie.github.io',
  base: process.env.BASE ?? '/',
  trailingSlash: 'ignore',
});
