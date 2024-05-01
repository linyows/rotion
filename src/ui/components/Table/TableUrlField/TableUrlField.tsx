import React from 'react'
import type { TableUrlFieldProps } from './TableUrlField.types'
import { splitUrl } from '../../lib'
import './TableUrlField.css'

const TableUrlField = ({ payload }: TableUrlFieldProps) => {
  if (!payload) {
    return <></>
  }
  const { domain, omittedPath } = splitUrl(payload)
  return (
    <div className="rotion-table-url">
      <a className="rotion-table-url-link" href={payload} rel="noreferrer" target="_blank">
        <span className="rotion-table-url-domain">
          {domain}
        </span>
        <span className="rotion-table-url-path">
          {omittedPath}
        </span>
      </a>
    </div>
  )
}

export default TableUrlField
