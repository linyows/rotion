import type { PageObjectResponseEx } from '../../../../exporter/index.js'
import type { CalendarOptions } from '../Calendar.types.js'

export interface CalendarEventProps {
  page: PageObjectResponseEx
  keys: string[]
  date: string
  options?: CalendarOptions
  continuationLeft?: boolean
  continuationRight?: boolean
}
