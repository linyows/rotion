'use client'

import { usePathname, useRouter } from 'next/navigation'

// The theme's own switch swaps the first segment of the path for the locale,
// which only works when every locale has one. English has none here, so the
// switch works out the same page in the other language by itself.
const pathFor = (pathname, locale) => {
  const base = pathname.replace(/^\/ja(?=\/|$)/, '') || '/'
  if (locale === 'en') return base
  return `/ja${base === '/' ? '' : base}`
}

export const LocaleSwitch = ({ labels }) => {
  const pathname = usePathname()
  const router = useRouter()
  const current = pathname === '/ja' || pathname.startsWith('/ja/') ? 'ja' : 'en'

  return (
    <select
      className="rotion-locale"
      aria-label="Language"
      value={current}
      onChange={event => router.push(pathFor(pathname, event.target.value))}
    >
      {Object.entries(labels).map(([locale, label]) => (
        <option key={locale} value={locale} lang={locale}>
          {label}
        </option>
      ))}
    </select>
  )
}
