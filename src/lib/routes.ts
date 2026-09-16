export type Route = 'home' | 'path'

export function resolveRoute(pathname: string): Route {
  const normalized = pathname.replace(/\/+$/, '') || '/'
  return normalized === '/path' ? 'path' : 'home'
}
