import React from 'react'
import type { GalleryMultiSelectFieldProps } from './GalleryMultiSelectField.types'
import Stylex from '@stylexjs/stylex'
import { fontFamily, color } from '../../tokens.stylex'
import LinkedTagIfLinked from './LinkedTag'

const style = Stylex.create({
  wrapper: {
    fontFamily: fontFamily.sansserif,
    width: '100%',
    padding: '8px 10px',
    display: 'flex',
    alignItems: 'center',
    fontSize: '12px',
    whiteSpace: 'nowrap',
  },
  link: {
    textDecoration: 'none',
    color: 'inherit',
    cursor: 'pointer',
    padding: '2px 10px',
  },
  ul: {
    listStyleType: 'none',
    display: 'flex',
    flexShrink: 0,
    alignItems: 'center',
    padding: '0 0 8px',
    margin: '0 0 0 7px',
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
