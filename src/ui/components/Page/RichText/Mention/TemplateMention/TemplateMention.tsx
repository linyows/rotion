import React from 'react'
import type { TemplateMentionProps } from './TemplateMention.types'

const TemplateMention = ({ text, children }: TemplateMentionProps) => {
  return (
    <span>
      {text}
      {children}
    </span>
  )
}

export default TemplateMention
