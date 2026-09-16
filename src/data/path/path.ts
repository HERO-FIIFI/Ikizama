import type { PathDataset } from './types.ts'

/** The three approved lines. */
export const pathStatement = ['The work is evidence.', 'The path is the story.', 'The craft is never finished.'] as const

/** The reviewed, disclosure-safe source of browser-visible Path content. */
export const pathDataset: PathDataset = {
  disciplines: ['Engineering', 'AI', 'Automation', 'Data', 'Governance'],
  beforeRecord: {
    title: 'Before the Record',
    paragraphs: [
      'Before I kept a public record, I was fascinated by what made hardware work. I wanted to build something another person could use and be glad they did.',
      'I kept my code on my own machine because it felt safest with me. Open source did not make sense to me yet. Over time, I chose to believe that the Dao is not one person: the world shapes the path, and the path belongs to the world.',
    ],
  },
  eras: [{
    id: 'current-systems',
    label: 'Current systems',
    entries: [
      {
        id: 'aura',
        title: 'AURA',
        kind: 'Professional System',
        lifecycle: 'Private / Internal',
        disclosure: 'conservative',
        disciplines: ['AI', 'Automation', 'Governance'],
        summary: 'AI reasoning and workflow infrastructure for enterprise audit operations.',
        weight: 'chapter',
        period: '2025–26',
      },
      {
        id: 'axiom-radar',
        title: 'AXIOM / RADAR',
        kind: 'Professional System',
        lifecycle: 'Private / Internal',
        disclosure: 'conservative',
        disciplines: ['Engineering', 'Automation', 'Data', 'Governance'],
        summary: 'Enterprise audit execution and technical audit automation for deterministic testing and governed analysis.',
        weight: 'chapter',
        period: '2026',
      },
      {
        id: 'airsms',
        title: 'AirSms',
        kind: 'Personal Product',
        lifecycle: 'Active',
        disclosure: 'public',
        disciplines: ['Engineering', 'Data'],
        summary: 'Airline operations incident and service-management system.',
        weight: 'chapter',
        period: '2026',
      },
      {
        id: 'devbrain-mcp',
        title: 'DevBrain MCP',
        kind: 'Personal Product',
        lifecycle: 'Active',
        disclosure: 'public',
        disciplines: ['Engineering', 'AI'],
        summary: 'Engineering control plane for AI coding agents built around verifiable repository state.',
        weight: 'chapter',
        period: '2026',
      },
      {
        id: 'ikizama',
        title: 'Ikizama',
        kind: 'Personal Product',
        lifecycle: 'Active',
        disclosure: 'public',
        disciplines: ['Engineering'],
        summary: 'This portfolio itself.',
        weight: 'trace',
      },
    ],
  }],
}
