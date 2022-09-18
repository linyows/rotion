import React, { ReactElement } from 'react'
import type {
  QueryDatabaseResponseEx,
  GetPageResponse,
  PageObjectResponseEx,
} from '../../server/types'
import GalleryHandler from './handler'
import { getLinkPathAndLinkKey } from '../lib/linkpath'

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
  link?: React.FC<{ children: ReactElement<'a'>, href: string}>
  href: string
}

const LinkedCard: React.FC<LinkedCardProps> = ({ children, link, href }) => {
  if (link) {
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
  link?: React.FC<{ children: ReactElement<'a'>, href: string}>
  preview?: 'cover' | 'content'
}

const Preview: React.FC<{ src?: string }> = ({ src }) => {
  return (
    <div className="notionate-gallery-preview">
      {src && <img src={src} />}
    </div>
  )
}

const Card: React.FC<CardProps> = ({ keys, page, href, link, preview }) => {
  const findItems = (name: string, page: PageObjectResponseEx) => {
    let propertyId = ''
    for (const [k, v] of Object.entries(page.properties)) {
      if (k === name) {
        propertyId = v.id
      }
    }
    return page.property_items.find(v => ((v.object === 'property_item' && v.id === propertyId) || (v.object === 'list' && v.property_item.id === propertyId)))
  }
  const [path, slugKey] = getLinkPathAndLinkKey(href)
  const slug = getSlug(slugKey, page)

  return (
    <div className="notionate-gallery-card">
      <LinkedCard href={buildHref(page, href)} link={link}>
        {preview && <Preview src={page.cover?.src} />}
        <div className="notionate-gallery-card-text">
          {keys.map((name, i) => (
            <div key={`${page.id}${name}`} className={`field${i}`}>
              {GalleryHandler({ name, items: findItems(name, page), path, slug, link })}
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
  link?: React.FC<{ children: ReactElement<'a'>, href: string}>
  // page-content is nut supported
  preview?: 'cover' | 'content'
  size?: 'small' | 'medium' | 'large'
  fit?: boolean
}

export const Gallery: React.FC<GalleryProps> = ({ keys, db, href, link, preview, size, fit }) => {
  const fitClass = `${fit ? ' notionate-gallery-fit' : ''}`
  const sizeClass = ` notionate-gallery-${size || 'medium'}`
  return (
    <div className={`notionate-gallery${fitClass}`}>
      <div className={`notionate-gallery-inner${sizeClass}`}>
        {db.results.map((v) => (
          <Card key={v.id} keys={keys} page={v as PageObjectResponseEx} href={href || ''} link={link} preview={preview} />
        ))}
      </div>
    </div>
  )
}

export default Gallery
