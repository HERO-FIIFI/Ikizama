export type ProjectKind = 'professional' | 'personal'

export interface Project {
  id: string
  name: string
  /** One sentence. */
  summary: string
  category: string[]
  stack: string[]
  year: string
  status: string
  kind: ProjectKind
  /** Architecture layers, top → bottom, drawn by ProjectPreview. */
  layers: string[]
  /** Engineering focus shown in the preview panel — never confidential detail. */
  focus: string[]
  /** Only set when a public link exists. Never invent links. */
  link?: string
}

export const projects: Project[] = [
  {
    id: 'aura',
    name: 'AURA',
    summary: 'AI reasoning and workflow infrastructure for enterprise audit operations.',
    category: ['AI Systems', 'RAG', 'Workflows'],
    stack: ['Python', 'LLM Pipelines', 'RAG', 'PostgreSQL', 'Workflow Engine'],
    year: '2025–26',
    status: 'In production use',
    kind: 'professional',
    layers: ['Documents', 'Retrieval', 'Reasoning', 'Validation', 'Governed Workflow'],
    focus: [
      'Document intelligence over large, mixed-format evidence sets',
      'Retrieval grounded outputs with human-in-the-loop checkpoints',
      'Every AI-assisted step logged, attributable and reviewable',
    ],
  },
  {
    id: 'axiom',
    name: 'AXIOM',
    summary:
      'Enterprise audit execution platform combining deterministic automation, structured control testing and governed AI-assisted analysis.',
    category: ['Enterprise Platform', 'Automation', 'Governed AI'],
    stack: ['Python', 'TypeScript', 'React', 'PostgreSQL', 'RBAC', 'Background Jobs'],
    year: '2026',
    status: 'Active development',
    kind: 'professional',
    layers: ['Control Library', 'Test Engine', 'Evidence Store', 'AI Analysis', 'Reporting'],
    focus: [
      'Deterministic test execution first; AI analysis only where it can be checked',
      'Role-based access and full audit trail across every mutation',
      'Structured outputs that feed reporting without manual re-keying',
    ],
  },
  {
    id: 'radar',
    name: 'RADAR',
    summary:
      'Technical audit automation for deterministic infrastructure and compliance testing across databases, networks, operating systems and applications.',
    category: ['Technical Audit', 'Infrastructure', 'Compliance'],
    stack: ['Python', 'Linux', 'PostgreSQL', 'Network Protocols', 'CI/CD'],
    year: '2026',
    status: 'Active development',
    kind: 'professional',
    layers: ['Target Inventory', 'Collectors', 'Rule Engine', 'Exceptions', 'Evidence Pack'],
    focus: [
      'Read-only collectors with explicit scope and auditable execution',
      'Rules expressed as data so controls change without redeploys',
      'Exception output designed for the reviewer, not the machine',
    ],
  },
  {
    id: 'airsms',
    name: 'AirSms',
    summary:
      'Airline operations incident and service-management system, built as a production-oriented software engineering project.',
    category: ['Software Engineering', 'Operations', 'Full Stack'],
    stack: ['C# / .NET 8', 'React', 'PostgreSQL', 'JWT / RBAC', 'Docker', 'CI/CD'],
    year: '2026',
    status: 'Personal project',
    kind: 'personal',
    layers: ['React Client', 'REST API', 'Domain Services', 'PostgreSQL', 'CI/CD · Docker'],
    focus: [
      'Incident lifecycle with SLA states and escalation paths',
      'JWT authentication with role-based authorisation per endpoint',
      'Containerised build and deploy pipeline from day one',
    ],
  },
  {
    id: 'devbrain',
    name: 'DevBrain MCP',
    summary:
      'An engineering control plane for AI coding agents — exposing verifiable repository state instead of relying on source-code interpretation.',
    category: ['Developer Tooling', 'AI Agents', 'MCP'],
    stack: ['TypeScript', 'MCP', 'Tool Calling', 'Git', 'Static Analysis'],
    year: '2026',
    status: 'Personal project',
    kind: 'personal',
    layers: ['Coding Agent', 'MCP Server', 'Repository Facts', 'Verification', 'Git State'],
    focus: [
      'Agents ask for facts (tests, deps, structure) rather than guessing from code',
      'Every tool response is verifiable against the real repository',
      'Designed to reduce hallucinated edits in agentic workflows',
    ],
  },
]

export interface Lab {
  name: string
  category: string
  year: string
  summary: string
  link?: string
}

export const labs: Lab[] = [
  { name: 'Parity', category: 'Reconciliation', year: '2026', summary: 'Device reconciliation and onboarding automation.' },
  { name: 'Recon', category: 'Data Matching', year: '2026', summary: 'Deterministic reconciliation engine for mismatched operational datasets.' },
  { name: 'IC-41', category: 'Audit Automation', year: '2026', summary: 'Evidence and exception completeness automation for audit testing.' },
]
