import { site, socials } from '../data/socials'
import styles from './Footer.module.css'

export function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={`wrap ${styles.row}`}>
        <p>
          © {new Date().getFullYear()} {site.name}
          <span className={styles.sep} aria-hidden="true">
            {' '}
            |{' '}
          </span>
          <a href={socials.seamsoft} className={styles.org} target="_blank" rel="noopener noreferrer">
            Seamsoft Labs
          </a>
        </p>
        <p className={styles.mid}>{site.location} · Designed &amp; engineered by Andy.</p>
        <a href="#top" className="link">
          Back to top <span aria-hidden="true">↑</span>
        </a>
      </div>
    </footer>
  )
}
