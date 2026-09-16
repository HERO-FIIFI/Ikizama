# My Dao Path Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a production-ready `/path` experience that turns the existing homepage timeline into a concise Path Preview and presents Andy's evidence-backed engineering journey as My Dao.

**Architecture:** Keep the React/Vite application dependency-light. A small pathname router selects `HomePage` or `PathPage`; both consume a typed, human-reviewed Path dataset, while an opt-in Node archaeology script writes raw public GitHub evidence that is never imported by the browser. The full Path uses focused components for hero, origin, chapters, traces, disclosure-safe evidence, branch state, and the open-ended continuation.

**Tech Stack:** React 19, TypeScript 5.8, Vite 6, CSS Modules, Node's built-in test runner, GitHub REST API at development time only, browser-native `<details>`, CSS/SVG motion.

**Spec:** `docs/superpowers/specs/2026-09-16-my-dao-path-design.md`

## Global Constraints

- Preserve `/` as the concise recruiter-facing portfolio; `/path` is the deeper My Dao narrative.
- Do not add React Router or a graph/animation dependency for two static routes.
- The browser must never receive GitHub credentials or query private repositories.
- Dates, technology first-use claims, outcomes, and repository relationships must be evidence-backed or omitted.
- Private professional systems use Conservative disclosure only; never render repository URLs or raw Git metadata for them.
- Paused and abandoned work remains visible, quieter, and explicitly labeled in text rather than color alone.
- Reduced-motion users receive a static `DAO / 道` treatment and no path-drawing animation.
- Evidence controls must be keyboard operable and expose correct expanded-state semantics.
- Maintain WCAG AA contrast and meaningful reading order at desktop and mobile sizes.
- Preserve all pre-existing uncommitted workspace changes; never reset, checkout, or overwrite them.

---

### Task 1: Pathname Routing and Page Boundaries

**Files:**
- Create: `src/lib/routes.ts`
- Create: `src/lib/routes.test.ts`
- Create: `src/pages/HomePage.tsx`
- Create: `src/pages/PathPage.tsx`
- Modify: `src/main.tsx`
- Modify: `vite.config.ts`

**Interfaces:**
- Produces: `type Route = 'home' | 'path'` and `resolveRoute(pathname: string): Route`.
- Produces: `HomePage` containing the current app composition and `PathPage` as the new route boundary.
- Consumes: existing homepage components without changing their behavior in this task.

- [ ] **Step 1: Write the failing route tests**

```ts
import test from 'node:test'
import assert from 'node:assert/strict'
import { resolveRoute } from './routes.ts'

test('resolves the portfolio root to home', () => {
  assert.equal(resolveRoute('/'), 'home')
})

test('resolves the canonical path route with or without a trailing slash', () => {
  assert.equal(resolveRoute('/path'), 'path')
  assert.equal(resolveRoute('/path/'), 'path')
})

test('falls back to home for unknown paths', () => {
  assert.equal(resolveRoute('/unknown'), 'home')
})
```

- [ ] **Step 2: Run the route tests and verify RED**

Run: `node --test src/lib/routes.test.ts`

Expected: FAIL because `src/lib/routes.ts` does not exist.

- [ ] **Step 3: Implement the minimal router and page split**

```ts
export type Route = 'home' | 'path'

export function resolveRoute(pathname: string): Route {
  const normalized = pathname.replace(/\/+$/, '') || '/'
  return normalized === '/path' ? 'path' : 'home'
}
```

Move the current `App` composition into `HomePage`. Render `<PathPage />` only when `resolveRoute(window.location.pathname) === 'path'`. Keep Vite's SPA fallback and set `appType: 'spa'` explicitly.

- [ ] **Step 4: Run route tests and the existing test suite**

Run: `npm test`

Expected: all route and palette tests PASS.

- [ ] **Step 5: Commit the route boundary**

```bash
git add src/lib/routes.ts src/lib/routes.test.ts src/pages/HomePage.tsx src/pages/PathPage.tsx src/main.tsx vite.config.ts
git commit -m "feat: add home and path route boundaries"
```

### Task 2: Typed Path and Disclosure Model

**Files:**
- Create: `src/data/path/types.ts`
- Create: `src/data/path/validate.ts`
- Create: `src/data/path/validate.test.ts`
- Create: `src/data/path/knownRepositories.ts`
- Create: `src/data/path/path.ts`

