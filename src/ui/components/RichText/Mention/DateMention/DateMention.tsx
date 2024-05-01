import React from 'react'
import type { DateMentionProps } from './DateMention.types'
import { cdate } from 'cdate'
import { relative } from 'cdate-relative'
import './DateMention.css'

interface endMentionProps {
  dateOrDateTime?: string
  prefix?: string
}

const DateOrDateTime = ({ dateOrDateTime, prefix }: endMentionProps) => {
  if (!dateOrDateTime) {
    return <></>
  }

  const rdate = cdate().handler(relative).cdateFn()
  return (
    <span>
      {prefix}
      <span title={rdate(dateOrDateTime).format()}>
        {rdate(dateOrDateTime).format(dateOrDateTime.length > 10 ? 'R HH:mm A' : 'R')}
      </span>
    </span>
  )
}

const DateMention = ({ date }: DateMentionProps) => {
  const { start, end, time_zone } = date
  return (
    <span className="rotion-richtext-date">
      <span className="rotion-richtext-atsign">
        @
      </span>
      <DateOrDateTime dateOrDateTime={start} />
      {end !== null && <DateOrDateTime dateOrDateTime={end} prefix=' → ' />}
      {time_zone !== null && `(${time_zone})`}
    </span>
  )
}

export default DateMention
