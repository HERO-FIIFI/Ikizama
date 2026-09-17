import type { PathDataset } from './types.ts'

/** The three approved lines. */
export const pathStatement = ['The work is evidence.', 'The path is the story.', 'The craft is never finished.'] as const

/**
 * The reviewed, disclosure-safe source of browser-visible Path content.
 * Narratives are drafted from the approved project descriptions only —
 * TODO(Andy): rewrite them in your own voice; nothing here claims dates or outcomes.
 */
export const pathDataset: PathDataset = {
  disciplines: ['Engineering', 'AI', 'Automation', 'Data', 'Governance'],
  beforeRecord: {
    title: 'Before the Record',
    paragraphs: [
      'Before I kept a public record, I was fascinated by what made hardware work. I wanted to build something another person could use and be glad they did.',
      'I kept my code on my own machine because it felt safest with me. Open source did not make sense to me yet. Over time, I chose to believe that the Dao is not one person: the world shapes the path, and the path belongs to the world.',
    ],
  },
  eras: [
    {
      id: 'current-systems',
      label: 'Current systems',
      framing:
        'The systems on the home page, in the order they began. Professional systems are described conservatively; personal work exposes its evidence.',
      entries: [
        {
          id: 'aura',
          title: 'AURA',
          kind: 'Professional System',
          lifecycle: 'Private / Internal',
          disclosure: 'conservative',
          disciplines: ['AI', 'Automation', 'Governance'],
          summary: 'AI reasoning and workflow infrastructure for enterprise audit operations.',
          weight: 'chapter',
          period: '2025–26',
          narrative: [
            'AURA was where AI stopped being a demo for me. Audit evidence arrives as documents in every format, and the questions asked of it are precise. I learned to ground every answer in retrieval, to put a reviewer in the loop before anything counted, and to log each step so an AI-assisted conclusion could be traced back to its sources.',
            'That discipline — governed, not just generated — carried into everything after.',
          ],
        },
        {
          id: 'axiom-radar',
          title: 'AXIOM · RADAR',
          kind: 'Professional System',
          lifecycle: 'Private / Internal',
          disclosure: 'conservative',
          disciplines: ['Engineering', 'Automation', 'Data', 'Governance'],
          summary: 'Enterprise audit execution and technical audit automation for deterministic testing and governed analysis.',
          weight: 'chapter',
          period: '2026',
          branch: { kind: 'parallel' },
          narrative: [
            'AXIOM and RADAR taught me to separate what must be deterministic from what benefits from judgment. Control tests, infrastructure checks and evidence collection run as code with predictable outputs; AI analysis only touches what can be checked against them.',
            'Rules expressed as data, role-based access on every mutation, and exception output written for a human reviewer became habits rather than features.',
          ],
        },
        {
          id: 'airsms',
          title: 'AirSms',
          kind: 'Personal Product',
          lifecycle: 'Active',
          disclosure: 'public',
          disciplines: ['Engineering', 'Data'],
          summary: 'Airline operations incident and service-management system.',
          weight: 'chapter',
          period: '2026',
          narrative: [
            'AirSms was a deliberate step outside the audit domain: a production-shaped system built end to end on C# / .NET 8, React and PostgreSQL, with JWT and role-based authorisation, Docker and a CI/CD pipeline from the start.',
            'It exists to prove — to myself first — that the engineering carries across domains.',
          ],
          evidence: { languages: ['C#', 'TypeScript', 'SQL'], state: 'user-supplied' },
        },
        {
          id: 'devbrain-mcp',
          title: 'DevBrain MCP',
          kind: 'Personal Product',
          lifecycle: 'Active',
          disclosure: 'public',
          disciplines: ['Engineering', 'AI'],
          summary: 'Engineering control plane for AI coding agents built around verifiable repository state.',
          weight: 'chapter',
          period: '2026',
          narrative: [
            'DevBrain came from watching AI coding agents guess. Agents reason well over facts and badly over assumptions, so I built a control plane that answers their questions about a repository — structure, dependencies, tests, Git state — with verifiable facts instead of source-code interpretation.',
          ],
          evidence: { languages: ['TypeScript'], state: 'user-supplied' },
        },
        {
          id: 'ikizama',
          title: 'Ikizama',
          kind: 'Personal Product',
          lifecycle: 'Active',
          disclosure: 'public',
          disciplines: ['Engineering'],
          summary: 'This portfolio, and the record you are reading.',
          weight: 'trace',
          period: '2026',
          branch: { kind: 'experiment' },
          evidence: { repositoryUrl: 'https://github.com/HERO-FIIFI/Ikizama', languages: ['TypeScript', 'CSS'], state: 'verified' },
        },
      ],
    },
  ],
}
