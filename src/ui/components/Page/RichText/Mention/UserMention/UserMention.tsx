import React from 'react'
import type { UserMentionProps } from './UserMention.types'
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

const UserMention = ({ payload }: UserMentionProps) => {
  if (payload.mention.type !== 'user') {
    return <></>
  }
  const { user } = payload.mention

  if ('type' in user) {
    return (
      <span className="rotion-mention-user" {...Stylex.props(styles.wrapper)}>
        <span className="rotion-mention-atsign" {...Stylex.props(styles.atsign)}>@</span>
        {user.name}
      </span>
    )
  }

  return (
    <span className="rotion-mention-user" {...Stylex.props(styles.wrapper)}>
      <span className="rotion-mention-atsign" {...Stylex.props(styles.atsign)}>@</span>
      {payload.plain_text.replace('@', '')}
    </span>
  )
}

export default UserMention
