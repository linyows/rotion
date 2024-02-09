import React from 'react'
import Page from '../Page'
import type { ColumnListBlockProps } from './ColumnListBlock.types'
import Stylex from '@stylexjs/stylex'
import { tokens } from '../../tokens.stylex'

const style = Stylex.create({
  wrapper: {
    fontFamily: tokens.fontFamily,
    width: '100%',
    margin: '1rem 0',
    display: {
      default: 'grid',
      '@media (max-width: 580px)': 'block',
    },
    gap: '5%',
  },
  column: {
    margin: '0 0 1rem',
  },
})

const ColumnListBlock = ({ block, href, link, query }: ColumnListBlockProps) => {
  const columns = block.columns.map((v, i) => {
    return (
      <div key={i} className={`rotion-columnlist-column ${Stylex(style.column)}`}>
        <Page blocks={v} href={href} link={link} query={query} />
      </div>
    )
  })

  const l = columns.length
  const columnlistStyle = {
    gridTemplate: `repeat(1, 1fr) / repeat(${l}, 1fr)`,
  }

  return (
    <div className={`rotion-columnlist ${Stylex(style.wrapper)}`} style={columnlistStyle}>
      {columns}
    </div>
  )
}

export default ColumnListBlock
