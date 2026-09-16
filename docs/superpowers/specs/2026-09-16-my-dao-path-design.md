# Ikizama — My Dao Path Design

**Date:** 2026-09-16
**Status:** Approved design baseline

## Purpose

Ikizama is both a professional portfolio and a record of an evolving engineering path. The existing home page remains recruiter-facing and concise. A new `/path` experience, **My Dao**, tells how Andy Fiifi Ashong's craft developed through learning projects, experiments, abandoned branches, personal products, trading automation, professional systems, AI systems, software engineering, and developer tooling.

The core principle is:

> The work is evidence.  
> The path is the story.  
> The craft is never finished.

Git records observable history; Ikizama interprets that history into a human-reviewed narrative. Repository creation dates alone never define the story.

## Product Architecture

### `/` — The Work

Preserve the existing professional portfolio structure and visual language. The home page answers: who is Andy, what can he build, what are his strongest systems, and how can someone contact him?

The current long timeline becomes a concise **Path Preview** that surfaces a few turning points and links to `/path`.

### `/path` — My Dao

A separate, more exploratory narrative experience. It answers: how did Andy become capable of building the systems shown on the home page?

The Path is chronological but not a repository dump. It combines narrative chapters, compact repository traces, cultivated disciplines, and expandable engineering evidence.

## Hero

The `/path` hero is deliberately sparse:

- Eyebrow: `THE PATH / 道`
- Primary display: `MY DAO.`
- `DAO` periodically and slowly transitions to `道`, rests, and returns.
- The effect is a restrained crossfade/reconstruction, never a glitch or rapid flicker.
- Philosophy copy uses the three approved lines.
- CTA: `ENTER THE PATH ↓`.

The Japanese/Chinese visual language stops at this conceptual layer. The rest of the page uses normal professional English. Ikizama must not become a martial-arts-themed website.

Reduced-motion users receive a static treatment.

## Before the Record

The Path begins with a short first-person **Before the Record** origin chapter describing Andy's genuine pre-Git interest in computing/software. This copy must be based on Andy's recollection and must never be fabricated.

A visual threshold marks the transition to evidence-backed chronology:

`THE RECORD BEGINS — FIRST GIT EVIDENCE`

After this point, chronological claims must be supported by repository/Git evidence or explicit user-supplied facts.

## Repository Archaeology

A build-time archaeology process gathers evidence from accessible repositories. Useful evidence includes:

- repository metadata;
- repository creation date;
- earliest available commit;
- activity span;
- languages and dependency manifests;
- README/project description;
- releases/tags when useful;
- selected meaningful commits for public/personal repositories;
- source structure when needed to understand the project's purpose.

Raw Git history is evidence, not published narrative. Human review is required before information enters the curated Path dataset.

## Data Layers

Use three conceptual layers.

### 1. Raw archaeology

Machine-derived repository evidence. This data is not rendered directly by the UI.

### 2. Curated Path dataset

Human-reviewed records describing repositories, eras, narrative chapters, disciplines, status, relationships, and disclosure policy. This is the source of truth for the website.

### 3. Presentation

Both `/` and `/path` consume the curated dataset. The browser must never require access to private GitHub repositories or credentials.

## Repository Classification

Each meaningful repository may leave a trace on the Path. Classify entries using an explicit project type and lifecycle status.

Suggested types:

- Professional System
- Personal Product
- Open Source
- Client / Community
- Learning Project
- Experiment
- Trading System

Suggested lifecycle states:

- Active
- Shipped
- Prototype
- Paused
- Abandoned
- Planned Return
- Private / Internal

A repository may have both a lifecycle state and a privacy/disclosure state.

## Narrative Hierarchy

Not every repository becomes a full chapter.

### Major turning points

Use reflective first-person prose. A chapter explains what changed in Andy's thinking or capability, what problem he was trying to solve, and what he carried forward.

### Smaller traces

