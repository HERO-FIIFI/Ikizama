import type { Project } from '../data/projects'
import { makeIso, pts } from '../lib/iso'
import { useReducedMotion } from '../lib/hooks'
import styles from './ProjectPreview.module.css'

const { iso } = makeIso(122, 58, 34)
const S = 2.6 // plate footprint (x)
const D = 1.7 // plate footprint (y)
const H = 0.14 // plate thickness
const GAP = 0.62 // vertical spacing between plates

/** Stacked isometric plates, one per architecture layer, labelled with leader lines. */
function Stack({ layers, animate }: { layers: string[]; animate: boolean }) {
  const n = layers.length
  const height = 58 + (n - 1) * GAP * 34 + 60
  return (
    <svg viewBox={`0 0 340 ${height}`} className={styles.svg} aria-hidden="true">
      {layers.map((label, idx) => {
        const i = n - 1 - idx // top of the list is the top plate
        const z = i * GAP
        const top = [iso(0, 0, z + H), iso(S, 0, z + H), iso(S, D, z + H), iso(0, D, z + H)]
        const left = [iso(0, D, z), iso(S, D, z), iso(S, D, z + H), iso(0, D, z + H)]
        const right = [iso(S, D, z), iso(S, 0, z), iso(S, 0, z + H), iso(S, D, z + H)]
        const anchor = iso(S, D * 0.5, z + H / 2)
        const lx = 214
        const accent = idx === Math.floor((n - 1) / 2)
        return (
          <g key={label} className={styles.plate} style={{ animationDelay: `${idx * 70}ms` }}>
            <polygon points={pts(left)} className={styles.faceL} />
            <polygon points={pts(right)} className={styles.faceR} />
            <polygon points={pts(top)} className={accent ? styles.faceAccent : styles.faceT} />
            <line x1={anchor[0]} y1={anchor[1]} x2={lx - 8} y2={anchor[1]} className={styles.leader} />
            <text x={lx} y={anchor[1] + 3} className={styles.label}>
              {label}
            </text>
          </g>
        )
      })}
      {/* vertical signal through the stack */}
      {(() => {
        const a = iso(S * 0.5, D * 0.5, (n - 1) * GAP + H + 0.5)
        const b = iso(S * 0.5, D * 0.5, -0.35)
        return (
          <>
            <line x1={a[0]} y1={a[1]} x2={b[0]} y2={b[1]} className={styles.signal} />
            {animate && <line x1={a[0]} y1={a[1]} x2={b[0]} y2={b[1]} pathLength={100} className={styles.signalFlow} />}
          </>
        )
      })()}
    </svg>
  )
}

export function ProjectPreview({ project }: { project: Project }) {
  const reduced = useReducedMotion()
  return (
    <div className={styles.panel}>
      <p className={styles.head}>
        <span>{project.name}</span>
        <span>{project.year}</span>
        <span>{project.status}</span>
      </p>

      <Stack layers={project.layers} animate={!reduced} />

      <h4 className={styles.h}>Engineering focus</h4>
      <ul className={styles.focus}>
        {project.focus.map((f) => (
          <li key={f}>{f}</li>
        ))}
      </ul>

      <p className={styles.stack}>{project.stack.join(' · ')}</p>

      {project.link ? (
        <a className={`link ${styles.out}`} href={project.link} target="_blank" rel="noopener noreferrer">
          View repository <span aria-hidden="true">↗</span>
        </a>
      ) : project.kind === 'professional' ? (
        <p className={styles.note}>Professional system — described at architecture level. Internal details withheld.</p>
      ) : null}
    </div>
  )
}
