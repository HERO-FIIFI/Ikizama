import { pathDisciplines, type Discipline, type PathEra } from '../../data/path/types'
import { PathBranch } from './PathBranch'
import { PathChapter } from './PathChapter'
import { PathContinuation } from './PathContinuation'
import { PathTrace } from './PathTrace'
import styles from './PathRecord.module.css'

export function PathRecord({ eras }: { eras: PathEra[] }) {
  const disciplines = new Set<Discipline>()

  return (
    <div className={styles.record}>
      {eras.map((era, i) => {
        era.entries.forEach((entry) => entry.disciplines.forEach((discipline) => disciplines.add(discipline)))

        return (
          <section key={era.id} id={`path-era-${era.id}`} className={styles.era} aria-labelledby={`path-era-${era.id}-title`}>
            <div className={`wrap ${styles.inner}`}>
              <header className={styles.eraHeader}>
                <p className={styles.eraLabel}>
                  {String(i + 1).padStart(2, '0')} / Path record
                </p>
                <div>
                  <h2 id={`path-era-${era.id}-title`}>{era.label}</h2>
                  {era.framing && <p className={styles.framing}>{era.framing}</p>}
                </div>
              </header>

              <ol className={styles.entries}>
                {era.entries.map((entry) => (
                  <li
                    key={entry.id}
                    className={`${styles.entry} ${entry.weight === 'chapter' ? styles.entryChapter : styles.entryTrace}`}
                    data-disclosure={entry.disclosure}
                    data-lifecycle={entry.lifecycle}
                  >
                    <PathBranch entry={entry} />
                    {entry.weight === 'chapter' ? <PathChapter entry={entry} /> : <PathTrace entry={entry} />}
                  </li>
                ))}
              </ol>

              <footer className={styles.ledger} aria-label={`Cumulative disciplines after ${era.label}`}>
                <p>Cultivated so far</p>
                <ul>
                  {pathDisciplines
                    .filter((discipline) => disciplines.has(discipline))
                    .map((discipline) => (
                      <li key={discipline}>{discipline}</li>
                    ))}
                </ul>
              </footer>
            </div>
          </section>
        )
      })}
      <PathContinuation />
    </div>
  )
}