**Interfaces:**
- Produces: `PathDataset`, `PathEra`, `PathEntry`, `EngineeringEvidence`, `LifecycleStatus`, `DisclosurePolicy`, and `validatePathDataset(dataset): string[]`.
- Produces: `pathDataset`, the only browser-facing source of truth for `/path` and the homepage preview.
- Consumes: the five existing discipline names: Engineering, AI, Automation, Data, Governance.

- [ ] **Step 1: Write failing disclosure and integrity tests**

```ts
import test from 'node:test'
import assert from 'node:assert/strict'
import { validatePathDataset } from './validate.ts'
import type { PathDataset } from './types.ts'

const valid: PathDataset = {
  disciplines: ['Engineering', 'AI', 'Automation', 'Data', 'Governance'],
  beforeRecord: {
    title: 'Before the Record',
    paragraphs: ['I was fascinated by what made hardware work.'],
  },
  eras: [],
}

test('rejects public repository evidence on conservative entries', () => {
  const dataset: PathDataset = {
    ...valid,
    eras: [{
      id: 'work',
      label: 'Professional systems',
      entries: [{
        id: 'private-system',
        title: 'Private System',
        kind: 'Professional System',
        lifecycle: 'Private / Internal',
        disclosure: 'conservative',
        disciplines: ['Engineering'],
        summary: 'Sanitized description.',
        evidence: { repositoryUrl: 'https://github.com/example/private' },
      }],
    }],
  }
  assert.deepEqual(validatePathDataset(dataset), [
    'private-system: conservative entries cannot expose repository URLs',
  ])
})

test('accepts an evidence-safe empty chronology', () => {
  assert.deepEqual(validatePathDataset(valid), [])
})
```

- [ ] **Step 2: Run the model tests and verify RED**

Run: `node --test src/data/path/validate.test.ts`

Expected: FAIL because the model and validator do not exist.

- [ ] **Step 3: Define the schemas and validator**

Use literal unions for project kind, lifecycle, disclosure, entry weight (`chapter | trace`), and evidence state (`verified | user-supplied | unknown`). `EngineeringEvidence` permits repository URL, earliest commit, activity span, languages, releases, and selected public commits. The validator must reject repository URLs, raw commits, and exact private dates when `disclosure === 'conservative'`.

- [ ] **Step 4: Seed known repository meanings and the curated dataset**

Encode the repository descriptions listed in the approved spec without inventing dates. Seed the first visible eras only from verified current portfolio facts: AURA, AXIOM/RADAR, AirSms, DevBrain, and Ikizama. Keep unverified repositories in `knownRepositories.ts` for archaeology matching rather than forcing them into chronology.

Use this approved origin copy:

```ts
paragraphs: [
  'Before I kept a public record, I was fascinated by what made hardware work. I wanted to build something another person could use and be glad they did.',
  'I kept my code on my own machine because it felt safest with me. Open source did not make sense to me yet. Over time, I chose to believe that the Dao is not one person: the world shapes the path, and the path belongs to the world.',
]
```

- [ ] **Step 5: Run validator tests and add a dataset integrity assertion**

Run: `node --test src/data/path/validate.test.ts`

Expected: PASS, including `assert.deepEqual(validatePathDataset(pathDataset), [])`.

- [ ] **Step 6: Commit the data foundation**

```bash
git add src/data/path
git commit -m "feat: define curated path data model"
```

### Task 3: Build-Time Public Repository Archaeology

**Files:**
- Create: `scripts/path-archaeology.mjs`
- Create: `scripts/path-archaeology.test.mjs`
- Create: `data/path/raw/.gitkeep`
- Modify: `.gitignore`
- Modify: `package.json`

**Interfaces:**
- Produces: `fetchRepositoryInventory({ owner, token, request }): Promise<RawRepository[]>`.
- Produces: `data/path/raw/github-public.json` locally; generated raw evidence is ignored by Git.
- Consumes: public GitHub REST endpoints and optional `GITHUB_TOKEN` only in Node.

- [ ] **Step 1: Write failing ingestion tests with an injected request function**

