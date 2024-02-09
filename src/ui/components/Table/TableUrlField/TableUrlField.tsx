import React from 'react'
import type { TableUrlFieldProps } from './TableUrlField.types'
import Stylex from '@stylexjs/stylex'
import { tokens, link } from '../../tokens.stylex'

const style = Stylex.create({
  wrapper: {
    fontFamily: tokens.fontFamily,
    display: 'flex',
    whiteSpace: 'nowrap',
    margin: 0,
  },
  link: {
    display: 'block',
    textDecoration: link.textDecoration,
    cursor: link.cursor,
    color: {
      default: link.color,
      ':hover': link.colorHover,
    },
    background: {
      default: 'inherit',
      ':hover': 'rgb(227, 226, 224) none repeat scroll 0% 0%',
    },
    borderRadius: tokens.borderRadius,
    padding: '0 5px 2px',
  },
  address: {
    display: 'inline',
    fontSize: '.8rem',
    whiteSpace: 'nowrap',
    backgroundImage: 'linear-gradient(to right, rgba(55, 53, 47, 0.16) 0%, rgba(55, 53, 47, 0.16) 100%)',
    backgroundRepeat: 'repeat-x',
    backgroundPosition: '0 100%',
    backgroundSize: '100% 1px',
  },
})

const TableUrlField = ({ payload }: TableUrlFieldProps) => {
  if (!payload) {
    return <></>
  }

  return (
    <div className={`rotion-table-url ${Stylex(style.wrapper)}`}>
      <a className={`rotion-table-url-link ${Stylex(style.link)}`} href={payload} rel="noreferrer" target="_blank">
        <span className={`rotion-table-url-address ${Stylex(style.address)}`}>
          {payload}
        </span>
      </a>
    </div>
  )
}

export default TableUrlField
