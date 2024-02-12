import React from 'react'
import type { DateMentionProps } from './DateMention.types'
import Stylex from '@stylexjs/stylex'
import { tokens } from '../../../../tokens.stylex'
import { cdate } from 'cdate'
import { plugin } from 'cdate-schedule'

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

  const sdate = cdate().plugin(plugin).scheduleFn()
  return (
    <span>
      {prefix}
      <span title={sdate(dateOrDateTime).format()}>
        {sdate(dateOrDateTime).schedule()}
      </span>
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
