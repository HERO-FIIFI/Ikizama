import { test } from 'node:test'
import assert from 'node:assert/strict'
import { resolveRoute } from './routes.ts'

test('resolves the home pathname to home', () => {
  assert.equal(resolveRoute('/'), 'home')
})

test('resolves the path pathname with or without a trailing slash', () => {
  assert.equal(resolveRoute('/path'), 'path')
  assert.equal(resolveRoute('/path/'), 'path')
})

test('resolves unknown pathnames to home', () => {
  assert.equal(resolveRoute('/unknown'), 'home')
})
