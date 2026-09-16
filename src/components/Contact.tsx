import { socials } from '../data/socials'
import { useReveal } from '../lib/hooks'
import styles from './Contact.module.css'

const links = [
  { label: 'Email', href: `mailto:${socials.email}`, external: false },
  { label: 'LinkedIn', href: socials.linkedin, external: true },
  { label: 'GitHub', href: socials.github, external: true },
  { label: 'Download CV', href: socials.cv, external: true },
]

export function Contact() {
  const ref = useReveal<HTMLElement>()
  return (
    <section id="contact" className={`section ${styles.contact}`} aria-labelledby="contact-title" ref={ref}>
      <div className="wrap">
        <p className="kicker reveal">04 / Contact</p>
        <h2 id="contact-title" className={`reveal ${styles.title}`}>
          Let's build
          <br />
          something useful<span className={styles.dot}>.</span>
        </h2>
        <div className={styles.grid}>
          <p className={`reveal ${styles.copy}`}>
            Interested in software engineering, AI systems, automation and ambitious technical problems.
          </p>
          <ul className={`reveal ${styles.links}`}>
            {links.map((l) => (
              <li key={l.label}>
                <a
                  href={l.href}
                  className={styles.link}
                  {...(l.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                >
                  {l.label}
                  <span aria-hidden="true">↗</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
