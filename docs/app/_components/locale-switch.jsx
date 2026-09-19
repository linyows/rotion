'use client'

import { usePathname } from 'next/navigation'

// The theme's own switch swaps the first segment of the path for the locale,
// which only works when every locale has one. English has none here, so the
// switch is a single link to the same page in the other language.
export const LocaleSwitch = ({ labels }) => {
  const pathname = usePathname()
  const japanese = pathname === '/ja' || pathname.startsWith('/ja/')
  const other = japanese
    ? pathname.replace(/^\/ja(?=\/|$)/, '') || '/'
    : `/ja${pathname === '/' ? '' : pathname}`

  return (
    <a className="rotion-locale" href={other} lang={japanese ? 'en' : 'ja'}>
      {japanese ? labels.en : labels.ja}
    </a>
  )
}
