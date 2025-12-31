import type { PageObjectResponseEx } from '../../../exporter/index.js'
import type { GalleryProps } from './Gallery.types'
import GalleryCard from './GalleryCard/GalleryCard.js'
import '../tokens.css'
import './Gallery.css'

const Gallery = ({ keys, db, options }: GalleryProps) => {
  if (options === undefined) {
    options = {}
  }
  const { image } = options
  if (image === undefined) {
    options.image = {}
  }
  const { preview = 'cover', fit = true, size = 'medium' } = image || {}
  options.image = { preview, fit, size }

  return (
    <div className={`rotion-gallery ${fit ? 'rotion-gallery-fit' : ''}`}>
      <div className={`rotion-gallery-inner rotion-gallery-${size}`}>
        {db.results.map((v) => (
          <GalleryCard key={v.id} keys={keys} page={v as PageObjectResponseEx} options={options} />
        ))}
      </div>
    </div>
  )
}

export default Gallery
