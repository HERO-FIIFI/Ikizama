import assert from 'node:assert/strict'
import test from 'node:test'
import { pathDataset } from './path.ts'
import type { PathDataset } from './types.ts'
import { validatePathDataset } from './validate.ts'

const valid: PathDataset = {
  disciplines: ['Engineering', 'AI', 'Automation', 'Data', 'Governance'],
  beforeRecord: {
    title: 'Before the Record',
    paragraphs: ['I was fascinated by what made hardware work.'],
  },
  eras: [],
}

function conservativeEntry() {
  return {
    id: 'private-system',
    title: 'Private System',
    kind: 'Professional System' as const,
    lifecycle: 'Private / Internal' as const,
    disclosure: 'conservative' as const,
    disciplines: ['Engineering'] as const,
    summary: 'Sanitized description.',
  }
}

test('accepts an evidence-safe empty chronology', () => {
  assert.deepEqual(validatePathDataset(valid), [])
})

test('rejects repository URLs on conservative entries', () => {
  const dataset: PathDataset = {
    ...valid,
    eras: [{
      id: 'work',
      label: 'Professional systems',
      entries: [{
        ...conservativeEntry(),
        evidence: { repositoryUrl: 'https://github.com/example/private' },
      }],
    }],
  }

  assert.deepEqual(validatePathDataset(dataset), [
    'private-system: conservative entries cannot expose repository URLs',
  ])
})

test('rejects selected raw commits on conservative entries', () => {
  const dataset: PathDataset = {
    ...valid,
    eras: [{
      id: 'work',
      label: 'Professional systems',
      entries: [{
        ...conservativeEntry(),
        evidence: { selectedPublicCommits: ['a1b2c3d: internal milestone'] },
      }],
    }],
  }

  assert.deepEqual(validatePathDataset(dataset), [
    'private-system: conservative entries cannot expose selected commits',
  ])
})

test('rejects exact private dates on conservative entries', () => {
  const dataset: PathDataset = {
    ...valid,
    eras: [{
      id: 'work',
      label: 'Professional systems',
      entries: [{
        ...conservativeEntry(),
        evidence: { earliestCommitDate: '2026-09-16' },
      }],
    }],
  }

  assert.deepEqual(validatePathDataset(dataset), [
    'private-system: conservative entries cannot expose exact private dates',
  ])
})

test('rejects exact private dates in conservative browser-visible copy', () => {
  const dataset: PathDataset = {
    ...valid,
    eras: [{
      id: 'work',
      label: 'Professional systems',
      entries: [{
        ...conservativeEntry(),
        period: '2026-09-16',
        narrative: 'A private milestone happened on 2026-09-16.',
      }],
    }],
  }

  assert.deepEqual(validatePathDataset(dataset), [
    'private-system: conservative entries cannot expose exact private dates',
  ])
})

test('rejects duplicate entry ids', () => {
  const entry = {
    ...conservativeEntry(),
    evidence: undefined,
  }
  const dataset: PathDataset = {
    ...valid,
    eras: [{ id: 'one', label: 'One', entries: [entry] }, {
      id: 'two',
      label: 'Two',
      entries: [{ ...entry, title: 'Second system' }],
    }],
  }

  assert.deepEqual(validatePathDataset(dataset), [
    'private-system: duplicate entry id',
  ])
})

test('rejects a reconnection to an entry that does not exist', () => {
  const dataset: PathDataset = {
    ...valid,
    eras: [{
      id: 'work',
      label: 'Professional systems',
      entries: [{ ...conservativeEntry(), reconnectsTo: 'missing-entry' }],
    }],
  }

  assert.deepEqual(validatePathDataset(dataset), [
    'private-system: reconnectsTo references missing entry missing-entry',
  ])
})

test('validates the curated browser dataset', () => {
  assert.deepEqual(validatePathDataset(pathDataset), [])
})
