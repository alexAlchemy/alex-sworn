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

This app is deployed publicly on Cloudflare Pages:

- Production URL: https://alex-sworn.pages.dev
- Cloudflare Pages project: `alex-sworn`

It is currently a static Vite build, so Cloudflare Pages is the simplest fit:

- Build command: `npm run build`
- Build output directory: `dist`
- Local deploy command: `npm run deploy`

The deploy script builds locally and uploads the generated `dist` folder with Wrangler Pages:

```bash
npm run deploy
```

If the Pages project does not exist yet, create it once:

```bash
npx wrangler pages project create alex-sworn --production-branch main
```

Then deploy:

```bash
npx wrangler pages deploy dist --project-name alex-sworn
```

If a backend arrives later, add Pages Functions or move API routes into a Worker. R2 is a good fit for hosted oracle JSON, exports, or user-uploaded assets; D1 is a better fit for relational campaign data.

## Public Repo Notes

This codebase is safe to keep public in its current form:

- No API keys, secrets, tokens, or backend credentials are committed.
- The app is static client-side code served from Cloudflare Pages.
- There are no Cloudflare bindings, Workers secrets, D1 databases, KV namespaces, or R2 credentials in the repo.
- Wrangler authentication lives outside the project in the local developer environment.

If backend features are added later, keep secrets in Cloudflare dashboard/Wrangler secrets and out of source control.

## Oracle Data Shape

Oracle tables are exposed to the app as a flat list in `src/data/oracles.ts`. Each table has a `system` property (`ironsworn`, `starforged`, or `custom`) so filters and future sync/storage can stay simple.

The broad Ironsworn, Delve, and Starforged table coverage is imported from the `dataforged` package and normalized at runtime. Delve tables are currently exposed as flat rollable rows under the Ironsworn system; richer Delve workflows such as theme/domain site handling will likely need dedicated UI later.

Ironsworn and Ironsworn: Starforged are by Shawn Tomkin. Dataforged/Datasworn content is used under the licenses noted by that project.
