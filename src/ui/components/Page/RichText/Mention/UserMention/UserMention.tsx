import React from 'react'
import type { UserMentionProps } from './UserMention.types'

const UserMention = ({ children }: UserMentionProps) => {
  return (
    <span className={'rotion-mention-user'}>
      {children}
    </span>
  )
}

export default UserMention
