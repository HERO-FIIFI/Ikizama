import type { Route } from './routes.ts'

export interface PageMetadata {
  title: string
  description: string
  path: string
}

const metadata: Record<Route, PageMetadata> = {
  home: {
    title: 'Andy Fiifi Ashong — Software Engineer · AI & Automation',
    description: 'Software engineer building AI systems, automation, developer tools and enterprise software across FinTech and regulated environments.',
    path: '/',
  },
  path: {
    title: 'My Dao — Andy Fiifi Ashong',
    description: 'An evidence-backed record of the projects, disciplines and turning points shaping Andy Fiifi Ashong\'s engineering path.',
    path: '/path',
  },
}

export function metadataFor(route: Route): PageMetadata {
  return metadata[route]
}

export function applyMetadata(route: Route): void {
  const page = metadataFor(route)
  document.title = page.title
  setMeta('name', 'description', page.description)
  setMeta('property', 'og:title', page.title)
  setMeta('property', 'og:description', page.description)
  setMeta('name', 'twitter:title', page.title)
  setMeta('name', 'twitter:description', page.description)

  const canonical = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]') ?? document.head.appendChild(document.createElement('link'))
  canonical.rel = 'canonical'
  canonical.href = window.location.origin + page.path
}

function setMeta(attribute: 'name' | 'property', name: string, content: string): void {
  const selector = `meta[${attribute}="${name}"]`
  const meta = document.head.querySelector<HTMLMetaElement>(selector) ?? document.head.appendChild(document.createElement('meta'))
  meta.setAttribute(attribute, name)
  meta.content = content
}
