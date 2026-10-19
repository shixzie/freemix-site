// @ts-check
import { defineConfig } from 'astro/config';

// The public origin is freemix.studio; SITE overrides it for other hosts.
// BASE only matters when serving from a subpath.
export default defineConfig({
  site: process.env.SITE || 'https://freemix.studio',
  base: process.env.BASE || '/',
  trailingSlash: 'ignore',
});
