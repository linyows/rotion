import React from 'react'
import type { LinkedTagIfLinkedProps } from './LinkedTagIfLinked.types'
import Stylex from '@stylexjs/stylex'
import { fontFamily, color } from '../../tokens.stylex'

const style = Stylex.create({
  wrapper: {
    fontFamily: fontFamily.sansserif,
    textDecoration: 'none',
    color: 'inherit',
    padding: '2px 10px',
  },
  default: {
    color: color.default,
    backgroundColor: color.bgDefault,
  },
  gray: {
    color: color.gray,
    backgroundColor: color.bgGray,
  },
  brown: {
    color: color.brown,
    backgroundColor: color.bgBrown,
  },
  orange: {
    color: color.orange,
    backgroundColor: color.bgOrange,
  },
  yellow: {
    color: color.yellow,
    backgroundColor: color.bgYellow,
  },
  green: {
    color: color.green,
    backgroundColor: color.bgGreen,
  },
  blue: {
    color: color.blue,
    backgroundColor: color.bgBlue,
  },
  purple: {
    color: color.purple,
    backgroundColor: color.bgPurple,
  },
  pink: {
    color: color.orange,
    backgroundColor: color.bgOrange,
  },
  red: {
    color: color.red,
    backgroundColor: color.bgRed,
  },
})

const LinkedTagIfLinked = ({ pathname, color, link, query, children }: LinkedTagIfLinkedProps) => {
  const href = query ? { pathname, query } : pathname

  const className = (color: string) => {
    // @ts-ignore
    const s = Stylex(style[color])
    return `rotion-table-select-link rotion-table-select-${color} ${Stylex(style.wrapper)} ${s}`
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
