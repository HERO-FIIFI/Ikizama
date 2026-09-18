export const pathDisciplines = ['Engineering', 'AI', 'Automation', 'Data', 'Governance'] as const

export type Discipline = (typeof pathDisciplines)[number]
export type ProjectKind =
  | 'Professional System'
  | 'Personal Product'
  | 'Open Source'
  | 'Client / Community'
  | 'Learning Project'
  | 'Experiment'
  | 'Trading System'
export type LifecycleStatus =
  | 'Active'
  | 'Shipped'
  | 'Prototype'
  | 'Paused'
  | 'Abandoned'
  | 'Planned Return'
  | 'Private / Internal'
  /** Not yet reviewed with Andy — printed as such, never guessed. */
  | 'Undetermined'
export type DisclosurePolicy = 'public' | 'conservative'
export type EntryWeight = 'chapter' | 'trace'
export type EvidenceState = 'verified' | 'user-supplied' | 'unknown'

export interface EngineeringEvidence {
  repositoryUrl?: string
  repositoryCreatedAt?: string
  earliestCommit?: string
  earliestCommitDate?: string
  activitySpan?: string
  languages?: string[]
  releasesOrTags?: string[]
  selectedPublicCommits?: string[]
  branchNames?: string[]
  commitCount?: number
  state?: EvidenceState
}

export interface PathBranch {
  /** Visual relationship only; never a source-control branch name. */
  kind: 'experiment' | 'iteration' | 'parallel'
}

export interface PathEntry {
  id: string
  title: string
  kind: ProjectKind
  lifecycle: LifecycleStatus
  disclosure: DisclosurePolicy
  disciplines: Discipline[]
  summary: string
  weight?: EntryWeight
  period?: string
  /** Who the work is for, when it is not Andy alone (e.g. Seamsoft Labs). */
  organization?: { name: string; url: string }
  /** First-person prose for chapters: what changed, what was carried forward. */
  narrative?: string[]
  evidence?: EngineeringEvidence
  branch?: PathBranch
  reconnectsTo?: string
}

export interface PathEra {
  id: string
  label: string
  framing?: string
  entries: PathEntry[]
}

export interface PathDataset {
  disciplines: Discipline[]
  beforeRecord: {
    title: string
    paragraphs: string[]
  }
  eras: PathEra[]
}
