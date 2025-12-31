'use client'

import { cdate } from 'cdate'
import { useEffect, useState } from 'react'
import { getDatetimeFormat } from '../../lib.js'
import type { ListDateFieldProps } from './ListDateField.types'
import './ListDateField.css'

const ListDateField = ({ date }: ListDateFieldProps) => {
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')

  useEffect(() => {
    if (date === null) return

    const { start, end } = date
    const { dateF, timeF } = getDatetimeFormat(window?.navigator?.language)
    setStartDate(cdate(start).format(start.length > 10 ? `${dateF} ${timeF}` : dateF))
    if (end) {
      setEndDate(cdate(end).format(end.length > 10 ? `${dateF} ${timeF}` : dateF))
    }
  }, [date])

  if (date === null) {
    return null
  }

  return (
    <div className="rotion-list-date">
      {startDate}
      {date.end && ` → ${endDate}`}
    </div>
  )
}

export default ListDateField
