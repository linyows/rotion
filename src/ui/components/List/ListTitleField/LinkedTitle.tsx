import React from 'react'
import type { LinkedTitleProps } from './LinkedTitle.types'
import './LinkedTitle.css'
import { RichText } from '../../RichText'

const LinkedTitle = ({ textObjects, href, link, query }: LinkedTitleProps) => {
  const className = () => {
    return `rotion-list-title-wrapper ${href ? 'rotion-list-title-link' : ''}`
  }

  if (href && link && query) {
    const Link = link
    return (
      <Link className={className()} href={{ pathname: href, query }}>
        {textObjects.map((t, i) => <RichText key={`richtext-${i}`} textObject={t} />)}
      </Link>
    )

  } else if (href && link) {
    const Link = link
    return (
      <Link className={className()} href={href}>
        {textObjects.map((t, i) => <RichText key={`richtext-${i}`} textObject={t} />)}
      </Link>
    )

  } else if (href) {
    return (
      <a className={className()} href={href}>
        {textObjects.map((t, i) => <RichText key={`richtext-${i}`} textObject={t} />)}
      </a>
    )
  }

  return (
    <span className={className()}>
      {textObjects.map((t, i) => <RichText key={`richtext-${i}`} textObject={t} />)}
    </span>
  )
}

export default LinkedTitle
