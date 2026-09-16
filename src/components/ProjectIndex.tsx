import { useState } from 'react'
import { projects } from '../data/projects'
import { useMediaQuery, useReveal } from '../lib/hooks'
import { ProjectRow } from './ProjectRow'
import { ProjectPreview } from './ProjectPreview'
import styles from './ProjectIndex.module.css'

export function ProjectIndex() {
  const desktop = useMediaQuery('(min-width: 1024px)')
  const [active, setActive] = useState<string | null>(projects[0].id)
  const ref = useReveal<HTMLElement>()

  // Desktop: hover/focus drives the sticky preview, never empty.
  // Mobile: tap toggles the inline preview.
  const current = desktop ? projects.find((p) => p.id === active) ?? projects[0] : null

  return (
    <section id="work" className="section" aria-labelledby="work-title" ref={ref}>
      <div className="wrap">
        <div className="section__head">
          <p className="kicker reveal">01 / Selected systems</p>
          <h2 id="work-title" className="headline reveal">
            Things I've built.
          </h2>
        </div>

        <div className={styles.layout}>
          <div className={styles.rows} onPointerLeave={() => desktop && setActive(projects[0].id)}>
            {projects.map((p, i) => (
              <ProjectRow
                key={p.id}
                project={p}
                index={i}
                active={active === p.id}
                dimmed={desktop && active !== null && active !== p.id}
                inline={!desktop}
                onActivate={() => desktop && setActive(p.id)}
                onToggle={() => setActive(desktop ? p.id : active === p.id ? null : p.id)}
              />
            ))}
          </div>

          {current && (
            <aside className={styles.preview} aria-live="polite" aria-label="Project preview">
              <div className={styles.sticky}>
                <ProjectPreview key={current.id} project={current} />
              </div>
            </aside>
          )}
        </div>
      </div>
    </section>
  )
}
