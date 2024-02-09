import React from 'react'
import type {
  GetPageResponse,
  PageObjectResponseEx,
} from '../../../../exporter'
import GalleryHandler from './GalleryHandler'
import { getLinkPathAndLinkKey } from '../../lib'
import GalleryLinkedCard from './GalleryLinkedCard'
import GalleryPreview from './GalleryPreview'
import type { GalleryCardProps } from './GalleryCard.types'
import Stylex from '@stylexjs/stylex'
import { tokens } from '../../tokens.stylex'

const style = Stylex.create({
  wrapper: {
    fontFamily: tokens.fontFamily,
    display: 'block',
    color: 'inherit',
    textDecoration: 'none',
    boxShadow: 'rgb(15 15 15 / 10%) 0px 0px 0px 1px, rgb(15 15 15 / 10%) 0px 2px 4px',
    borderRadius: '3px',
    background: {
      default: 'white',
      ':hover': 'rgba(55, 53, 47, 0.03)',
    },
    overflow: 'hidden',
    transition: 'background 100ms ease-out 0s',
    position: 'static',
    height: '100%',
    cursor: 'pointer',
  },
  inner: {
    position: 'relative',
    paddingBottom: '1rem',
    display: 'grid',
    gap: '16px',
  },
  small: {
    gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))',
  },
  medium: {
    gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
  },
  large: {
    gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
  },
  text: {
    paddingBottom: '10px',
  },
})

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

function findItems (name: string, page: PageObjectResponseEx) {
  let propertyId = ''
  for (const [k, v] of Object.entries(page.properties)) {
    if (k === name) {
      propertyId = v.id
    }
  }
  return page.property_items.find(v => ((v.object === 'property_item' && v.id === propertyId) || (v.object === 'list' && v.property_item.id === propertyId)))
}

const GalleryCard = ({ keys, page, href, link, query, preview, size, fit }: GalleryCardProps) => {
  const path = getLinkPathAndLinkKey(href)[0]

  return (
    <div className={`rotion-gallery-card ${Stylex(style.wrapper)}`}>
      <GalleryLinkedCard href={buildHref(page, href)} link={link} query={query}>
        {preview && <GalleryPreview src={page.cover?.src} size={size} fit={fit} />}
        <div className={`rotion-gallery-card-text ${Stylex(style.text)}`}>
          {keys.map((name, i) => (
            <div key={`${page.id}${name}`} className={`field${i}`}>
              <GalleryHandler items={findItems(name, page)} path={path} query={query} size={size} />
            </div>
          ))}
        </div>
      </GalleryLinkedCard>
    </div>
  )
}

export default GalleryCard
