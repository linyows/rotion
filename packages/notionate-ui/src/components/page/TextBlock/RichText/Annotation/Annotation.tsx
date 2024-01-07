import React from 'react'
import type { RichTextProps } from '../RichText.types'

const Annotation = ({ textObject, children }: RichTextProps) => {
  const { annotations } = textObject
  const css = ['notionate-blocks-text-annotation']
  css.push(`notionate-blocks-text-${annotations.color.replace('_', '-')}`)
  if (annotations.bold) css.push('notionate-blocks-text-bold')
  if (annotations.italic) css.push('notionate-blocks-text-italic')
  if (annotations.strikethrough) css.push('notionate-blocks-text-strikethrough')
  if (annotations.underline) css.push('notionate-blocks-text-underline')
  if (annotations.code) css.push('notionate-blocks-text-code')
  // if (href !== null) css.push('notionate-blocks-text-anchor')

  return (
    <span className={css.join(' ')}>
      {children}
    </span>
  )
}

export default Annotation