```js
import test from 'node:test'
import assert from 'node:assert/strict'
import { fetchRepositoryInventory } from './path-archaeology.mjs'

test('normalizes public repository metadata without credentials in output', async () => {
  const request = async () => ({
    ok: true,
    headers: new Headers(),
    json: async () => [{
      name: 'Ikizama',
      html_url: 'https://github.com/HERO-FIIFI/Ikizama',
      private: false,
      created_at: '2026-09-16T00:00:00Z',
      updated_at: '2026-09-16T01:00:00Z',
      language: 'TypeScript',
      description: 'Portfolio',
      fork: false,
      archived: false,
      topics: ['portfolio'],
    }],
  })
  const result = await fetchRepositoryInventory({ owner: 'HERO-FIIFI', token: 'secret', request })
  assert.equal(result[0].name, 'Ikizama')
  assert.equal(JSON.stringify(result).includes('secret'), false)
})
```

- [ ] **Step 2: Run the archaeology test and verify RED**

Run: `node --test scripts/path-archaeology.test.mjs`

Expected: FAIL because the archaeology module does not exist.

- [ ] **Step 3: Implement paginated public inventory ingestion**

Request `https://api.github.com/users/HERO-FIIFI/repos?per_page=100&page=N&sort=created&direction=asc`, follow pages until fewer than 100 repositories return, retain only public repositories, normalize fields, and write formatted JSON. Never log or serialize the token.

- [ ] **Step 4: Add scripts and ignore generated evidence**

```json
"path:archaeology": "node scripts/path-archaeology.mjs HERO-FIIFI",
"test": "node --test src/**/*.test.ts scripts/*.test.mjs"
```

Add `data/path/raw/*.json` to `.gitignore` while keeping `.gitkeep` tracked.

- [ ] **Step 5: Run tests, then perform one public inventory collection**

Run: `npm test`

Expected: PASS.

Run: `npm run path:archaeology`

Expected: writes `data/path/raw/github-public.json` and reports only the repository count and output path.

- [ ] **Step 6: Commit the archaeology tool, not generated evidence**

```bash
git add .gitignore package.json scripts/path-archaeology.mjs scripts/path-archaeology.test.mjs data/path/raw/.gitkeep
git commit -m "feat: add public repository archaeology"
```

### Task 4: Homepage Path Preview and Japanese Handoff

**Files:**
- Create: `src/components/PathPreview.tsx`
- Create: `src/components/PathPreview.module.css`
- Modify: `src/pages/HomePage.tsx`
- Modify: `src/components/Navigation.tsx`
- Modify: `src/components/CommandPalette.tsx`
- Modify: `src/lib/palette.test.ts`
- Retire from homepage only: `src/components/Timeline.tsx`

**Interfaces:**
- Produces: `PathPreview`, a compact selection of high-value entries from `pathDataset`.
- Consumes: `pathDataset` and links to `/path`.
- Visible CTA: `もっと見る`; accessible name: `Explore the full Path`.

- [ ] **Step 1: Write a failing palette test for the Path action**

Refactor command construction into an exported `createCommands()` and assert that the Path command has `href: '/path'` rather than a homepage hash.

```ts
test('the Path command navigates to the full path route', () => {
  const command = createCommands().find((item) => item.id === 'path')
  assert.equal(command?.href, '/path')
})
```

- [ ] **Step 2: Run the palette test and verify RED**

Run: `node --test src/lib/palette.test.ts`

Expected: FAIL because commands do not expose route destinations yet.

- [ ] **Step 3: Build the compact Path Preview**

Render three to five curated turning points, the existing discipline-thread idea in simplified form, and the line `The work is evidence. The path is the story.` End with an anchor whose visible label is `もっと見る` and whose `aria-label` is `Explore the full Path`.

- [ ] **Step 4: Update navigation and command behavior**

On `/`, `Path` points to `/path`; on `/path`, the brand and `Work` point to `/`. Use same-origin navigation (`window.location.assign`) rather than `window.open`. Keep external profiles opening in a new tab.

- [ ] **Step 5: Run tests and build**

Run: `npm test && npm run build`

Expected: PASS, with both routes included in the client bundle.

- [ ] **Step 6: Commit homepage integration**

```bash
git add src/components/PathPreview.tsx src/components/PathPreview.module.css src/pages/HomePage.tsx src/components/Navigation.tsx src/components/CommandPalette.tsx src/lib/palette.test.ts
git commit -m "feat: link the portfolio to My Dao"
```

### Task 5: My Dao Hero and Before the Record

