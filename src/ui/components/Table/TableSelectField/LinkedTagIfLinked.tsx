import React from 'react'
import type { LinkedTagIfLinkedProps } from './LinkedTagIfLinked.types'
import Stylex from '@stylexjs/stylex'
import { tokens, tag } from '../../tokens.stylex'

const style = Stylex.create({
  wrapper: {
    fontFamily: tokens.fontFamily,
    textDecoration: 'none',
    color: 'inherit',
    padding: '2px 10px',
  },
  default: {
    color: tag.default,
    backgroundColor: tag.bgDefault,
  },
  gray: {
    color: tag.gray,
    backgroundColor: tag.bgGray,
  },
  brown: {
    color: tag.brown,
    backgroundColor: tag.bgBrown,
  },
  orange: {
    color: tag.orange,
    backgroundColor: tag.bgOrange,
  },
  yellow: {
    color: tag.yellow,
    backgroundColor: tag.bgYellow,
  },
  green: {
    color: tag.green,
    backgroundColor: tag.bgGreen,
  },
  blue: {
    color: tag.blue,
    backgroundColor: tag.bgBlue,
  },
  purple: {
    color: tag.purple,
    backgroundColor: tag.bgPurple,
  },
  pink: {
    color: tag.orange,
    backgroundColor: tag.bgOrange,
  },
  red: {
    color: tag.red,
    backgroundColor: tag.bgRed,
  },
})

const LinkedTagIfLinked = ({ pathname, color, link, query, children }: LinkedTagIfLinkedProps) => {
  const href = query ? { pathname, query } : pathname

  const className = (color: string) => {
    // @ts-ignore
    const s = Stylex(style[color])
    return `rotion-table-select-link rotion-table-select-${color} ${Stylex(style.wrapper)} ${s}`
  }

  if (href === '') {
    return (
      <span className={className(color)}>
        {children}
      </span>
    )
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
