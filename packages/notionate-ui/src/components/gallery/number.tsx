import React from 'react'
import type {
  NumberPropertyItemObjectResponse,
} from 'notionate-pages'

export type GalleryNumberProps = {
  payload: NumberPropertyItemObjectResponse
}

export const GalleryNumberField: React.FC<GalleryNumberProps> = ({ payload }) => {
  return (
    <div className="notionate-gallery-number">
      {payload.number}
    </div>
  )
}

export default GalleryNumberField