**Files:**
- Create: `src/components/path/PathNavigation.tsx`
- Create: `src/components/path/PathNavigation.module.css`
- Create: `src/components/path/PathHero.tsx`
- Create: `src/components/path/PathHero.module.css`
- Create: `src/components/path/BeforeRecord.tsx`
- Create: `src/components/path/BeforeRecord.module.css`
- Modify: `src/pages/PathPage.tsx`
- Modify: `src/styles/global.css`

**Interfaces:**
- Produces: the `/path` header, `THE PATH / 道` hero, `MY DAO.` display, origin chapter, and record threshold.
- Consumes: `pathDataset.beforeRecord`.

- [ ] **Step 1: Add static semantic structure**

Use one `<h1>`, a labeled route back to Work, a skip link to `#path-record`, and a CTA `ENTER THE PATH ↓`. The origin chapter ends at `THE RECORD BEGINS — FIRST GIT EVIDENCE`.

- [ ] **Step 2: Add restrained DAO/道 motion**

Layer `DAO` and `道` in the same display slot. Use a slow CSS keyframe with long resting phases and opacity/clip reconstruction; never use a glitch. Under `prefers-reduced-motion: reduce`, show the static `DAO / 道` pairing.

- [ ] **Step 3: Verify typography at 390px and 1440px widths**

Run the existing screenshot helper against `/path` at both viewport sizes. Expected: no clipping, no horizontal overflow, and the origin text remains readable.

- [ ] **Step 4: Commit the Path opening**

```bash
git add src/components/path/PathNavigation.tsx src/components/path/PathNavigation.module.css src/components/path/PathHero.tsx src/components/path/PathHero.module.css src/components/path/BeforeRecord.tsx src/components/path/BeforeRecord.module.css src/pages/PathPage.tsx src/styles/global.css
git commit -m "feat: create the My Dao opening sequence"
```

### Task 6: Narrative Chapters, Traces, and Engineering Evidence

**Files:**
- Create: `src/components/path/PathRecord.tsx`
- Create: `src/components/path/PathRecord.module.css`
- Create: `src/components/path/PathChapter.tsx`
- Create: `src/components/path/PathTrace.tsx`
- Create: `src/components/path/EvidenceDisclosure.tsx`
- Create: `src/components/path/EvidenceDisclosure.module.css`
- Modify: `src/pages/PathPage.tsx`

**Interfaces:**
- Produces: `PathRecord({ eras }: { eras: PathEra[] })`, chapter and trace renderers, and disclosure-safe evidence drawers.
- Consumes: validated `pathDataset.eras`.

- [ ] **Step 1: Implement semantic era and entry rendering**

Each era is a section with heading and optional framing copy. Chapter entries use first-person narrative; traces remain terse and archival. Every entry prints lifecycle status as text.

- [ ] **Step 2: Implement evidence drawers with native semantics**

Use `<details>` and `<summary>Engineering Evidence</summary>`. Render only fields present in curated data. Repository links require `target="_blank" rel="noopener noreferrer"`. Conservative entries never receive the disclosure component because validation already forbids public evidence.

- [ ] **Step 3: Add discipline accumulation**

Show each entry's discipline labels and maintain a running visual ledger at era boundaries. Do not claim first-use dates unless the evidence object marks them verified.

- [ ] **Step 4: Verify keyboard and no-JavaScript disclosure behavior**

Tab to every `<summary>`, toggle with Enter/Space, and confirm content remains in document order. Confirm no hover-only information.

- [ ] **Step 5: Commit the narrative renderer**

```bash
git add src/components/path/PathRecord.tsx src/components/path/PathRecord.module.css src/components/path/PathChapter.tsx src/components/path/PathTrace.tsx src/components/path/EvidenceDisclosure.tsx src/components/path/EvidenceDisclosure.module.css src/pages/PathPage.tsx
git commit -m "feat: render path chapters and evidence"
```

### Task 7: Branching, Lifecycle States, and Open Ending

**Files:**
- Create: `src/components/path/PathBranch.tsx`
- Create: `src/components/path/PathBranch.module.css`
- Create: `src/components/path/PathContinuation.tsx`
- Create: `src/components/path/PathContinuation.module.css`
- Modify: `src/components/path/PathRecord.tsx`

**Interfaces:**
- Produces: branch geometry from curated relationship metadata and the non-terminating final state.
- Consumes: entry `lifecycle`, `branch`, and optional `reconnectsTo` fields.

- [ ] **Step 1: Render branches with CSS/SVG primitives**

