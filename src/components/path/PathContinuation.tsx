import type { CSSProperties } from 'react'
import styles from './PathContinuation.module.css'

// Abstract token widths (px) — lines of code being written, never real or fake terminal content.
const LINES = [
  [64, 28, 96],
  [40, 120, 24],
  [88, 32, 56],
  [52, 140],
  [30, 76, 44, 20],
  [112, 36],
  [48, 64, 92],
]

export function PathContinuation() {
  return (
    <section className={styles.continuation} aria-label="Open ending">
      <div className={`wrap ${styles.inner}`}>
        <p>THE PATH CONTINUES</p>
        <div className={styles.writing} aria-hidden="true">
          {LINES.map((tokens, i) => (
            <span key={i} className={styles.line} style={{ '--i': i } as CSSProperties}>
              {tokens.map((w, j) => (
                <span key={j} className={styles.tok} style={{ '--w': `${w}px`, '--j': j } as CSSProperties} />
              ))}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
