'use client'

import { cdate } from 'cdate'
import type { CalendarHeaderProps } from './CalendarHeader.types'
import './CalendarHeader.css'

function getMonthLabel(year: number, month: number, locale?: string) {
  const date = new Date(year, month, 1)
  const lang = locale || (typeof window !== 'undefined' ? window?.navigator?.language : undefined)
  if (lang?.includes('ja')) {
    return cdate(date).format('YYYY年M月')
  }
  return cdate(date).format('MMMM YYYY')
}

const CalendarHeader = ({ year, month, locale, onPrev, onNext, onToday }: CalendarHeaderProps) => {
  return (
    <div className="rotion-calendar-header">
      <div className="rotion-calendar-header-label">{getMonthLabel(year, month, locale)}</div>
      <div className="rotion-calendar-header-actions">
        <button type="button" className="rotion-calendar-header-button" onClick={onPrev} aria-label="Previous month">
          ‹
        </button>
        <button type="button" className="rotion-calendar-header-today" onClick={onToday}>
          Today
        </button>
        <button type="button" className="rotion-calendar-header-button" onClick={onNext} aria-label="Next month">
          ›
        </button>
      </div>
    </div>
  )
}

export default CalendarHeader
