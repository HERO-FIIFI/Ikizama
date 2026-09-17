import { pathStatement } from '../../data/path/path'
import styles from './PathHero.module.css'

export function PathHero() {
  return (
    <section id="top" className={styles.hero} aria-labelledby="path-title">
      <div className={`wrap ${styles.inner}`}>
        <p className={styles.eyebrow}>
          THE PATH / <span lang="zh">道</span>
        </p>
        <h1 id="path-title" className={styles.title}>
          <span className="sr-only">My Dao</span>
          <span aria-hidden="true">
            MY{' '}
            <span className={styles.slot}>
              <span className={styles.dao}>DAO</span>
              <span className={styles.kanji} lang="zh">
                道
              </span>
            </span>
            <span className={styles.stop}>.</span>
          </span>
        </h1>

        <div className={styles.footer}>
          <p className={styles.philosophy}>
            {pathStatement.map((line) => (
              <span key={line}>{line}</span>
            ))}
          </p>
          <a className={styles.cta} href="#before-record">
            ENTER THE PATH <span aria-hidden="true">↓</span>
          </a>
        </div>
      </div>
    </section>
  )
}
