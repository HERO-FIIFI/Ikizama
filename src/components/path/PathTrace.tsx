import type { PathEntry } from '../../data/path/types'
import { EvidenceDisclosure } from './EvidenceDisclosure'
import { DisciplineLabels, EntryStatus } from './PathChapter'
import styles from './PathRecord.module.css'

export function PathTrace({ entry }: { entry: PathEntry }) {
  return (
    <article id={`path-entry-${entry.id}`} className={styles.trace}>
      {entry.period && <p className={styles.period}>{entry.period}</p>}
      <div>
        <h3>{entry.title}</h3>
        <EntryStatus entry={entry} />
        <p className={styles.traceSummary}>{entry.summary}</p>
        <DisciplineLabels entry={entry} />
        <EvidenceDisclosure entry={entry} />
      </div>
    </article>
  )
}
