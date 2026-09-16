import type { CSSProperties } from 'react'
import { labs } from '../data/projects'
import { useReveal } from '../lib/hooks'
import styles from './Labs.module.css'

export function Labs() {
  const ref = useReveal<HTMLElement>()
  return (
    <section className={styles.labs} aria-labelledby="labs-title" ref={ref}>
      <div className={`wrap ${styles.grid}`}>
        <div className="reveal">
          <h3 id="labs-title" className="kicker">
            Labs / Automations
          </h3>
          <p className={styles.intro}>Focused tools built to remove one specific operational problem each.</p>
        </div>
        <ul className={styles.list}>
          {labs.map((lab, i) => {
            const Tag = lab.link ? 'a' : 'div'
            return (
              <li key={lab.name} className="reveal" style={{ '--delay': `${i * 60}ms` } as CSSProperties}>
                <Tag
                  className={styles.item}
                  {...(lab.link ? { href: lab.link, target: '_blank', rel: 'noopener noreferrer' } : {})}
                >
                  <span className={styles.line}>
                    <span className={styles.name}>{lab.name}</span>
                    <span className={styles.sep} aria-hidden="true">
                      /
                    </span>
                    <span>{lab.category}</span>
                    <span className={styles.sep} aria-hidden="true">
                      /
                    </span>
                    <span>{lab.year}</span>
                    {lab.link && <span aria-hidden="true"> ↗</span>}
                  </span>
                  <span className={styles.summary}>{lab.summary}</span>
                </Tag>
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}