Use terse archival presentation: period, project, category, status, technologies, and a short factual description. These remain visible as evidence without overwhelming the narrative.

This hybrid voice is intentional.

## Eras

Do not hard-code eras before archaeology. Derive them from evidence and then curate them with Andy.

Possible hypotheses include learning, web/application delivery, algorithmic automation, product building, enterprise automation, AI systems, governed/deterministic systems, broader software engineering, and developer tooling. These are hypotheses only; repository history determines the final chapter boundaries.

Related repositories may be grouped into one progression rather than presented as independent milestones.

## Cultivated Disciplines

Retain and evolve the existing thread concept. The current disciplines — Engineering, AI, Automation, Data, Governance — remain useful high-level threads.

The Path may additionally show when concrete technologies or practices first appear in verified work, for example Python, Java, MQL, JavaScript/TypeScript, React, PostgreSQL, Docker, C#/.NET, Rust, Go, RAG, and LLM tooling.

Technology timelines must be evidence-derived. Do not claim a first-use date solely from memory when Git evidence contradicts it.

The visual metaphor is accumulation: earlier disciplines are not discarded as new ones are learned.

## Branching, Convergence, and Paused Work

The central Path is continuous. Projects can branch from it.

- Small experiments form short branches or markers.
- Related projects may converge into a later capability/system.
- Paused or abandoned work remains visible but becomes visually quieter.
- A paused project's branch may reconnect if development resumes later.
- Abandoned work is not framed as failure; it is evidence of exploration and learning.

The interface must not imply that every repository shipped successfully.

## Engineering Evidence

Public/personal repositories may expose an expandable **Engineering Evidence** layer containing appropriate verified facts such as:

- first commit/date;
- activity span;
- languages;
- public GitHub repository link;
- selected meaningful commits or releases;
- status.

Only useful evidence should be shown. Avoid vanity metrics and raw contribution-chart clutter.

The main Path remains narrative-first; evidence is secondary and expandable.

## Private Professional Repository Policy

Use **Conservative disclosure** for professional/private repositories.

Private history may be inspected internally to understand progression, but public Ikizama output is limited to manually approved information:

- project/system name where disclosure is acceptable;
- broad period;
- sanitized description;
- approved technologies;
- lesson, capability, or turning point.

Never publish private repository URLs, raw commit messages, commit counts, branch names, internal milestone names, sensitive exact dates, credentials, customer information, proprietary code, internal infrastructure details, or employer-sensitive metadata.

The public browser must never query private repositories.

## Known Context for Ambiguous Repositories

User-provided descriptions are authoritative context when repository names are ambiguous. Current examples include:

- Orfevre — jewellery e-commerce website.
- Breadcrumbs — AI-assisted VS Code extension for understanding code snippets.
- Aether-Bridge — automated trading copier that parses connected Telegram signals and executes trades according to configured risk.
- Jumel — logistics company landing page.
- CAYA — Council of African Youth Advocacy landing page.
- ConferoV1 — meeting/update/minutes-taking demo; paused.
- ShopFlow and ShopSense — shop-management applications exploring different architectures; paused/planned return.
- Starkuchen-numero — premium utensils e-commerce web app.
- Pouch — Seamsoft budgeting and automatic SMS-parsing web app; planned return.
- Lunaflow/Lunell — Seamsoft menstrual-cycle tracking web app; planned return.
- ChartG — Seamsoft forex journaling/multipurpose app; planned return.
- AutoResolve — triage project inspired by a HackerRank YouTube competition.
- Retrocade — Seamsoft retro-gaming app; planned return/publication.
- EduHire — job-vacancy landing page.
- Chef-Odin — Seamsoft cooking web app; planned return.
- OEVS — online voting platform; planned return.
- MEDIGH — hospital demo website.
- Dudemy — Udemy-style learning-platform duplicate/experiment.
- Viper-Snake_Pit — snake game.
- Multi-TIMs, Clean-Slate, Digital-Gardener, TSL — short idea-driven experiments.
- NascoTech — early Java experimentation.
- GenXSilver and HandofGod — trading bots/EAs.
- FIMS — Skullfiller web app.
- KWebTelemedicine and Web-Request-Incident-System — university project samples.
- KVconsult, gooken, C3, School-Web, Consultation-Website, PerkinsMedicalWeb, IcgcWebsite, firstperkins, Churchwebsite-Demo, portalOOMH/OnmHPortal, hearthstone-kitchenware — landing-page/web-delivery projects.
- Allaboutlaptop — e-commerce page.
- RiskLens-AI, Trackhound, kpocast — incomplete but demonstrated prototypes.
- mpaboa-wura / Ultimate-mpaboa-wura — shoe e-commerce work.
- xtremeCalculator — calculator application intended for future Play Store publication.
- Ikizama — this portfolio itself.

