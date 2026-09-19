import type { DatabaseProperty, PageObjectResponseEx } from '../../../../exporter/index.js'
import { getLinkPathAndLinkKey, getSlug } from '../../lib.js'
import GalleryPreview from '../GalleryPreview/GalleryPreview.js'
import type { GalleryCardProps } from './GalleryCard.types'
import GalleryHandler from './GalleryHandler.js'
import type { GalleryPropertyOptions } from './GalleryHandler.types'
import GalleryLinkedCard from './GalleryLinkedCard.js'
import { propertyOptions } from './options.js'
import './GalleryCard.css'

function findTitlePropertyName(page: PageObjectResponseEx) {
  for (const key in page.properties) {
    const p = page.properties[key]
    if (p.type === 'title') {
      return key
    }
  }
}

const GalleryCard = ({ keys, page, options }: GalleryCardProps) => {
  const titleKey = findTitlePropertyName(page)
  if (!titleKey) {
    return null
  }

  const { href, link, query, image } = options || {}
  const opts: GalleryPropertyOptions = { link, query }

  if (href?.[titleKey]) {
    const [path, slugKey] = getLinkPathAndLinkKey(href[titleKey])
    opts.pathname = slugKey === '' ? path : `${path}${getSlug(slugKey, page)}`
  }

  return (
    <GalleryLinkedCard pathname={opts.pathname} link={link} query={query}>
      {image?.preview && page.cover?.src && <GalleryPreview src={page.cover.src} options={image} />}
      <div className="rotion-gallery-card-text">
        {keys.map((name, i) => (
          <div key={`${page.id}${name}`} className={`field${i}`}>
            <GalleryHandler
              property={page.properties[name] as DatabaseProperty | undefined}
              options={propertyOptions(name, opts, options)}
            />
          </div>
        ))}
      </div>
    </GalleryLinkedCard>
  )
}

export default GalleryCard