Use an SVG connector only for geometry; keep all content in semantic HTML. Short experiments branch briefly, grouped iterations converge, paused work uses a dashed line plus `Paused`, abandoned work uses reduced contrast plus `Abandoned`, and planned return prints `Planned return`.

- [ ] **Step 2: Render explicit reconnection without rewriting history**

When `reconnectsTo` is present, draw a connector toward the referenced later entry and label it `Resumed`. The original paused state remains visible.

- [ ] **Step 3: Add the open continuation**

After the latest entry, continue the central line into at least one viewport-relative block of negative space and render `THE PATH CONTINUES`. Do not cap the line with a terminal node.

- [ ] **Step 4: Verify reduced motion and non-color status communication**

Emulate reduced motion and confirm connectors are static. Inspect in grayscale or disable color and confirm status text/dashes still communicate lifecycle.

- [ ] **Step 5: Commit the path-state visualization**

```bash
git add src/components/path/PathBranch.tsx src/components/path/PathBranch.module.css src/components/path/PathContinuation.tsx src/components/path/PathContinuation.module.css src/components/path/PathRecord.tsx
git commit -m "feat: visualize evolving path branches"
```

### Task 8: Metadata, Responsive QA, and Production Verification

**Files:**
- Create: `src/lib/metadata.ts`
- Create: `src/lib/metadata.test.ts`
- Modify: `src/pages/HomePage.tsx`
- Modify: `src/pages/PathPage.tsx`
- Modify: `index.html`
- Modify: `scripts/shot.mjs`

**Interfaces:**
- Produces: `applyMetadata(route: Route): void` with distinct home and Path titles/descriptions/canonical paths.
- Consumes: both routes and the existing screenshot helper.

- [ ] **Step 1: Write failing metadata tests**

```ts
test('defines distinct metadata for the Path route', () => {
  assert.deepEqual(metadataFor('path'), {
    title: 'My Dao — Andy Fiifi Ashong',
    description: 'An evidence-backed record of the projects, disciplines and turning points shaping Andy Fiifi Ashong\'s engineering path.',
    path: '/path',
  })
})
```

- [ ] **Step 2: Run metadata tests and verify RED**

Run: `node --test src/lib/metadata.test.ts`

Expected: FAIL because `metadata.ts` does not exist.

- [ ] **Step 3: Implement per-route metadata**

Update document title, description, Open Graph title/description, and canonical URL on initial render. Keep the existing home metadata unchanged.

- [ ] **Step 4: Run full automated verification**

Run: `npm test`

Expected: all tests PASS.

Run: `npm run build`

Expected: TypeScript and Vite build PASS with no unresolved imports.

- [ ] **Step 5: Run bounded visual verification**

Capture `/` and `/path` at 1440×900 and 390×844 in one pass. Verify: route navigation, `もっと見る`, hero motion/static reduced-motion state, origin chapter, chapter/trace hierarchy, evidence toggles, paused/abandoned labels, open ending, no overflow, and no browser error overlay.

- [ ] **Step 6: Run the Impeccable detector once across changed markup**

Run: `node C:/Users/Administrator/.agents/skills/impeccable/scripts/detect.mjs --json src`

Expected: address actionable findings; document justified false positives.

- [ ] **Step 7: Commit final integration**

```bash
git add src/lib/metadata.ts src/lib/metadata.test.ts src/pages/HomePage.tsx src/pages/PathPage.tsx index.html scripts/shot.mjs
git commit -m "feat: complete the My Dao path experience"
```

## Final Acceptance Checklist

- [ ] `/` remains immediately legible as a professional engineering portfolio.
- [ ] Homepage Path Preview ends with `もっと見る` and reaches `/path`.
- [ ] `/path` renders directly and survives browser refresh through Vite SPA fallback.
- [ ] The origin chapter uses Andy's supplied recollection and no fabricated claim.
- [ ] The record boundary clearly separates recollection from Git-backed chronology.
- [ ] Public evidence is expandable; conservative professional entries expose no repository metadata.
- [ ] Active, shipped, prototype, paused, abandoned, planned-return, and private/internal states are distinguishable in text.
- [ ] Disciplines visibly accumulate without unsupported first-use claims.
- [ ] The final Path line remains open beneath `THE PATH CONTINUES`.
- [ ] Keyboard, reduced-motion, mobile, desktop, tests, production build, and detector checks pass.
