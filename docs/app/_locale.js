// English is the site's default and is served without a prefix, so /requests
// is English and /ja/requests is Japanese. Nextra expects a locale segment in
// every route, so the two are told apart here instead.
export const LOCALES = ['en', 'ja']

export const DEFAULT_LOCALE = 'en'

export const localeOf = mdxPath =>
  mdxPath?.[0] === 'ja' ? 'ja' : DEFAULT_LOCALE

export const contentPathOf = mdxPath =>
  mdxPath?.[0] === 'ja' ? mdxPath.slice(1) : mdxPath || []

// The page map carries the locale in every route, which is right for Japanese
// and one segment too many for English.
export const unprefix = items =>
  items.map(item => ({
    ...item,
    ...(item.route && { route: item.route.replace(/^\/en(?=\/|$)/, '') || '/' }),
    ...(item.children && { children: unprefix(item.children) })
  }))
