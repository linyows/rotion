import React, { useEffect, useState } from 'react'
import { cdate } from 'cdate'
import type { GalleryDateFieldProps } from './DateField.types'
import { getDatetimeFormat } from '../../lib'

const GalleryDateField = ({ payload }: GalleryDateFieldProps) => {
  if (payload === null) {
    return <></>
  }

  const { start, end } = payload
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')

  useEffect(() => {
    const { dateF, timeF } = getDatetimeFormat(window?.navigator?.language)
    setStartDate(cdate(start).format(start.length > 10 ? `${dateF} ${timeF}` : dateF))
    if (end) {
      setEndDate(cdate(end).format(end.length > 10 ? `${dateF} ${timeF}` : dateF))
    }
  }, [startDate, endDate])

  return (
    <div className="rotion-gallery-date">
      {startDate}
      {end && ` → ${endDate}`}
    </div>
  )
}

export default GalleryDateField
