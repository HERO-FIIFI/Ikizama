import { execFile } from 'node:child_process'
import { mkdir, rm, writeFile } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { promisify } from 'node:util'

const exec = promisify(execFile)

/** @typedef {{ name: string, url: string, createdAt: string, updatedAt: string, language: string | null, description: string | null, fork: boolean, archived: boolean, topics: string[] }} RawRepository */
/** @typedef {{ earliestCommitDate: string, latestCommitDate: string, commitCount: number }} GitFacts */

/**
 * Fetches and reduces only public repository metadata from GitHub's public API.
 * @param {{ owner: string, token?: string, request?: typeof fetch }} options
 * @returns {Promise<RawRepository[]>}
 */
export async function fetchRepositoryInventory({ owner, token, request = fetch }) {
  const repositories = []

  for (let page = 1; ; page += 1) {
    const url = `https://api.github.com/users/${encodeURIComponent(owner)}/repos?per_page=100&page=${page}&sort=created&direction=asc`
    const response = await request(url, {
      headers: {
        Accept: 'application/vnd.github+json',
        'X-GitHub-Api-Version': '2022-11-28',
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
    })

    if (!response.ok) {
      throw new Error(`GitHub request failed: ${response.status} ${response.statusText}`)
    }

    const pageRepositories = await response.json()
    for (const repository of pageRepositories) {
      if (!repository.private) {
        repositories.push({
          name: repository.name,
          url: repository.html_url,
          createdAt: repository.created_at,
          updatedAt: repository.updated_at,
          language: repository.language,
          description: repository.description,
          fork: repository.fork,
          archived: repository.archived,
          topics: repository.topics,
        })
      }
    }

    if (pageRepositories.length < 100) return repositories
  }
}

/**
 * Derives commit facts from Git itself (author dates), which is what the record needs:
 * GitHub's created_at is often just the day old local work was pushed.
 * @param {{ url: string, name: string }} repository
 * @param {{ run?: typeof exec, root?: string }} [options]
 * @returns {Promise<GitFacts | null>} null when the repository has no commits or cannot be read
 */
export async function gitFacts(repository, { run = exec, root = join(tmpdir(), 'path-archaeology') } = {}) {
  const dir = join(root, repository.name)
  await rm(dir, { recursive: true, force: true })
  try {
    await run('git', ['clone', '--bare', '--quiet', '--filter=blob:none', repository.url, dir])
    const roots = (await run('git', ['-C', dir, 'rev-list', '--max-parents=0', 'HEAD'])).stdout.trim().split(/\s+/).filter(Boolean)
    const rootDates = []
    for (const sha of roots) rootDates.push((await run('git', ['-C', dir, 'show', '-s', '--format=%aI', sha])).stdout.trim())
    const latest = (await run('git', ['-C', dir, 'log', '-1', '--format=%aI'])).stdout.trim()
    const count = Number((await run('git', ['-C', dir, 'rev-list', '--count', 'HEAD'])).stdout.trim())
    return { earliestCommitDate: rootDates.sort()[0].slice(0, 10), latestCommitDate: latest.slice(0, 10), commitCount: count }
  } catch {
    return null
  } finally {
    await rm(dir, { recursive: true, force: true })
  }
}

async function run() {
  const owner = process.argv[2]
  if (!owner) throw new Error('Usage: node scripts/path-archaeology.mjs <GitHub owner>')

  const repositories = await fetchRepositoryInventory({ owner, token: process.env.GITHUB_TOKEN })
  let enriched = 0
  for (const repository of repositories) {
    if (repository.fork) continue
    const facts = await gitFacts(repository)
    if (facts) {
      Object.assign(repository, facts)
      enriched += 1
    }
  }

  const outputPath = 'data/path/raw/github-public.json'
  await mkdir('data/path/raw', { recursive: true })
  await writeFile(outputPath, `${JSON.stringify(repositories, null, 2)}\n`)
  console.log(`Wrote ${repositories.length} public repositories (${enriched} with Git facts) to ${outputPath}`)
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  run().catch((error) => {
    console.error(error.message)
    process.exitCode = 1
  })
}
