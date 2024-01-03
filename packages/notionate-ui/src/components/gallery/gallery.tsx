import React from 'react'
import { Link } from '../types'
import type {
  QueryDatabaseResponseEx,
  GetPageResponse,
  PageObjectResponseEx,
} from 'notionate-pages'
import GalleryHandler from './handler'
import { getLinkPathAndLinkKey } from '../lib/linkpath'
import type { ParsedUrlQueryInput } from 'node:querystring'

const getSlug = (key: string, page: GetPageResponse): string => {
  if (!('properties' in page)) {
    return 'not-found-properties'
  }
  if (key === 'id') {
    return page.id
  }
  if (!(key in page.properties)) {
    return 'not-found-key-in-page-properties'
  }
  const p = page.properties[key]
  if (!('rich_text' in p)) {
    return 'not-found-richtext-in-key'
  }
  // @ts-ignore
  return p.rich_text.map(v => v.text.content).join(',')
}

const buildHref = (page: PageObjectResponseEx, link?: string) => {
  if (link === undefined) {
    return ''
  }
  const [path, slugKey] = getLinkPathAndLinkKey(link)
  const slug = getSlug(slugKey, page)
  return `${path}${slug}`
}

type LinkedCardProps = React.PropsWithChildren & {
  link?: Link
  query?: ParsedUrlQueryInput
  href: string
}

const LinkedCard: React.FC<LinkedCardProps> = ({ children, link, query, href }) => {
  if (link && query) {
    const Link = link as unknown as Link
    return (
      <Link href={{ pathname: href, query }}>
        <div className="notionate-gallery-a">
          {children}
        </div>
      </Link>
    )
  } else if (link) {
    const Link = link
    return (
      <Link href={href}>
        <div className="notionate-gallery-a">
          {children}
        </div>
      </Link>
    )
  }

  return (
    <>
      {children}
    </>
  )
}

type CardProps = {
  keys: string[]
  page: PageObjectResponseEx
  href: string
  link?: Link
  query?: ParsedUrlQueryInput
  preview?: 'cover' | 'content'
}

const Preview: React.FC<{ src?: string }> = ({ src }) => {
  return (
    <div className="notionate-gallery-preview">
      {src && <img src={src} />}
    </div>
  )
}

const Card: React.FC<CardProps> = ({ keys, page, href, link, query, preview }) => {
  const findItems = (name: string, page: PageObjectResponseEx) => {
    let propertyId = ''
    for (const [k, v] of Object.entries(page.properties)) {
      if (k === name) {
        propertyId = v.id
      }
    }
    return page.property_items.find(v => ((v.object === 'property_item' && v.id === propertyId) || (v.object === 'list' && v.property_item.id === propertyId)))
  }
  const path = getLinkPathAndLinkKey(href)[0]

  return (
    <div className="notionate-gallery-card">
      <LinkedCard href={buildHref(page, href)} link={link}>
        {preview && <Preview src={page.cover?.src} />}
        <div className="notionate-gallery-card-text">
          {keys.map((name, i) => (
            <div key={`${page.id}${name}`} className={`field${i}`}>
              {GalleryHandler({ items: findItems(name, page), path })}
            </div>
          ))}
        </div>
      </LinkedCard>
    </div>
  )
}

export type GalleryProps = React.PropsWithChildren & {
  keys: string[]
  db: QueryDatabaseResponseEx
  href?: string
  link?: Link
  query?: ParsedUrlQueryInput
  // page-content is nut supported
  preview?: 'cover' | 'content'
  size?: 'small' | 'medium' | 'large'
  fit?: boolean
}

export const Gallery: React.FC<GalleryProps> = ({ keys, db, href, link, query, preview, size, fit }) => {
  const fitClass = `${fit ? ' notionate-gallery-fit' : ''}`
  const sizeClass = ` notionate-gallery-${size || 'medium'}`
  return (
    <div className={`notionate-gallery${fitClass}`}>
      <div className={`notionate-gallery-inner${sizeClass}`}>
        {db.results.map((v) => (
          <Card key={v.id} keys={keys} page={v as PageObjectResponseEx} href={href || ''} link={link} query={query} preview={preview} />
        ))}
      </div>
    </div>
  )
}

export default Gallery
