# freemix-site

The website for [FreeMix](https://github.com/shixzie/freemix), an open, GPU-first live production system written in Rust.

Built with [Astro](https://astro.build) and no UI framework. Motion is CSS plus a little vanilla TypeScript, and everything respects `prefers-reduced-motion`.

## Pages

- `/` landing page with a live, clickable switcher demo (keys 1–4 preview, C cut, F fade, W wipe, S slide, Z zoom, T stinger)
- `/roadmap/` the ten implementation phases with status and parity-ledger evidence
- `/features/` every row of the parity ledger, filterable by area, priority and search

## Develop

```sh
npm install
npm run dev      # http://localhost:4321
npm run build    # static output in dist/
```

## Roadmap and feature data

`src/data/parity.json` is generated from a FreeMix checkout (`parity.toml`, `docs/spec/feature-parity.md`, and git metadata). Refresh it after the ledger changes:

```sh
FREEMIX_DIR=../freemix npm run sync
```

Phase titles, summaries and status live in `src/data/roadmap.ts`, condensed from `docs/spec/implementation-roadmap.md`. Screenshots in `src/assets/screens/` come from `docs/progress/` in the FreeMix repository.

## Deploy

The build is fully static. `SITE` and `BASE` environment variables set the canonical origin and base path, so the same build works on a custom domain or as a GitHub Pages project site:

```sh
SITE=https://shixzie.github.io BASE=/freemix-site npm run build
```
