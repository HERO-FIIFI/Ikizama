import { site } from '../data/socials'
import { SystemsVisual } from './SystemsVisual'
import styles from './Hero.module.css'

export function Hero() {
  return (
    <section id="top" className={styles.hero} aria-labelledby="hero-name">
      <div className={`wrap ${styles.grid}`}>
        <div className={styles.top}>
          <p className={`kicker ${styles.kicker}`}>Software Engineer / AI + Automation</p>
          <h1 id="hero-name" className={styles.name}>
            <span className="sr-only">Andy Fiifi Ashong</span>
            <span aria-hidden="true">
              FIIFI<span className={styles.dot}>.</span>
            </span>
          </h1>
        </div>

        <div className={styles.copy}>
          <p className={styles.statement}>
            I build intelligent systems, developer tools and automation for real operational problems.
          </p>
          <p className={styles.sub}>Software engineering shaped by experience in AI, FinTech and regulated systems.</p>
          <a href="#work" className={`link ${styles.cta}`}>
            Explore selected systems <span aria-hidden="true">↓</span>
          </a>
        </div>

        <div className={styles.visual}>
          <SystemsVisual />
        </div>

        <dl className={styles.meta}>
          <div>
            <dt>Location</dt>
            <dd>{site.location}</dd>
          </div>
          <div>
            <dt>Status</dt>
            <dd>
              <span className={styles.pulse} aria-hidden="true" />
              {site.availability}
            </dd>
          </div>
          <div className={styles.metaRight}>
            <dt>Focus</dt>
            <dd>AI systems · Automation · Enterprise software</dd>
          </div>
        </dl>
      </div>
    </section>
  )
}
