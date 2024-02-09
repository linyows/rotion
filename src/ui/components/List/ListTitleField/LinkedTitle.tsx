import React from 'react'
import Stylex from '@stylexjs/stylex'
import { tokens, link } from '../../tokens.stylex'
import type { LinkedTitleProps } from './LinkedTitle.types'

const style = Stylex.create({
  link: {
    fontFamily: tokens.fontFamily,
    textDecoration: link.textDecoration,
    borderBottom: link.borderBottom,
    color: 'inherit',
    cursor: link.cursor,
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
