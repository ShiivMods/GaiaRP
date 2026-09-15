/**
 * Resolves files served from Vite's public directory against the current base URL.
 * Local development uses '/', while GitHub Pages uses '/GaiaRP/'.
 */
export function assetUrl(path: string): string {
  if (!path || /^(?:https?:|data:|blob:)/i.test(path)) return path

  const base = import.meta.env.BASE_URL || '/'
  const cleanPath = path.replace(/^\/+/, '')
  return `${base}${cleanPath}`
}
