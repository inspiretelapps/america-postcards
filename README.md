# Where We Wander

Family travel journal — South Africa → America, 2026.

Built with **Astro**. All live content and media live in this project; deploy the build output to Cloudflare Pages.

## Structure

- `src/content/journal/` — journal entries (YAML content collection)
- `src/content/reel/` — reel moments (YAML content collection)
- `src/components/` — photo, video, story, and chrome components
- `public/images/` — photos and videos
- `dist/` — static site after `npm run build` (deploy this)

## Local development

```bash
npm install
npm run dev
```

Open the URL Astro prints (usually `http://localhost:4321`).

## Build & deploy

```bash
npm run build
```

Publish the **`dist/`** folder to Cloudflare Pages:

```bash
npm run build
npx wrangler pages deploy dist --project-name=america-postcards
```

Live: https://america-postcards.pages.dev/
