# Andy Fiifi Ashong — Portfolio

Single-page portfolio. React 19 + TypeScript + Vite, CSS Modules, no other runtime dependencies.

```sh
npm install
npm run dev       # local dev server
npm run build     # type-check + production build → dist/
npm run preview   # serve dist/ locally
npm test          # node --test on the command-palette logic
npm run og        # regenerate public/og.png (needs Chrome)
```

## Editing content

All copy that changes over time lives in `src/data/` — components only render it.

| File | What it drives |
|---|---|
| `projects.ts` | Selected systems (rows + preview panel) and the Labs list |
| `timeline.ts` | The Path: milestones, discipline threads, the closing statement |
| `skills.ts` | Engineering profile groups |
| `socials.ts` | Email, GitHub, LinkedIn, CV path, location, availability |

Add a project by appending to `projects` (set `link` only when a public repo exists). Add a milestone by appending to `timeline`; `threads` picks which of the five disciplines intersect at that row.

## Before deploying

- Drop your CV at `public/cv.pdf` (linked from Contact and the command palette).
- Set the canonical URL in `index.html` (commented `<link rel="canonical">`), and make `og:image` absolute for crawlers that need it.
- Confirm the start year of the current role in `timeline.ts` (currently `Present` only — dates are never guessed).
- GitHub Pages project site? Set `base: '/<repo>/'` in `vite.config.ts`.

## Design notes

- Dark graphite canvas, one accent (signal amber) reserved for state: active row, thread nodes, pulses, the period in the name.
- Type: Archivo (variable width/weight, display + body) and Fragment Mono (metadata). Latin subsets are self-hosted in `public/fonts/`.
- Motion is CSS-only and fully disabled under `prefers-reduced-motion`.
- The hero visual and project previews share one isometric projection (`src/lib/iso.ts`).
- `scripts/shot.mjs` drives headless Chrome over CDP for device-emulated screenshots during QA.
