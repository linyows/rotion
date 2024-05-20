import React from 'react'
import type {
  DatabaseProperty,
  GetPageResponse,
  PageObjectResponseEx,
} from '../../../../exporter'
import GalleryHandler from './GalleryHandler'
import { getLinkPathAndLinkKey } from '../../lib'
import GalleryLinkedCard from './GalleryLinkedCard'
import GalleryPreview from './GalleryPreview'
import type { GalleryCardProps } from './GalleryCard.types'
import './GalleryCard.css'

function getSlug (key: string, page: GetPageResponse) {
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

function buildHref (page: PageObjectResponseEx, link?: string) {
  if (!link) {
    return ''
  }
  const [path, slugKey] = getLinkPathAndLinkKey(link)
  const slug = getSlug(slugKey, page)
  return `${path}${slug}`
}

const GalleryCard = ({ keys, page, href, link, query, preview, size, fit }: GalleryCardProps) => {
  const path = getLinkPathAndLinkKey(href)[0]

  return (
    <div className="rotion-gallery-card">
      <GalleryLinkedCard href={buildHref(page, href)} link={link} query={query}>
        {preview && <GalleryPreview src={page.cover?.src} size={size} fit={fit} />}
        <div className="rotion-gallery-card-text">
          {keys.map((name, i) => (
            <div key={`${page.id}${name}`} className={`field${i}`}>
              <GalleryHandler property={page.properties[name] as DatabaseProperty | undefined} path={path} query={query} size={size} />
            </div>
          ))}
        </div>
      </GalleryLinkedCard>
    </div>
  )
}

export default GalleryCard
