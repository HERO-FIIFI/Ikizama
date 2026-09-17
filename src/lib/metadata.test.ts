import assert from 'node:assert/strict'
import { test } from 'node:test'
import { metadataFor } from './metadata.ts'

test('returns the exact My Dao metadata', () => {
  assert.deepEqual(metadataFor('path'), {
    title: 'My Dao — Andy Fiifi Ashong',
    description: 'An evidence-backed record of the projects, disciplines and turning points shaping Andy Fiifi Ashong\'s engineering path.',
    path: '/path',
  })
})

test('keeps home metadata distinct from My Dao', () => {
  const home = metadataFor('home')
  const path = metadataFor('path')

  assert.equal(home.path, '/')
  assert.notEqual(home.title, path.title)
  assert.notEqual(home.description, path.description)
})
