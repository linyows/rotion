export interface CalendarHeaderProps {
  year: number
  month: number
  locale?: string
  onPrev: () => void
  onNext: () => void
  onToday: () => void
}
