import React from 'react'
import type { LinkedTagIfLinkedProps } from './LinkedTag.types'
import Stylex from '@stylexjs/stylex'
import { fontFamily } from '../../tokens.stylex'

const style = Stylex.create({
  wrapper: {
    fontFamily: fontFamily.sansserif,
    textDecoration: 'none',
    color: 'inherit',
    cursor: 'pointer',
    padding: '2px 10px',
  },
})

const LinkedTagIfLinked = ({ pathname, link, query, children }: LinkedTagIfLinkedProps) => {
  const href = query ? { pathname, query } : pathname

  if (href === '') {
    return (
      <span className={`rotion-gallery-multiselect-link ${Stylex(style.wrapper)}`}>
        {children}
      </span>
    )
  }

  if (link) {
    const Link = link
    return (
      <Link className={`rotion-gallery-multiselect-link ${Stylex(style.wrapper)}`} href={href}>
        {children}
      </Link>
    )
  }

  return (
    <a className={`rotion-gallery-multiselect-link ${Stylex(style.wrapper)}`} href={pathname}>
      {children}
    </a>
  )
}

export default LinkedTagIfLinked
