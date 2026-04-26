'use client'

import { cdate } from 'cdate'
import type { CalendarHeaderProps } from './CalendarHeader.types'
import './CalendarHeader.css'

function detectLang(locale?: string) {
  return locale || (typeof window !== 'undefined' ? window?.navigator?.language : undefined)
}

function getMonthLabel(year: number, month: number, locale?: string) {
  const date = new Date(year, month, 1)
  const lang = detectLang(locale)
  if (lang?.includes('ja')) {
    return cdate(date).format('YYYY年M月')
  }
  return cdate(date).format('MMMM YYYY')
}

function getCalendarLabels(locale?: string) {
  const lang = detectLang(locale)
  if (lang?.includes('ja')) {
    return { today: '今日', previousMonth: '前月', nextMonth: '翌月' }
  }
  return { today: 'Today', previousMonth: 'Previous month', nextMonth: 'Next month' }
}

const CalendarHeader = ({ year, month, locale, onPrev, onNext, onToday }: CalendarHeaderProps) => {
  const labels = getCalendarLabels(locale)
  return (
    <div className="rotion-calendar-header">
      <div className="rotion-calendar-header-label">{getMonthLabel(year, month, locale)}</div>
      <div className="rotion-calendar-header-actions">
        <button type="button" className="rotion-calendar-header-button" onClick={onPrev} aria-label={labels.previousMonth}>
          ‹
        </button>
        <button type="button" className="rotion-calendar-header-today" onClick={onToday}>
          {labels.today}
        </button>
        <button type="button" className="rotion-calendar-header-button" onClick={onNext} aria-label={labels.nextMonth}>
          ›
        </button>
      </div>
    </div>
  )
}

export default CalendarHeader
