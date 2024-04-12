import React from 'react'
import type { TableUrlFieldProps } from './TableUrlField.types'
import Stylex from '@stylexjs/stylex'
import { tokens, link, table } from '../../tokens.stylex'
import { splitUrl } from '../../lib'

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
      ':hover': table.linkBgHover,
    },
    borderRadius: tokens.borderRadius,
    padding: '0 5px 2px',
  },
  domain: {
    display: 'inline',
    fontSize: '.8rem',
    whiteSpace: 'nowrap',
  },
  path: {
    display: 'inline',
    fontSize: '.8rem',
    whiteSpace: 'nowrap',
    color: tokens.thirdText,
  },
})

const TableUrlField = ({ payload }: TableUrlFieldProps) => {
  if (!payload) {
    return <></>
  }
  const { domain, omittedPath } = splitUrl(payload)
  return (
    <div className={`rotion-table-url ${Stylex(style.wrapper)}`}>
      <a className={`rotion-table-url-link ${Stylex(style.link)}`} href={payload} rel="noreferrer" target="_blank">
        <span className={`rotion-table-url-domain ${Stylex(style.domain)}`}>
          {domain}
        </span>
        <span className={`rotion-table-url-path ${Stylex(style.path)}`}>
          {omittedPath}
        </span>
      </a>
    </div>
  )
}

export default TableUrlField
