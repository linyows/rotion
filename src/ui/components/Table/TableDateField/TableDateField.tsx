'use client'

import { cdate } from 'cdate'
import { useEffect, useState } from 'react'
import { getDatetimeFormat } from '../../lib.js'
import type { TableDateFieldProps } from './TableDateField.types'
import './TableDateField.css'

const TableDateField = ({ date }: TableDateFieldProps) => {
  if (date === null) {
    return null
  }

  const { start, end } = date
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')

  useEffect(() => {
    const { dateF, timeF } = getDatetimeFormat(window?.navigator?.language)
    setStartDate(cdate(start).format(start.length > 10 ? `${dateF} ${timeF}` : dateF))
    if (end) {
      setEndDate(cdate(end).format(end.length > 10 ? `${dateF} ${timeF}` : dateF))
    }
  }, [end, start])

  return (
    <div className="rotion-table-date">
      {startDate}
      {end && ` → ${endDate}`}
    </div>
  )
}

export default TableDateField
