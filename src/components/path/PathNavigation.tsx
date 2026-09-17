import styles from './PathNavigation.module.css'

export function PathNavigation() {
  return (
    <header className={styles.header}>
      <a className={styles.skip} href="#path-record">
        Skip to the record
      </a>
      <nav className={`wrap ${styles.nav}`} aria-label="Path navigation">
        <a className={styles.brand} href="/">
          AF<span aria-hidden="true">.</span>
          <span className="sr-only"> — Andy Fiifi Ashong, back to the work</span>
        </a>
        <a className={styles.work} href="/">
          <span aria-hidden="true">← </span>Work
        </a>
      </nav>
    </header>
  )
}
