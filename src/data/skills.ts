export interface SkillGroup {
  label: string
  items: string[]
}

export const skills: SkillGroup[] = [
  { label: 'Engineering', items: ['C# / .NET', 'Python', 'TypeScript', 'React', 'Rust', 'Go'] },
  { label: 'AI Systems', items: ['RAG', 'LLM Pipelines', 'Agents', 'Tool Calling', 'Local Models', 'Human-in-the-loop Systems'] },
  { label: 'Platform', items: ['PostgreSQL', 'Docker', 'REST APIs', 'CI/CD', 'Linux', 'Background Processing'] },
  { label: 'System Design', items: ['RBAC', 'Auditability', 'Workflow Engines', 'Deterministic Automation', 'Data Reconciliation', 'Governance'] },
  { label: 'Domains', items: ['FinTech', 'Enterprise Automation', 'Internal Audit', 'Compliance', 'Technical Risk'] },
]
