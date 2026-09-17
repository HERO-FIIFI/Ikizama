import type { PathEntry } from '../../data/path/types'
import { EvidenceDisclosure } from './EvidenceDisclosure'
import styles from './PathRecord.module.css'

export function PathChapter({ entry }: { entry: PathEntry }) {
  return (
    <article id={`path-entry-${entry.id}`} className={styles.chapter}>
      <header>
        {entry.period && <p className={styles.period}>{entry.period}</p>}
        <h3>{entry.title}</h3>
        <EntryStatus entry={entry} />
        <DisciplineLabels entry={entry} />
      </header>
      <div className={styles.chapterCopy}>
        <p className={styles.summary}>{entry.summary}</p>
        {entry.narrative?.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
        <EvidenceDisclosure entry={entry} />
      </div>
    </article>
  )
}

/** Kind and lifecycle, always as text — status is never colour-only. */
export function EntryStatus({ entry }: { entry: PathEntry }) {
  return (
    <p className={styles.metadata}>
      <span>{entry.kind}</span>
      <span aria-hidden="true"> · </span>
      <span>
        <span className="sr-only">Lifecycle: </span>
        {entry.lifecycle}
      </span>
    </p>
  )
}

export function DisciplineLabels({ entry }: { entry: PathEntry }) {
  return (
    <ul className={styles.disciplines} aria-label={`${entry.title} disciplines`}>
      {entry.disciplines.map((discipline) => (
        <li key={discipline}>{discipline}</li>
      ))}
    </ul>
  )
}
