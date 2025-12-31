import type { LinkedTagIfLinkedProps } from './LinkedTagIfLinked.types'
import './LinkedTagIfLinked.css'

const LinkedTagIfLinked = ({ color, pathname, link, query, children }: LinkedTagIfLinkedProps) => {
  const href = query ? { pathname, query } : pathname

  const className = (color: string) => {
    return `rotion-table-multiselect-link rotion-table-multiselect-${color}`
  }

  if (href === '') {
    return <span className={className(color)}>{children}</span>
  }

  if (link) {
    const Link = link
    return (
      <Link className={className(color)} href={href}>
        {children}
      </Link>
    )
  }

  return (
    <a className={className(color)} href={pathname}>
      {children}
    </a>
  )
}

export default LinkedTagIfLinked
