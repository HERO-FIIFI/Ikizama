import type { EngineeringEvidence, PathEntry } from '../../data/path/types'
import styles from './EvidenceDisclosure.module.css'

export function EvidenceDisclosure({ entry }: { entry: PathEntry }) {
  // Keep this guard here as well as in data validation: private work stays private.
  if (entry.disclosure === 'conservative' || !hasEvidence(entry.evidence)) return null

  const evidence = entry.evidence

  // Nothing but a state means nothing verifiable yet — say so inline instead of an empty drawer.
  if (Object.keys(evidence).every((key) => key === 'state')) {
    return (
      <p className={styles.note}>
        {evidence.state === 'user-supplied' ? 'Described by Andy · no public Git evidence yet' : 'Evidence unknown'}
      </p>
    )
  }

  return (
    <details className={styles.details}>
      <summary>Engineering Evidence</summary>
      <dl className={styles.list}>
        {evidence.repositoryUrl && <Evidence label="Repository"><a href={evidence.repositoryUrl} target="_blank" rel="noopener noreferrer">Open repository</a></Evidence>}
        {evidence.repositoryCreatedAt && <Evidence label="Repository created">{evidence.repositoryCreatedAt}</Evidence>}
        {evidence.earliestCommit && <Evidence label="Earliest commit">{evidence.earliestCommit}</Evidence>}
        {evidence.earliestCommitDate && <Evidence label="Earliest commit date">{evidence.earliestCommitDate}</Evidence>}
        {evidence.activitySpan && <Evidence label="Activity span">{evidence.activitySpan}</Evidence>}
        {evidence.languages?.length && <Evidence label="Languages">{evidence.languages.join(', ')}</Evidence>}
        {evidence.releasesOrTags?.length && <Evidence label="Releases or tags">{evidence.releasesOrTags.join(', ')}</Evidence>}
        {evidence.selectedPublicCommits?.length && <Evidence label="Selected public commits">{evidence.selectedPublicCommits.join(', ')}</Evidence>}
        {evidence.branchNames?.length && <Evidence label="Branch names">{evidence.branchNames.join(', ')}</Evidence>}
        {evidence.commitCount !== undefined && <Evidence label="Commit count">{evidence.commitCount}</Evidence>}
        {evidence.state && <Evidence label="Evidence state">{evidence.state}</Evidence>}
      </dl>
    </details>
  )
}

function hasEvidence(evidence: EngineeringEvidence | undefined): evidence is EngineeringEvidence {
  return Boolean(evidence && Object.values(evidence).some((value) => value !== undefined && (!Array.isArray(value) || value.length > 0)))
}

function Evidence({ label, children }: { label: string; children: React.ReactNode }) {
  return <div><dt>{label}</dt><dd>{children}</dd></div>
}
