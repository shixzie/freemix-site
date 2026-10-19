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

The site is hosted as a Cloudflare Worker that serves the static build with [Workers static assets](https://developers.cloudflare.com/workers/static-assets/); there is no Worker script. `wrangler.jsonc` points the Worker at `dist/`, unknown paths get `404.html`, and `public/_headers` makes hashed assets cache forever.

```sh
npm run preview   # build, then serve through wrangler locally on :8787
npm run deploy    # build, then wrangler deploy (needs `npx wrangler login` once)
```

Pushes to `master` deploy automatically through `.github/workflows/deploy.yml`. It needs two repository secrets:

- `CLOUDFLARE_API_TOKEN`: an API token with the **Edit Cloudflare Workers** template permissions
- `CLOUDFLARE_ACCOUNT_ID`: the account ID from the Cloudflare dashboard

Set the optional repository variable `SITE_URL` (for example `https://freemix.example`) once a custom domain is attached to the Worker, and add the domain under the Worker's **Settings → Domains & Routes** or as a `routes` entry in `wrangler.jsonc`.
