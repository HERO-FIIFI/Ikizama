import type { PathDataset } from './types.ts'

const exactDate = /\b\d{4}-\d{2}-\d{2}\b/

export function validatePathDataset(dataset: PathDataset): string[] {
  const errors: string[] = []
  const entryIds = new Set<string>()
  const reconnects = [] as { id: string; reconnectsTo: string }[]

  for (const era of dataset.eras) {
    for (const entry of era.entries) {
      if (entryIds.has(entry.id)) {
        errors.push(`${entry.id}: duplicate entry id`)
      }
      entryIds.add(entry.id)

      if (entry.reconnectsTo) {
        reconnects.push({ id: entry.id, reconnectsTo: entry.reconnectsTo })
      }

      if (entry.disclosure !== 'conservative') continue

      const { evidence } = entry
      if (evidence?.repositoryUrl) {
        errors.push(`${entry.id}: conservative entries cannot expose repository URLs`)
      }
      if (evidence?.selectedPublicCommits?.length) {
        errors.push(`${entry.id}: conservative entries cannot expose selected commits`)
      }
      if (evidence?.branchNames?.length) {
        errors.push(`${entry.id}: conservative entries cannot expose branch names`)
      }
      if (evidence?.commitCount !== undefined) {
        errors.push(`${entry.id}: conservative entries cannot expose commit counts`)
      }
      if ([entry.period, entry.narrative, evidence].some(containsExactDate)) {
        errors.push(`${entry.id}: conservative entries cannot expose exact private dates`)
      }
    }
  }

  for (const { id, reconnectsTo } of reconnects) {
    if (!entryIds.has(reconnectsTo)) {
      errors.push(`${id}: reconnectsTo references missing entry ${reconnectsTo}`)
    }
  }

  return errors
}

function containsExactDate(value: unknown): boolean {
  if (typeof value === 'string') return exactDate.test(value)
  if (Array.isArray(value)) return value.some(containsExactDate)
  if (value && typeof value === 'object') return Object.values(value).some(containsExactDate)
  return false
}
