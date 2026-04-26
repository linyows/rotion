import type { CalendarCellProps } from './CalendarCell.types'
import './CalendarCell.css'

const CalendarCell = ({ year, month, day, inMonth, isToday }: CalendarCellProps) => {
  const dow = new Date(year, month, day).getDay()
  const isWeekend = dow === 0 || dow === 6

  const className = [
    'rotion-calendar-cell',
    inMonth ? 'rotion-calendar-cell-in' : 'rotion-calendar-cell-out',
    isToday ? 'rotion-calendar-cell-today' : '',
    isWeekend ? 'rotion-calendar-cell-weekend' : '',
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <div className={className} data-date={`${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`}>
      <div className="rotion-calendar-cell-day">{day}</div>
    </div>
  )
}

export default CalendarCell
