import { mkdir, writeFile } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'

/** @typedef {{ name: string, url: string, createdAt: string, updatedAt: string, language: string | null, description: string | null, fork: boolean, archived: boolean, topics: string[] }} RawRepository */

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

async function run() {
  const owner = process.argv[2]
  if (!owner) throw new Error('Usage: node scripts/path-archaeology.mjs <GitHub owner>')

  const repositories = await fetchRepositoryInventory({ owner, token: process.env.GITHUB_TOKEN })
  const outputPath = 'data/path/raw/github-public.json'
  await mkdir('data/path/raw', { recursive: true })
  await writeFile(outputPath, `${JSON.stringify(repositories, null, 2)}\n`)
  console.log(`Wrote ${repositories.length} public repositories to ${outputPath}`)
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  run().catch((error) => {
    console.error(error.message)
    process.exitCode = 1
  })
}
