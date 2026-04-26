'use client'

import { useMemo, useState } from 'react'
import type { PageObjectResponseEx } from '../../../exporter/index.js'
import type { CalendarProps } from './Calendar.types'
import CalendarHeader from './CalendarHeader/CalendarHeader.js'
import CalendarWeek from './CalendarWeek/CalendarWeek.js'
import type { PlacedEvent } from './CalendarWeek/CalendarWeek.types.js'
import { dateKey } from './lib.js'
import '../tokens.css'
import './Calendar.css'

const WEEKDAYS_SUN = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
const WEEKDAYS_MON = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
const WEEKDAYS_SUN_JA = ['日', '月', '火', '水', '木', '金', '土']
const WEEKDAYS_MON_JA = ['月', '火', '水', '木', '金', '土', '日']

type ParsedEvent = { page: PageObjectResponseEx; range: { start: Date; end: Date } }

function detectLang(locale?: string) {
  return locale || (typeof navigator !== 'undefined' ? navigator.language : undefined)
}

function getWeekdayLabels(weekStart: 'sunday' | 'monday', locale?: string) {
  const lang = detectLang(locale)
  try {
    const formatter = new Intl.DateTimeFormat(lang, { weekday: 'short' })
    const baseSunday = new Date(Date.UTC(2024, 0, 7))
    const labels = Array.from({ length: 7 }, (_, i) => {
      const d = new Date(baseSunday)
      d.setUTCDate(baseSunday.getUTCDate() + i)
      return formatter.format(d)
    })
    if (weekStart === 'monday') {
      return [...labels.slice(1), labels[0]]
    }
    return labels
  } catch {
    const isJa = lang?.includes('ja')
    if (weekStart === 'monday') return isJa ? WEEKDAYS_MON_JA : WEEKDAYS_MON
    return isJa ? WEEKDAYS_SUN_JA : WEEKDAYS_SUN
  }
}

function parseInitialDate(initialDate?: string): Date {
  if (!initialDate) return new Date()
  const m = /^(\d{4})-(\d{2})(?:-(\d{2}))?/.exec(initialDate)
  if (!m) return new Date()
  const year = Number.parseInt(m[1], 10)
  const month = Number.parseInt(m[2], 10) - 1
  const day = m[3] ? Number.parseInt(m[3], 10) : 1
  return new Date(year, month, day)
}

function buildCalendarDays(year: number, month: number, weekStart: 'sunday' | 'monday') {
  const firstOfMonth = new Date(year, month, 1)
  const startOffset = weekStart === 'monday' ? (firstOfMonth.getDay() + 6) % 7 : firstOfMonth.getDay()
  const start = new Date(year, month, 1 - startOffset)
  const days: Date[] = []
  for (let i = 0; i < 42; i++) {
    days.push(new Date(start.getFullYear(), start.getMonth(), start.getDate() + i))
  }
  // Trim to 5 weeks if the 6th week is entirely in the next month
  const sixthWeekStart = days[35]
  if (sixthWeekStart && sixthWeekStart.getMonth() !== month) {
    return days.slice(0, 35)
  }
  return days
}

function dayDiff(a: Date, b: Date) {
  const ms = new Date(a.getFullYear(), a.getMonth(), a.getDate()).getTime() - new Date(b.getFullYear(), b.getMonth(), b.getDate()).getTime()
  return Math.round(ms / 86400000)
}

function getEventDateRange(page: PageObjectResponseEx, dateKeyName: string): { start: Date; end: Date } | null {
  const property = page.properties[dateKeyName]
  if (!property || property.type !== 'date' || !property.date) {
    return null
  }
  const startStr = property.date.start
  const endStr = property.date.end || property.date.start
  const start = parseDateOnly(startStr)
  const end = parseDateOnly(endStr)
  if (!(start && end)) return null
  return { start, end }
}

function parseDateOnly(s: string): Date | null {
  // Accept either YYYY-MM-DD or full ISO; treat as local date (date-only).
  const m = /^(\d{4})-(\d{2})-(\d{2})/.exec(s)
  if (!m) return null
  return new Date(Number.parseInt(m[1], 10), Number.parseInt(m[2], 10) - 1, Number.parseInt(m[3], 10))
}

