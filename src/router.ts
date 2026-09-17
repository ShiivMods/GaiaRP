const rawBase = import.meta.env.BASE_URL || '/'
const appBase = rawBase === '/' ? '' : rawBase.replace(/\/$/, '')

function normalizePath(path: string) {
  if (!path) return '/'
  const withLeadingSlash = path.startsWith('/') ? path : `/${path}`
  return withLeadingSlash.length > 1 ? withLeadingSlash.replace(/\/+$/, '') : withLeadingSlash
}

export function getAppPath(pathname = window.location.pathname) {
  if (appBase && pathname.startsWith(appBase)) {
    return normalizePath(pathname.slice(appBase.length) || '/')
  }
  return normalizePath(pathname)
}

export function toBrowserPath(appPath: string) {
  const normalized = normalizePath(appPath)
  return `${appBase}${normalized}` || '/'
}

export function pushAppRoute(appPath: string) {
  const target = toBrowserPath(appPath)
  if (`${window.location.pathname}${window.location.search}${window.location.hash}` === target) return
  window.history.pushState(null, '', target)
}

export function replaceAppRoute(appPath: string) {
  window.history.replaceState(null, '', toBrowserPath(appPath))
}

export function restoreGitHubPagesRoute() {
  const params = new URLSearchParams(window.location.search)
  const pendingRoute = params.get('__route')
  if (!pendingRoute) return
  window.history.replaceState(null, '', toBrowserPath(pendingRoute))
}

export function routeSlug(value: string) {
  return value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}
