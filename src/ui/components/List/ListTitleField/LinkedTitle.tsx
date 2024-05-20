import React from 'react'
import type { LinkedTitleProps } from './LinkedTitle.types'
import './LinkedTitle.css'
import { RichText } from '../../RichText'

const LinkedTitle = ({ textObjects, href, link, query }: LinkedTitleProps) => {
  if (link && query) {
    const Link = link
    return (
      <Link className="rotion-list-title-link" href={{ pathname: href, query }}>
        {textObjects.map((t, i) => <RichText key={`richtext-${i}`} textObject={t} />)}
      </Link>
    )
  } else if (link) {
    const Link = link
    return (
      <Link className="rotion-list-title-link" href={href}>
        {textObjects.map((t, i) => <RichText key={`richtext-${i}`} textObject={t} />)}
      </Link>
    )
  }

  return (
    <a className="rotion-list-title-link" href={href}>
      {textObjects.map((t, i) => <RichText key={`richtext-${i}`} textObject={t} />)}
    </a>
  )
}

export default LinkedTitle
