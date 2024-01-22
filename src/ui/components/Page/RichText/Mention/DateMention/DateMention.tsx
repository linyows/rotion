import React from 'react'
import type { DateMentionProps } from './DateMention.types'

const DateMention = ({ date, children }: DateMentionProps) => {
  const { start, end, time_zone } = date
  return (
    <span className="notionate-blocks-text-mention-date">
      @{start}{end === null ? '' : ` -> ${end}`}{time_zone === null ? '' : `(${time_zone})`}
      {children}
    </span>
  )
}

export default DateMention
