import type { GallerySelectFieldProps } from './GallerySelectField.types'
import LinkedTagIfLinked from './LinkedTag.js'
import './GallerySelectField.css'

const GalleryMultiSelectField = ({ select, options }: GallerySelectFieldProps) => {
  const { name, color } = select
  const { pathname, link, query } = options || {}
  return (
    <div className="rotion-gallery-select">
      <span className={`rotion-gallery-select-wrapper rotion-gallery-select-${color}`}>
        <LinkedTagIfLinked
          pathname={pathname ? `${pathname}/${encodeURIComponent(name)}` : undefined}
          link={link}
          query={query}
        >
          {name}
        </LinkedTagIfLinked>
      </span>
    </div>
  )
}

export default GalleryMultiSelectField
