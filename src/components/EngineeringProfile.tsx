import type { CSSProperties } from 'react'
import { skills } from '../data/skills'
import { useReveal } from '../lib/hooks'
import styles from './EngineeringProfile.module.css'

export function EngineeringProfile() {
  const ref = useReveal<HTMLElement>()
  return (
    <section id="engineering" className="section" aria-labelledby="eng-title" ref={ref}>
      <div className="wrap">
        <div className="section__head">
          <p className="kicker reveal">02 / Engineering</p>
          <h2 id="eng-title" className="headline reveal">
            How I build.
          </h2>
        </div>

        <div className={styles.grid}>
          <p className={`lead reveal ${styles.principle}`}>
            <strong>Deterministic where it can be, intelligent where it must be.</strong> Automation does the repeatable work;
            models reason over what is left; every step stays observable, attributable and reversible.
          </p>

          <dl className={styles.groups}>
            {skills.map((g, i) => (
              <div key={g.label} className={`reveal ${styles.group}`} style={{ '--delay': `${i * 60}ms` } as CSSProperties}>
                <dt className={styles.label}>
                  <span className={styles.num}>{String(i + 1).padStart(2, '0')}</span>
                  {g.label}
                </dt>
                <dd className={styles.items}>
                  <ul>
                    {g.items.map((it) => (
                      <li key={it}>{it}</li>
                    ))}
                  </ul>
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  )
}
