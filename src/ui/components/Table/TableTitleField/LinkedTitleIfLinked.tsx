import type { LinkedTitleIfLinkedProps } from './LinkedTitleIfLinked.types'
import './LinkedTitleIfLinked.css'

const LinkedTitleIfLinked = ({ options, children }: LinkedTitleIfLinkedProps) => {
  const { pathname, link, query } = options || {}

  if (pathname && link) {
    const Link = link
    return (
      <Link
        className="rotion-table-title-wrapper rotion-table-title-link"
        href={query ? { pathname, query } : pathname}
      >
        {children}
      </Link>
    )
  }

  if (pathname) {
    return (
      <a className="rotion-table-title-wrapper rotion-table-title-link" href={pathname}>
        {children}
      </a>
    )
  }

  return <span className="rotion-table-title-wrapper">{children}</span>
}

export default LinkedTitleIfLinked
