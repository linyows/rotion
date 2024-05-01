import React from 'react'
import type { ListUrlFieldProps } from './ListUrlField.types'
import { splitUrl } from '../../lib'
import './ListUrlField.css'

const ListUrlField = ({ payload }: ListUrlFieldProps) => {
  if (!payload) {
    return <></>
  }

  const { domain, omittedPath } = splitUrl(payload)
  return (
    <div className="rotion-list-url">
      <a className="rotion-list-url-link" href={payload} rel="noreferrer" target="_blank">
        <svg className="rotion-list-url-chain" width="16" height="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" fill="currentColor">
          <path fillRule="evenodd" clipRule="evenodd" d="M4.4 3h3.085a3.4 3.4 0 0 1 3.4 3.4v.205A3.4 3.4 0 0 1 7.485 10H7V9h.485A2.4 2.4 0 0 0 9.88 6.61V6.4A2.4 2.4 0 0 0 7.49 4H4.4A2.4 2.4 0 0 0 2 6.4v.205A2.394 2.394 0 0 0 4 8.96v1a3.4 3.4 0 0 1-3-3.35V6.4A3.405 3.405 0 0 1 4.4 3zM12 7.04v-1a3.4 3.4 0 0 1 3 3.36v.205A3.405 3.405 0 0 1 11.605 13h-3.09A3.4 3.4 0 0 1 5.12 9.61V9.4A3.4 3.4 0 0 1 8.515 6H9v1h-.485A2.4 2.4 0 0 0 6.12 9.4v.205A2.4 2.4 0 0 0 8.515 12h3.09A2.4 2.4 0 0 0 14 9.61V9.4a2.394 2.394 0 0 0-2-2.36z"/>
        </svg>
        <span className="rotion-list-url-domain">
          {domain}
        </span>
        <span className="rotion-list-url-path">
          {omittedPath}
        </span>
      </a>
    </div>
  )
}

export default ListUrlField
