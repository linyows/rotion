import React from 'react'
import type { DateResponse } from '../../server/types'

export const GalleryDateField: React.FC<{ payload: DateResponse | null }> = ({ payload }) => {
  return (
    <div className="notionate-gallery-date">
      {payload?.start}
    </div>
  )
}

export default GalleryDateField
