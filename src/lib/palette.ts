import { projects } from '../data/projects.ts'
import { socials } from '../data/socials.ts'

export interface Command {
  id: string
  label: string
  /** Extra words the search may match on (e.g. "github", "cv"). */
  keywords?: string
  group: 'Systems' | 'Navigate' | 'Connect'
  /** Same-origin paths, hash targets, or external destinations. */
  href: string
}

export function createCommands(): Command[] {
  return [
    ...projects.map<Command>((project) => ({
      id: project.id,
      label: `View ${project.name}`,
      keywords: `project system ${project.category.join(' ')}`,
      group: 'Systems',
      href: `#project-${project.id}`,
    })),
    { id: 'eng', label: 'Explore engineering', keywords: 'skills how i build', group: 'Navigate', href: '#engineering' },
    { id: 'path', label: 'Explore My Dao', keywords: 'timeline career history path', group: 'Navigate', href: '/path' },
    { id: 'contact', label: 'Contact Andy', keywords: 'email hire', group: 'Connect', href: '#contact' },
    { id: 'cv', label: 'Download CV', keywords: 'resume pdf', group: 'Connect', href: socials.cv },
    { id: 'gh', label: 'Open GitHub', keywords: 'code repositories', group: 'Connect', href: socials.github },
    { id: 'li', label: 'Open LinkedIn', keywords: 'profile network', group: 'Connect', href: socials.linkedin },
  ]
}

/** Case-insensitive match on label + keywords; every whitespace-separated term must appear. */
export function filterCommands<T extends Pick<Command, 'label' | 'keywords'>>(commands: T[], query: string): T[] {
  const terms = query.toLowerCase().split(/\s+/).filter(Boolean)
  if (terms.length === 0) return commands
  return commands.filter((c) => {
    const hay = `${c.label} ${c.keywords ?? ''}`.toLowerCase()
    return terms.every((t) => hay.includes(t))
  })
}

/** Wraps around both ends. `len === 0` always yields 0. */
export function moveIndex(current: number, delta: number, len: number): number {
  if (len <= 0) return 0
  return (((current + delta) % len) + len) % len
}
