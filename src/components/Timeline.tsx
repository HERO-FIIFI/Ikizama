import type { CSSProperties } from 'react'
import { disciplines, pathStatement, timeline } from '../data/timeline'
import { useReveal } from '../lib/hooks'
import styles from './Timeline.module.css'

const X0 = 12 // first thread x (px)
const GAP = 12 // distance between threads (px)
const NODE_Y = 44 // node offset from row top (px), aligned to the title line
const threadX = (d: (typeof disciplines)[number]) => X0 + disciplines.indexOf(d) * GAP

/** Five threads bend into one point: the present. Fixed pixel geometry, no stretching. */
function Convergence() {
  const cx = X0 + 2 * GAP
  return (
    <svg className={styles.converge} width={72} height={NODE_Y + 6} viewBox={`0 0 72 ${NODE_Y + 6}`} aria-hidden="true">
      {disciplines.map((d) => (
        <path key={d} d={`M${threadX(d)} 0 C ${threadX(d)} ${NODE_Y * 0.55}, ${cx} ${NODE_Y * 0.45}, ${cx} ${NODE_Y}`} className={styles.convergeLine} />
      ))}
      <circle cx={cx} cy={NODE_Y} r={3.5} className={styles.convergeDot} />
    </svg>
  )
}

export function Timeline() {
  const ref = useReveal<HTMLElement>()
  const last = timeline.length - 1

  return (
    <section id="path" className="section" aria-labelledby="path-title" ref={ref}>
      <div className="wrap">
        <div className="section__head">
          <p className="kicker reveal">03 / The path</p>
          <div>
            <h2 id="path-title" className="headline reveal">
              The path so far.
            </h2>
            <p className={`lead reveal ${styles.lead}`}>
              A record of things built, disciplines learned, and the path still being refined. Five threads —{' '}
              {disciplines.map((d, i) => (
                <span key={d}>
                  <span className={styles.leadThread}>{d === 'AI' ? d : d.toLowerCase()}</span>
                  {i < disciplines.length - 1 ? ', ' : ''}
                </span>
              ))}{' '}
              — run through every system and converge on the present.
            </p>
          </div>
        </div>

        <ol className={styles.list}>
          {timeline.map((t, i) => {
            const xs = t.threads.map(threadX)
            const isLast = i === last
            return (
              <li key={`${t.period}-${t.title}`} className={`reveal ${styles.item}`} style={{ '--delay': `${i * 50}ms` } as CSSProperties}>
                <span className={styles.nodes} aria-hidden="true">
                  {isLast ? (
                    <Convergence />
                  ) : (
                    <>
                      {disciplines.map((d) => (
                        <span key={d} className={styles.thread} style={{ left: threadX(d) }} />
                      ))}
                      {xs.length > 1 && (
                        <span className={styles.bridge} style={{ left: Math.min(...xs), width: Math.max(...xs) - Math.min(...xs), top: NODE_Y }} />
                      )}
                      {xs.map((x) => (
                        <span key={x} className={styles.node} style={{ left: x, top: NODE_Y }} />
                      ))}
                    </>
                  )}
                </span>

                <span className={styles.period}>{t.period}</span>

                <span className={styles.body}>
                  <span className={styles.discipline}>{t.discipline}</span>
                  {t.href ? (
                    <a href={t.href} className={styles.title}>
                      {t.title}
                    </a>
                  ) : (
                    <span className={styles.title}>{t.title}</span>
                  )}
                  <span className={styles.detail}>{t.detail}</span>
                  <span className={styles.tags}>
                    {t.threads.map((d) => (
                      <span key={d}>{d}</span>
                    ))}
                  </span>
                </span>
              </li>
            )
          })}
        </ol>

        <p className={`reveal ${styles.coda}`}>
          {pathStatement.map((line, i) => (
            <span key={line} className={i === pathStatement.length - 1 ? styles.codaLast : undefined}>
              {line}
            </span>
          ))}
        </p>
      </div>
    </section>
  )
}
