import styles from './PathContinuation.module.css'

export function PathContinuation() {
  return (
    <section className={styles.continuation} aria-label="Open ending">
      <div className={`wrap ${styles.inner}`}>
        <p>THE PATH CONTINUES</p>
      </div>
    </section>
  )
}
