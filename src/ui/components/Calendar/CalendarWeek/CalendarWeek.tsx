import CalendarCell from '../CalendarCell/CalendarCell.js'
import CalendarEvent from '../CalendarEvent/CalendarEvent.js'
import type { CalendarWeekProps } from './CalendarWeek.types'
import './CalendarWeek.css'

const SLOT_HEIGHT_PX = 28
const SLOT_TOP_OFFSET_PX = 28
const MIN_CELL_HEIGHT_PX = 110

function dateKey(d: Date) {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
}

const CalendarWeek = ({ weekStart, monthInView, todayKey, placed, slotCount, keys, date, options }: CalendarWeekProps) => {
  const days: Date[] = []
  for (let i = 0; i < 7; i++) {
    days.push(new Date(weekStart.getFullYear(), weekStart.getMonth(), weekStart.getDate() + i))
  }

  const slotsHeight = SLOT_TOP_OFFSET_PX + slotCount * SLOT_HEIGHT_PX + 4
  const minHeight = Math.max(MIN_CELL_HEIGHT_PX, slotsHeight)

  return (
    <div className="rotion-calendar-week" style={{ minHeight: `${minHeight}px` }}>
      <div className="rotion-calendar-week-cells">
        {days.map((d) => (
          <CalendarCell
            key={dateKey(d)}
            year={d.getFullYear()}
            month={d.getMonth()}
            day={d.getDate()}
            inMonth={d.getMonth() === monthInView}
            isToday={dateKey(d) === todayKey}
          />
        ))}
      </div>
      <div className="rotion-calendar-week-events">
        {placed.map((p) => {
          const left = (p.startCol / 7) * 100
          const width = (p.span / 7) * 100
          const top = SLOT_TOP_OFFSET_PX + p.slot * SLOT_HEIGHT_PX
          const className = [
            'rotion-calendar-event-slot',
            p.isStart ? 'rotion-calendar-event-slot-start' : '',
            p.isEnd ? 'rotion-calendar-event-slot-end' : '',
            p.span > 1 ? 'rotion-calendar-event-slot-multi' : '',
          ]
            .filter(Boolean)
            .join(' ')
          return (
            <div
              key={`${p.page.id}-${p.slot}`}
              className={className}
              style={{
                left: `${left}%`,
                width: `${width}%`,
                top: `${top}px`,
                height: `${SLOT_HEIGHT_PX - 2}px`,
              }}
            >
              <CalendarEvent
                page={p.page}
                keys={keys}
                date={date}
                options={options}
                continuationLeft={!p.isStart}
                continuationRight={!p.isEnd}
              />
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default CalendarWeek
