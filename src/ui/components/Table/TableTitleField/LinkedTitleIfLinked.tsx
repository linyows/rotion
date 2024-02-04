import React from 'react'
import type { LinkedTitleIfLinkedProps } from './LinkedTitleIfLinked.types'
import Stylex from '@stylexjs/stylex'
import { fontFamily } from '../../tokens.stylex'

const style = Stylex.create({
  wrapper: {
    fontFamily: fontFamily.sansserif,
    color: '#333',
    textDecoration: 'none',
    borderBottom: '1px solid #ddd',
  },
})

const LinkedTitleIfLinked = ({ path, slug, link, query, children }: LinkedTitleIfLinkedProps) => {
  if (!path && !slug) {
    return (
      <span className={`rotion-table-title-link ${Stylex(style.wrapper)}`}>
        {children}
      </span>
    )
  }
  const pathname = `${path}${slug}`
  const href = link && query ? { pathname, query } : pathname

  if (link) {
    const Link = link
    return (
      <Link className={`rotion-table-title-link ${Stylex(style.wrapper)}`} href={href}>
        {children}
      </Link>
    )
  }

  return (
    <a className={`rotion-table-title-link ${Stylex(style.wrapper)}`} href={pathname}>
      {children}
    </a>
  )
}

export default LinkedTitleIfLinked
