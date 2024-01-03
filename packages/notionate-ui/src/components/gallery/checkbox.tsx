import React from 'react'

export type GalleryCheckboxProps = {
  payload: boolean
}

export const GalleryCheckboxField: React.FC<GalleryCheckboxProps> = ({ payload }) => {
  return (
    <div className="notionate-gallery-checkbox">
      {payload}
    </div>
  )
}

export default GalleryCheckboxField
