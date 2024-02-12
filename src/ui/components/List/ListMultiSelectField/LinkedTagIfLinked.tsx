import React from 'react'
import type { LinkedTagIfLinkedProps } from './LinkedTagIfLinked.types'
import Stylex from '@stylexjs/stylex'
import { tokens, colors, link } from '../../tokens.stylex'

const style = Stylex.create({
  wrapper: {
    fontFamily: tokens.fontFamily,
    textDecoration: link.textDecoration,
    color: 'inherit',
    cursor: link.cursor,
    padding: '2px 10px',
    borderRadius: tokens.borderRadius,
  },
  default: {
    color: colors.default,
    backgroundColor: colors.bgDefault,
  },
  gray: {
    color: colors.gray,
    backgroundColor: colors.bgGray,
  },
  brown: {
    color: colors.brown,
    backgroundColor: colors.bgBrown,
  },
  orange: {
    color: colors.orange,
    backgroundColor: colors.bgOrange,
  },
  yellow: {
    color: colors.yellow,
    backgroundColor: colors.bgYellow,
  },
  green: {
    color: colors.green,
    backgroundColor: colors.bgGreen,
  },
  blue: {
    color: colors.blue,
    backgroundColor: colors.bgBlue,
  },
  purple: {
    color: colors.purple,
    backgroundColor: colors.bgPurple,
  },
  pink: {
    color: colors.orange,
    backgroundColor: colors.bgOrange,
  },
  red: {
    color: colors.red,
    backgroundColor: colors.bgRed,
  },
})

const LinkedTagIfLinked = ({ color, pathname, link, query, children }: LinkedTagIfLinkedProps) => {
  const href = query ? { pathname, query } : pathname

  const className = (color: string) => {
    // @ts-ignore
    const s = Stylex(style[color])
    return `rotion-list-multiselect-link rotion-list-select-${color} ${Stylex(style.wrapper)} ${s}`
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
