import React from 'react'
import type {
  GetPageResponse,
  PageObjectResponseEx,
} from 'notionate-pages'
import GalleryHandler from './GalleryHandler'
import { getLinkPathAndLinkKey } from '../../lib/linkpath'
import GalleryLinkedCard from './GalleryLinkedCard'
import GalleryPreview from './GalleryPreview'
import type { GalleryCardProps } from './GalleryCard.types'

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

const GalleryCard = ({ keys, page, href, link, query, preview }: GalleryCardProps) => {
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
      <GalleryLinkedCard href={buildHref(page, href)} link={link}>
        {preview && <GalleryPreview src={page.cover?.src} />}
        <div className="notionate-gallery-card-text">
          {keys.map((name, i) => (
            <div key={`${page.id}${name}`} className={`field${i}`}>
              {GalleryHandler({ items: findItems(name, page), path })}
            </div>
          ))}
        </div>
      </GalleryLinkedCard>
    </div>
  )
}

export default GalleryCard
