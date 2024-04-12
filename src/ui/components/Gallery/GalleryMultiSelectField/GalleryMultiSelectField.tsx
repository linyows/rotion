import React from 'react'
import type { GalleryMultiSelectFieldProps } from './GalleryMultiSelectField.types'
import Stylex from '@stylexjs/stylex'
import { tokens, tag, link } from '../../tokens.stylex'
import LinkedTagIfLinked from './LinkedTag'

const style = Stylex.create({
  wrapper: {
    fontFamily: tokens.fontFamily,
    width: '100%',
    padding: '8px 10px',
    display: 'flex',
    alignItems: 'center',
    fontSize: '12px',
    whiteSpace: 'nowrap',
  },
  link: {
    textDecoration: link.textDecoration,
    color: 'inherit',
    cursor: link.cursor,
    padding: '2px 10px',
  },
  ul: {
    listStyleType: 'none',
    display: 'flex',
    flexShrink: 0,
    alignItems: 'center',
    padding: 0,
    margin: '8px 0 0 7px',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
  li: {
    fontSize: '.75rem',
    display: 'flex',
    alignItems: 'center',
    flexShrink: 0,
    minWidth: 0,
    borderRadius: '3px',
    padding: 0,
    color: 'rgb(24, 51, 71)',
    background: 'rgb(211, 229, 239) none repeat scroll 0% 0%',
    margin: '0 6px 0 0',
    cursor: 'pointer',
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

const GalleryMultiSelectField = ({ payload, path, link, query }: GalleryMultiSelectFieldProps) => {
  const { multi_select } = payload

  const liClassName = (color: string) => {
    // @ts-ignore
    const s = Stylex(style[color])
    return `rotion-gallery-multiselect-li rotion-select-${color} ${Stylex(style.li)} ${s}`
  }

  return (
    <ul className={`rotion-gallery-multiselect-ul ${Stylex(style.ul)}`}>
      {multi_select.map(v => (
        <li key={v.id} className={liClassName(v.color)}>
          <LinkedTagIfLinked pathname={path ? `${path}tags/${encodeURIComponent(v.name)}` : ''} link={link} query={query}>
            {v.name}
          </LinkedTagIfLinked>
        </li>
      ))}
    </ul>
  )
}

export default GalleryMultiSelectField
