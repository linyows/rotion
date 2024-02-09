import React from 'react'
import type { DateMentionProps } from './DateMention.types'
import { cdate } from 'cdate'
import Stylex from '@stylexjs/stylex'
import { tokens } from '../../../../tokens.stylex'

const styles = Stylex.create({
  wrapper: {
    fontFamily: tokens.fontFamily,
    color: tokens.secondaryText,
  },
  atsign: {
    color: tokens.thirdText,
  },
})

interface endMentionProps {
  dateOrDateTime?: string
  prefix?: string
}

const DateOrDateTime = ({ dateOrDateTime, prefix }: endMentionProps) => {
  if (!dateOrDateTime) {
    return <></>
  }
  const dateFormat = 'MMMM D, YYYY'
  const dateTimeFormat = 'MMMM D, YYYY h:mm A'
  const cleared = '00:00:00.000'
  const format = dateOrDateTime.substring(11, 23) === cleared ? dateFormat : dateTimeFormat
  return (
    <span>
      {prefix}{cdate(dateOrDateTime).format(format)}
    </span>
  )
}

const DateMention = ({ date }: DateMentionProps) => {
  const { start, end, time_zone } = date
  return (
    <span className={`rotion-mention-date ${Stylex(styles.wrapper)}`}>
      <span className={`rotion-mention-atsign ${Stylex(styles.atsign)}`}>
        @
      </span>
      <DateOrDateTime dateOrDateTime={start} />
      {end !== null && <DateOrDateTime dateOrDateTime={end} prefix=' → ' />}
      {time_zone !== null && `(${time_zone})`}
    </span>
  )
}

export default DateMention
