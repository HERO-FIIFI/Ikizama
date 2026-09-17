# Ikizama — Andy Fiifi Ashong

Two-route portfolio: `/` is the concise recruiter-facing work; `/path` is **My Dao**, the evidence-backed record of how the work came to be. React 19 + TypeScript + Vite, CSS Modules, no other runtime dependencies.

```sh
npm install
npm run dev              # local dev server
npm run build            # type-check + production build → dist/ (+ dist/404.html SPA fallback)
npm run preview          # serve dist/ locally
npm test                 # node --test: palette, routes, metadata, path validator, archaeology
npm run path:archaeology # fetch public GitHub inventory → data/path/raw/github-public.json (gitignored)
npm run og               # regenerate public/og.png (needs Chrome)
```

## Editing content

| File | What it drives |
|---|---|
| `src/data/projects.ts` | Selected systems (rows + preview panel) and the Labs list |
| `src/data/path/path.ts` | **The curated Path**: Before-the-Record copy, eras, chapters/traces, evidence — the only source for `/path` and the home Path Preview |
| `src/data/path/knownRepositories.ts` | Andy's repository meanings + Seamsoft Labs attribution, used to match archaeology output; never rendered as chronology |
| `src/data/skills.ts` | Engineering profile groups |
| `src/data/socials.ts` | Email, GitHub, LinkedIn, CV path, location, availability, current position |

`validatePathDataset` (run by `npm test`) refuses repository URLs, raw commits, branch names, commit counts and exact dates on any `disclosure: 'conservative'` entry — professional systems can only ever leak what is deliberately written.

### Growing the Path

1. `npm run path:archaeology` (needs network access to api.github.com; optional `GITHUB_TOKEN` raises rate limits). Raw JSON is review input only.
2. Review the inventory against `knownRepositories.ts`, then add reviewed entries to `path.ts`: pick an era, `weight: 'chapter'` for turning points (first-person `narrative`), `'trace'` for the rest; `branch`, `lifecycle`, `reconnectsTo` drive the rail geometry; only `disclosure: 'public'` entries render an Engineering Evidence drawer.
3. Never invent dates: `repositoryCreatedAt` ≠ first commit; omit what the evidence does not show.

## Before deploying

- Drop your CV at `public/cv.pdf`.
- Confirm the start year of the current role in `socials.ts` (`Present` only until then).
- `/path` needs the SPA fallback: `dist/404.html` covers GitHub Pages; Netlify/Vercel need a rewrite of `/*` → `/index.html` (or `cleanUrls`). Canonical URLs are computed from the deployed origin at runtime.
- GitHub Pages project site? Set `base: '/<repo>/'` in `vite.config.ts`.

## Design notes

- Dark graphite canvas, one accent (signal amber) reserved for state: active row, thread nodes, pulses, the period in the name, 道.
- Type: Archivo (variable width/weight, display + body) and Fragment Mono (metadata), self-hosted latin subsets in `public/fonts/`. `node scripts/fonts.mjs <url> <selector>` reports which platform font actually renders a node.
- Motion is CSS-only and fully static under `prefers-reduced-motion` (including DAO ↔ 道).
- The hero visual and project previews share one isometric projection (`src/lib/iso.ts`); the Path Preview and `/path` share the discipline threads / rail language.
- `scripts/shot.mjs` drives headless Chrome over CDP for device-emulated screenshots (`QA_REDUCED_MOTION=1` emulates reduced motion).
