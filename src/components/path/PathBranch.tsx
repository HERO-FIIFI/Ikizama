import type { PathEntry } from '../../data/path/types'
import styles from './PathBranch.module.css'

/**
 * Branch geometry beside the rail. Pure decoration: lifecycle and relationship are
 * always printed as text by the entry itself. Shapes run along the rail (top → bottom):
 * a branch leaves the rail, bulges into the gap, and returns; quiet work runs dashed.
 */
export function PathBranch({ entry }: { entry: PathEntry }) {
  const quiet = entry.lifecycle === 'Paused' || entry.lifecycle === 'Abandoned'
  const branches = Boolean(entry.branch || entry.reconnectsTo)

  if (!branches && !quiet) return null

  return (
    <div className={styles.branch}>
      <svg
        className={`${styles.geometry} ${entry.branch ? styles[entry.branch.kind] : ''} ${quiet ? styles.quiet : ''}`}
        aria-hidden="true"
        focusable="false"
        viewBox="0 0 40 88"
      >
        <path className={styles.path} d={branches ? 'M0 0 C0 30 40 26 40 44 S0 58 0 88' : 'M0 0 V88'} />
        {entry.reconnectsTo && <path className={styles.reconnectLead} d="M9 76 L0 88 L9 100" />}
      </svg>
      {entry.reconnectsTo && (
        <a className={styles.reconnect} href={`#path-entry-${entry.reconnectsTo}`} aria-label={`Resumed: jump to ${entry.reconnectsTo}`}>
          Resumed <span aria-hidden="true">&rarr;</span>
        </a>
      )}
    </div>
  )
}
