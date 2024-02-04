import React from 'react'
import type { ListUrlFieldProps } from './ListUrlField.types'
import Stylex from '@stylexjs/stylex'
import { fontFamily } from '../../tokens.stylex'

const style = Stylex.create({
  wrapper: {
    fontFamily: fontFamily.sansserif,
    display: 'flex',
    whiteSpace: 'nowrap',
    margin: '0 7px',
  },
  link: {
    display: 'block',
    textDecoration: 'none',
    cursor: 'pointer',
    padding: '0 5px 4px',
    color: {
      default: 'inherit',
      ':hover': 'rgb(50, 48, 44)',
    },
    background: {
      default: 'inherit',
      ':hover': 'rgb(227, 226, 224) none repeat scroll 0% 0%',
    },
    borderRadius: '3px',
  },
  chain: {
    display: 'inline',
    width: '12px',
    height: '12px',
    marginRight: '4px',
    verticalAlign: 'middle',
  },
  address: {
    display: 'inline',
    fontSize: '.7rem',
    lineHeight: 1.2,
    whiteSpace: 'nowrap',
    backgroundImage: 'linear-gradient(to right, rgba(55, 53, 47, 0.16) 0%, rgba(55, 53, 47, 0.16) 100%)',
    backgroundRepeat: 'repeat-x',
    backgroundPosition: '0 100%',
    backgroundSize: '100% 1px',
  },
})

const ListUrlField = ({ payload }: ListUrlFieldProps) => {
  if (!payload) {
    return <></>
  }

  const regex = /https?:\/\/([0-9A-z.-]+)/
  const result = payload.match(regex)
  if (!result) {
    return <></>
  }

  const domain = result[1]
  return (
    <div className={`rotion-list-url ${Stylex(style.wrapper)}`}>
      <a className={`rotion-list-url-link ${Stylex(style.link)}`} href={payload} rel="noreferrer" target="_blank">
        <svg className={`rotion-list-url-chain ${Stylex(style.chain)}`} width="16" height="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" fill="currentColor">
          <path fillRule="evenodd" clipRule="evenodd" d="M4.4 3h3.085a3.4 3.4 0 0 1 3.4 3.4v.205A3.4 3.4 0 0 1 7.485 10H7V9h.485A2.4 2.4 0 0 0 9.88 6.61V6.4A2.4 2.4 0 0 0 7.49 4H4.4A2.4 2.4 0 0 0 2 6.4v.205A2.394 2.394 0 0 0 4 8.96v1a3.4 3.4 0 0 1-3-3.35V6.4A3.405 3.405 0 0 1 4.4 3zM12 7.04v-1a3.4 3.4 0 0 1 3 3.36v.205A3.405 3.405 0 0 1 11.605 13h-3.09A3.4 3.4 0 0 1 5.12 9.61V9.4A3.4 3.4 0 0 1 8.515 6H9v1h-.485A2.4 2.4 0 0 0 6.12 9.4v.205A2.4 2.4 0 0 0 8.515 12h3.09A2.4 2.4 0 0 0 14 9.61V9.4a2.394 2.394 0 0 0-2-2.36z"/>
        </svg>
        <span className={`rotion-list-url-address ${Stylex(style.address)}`}>
          {domain}
        </span>
      </a>
    </div>
  )
}

export default ListUrlField
