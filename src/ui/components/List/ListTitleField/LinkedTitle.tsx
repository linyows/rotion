import React from 'react'
import Stylex from '@stylexjs/stylex'
import { fontFamily } from '../../tokens.stylex'
import type { LinkedTitleProps } from './LinkedTitle.types'

const style = Stylex.create({
  link: {
    fontFamily: fontFamily.sansserif,
    textDecoration: 'none',
    borderBottom: '1px solid #ddd',
    color: 'inherit',
    cursor: 'pointer',
  },
})

const LinkedTitle = ({ title, href, link, query }: LinkedTitleProps) => {
  if (link && query) {
    const Link = link
    return (
      <Link className={`rotion-list-title-link ${Stylex(style.link)}`} href={{ pathname: href, query }}>
        {title}
      </Link>
    )
  } else if (link) {
    const Link = link
    return (
      <Link className={`rotion-list-title-link ${Stylex(style.link)}`} href={href}>
        {title}
      </Link>
    )
  }

  return (
    <a className={`rotion-list-title-link ${Stylex(style.link)}`} href={href} title={title}>
      {title}
    </a>
  )
}

export default LinkedTitle
