import type { CSSProperties } from 'react'
import type { Project } from '../data/projects'
import { ProjectPreview } from './ProjectPreview'
import styles from './ProjectRow.module.css'

interface Props {
  project: Project
  index: number
  active: boolean
  dimmed: boolean
  inline: boolean
  onActivate: () => void
  onToggle: () => void
}

export function ProjectRow({ project, index, active, dimmed, inline, onActivate, onToggle }: Props) {
  const num = String(index + 1).padStart(2, '0')
  return (
    <article
      id={`project-${project.id}`}
      className={`reveal ${styles.row} ${active ? styles.active : ''} ${dimmed ? styles.dimmed : ''}`}
      style={{ '--delay': `${index * 60}ms` } as CSSProperties}
      onPointerEnter={onActivate}
      onFocus={onActivate}
    >
      {/* The button stretches over the whole header via ::after, keeping the heading valid HTML. */}
      <div className={styles.head}>
        <span className={styles.index}>
          <span className={styles.marker} aria-hidden="true" />
          {num}
        </span>
        <div className={styles.main}>
          <h3 className={styles.name}>
            <button
              type="button"
              className={styles.trigger}
              onClick={onToggle}
              aria-expanded={inline ? active : undefined}
              aria-controls={inline ? `preview-${project.id}` : undefined}
            >
              {project.name}
            </button>
          </h3>
          <p className={styles.summary}>{project.summary}</p>
          <p className={styles.meta}>
            <span>{project.category.join(' · ')}</span>
            <span className={styles.kind}>{project.kind === 'professional' ? 'Professional system' : 'Personal engineering'}</span>
          </p>
        </div>
        <span className={styles.year}>{project.year}</span>
      </div>

      {inline && active && (
        <div id={`preview-${project.id}`} className={styles.inline}>
          <ProjectPreview project={project} />
        </div>
      )}
    </article>
  )
}
