import React from 'react'
import type { LinkedTitleIfLinkedProps } from './LinkedTitleIfLinked.types'
import Stylex from '@stylexjs/stylex'
import { tokens, link } from '../../tokens.stylex'

const style = Stylex.create({
  wrapper: {
    fontFamily: tokens.fontFamily,
    color: {
      default: link.color,
      ':hover': link.colorHover,
    },
    textDecoration: link.textDecoration,
    borderBottom: {
      default: link.borderBottom,
      ':hover': link.borderBottomHover,
    },
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
