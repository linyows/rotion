'use client'

import React, { useEffect, useState } from 'react'
import { cdate } from 'cdate'
import type { TableDateFieldProps } from './TableDateField.types'
import { getDatetimeFormat } from '../../lib.js'
import './TableDateField.css'

const TableDateField = ({ date }: TableDateFieldProps) => {
  if (date === null) {
    return <></>
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
  }, [startDate, endDate])

  return (
    <div className="rotion-table-date">
      {startDate}
      {end && ` → ${endDate}`}
    </div>
  )
}

export default TableDateField
