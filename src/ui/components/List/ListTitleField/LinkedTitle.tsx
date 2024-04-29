import React from 'react'
import type { LinkedTitleProps } from './LinkedTitle.types'

const LinkedTitle = ({ title, href, link, query }: LinkedTitleProps) => {
  if (link && query) {
    const Link = link
    return (
      <Link className="rotion-list-title-link" href={{ pathname: href, query }}>
        {title}
      </Link>
    )
  } else if (link) {
    const Link = link
    return (
      <Link className="rotion-list-title-link" href={href}>
        {title}
      </Link>
    )
  }

  return (
    <a className="rotion-list-title-link" href={href} title={title}>
      {title}
    </a>
  )
}

export default LinkedTitle
