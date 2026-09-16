import { useEffect, useRef, useState } from 'react'
import { socials } from '../data/socials'
import styles from './Navigation.module.css'

const links = [
  { href: '#work', label: 'Work' },
  { href: '#engineering', label: 'Engineering' },
  { href: '#path', label: 'The Path' },
  { href: '#contact', label: 'Contact' },
]

const isApple = typeof navigator !== 'undefined' && /Mac|iPhone|iPad/.test(navigator.platform)

export function Navigation({ onOpenPalette }: { onOpenPalette: () => void }) {
  const [scrolled, setScrolled] = useState(false)
  const menuRef = useRef<HTMLDialogElement>(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const closeMenu = () => menuRef.current?.close()

  return (
    <header className={`${styles.nav} ${scrolled ? styles.scrolled : ''}`}>
      <div className={`wrap ${styles.bar}`}>
        <a href="#top" className={styles.mark} aria-label="Andy Fiifi Ashong — back to top">
          AF<span aria-hidden="true">.</span>
        </a>

        <nav className={styles.links} aria-label="Primary">
          <ul>
            {links.map((l) => (
              <li key={l.href}>
                <a href={l.href}>{l.label}</a>
              </li>
            ))}
          </ul>
          <span className={styles.rule} aria-hidden="true" />
          <ul>
            <li>
              <a href={socials.github} target="_blank" rel="noopener noreferrer">
                GitHub<span aria-hidden="true"> ↗</span>
              </a>
            </li>
            <li>
              <a href={socials.linkedin} target="_blank" rel="noopener noreferrer">
                LinkedIn<span aria-hidden="true"> ↗</span>
              </a>
            </li>
          </ul>
          <button type="button" className={styles.kbd} onClick={onOpenPalette} aria-label="Open command palette">
            {isApple ? '⌘' : 'Ctrl'}
            <span>K</span>
          </button>
        </nav>

        <button type="button" className={styles.menuBtn} onClick={() => menuRef.current?.showModal()}>
          Menu
        </button>
      </div>

      <dialog ref={menuRef} className={styles.menu} aria-label="Site menu">
        <div className={styles.menuInner}>
          <div className={styles.menuTop}>
            <span className={styles.mark}>
              AF<span aria-hidden="true">.</span>
            </span>
            <button type="button" className={styles.menuBtn} onClick={closeMenu}>
              Close
            </button>
          </div>
          <nav aria-label="Primary (mobile)">
            <ul className={styles.menuLinks}>
              {links.map((l, i) => (
                <li key={l.href}>
                  <a href={l.href} onClick={closeMenu}>
                    <span className={styles.menuIndex}>0{i + 1}</span>
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <ul className={styles.menuSocial}>
            <li>
              <a href={socials.github} target="_blank" rel="noopener noreferrer">
                GitHub ↗
              </a>
            </li>
            <li>
              <a href={socials.linkedin} target="_blank" rel="noopener noreferrer">
                LinkedIn ↗
              </a>
            </li>
            <li>
              <a href={`mailto:${socials.email}`}>Email ↗</a>
            </li>
          </ul>
        </div>
      </dialog>
    </header>
  )
}
