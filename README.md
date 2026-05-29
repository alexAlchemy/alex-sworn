# Sworn Oracles

Mobile-first Ionic Vue PWA for one-tap oracle rolls across Ironsworn, Starforged, and custom tables.

## Development

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

## Cloudflare Deployment

This app is currently a static Vite build, so Cloudflare Pages is the simplest fit:

- Build command: `npm run build`
- Build output directory: `dist`

The `npm run deploy` script builds locally and deploys `dist` with Wrangler Pages. If a backend arrives later, add Pages Functions or move API routes into a Worker. R2 is a good fit for hosted oracle JSON, exports, or user-uploaded assets; D1 is a better fit for relational campaign data.

## Oracle Data Shape

Oracle tables are exposed to the app as a flat list in `src/data/oracles.ts`. Each table has a `system` property (`ironsworn`, `starforged`, or `custom`) so filters and future sync/storage can stay simple.

The broad Ironsworn, Delve, and Starforged table coverage is imported from the `dataforged` package and normalized at runtime. Delve tables are currently exposed as flat rollable rows under the Ironsworn system; richer Delve workflows such as theme/domain site handling will likely need dedicated UI later.

Ironsworn and Ironsworn: Starforged are by Shawn Tomkin. Dataforged/Datasworn content is used under the licenses noted by that project.
