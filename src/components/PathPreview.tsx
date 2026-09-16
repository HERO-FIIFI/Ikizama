import type { CSSProperties } from 'react'
import { pathDataset, pathStatement } from '../data/path/path'
import { pathDisciplines, type Discipline } from '../data/path/types'
import { site } from '../data/socials'
import { useReveal } from '../lib/hooks'
import styles from './PathPreview.module.css'

const X0 = 12 // first thread x (px)
const GAP = 12 // distance between threads (px)
const NODE_Y = 44 // node offset from row top (px), aligned to the title line
const threadX = (d: Discipline) => X0 + pathDisciplines.indexOf(d) * GAP

/** Only the turning points reach the home page; the full record lives at /path. */
const turningPoints = pathDataset.eras.flatMap((era) => era.entries).filter((e) => e.weight === 'chapter')

/** Five threads bend into one point: the present. Fixed pixel geometry, no stretching. */
function Convergence() {
  const cx = X0 + 2 * GAP
  return (
    <svg className={styles.converge} width={72} height={NODE_Y + 6} viewBox={`0 0 72 ${NODE_Y + 6}`} aria-hidden="true">
      {pathDisciplines.map((d) => (
        <path key={d} d={`M${threadX(d)} 0 C ${threadX(d)} ${NODE_Y * 0.55}, ${cx} ${NODE_Y * 0.45}, ${cx} ${NODE_Y}`} className={styles.convergeLine} />
      ))}
      <circle cx={cx} cy={NODE_Y} r={3.5} className={styles.convergeDot} />
    </svg>
  )
}

export function PathPreview() {
  const ref = useReveal<HTMLElement>()

  return (
    <section id="path-preview" className="section" aria-labelledby="path-title" ref={ref}>
      <div className="wrap">
        <div className="section__head">
          <p className="kicker reveal">03 / The path</p>
          <div>
            <h2 id="path-title" className="headline reveal">
              The path so far.
            </h2>
            <p className={`lead reveal ${styles.lead}`}>
              A record of things built, disciplines learned, and the path still being refined. Five threads —{' '}
              {pathDisciplines.map((d, i) => (
                <span key={d}>
                  <span className={styles.leadThread}>{d === 'AI' ? d : d.toLowerCase()}</span>
                  {i < pathDisciplines.length - 1 ? ', ' : ''}
                </span>
              ))}{' '}
              — run through every system and converge on the present.
            </p>
          </div>
        </div>

        <ol className={styles.list}>
          {turningPoints.map((entry, i) => {
            const xs = entry.disciplines.map(threadX)
            return (
              <li key={entry.id} className={`reveal ${styles.item}`} style={{ '--delay': `${i * 50}ms` } as CSSProperties}>
                <span className={styles.nodes} aria-hidden="true">
                  {pathDisciplines.map((d) => (
                    <span key={d} className={styles.thread} style={{ left: threadX(d) }} />
                  ))}
                  {xs.length > 1 && (
                    <span className={styles.bridge} style={{ left: Math.min(...xs), width: Math.max(...xs) - Math.min(...xs), top: NODE_Y }} />
                  )}
                  {xs.map((x) => (
                    <span key={x} className={styles.node} style={{ left: x, top: NODE_Y }} />
                  ))}
                </span>

                <span className={styles.period}>{entry.period ?? 'Current'}</span>

                <span className={styles.body}>
                  <span className={styles.kind}>{entry.kind}</span>
                  <a href={`/path#${entry.id}`} className={styles.title}>
                    {entry.title}
                  </a>
                  <span className={styles.detail}>{entry.summary}</span>
                  <span className={styles.tags}>
                    {entry.disciplines.map((d) => (
                      <span key={d}>{d}</span>
                    ))}
                  </span>
                </span>
              </li>
            )
          })}

          <li className={`reveal ${styles.item}`} style={{ '--delay': `${turningPoints.length * 50}ms` } as CSSProperties}>
            <span className={styles.nodes} aria-hidden="true">
              <Convergence />
            </span>
            <span className={styles.period}>{site.position.period}</span>
            <span className={styles.body}>
              <span className={styles.kind}>Position</span>
              <span className={styles.title}>{site.position.title}</span>
              <span className={styles.detail}>{site.position.org}</span>
            </span>
          </li>
        </ol>

        <div className={`reveal ${styles.handoff}`}>
          <p className={styles.statement}>
            {pathStatement.slice(0, 2).map((line) => (
              <span key={line}>{line}</span>
            ))}
          </p>
          <a href="/path" className={styles.more} aria-label="Explore the full Path" lang="ja">
            もっと見る
          </a>
        </div>
      </div>
    </section>
  )
}
