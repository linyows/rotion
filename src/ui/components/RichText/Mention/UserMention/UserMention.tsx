import React from 'react'
import type { UserMentionProps } from './UserMention.types'
import './UserMention.css'

const UserMention = ({ payload }: UserMentionProps) => {
  if (payload.mention.type !== 'user') {
    return <></>
  }
  const { user } = payload.mention

  if ('type' in user) {
    return (
      <span className="rotion-richtext-user">
        <span className="rotion-richtext-user-atsign">@</span>
        {user.name}
      </span>
    )
  }

  return (
    <span className="rotion-richtext-user">
      <span className="rotion-richtext-user-atsign">@</span>
      {payload.plain_text.replace('@', '')}
    </span>
  )
}

export default UserMention
