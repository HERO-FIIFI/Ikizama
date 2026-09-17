import type { PathDataset } from '../../data/path/types'
import styles from './BeforeRecord.module.css'

export function BeforeRecord({ beforeRecord }: Pick<PathDataset, 'beforeRecord'>) {
  return (
    <section id="before-record" className={styles.section} aria-labelledby="before-record-title">
      <div className={`wrap ${styles.grid}`}>
        <div>
          <p className="kicker">00 / Recollection</p>
          <h2 id="before-record-title" className={styles.title}>
            {beforeRecord.title}
          </h2>
        </div>
        <div className={styles.copy}>
          {beforeRecord.paragraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
      </div>
      <div className="wrap">
        <p id="path-record" className={styles.threshold} tabIndex={-1}>
          <span className={styles.thresholdMark} aria-hidden="true" />
          THE RECORD BEGINS — FIRST GIT EVIDENCE
        </p>
      </div>
    </section>
  )
}