Descriptions may be normalized editorially, but their meaning must not be changed without review.

## Home Integration

The existing home page keeps its professional hierarchy. Replace or evolve the current Timeline into a compact Path Preview rather than duplicating `/path`.

The preview should contain only a few high-value turning points and end with a strong link such as:

`The work is evidence. The path is the story. → Explore My Dao`

## Navigation

Add `Path` to primary navigation without making the site feel crowded. `/path` must provide a clear route back to Work/Home.

The command palette should gain `Explore My Dao` / `The Path` as an action.

## Ending

The Path never terminates visually at the latest repository or current year. After the most recent evidence, the central line continues into negative space.

End copy:

`THE PATH CONTINUES`

The continuation is part of the design philosophy: the portfolio records current cultivation rather than declaring a finished identity.

## Accessibility and Motion

- Preserve semantic HTML and keyboard navigation.
- Do not make hover the only way to access evidence.
- Evidence drawers must be keyboard operable with correct expanded-state semantics.
- Respect `prefers-reduced-motion` globally.
- DAO/道 transformation becomes static under reduced motion.
- Path branches and status differences cannot rely on color alone.
- Maintain WCAG AA contrast.

## Performance

The Path should remain lightweight. Prefer CSS/SVG/browser-native animation over a large animation or graph dependency. Git archaeology happens at build/development time, not in the visitor's browser. Lazy-load heavy project imagery and evidence previews.

## Data Integrity

- Never fabricate dates, milestones, technologies, project outcomes, or repository relationships.
- Distinguish GitHub repository creation date from earliest Git commit.
- Where evidence is incomplete, mark the value unknown or omit it.
- User-supplied project meaning may supplement Git evidence.
- Narrative interpretation must remain human-reviewed.
- Duplicate/iteration repositories should be grouped when they represent one evolving project.

## Initial Implementation Boundary

The first implementation should establish the foundation rather than attempt the entire historical narrative at once:

1. Define typed archaeology and curated Path schemas.
2. Build repository inventory ingestion for accessible GitHub repositories.
3. Encode disclosure policy and project classification.
4. Seed known user-supplied repository context.
5. Generate/review the first curated Path dataset.
6. Add `/path` routing and the My Dao hero.
7. Implement the core Path renderer with chapter, trace, branch/status, and evidence primitives.
8. Convert the home Timeline into a Path Preview.
9. Add navigation and command-palette integration.
10. Verify responsive behavior, accessibility, reduced motion, and production build.

Further visual sophistication should build on these primitives rather than precede trustworthy historical data.

## Success Criteria

Ikizama succeeds when:

- a recruiter understands Andy's current engineering identity immediately on `/`;
- `/path` tells a coherent development story rather than displaying a chronological repo dump;
- every meaningful repository can leave an appropriately weighted trace;
- major chapters explain changes in craft, not just project launches;
- public repositories can expose useful engineering evidence;
- private professional history informs the story without leaking sensitive metadata;
- paused and abandoned work remains honestly represented;
- cultivated disciplines visibly accumulate over time;
- the experience remains compelling with animation disabled;
- the final visual state communicates that the Path is continuing.