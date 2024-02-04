import React from 'react'
import type { LinkedTagProps } from './LinkedTag.types'
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

const LinkedTag = ({ name, path, link, query }: LinkedTagProps) => {
  const pathname = `${path}tags/${encodeURIComponent(name)}`
  const href = query ? { pathname, query } : pathname

  if (link) {
    const Link = link
    return (
      <Link className={`rotion-gallery-multiselect-link ${Stylex(style.wrapper)}`} href={href}>
        {name}
      </Link>
    )
  }

  return (
    <a className={`rotion-gallery-multiselect-link ${Stylex(style.wrapper)}`} href={pathname} title={name}>
      {name}
    </a>
  )
}

export default LinkedTag
