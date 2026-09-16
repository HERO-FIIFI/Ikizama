/** The five disciplines cultivated along the path. Order = thread position, left → right. */
export const disciplines = ['Engineering', 'AI', 'Automation', 'Data', 'Governance'] as const
export type Discipline = (typeof disciplines)[number]

export interface TimelineEntry {
  /** Monospace label, e.g. "2026", "2025–26", "Present". */
  period: string
  /** Discipline headline for the milestone, e.g. "Dev tools". */
  discipline: string
  title: string
  /** What the milestone contained or taught — kept to one line. */
  detail: string
  /** Which threads intersect at this milestone. */
  threads: Discipline[]
  kind: 'system' | 'career'
  href?: string
}

/** Chronological, oldest first: the threads converge on the present. */
export const timeline: TimelineEntry[] = [
  {
    period: '2025–26',
    discipline: 'AI systems',
    title: 'AURA',
    detail: 'Documents → RAG → agents → governed workflows',
    threads: ['AI', 'Automation', 'Governance'],
    kind: 'system',
    href: '#project-aura',
  },
  {
    period: '2026',
    discipline: 'Automation',
    title: 'AXIOM · RADAR',
    detail: 'Deterministic testing → structured evidence → governed AI analysis',
    threads: ['Automation', 'Data', 'Governance'],
    kind: 'system',
    href: '#project-axiom',
  },
  {
    period: '2026',
    discipline: 'Software engineering',
    title: 'AirSms',
    detail: 'C# / .NET 8 → React → PostgreSQL → Docker · CI/CD',
    threads: ['Engineering', 'Data'],
    kind: 'system',
    href: '#project-airsms',
  },
  {
    period: '2026',
    discipline: 'Dev tools',
    title: 'DevBrain MCP',
    detail: 'AI agents → MCP → verifiable repository state',
    threads: ['Engineering', 'AI'],
    kind: 'system',
    href: '#project-devbrain',
  },
  // TODO: add the start year once confirmed — dates are never guessed.
  {
    period: 'Present',
    discipline: 'Audit × AI',
    title: 'Internal Audit Officer — AI & Automation',
    detail: 'eProcess International Ghana Ltd · Ecobank technology ecosystem · Accra',
    threads: ['Engineering', 'AI', 'Automation', 'Data', 'Governance'],
    kind: 'career',
  },
]

export const pathStatement = ['The work is evidence.', 'The path is the story.', 'The craft is never finished.']