function parseAllEvents(pages: PageObjectResponseEx[], dateKeyName: string): ParsedEvent[] {
  const list: ParsedEvent[] = []
  for (const page of pages) {
    const range = getEventDateRange(page, dateKeyName)
    if (!range) continue
    list.push({ page, range })
  }
  list.sort((a, b) => {
    const sd = a.range.start.getTime() - b.range.start.getTime()
    if (sd !== 0) return sd
    return b.range.end.getTime() - a.range.end.getTime()
  })
  return list
}

function placeWeekEvents(weekStart: Date, events: ParsedEvent[]): { placed: PlacedEvent[]; slotCount: number } {
  const weekEnd = new Date(weekStart.getFullYear(), weekStart.getMonth(), weekStart.getDate() + 6)
  const occupancy: boolean[][] = []
  const placed: PlacedEvent[] = []

  for (const { page, range } of events) {
    if (range.end < weekStart || range.start > weekEnd) continue

    const startCol = Math.max(0, dayDiff(range.start, weekStart))
    const endCol = Math.min(6, dayDiff(range.end, weekStart))
    const span = endCol - startCol + 1
    if (span <= 0) continue

    let slot = 0
    while (true) {
      if (!occupancy[slot]) occupancy[slot] = [false, false, false, false, false, false, false]
      let free = true
      for (let c = startCol; c <= endCol; c++) {
        if (occupancy[slot][c]) {
          free = false
          break
        }
      }
      if (free) {
        for (let c = startCol; c <= endCol; c++) {
          occupancy[slot][c] = true
        }
        placed.push({
          page,
          startCol,
          span,
          slot,
          isStart: dayDiff(range.start, weekStart) >= 0,
          isEnd: dayDiff(range.end, weekStart) <= 6,
        })
        break
      }
      slot++
    }
  }

  return { placed, slotCount: occupancy.length }
}

const Calendar = ({ keys, date, db, options }: CalendarProps) => {
  const weekStart = options?.weekStart || 'sunday'
  const initial = parseInitialDate(options?.initialDate)
  const [cursor, setCursor] = useState<{ year: number; month: number }>({
    year: initial.getFullYear(),
    month: initial.getMonth(),
  })

  const today = new Date()
  const days = useMemo(() => buildCalendarDays(cursor.year, cursor.month, weekStart), [cursor.year, cursor.month, weekStart])

  const parsedEvents = useMemo(
    () => parseAllEvents(db.results as PageObjectResponseEx[], date),
    [db.results, date],
  )

  const weeks = useMemo(() => {
    const result: { weekStart: Date; placement: { placed: PlacedEvent[]; slotCount: number } }[] = []
    for (let i = 0; i < days.length; i += 7) {
      const ws = days[i]
      result.push({ weekStart: ws, placement: placeWeekEvents(ws, parsedEvents) })
    }
    return result
  }, [days, parsedEvents])

  const weekdayLabels = getWeekdayLabels(weekStart, options?.locale)

  const goPrev = () => {
    setCursor((c) => {
      const next = new Date(c.year, c.month - 1, 1)
      return { year: next.getFullYear(), month: next.getMonth() }
    })
  }
  const goNext = () => {
    setCursor((c) => {
      const next = new Date(c.year, c.month + 1, 1)
      return { year: next.getFullYear(), month: next.getMonth() }
    })
  }
  const goToday = () => {
    const now = new Date()
    setCursor({ year: now.getFullYear(), month: now.getMonth() })
  }

  const todayKey = dateKey(today)

  return (
    <div className="rotion-calendar">
      <CalendarHeader
        year={cursor.year}
        month={cursor.month}
        locale={options?.locale}
        onPrev={goPrev}
        onNext={goNext}
        onToday={goToday}
      />
      <div className="rotion-calendar-grid">
        <div className="rotion-calendar-weekdays">
          {weekdayLabels.map((label) => (
            <div key={label} className="rotion-calendar-weekday">
              {label}
            </div>
          ))}
        </div>
        <div className="rotion-calendar-days">
          {weeks.map((w) => (
            <CalendarWeek
              key={dateKey(w.weekStart)}
              weekStart={w.weekStart}
              monthInView={cursor.month}
              todayKey={todayKey}
              placed={w.placement.placed}
              slotCount={w.placement.slotCount}
              keys={keys}
              date={date}
              options={options}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default Calendar
