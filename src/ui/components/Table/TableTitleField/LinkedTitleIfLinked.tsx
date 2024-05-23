import React from 'react'
import type { LinkedTitleIfLinkedProps } from './LinkedTitleIfLinked.types'
import './LinkedTitleIfLinked.css'

const LinkedTitleIfLinked = ({ options, children }: LinkedTitleIfLinkedProps) => {
  if (options?.pathname && options?.link) {
    const Link = options.link
    return (
      <Link className="rotion-table-title-wrapper rotion-table-title-link" href={options?.query ? { pathname: options.pathname, query: options.query } : options.pathname}>
        {children}
      </Link>
    )
  }

  if (options?.pathname) {
    return (
      <a className="rotion-table-title-wrapper rotion-table-title-link" href={options.pathname}>
        {children}
      </a>
    )
  }


  return (
    <span className="rotion-table-title-wrapper">
      {children}
    </span>
  )
}

export default LinkedTitleIfLinked
