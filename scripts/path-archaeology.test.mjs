import assert from 'node:assert/strict'
import test from 'node:test'
import { fetchRepositoryInventory } from './path-archaeology.mjs'

const ikizama = {
  name: 'Ikizama',
  html_url: 'https://github.com/HERO-FIIFI/Ikizama',
  private: false,
  created_at: '2026-09-16T00:00:00Z',
  updated_at: '2026-09-16T01:00:00Z',
  language: 'TypeScript',
  description: 'Portfolio',
  fork: false,
  archived: false,
  topics: ['portfolio'],
}

function response(body, options = {}) {
  return {
    ok: options.ok ?? true,
    status: options.status ?? 200,
    statusText: options.statusText ?? 'OK',
    json: async () => body,
  }
}

test('normalizes public repository metadata without credentials in output', async () => {
  const result = await fetchRepositoryInventory({
    owner: 'HERO-FIIFI',
    token: 'secret',
    request: async () => response([ikizama]),
  })

  assert.deepEqual(result, [{
    name: 'Ikizama',
    url: 'https://github.com/HERO-FIIFI/Ikizama',
    createdAt: '2026-09-16T00:00:00Z',
    updatedAt: '2026-09-16T01:00:00Z',
    language: 'TypeScript',
    description: 'Portfolio',
    fork: false,
    archived: false,
    topics: ['portfolio'],
  }])
  assert.equal(JSON.stringify(result).includes('secret'), false)
})

test('requests subsequent pages until a page has fewer than 100 repositories', async () => {
  const urls = []
  const fullPage = Array.from({ length: 100 }, (_, index) => ({ ...ikizama, name: `repo-${index}` }))
  const result = await fetchRepositoryInventory({
    owner: 'HERO-FIIFI',
    request: async (url) => {
      urls.push(url)
      return response(url.includes('&page=1&') ? fullPage : [{ ...ikizama, name: 'last-public' }, { ...ikizama, name: 'private', private: true }])
    },
  })

  assert.equal(urls.length, 2)
  assert.match(urls[0], /per_page=100&page=1&sort=created&direction=asc$/)
  assert.match(urls[1], /per_page=100&page=2&sort=created&direction=asc$/)
  assert.equal(result.length, 101)
  assert.equal(result.at(-1).name, 'last-public')
})

test('throws when GitHub returns an HTTP failure', async () => {
  await assert.rejects(
    fetchRepositoryInventory({ owner: 'HERO-FIIFI', request: async () => response({ message: 'rate limited' }, { ok: false, status: 403, statusText: 'Forbidden' }) }),
    /GitHub request failed: 403 Forbidden/,
  )
})
