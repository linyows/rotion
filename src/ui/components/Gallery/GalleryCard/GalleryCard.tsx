import React from 'react'
import type {
  DatabaseProperty,
  PageObjectResponseEx,
} from '../../../../exporter'
import GalleryHandler from './GalleryHandler'
import { getLinkPathAndLinkKey, getSlug } from '../../lib'
import GalleryLinkedCard from './GalleryLinkedCard'
import GalleryPreview from '../GalleryPreview/GalleryPreview'
import type { GalleryCardProps } from './GalleryCard.types'
import type { GalleryPropertyOptions } from './GalleryHandler.types'
import type { GalleryOptions } from '../Gallery.types'
import './GalleryCard.css'

function findTitlePropertyName (page: PageObjectResponseEx) {
  for (const key in page.properties) {
    const p = page.properties[key]
    if (p.type === 'title') {
      return key
    }
  }
  return
}

function setPathnamePrefixAndSuffix (name: string, dstOpts: GalleryPropertyOptions, srcOpts?: GalleryOptions) {
  if (!srcOpts) {
    return dstOpts
  }
  const { href, prefix, suffix } = srcOpts || {}

  if (href && href[name]) {
    dstOpts.pathname = href[name]
  }
  if (prefix && prefix[name]) {
    dstOpts.prefix = prefix[name]
  }
  if (suffix && suffix[name]) {
    dstOpts.suffix = suffix[name]
  }

  return dstOpts
}

const GalleryCard = ({ keys, page, options }: GalleryCardProps) => {
  const titleKey = findTitlePropertyName(page)
  if (!titleKey) {
    return <></>
  }

  const { href, link, query, image } = options || {}
  let opts: GalleryPropertyOptions = { link, query }

  if (href && href[titleKey]) {
    const [path, slugKey] = getLinkPathAndLinkKey(href[titleKey])
    opts.pathname = (slugKey === '') ? path : `${path}${getSlug(slugKey, page)}`
  }

  return (
    <GalleryLinkedCard pathname={opts.pathname} link={link} query={query}>
      {image?.preview && page.cover?.src && <GalleryPreview src={page.cover.src} options={image} />}
      <div className="rotion-gallery-card-text">
        {keys.map((name, i) => (
          <div key={`${page.id}${name}`} className={`field${i}`}>
            <GalleryHandler property={page.properties[name] as DatabaseProperty | undefined} options={setPathnamePrefixAndSuffix(name, structuredClone(opts), options)} />
          </div>
        ))}
      </div>
    </GalleryLinkedCard>
  )
}

export default GalleryCard
