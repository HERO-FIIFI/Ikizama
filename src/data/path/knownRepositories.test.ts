import assert from 'node:assert/strict'
import test from 'node:test'
import { knownRepositories } from './knownRepositories.ts'

test('attributes every Seamsoft repository to Seamsoft Labs', () => {
  const seamsoftRepositories = knownRepositories.filter(({ meaning }) => meaning.includes('Seamsoft'))

  assert.ok(seamsoftRepositories.length > 0)
  for (const repository of seamsoftRepositories) {
    assert.deepEqual(repository.organization, {
      name: 'Seamsoft Labs',
      url: 'https://seamsoftlabs.com',
    })
  }
})
