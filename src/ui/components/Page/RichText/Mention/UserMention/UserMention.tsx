import React from 'react'
import type { UserMentionProps } from './UserMention.types'

const UserMention = ({ children }: UserMentionProps) => {
  return (
    <span className="notionate-blocks-text-usermention">
      {children}
    </span>
  )
}

export default UserMention
