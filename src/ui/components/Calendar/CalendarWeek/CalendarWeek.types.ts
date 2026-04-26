import type { PageObjectResponseEx } from '../../../../exporter/index.js'
import type { CalendarOptions } from '../Calendar.types.js'

export interface PlacedEvent {
  page: PageObjectResponseEx
  startCol: number
  span: number
  slot: number
  isStart: boolean
  isEnd: boolean
}

export interface CalendarWeekProps {
  weekStart: Date
  monthInView: number
  todayKey: string
  placed: PlacedEvent[]
  slotCount: number
  keys: string[]
  date: string
  options?: CalendarOptions
}
