// @ts-check
import { defineConfig } from 'astro/config';

// SITE sets the canonical origin (the Worker's custom domain once one is
// attached). BASE only matters when serving from a subpath.
export default defineConfig({
  site: process.env.SITE || undefined,
  base: process.env.BASE || '/',
  trailingSlash: 'ignore',
});
