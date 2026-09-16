import { useEffect, useState } from 'react'
import { Navigation } from '../components/Navigation'
import { Hero } from '../components/Hero'
import { ProjectIndex } from '../components/ProjectIndex'
import { Labs } from '../components/Labs'
import { EngineeringProfile } from '../components/EngineeringProfile'
import { PathPreview } from '../components/PathPreview'
import { Contact } from '../components/Contact'
import { Footer } from '../components/Footer'
import { CommandPalette } from '../components/CommandPalette'

export function HomePage() {
  const [paletteOpen, setPaletteOpen] = useState(false)

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault()
        setPaletteOpen((o) => !o)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  return (
    <>
      <a href="#work" className="sr-only">
        Skip to content
      </a>
      <Navigation onOpenPalette={() => setPaletteOpen(true)} />
      <main>
        <Hero />
        <ProjectIndex />
        <Labs />
        <EngineeringProfile />
        <PathPreview />
        <Contact />
      </main>
      <Footer />
      <CommandPalette open={paletteOpen} onClose={() => setPaletteOpen(false)} />
    </>
  )
}
