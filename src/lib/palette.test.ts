import { test } from 'node:test'
import assert from 'node:assert/strict'
import { createCommands, filterCommands, moveIndex } from './palette.ts'

const cmds = [
  { label: 'View AURA', keywords: 'project ai rag' },
  { label: 'View AXIOM', keywords: 'project audit' },
  { label: 'Open GitHub', keywords: 'code repos' },
]

test('empty query returns everything, in order', () => {
  assert.deepEqual(filterCommands(cmds, '   '), cmds)
})

test('matches label and keywords, case-insensitive, all terms required', () => {
  assert.deepEqual(filterCommands(cmds, 'view PROJECT').map((c) => c.label), ['View AURA', 'View AXIOM'])
  assert.deepEqual(filterCommands(cmds, 'rag').map((c) => c.label), ['View AURA'])
  assert.deepEqual(filterCommands(cmds, 'view github'), [])
})

test('moveIndex wraps in both directions and survives empty lists', () => {
  assert.equal(moveIndex(0, -1, 3), 2)
  assert.equal(moveIndex(2, 1, 3), 0)
  assert.equal(moveIndex(1, 1, 3), 2)
  assert.equal(moveIndex(5, 1, 0), 0)
})

test('Path command opens the full Path page', () => {
  assert.equal(createCommands().find((command) => command.id === 'path')?.href, '/path')
})
