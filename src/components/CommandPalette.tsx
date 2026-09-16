import { useEffect, useMemo, useRef, useState, type KeyboardEvent } from 'react'
import { createCommands, filterCommands, moveIndex, type Command } from '../lib/palette'
import styles from './CommandPalette.module.css'

interface Props {
  open: boolean
  onClose: () => void
}

const go = (hash: string) => () => {
  document.querySelector(hash)?.scrollIntoView({ block: 'start' })
  history.replaceState(null, '', hash)
}
const commands = createCommands()

export function CommandPalette({ open, onClose }: Props) {
  const dialogRef = useRef<HTMLDialogElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const [query, setQuery] = useState('')
  const [index, setIndex] = useState(0)

  const results = useMemo(() => filterCommands(commands, query), [query])
  const selected = results[Math.min(index, results.length - 1)]

  useEffect(() => {
    const d = dialogRef.current
    if (!d) return
    if (open && !d.open) {
      setQuery('')
      setIndex(0)
      d.showModal()
      inputRef.current?.focus()
    } else if (!open && d.open) {
      d.close()
    }
  }, [open])

  useEffect(() => {
    document.getElementById(`cmd-${selected?.id}`)?.scrollIntoView({ block: 'nearest' })
  }, [selected])

  const run = (c: Command | undefined) => {
    if (!c) return
    onClose()
    // let the dialog close (and the focus return) before scrolling
    requestAnimationFrame(() => {
      if (c.href === '/path') window.location.assign(c.href)
      else if (c.href.startsWith('#')) go(c.href)()
      else window.open(c.href, '_blank', 'noopener,noreferrer')
    })
  }

  const onKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
      e.preventDefault()
      setIndex((i) => moveIndex(Math.min(i, results.length - 1), e.key === 'ArrowDown' ? 1 : -1, results.length))
    } else if (e.key === 'Enter') {
      e.preventDefault()
      run(selected)
    }
  }

  let lastGroup = ''

  return (
    <dialog
      ref={dialogRef}
      className={styles.dialog}
      aria-label="Command palette"
      onClose={onClose}
      onClick={(e) => e.target === dialogRef.current && onClose()}
    >
      <div className={styles.panel} onKeyDown={onKeyDown}>
        <div className={styles.inputRow}>
          <span className={styles.prompt} aria-hidden="true">
            ›
          </span>
          <input
            ref={inputRef}
            type="text"
            role="combobox"
            aria-expanded="true"
            aria-controls="cmd-list"
            aria-activedescendant={selected ? `cmd-${selected.id}` : undefined}
            aria-autocomplete="list"
            autoComplete="off"
            spellCheck={false}
            placeholder="Type a command…"
            className={styles.input}
            value={query}
            onChange={(e) => {
              setQuery(e.target.value)
              setIndex(0)
            }}
          />
          <kbd className={styles.esc}>esc</kbd>
        </div>

        <ul id="cmd-list" role="listbox" aria-label="Commands" className={styles.list}>
          {results.length === 0 && (
            <li className={styles.empty} role="presentation">
              No matching command.
            </li>
          )}
          {results.map((c) => {
            const showGroup = c.group !== lastGroup
            lastGroup = c.group
            const isSel = c.id === selected?.id
            return (
              <li
                key={c.id}
                id={`cmd-${c.id}`}
                role="option"
                aria-selected={isSel}
                className={`${styles.item} ${isSel ? styles.selected : ''}`}
                onPointerMove={() => setIndex(results.indexOf(c))}
                onClick={() => run(c)}
              >
                <span className={styles.group}>{showGroup ? c.group : ''}</span>
                <span className={styles.label}>{c.label}</span>
                <span className={styles.hint} aria-hidden="true">
                  {c.group === 'Connect' && c.id !== 'contact' ? '↗' : '↵'}
                </span>
              </li>
            )
          })}
        </ul>
      </div>
    </dialog>
  )
}
