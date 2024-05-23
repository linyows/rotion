import React from 'react'
import type {
  DatabaseProperty,
  PageObjectResponseEx,
} from '../../../../exporter'
import GalleryHandler from './GalleryHandler'
import { getLinkPathAndLinkKey, getSlug } from '../../lib'
import GalleryLinkedCard from './GalleryLinkedCard'
import GalleryPreview from './GalleryPreview'
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

  if (srcOpts?.href && srcOpts.href[name]) {
    dstOpts.pathname = srcOpts.href[name]
  }
  if (srcOpts?.prefix && srcOpts.prefix[name]) {
    dstOpts.prefix = srcOpts.prefix[name]
  }
  if (srcOpts?.suffix && srcOpts.suffix[name]) {
    dstOpts.suffix = srcOpts.suffix[name]
  }

  return dstOpts
}

const GalleryCard = ({ keys, page, options }: GalleryCardProps) => {
  const titleKey = findTitlePropertyName(page)
  if (!titleKey) {
    return <></>
  }

  let opts: GalleryPropertyOptions = {}

  if (options?.href && options?.href[titleKey]) {
    const [path, slugKey] = getLinkPathAndLinkKey(options.href[titleKey])
    opts.pathname = (slugKey === '') ? path : `${path}${getSlug(slugKey, page)}`
  }

  return (
    <GalleryLinkedCard pathname={opts.pathname} link={opts.link} query={opts.query}>
      {options?.image?.preview && page.cover?.src && <GalleryPreview src={page.cover.src} options={options?.image} />}
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
