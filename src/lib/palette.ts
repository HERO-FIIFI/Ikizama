export interface Command {
  id: string
  label: string
  /** Extra words the search may match on (e.g. "github", "cv"). */
  keywords?: string
  group: 'Systems' | 'Navigate' | 'Connect'
  run: () => void
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
