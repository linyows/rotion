import React from 'react'
import type { ListTitleFieldProps } from './ListTitleField.types'
import Stylex from '@stylexjs/stylex'
import { tokens } from '../../tokens.stylex'
import LinkedTitle from './LinkedTitle'

const style = Stylex.create({
  wrapper: {
    fontFamily: tokens.fontFamily,
    whiteSpace: 'nowrap',
    display: 'block',
    maxWidth: '500px',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    lineHeight: 1.4,
    margin: '0 7px',
  },
})

const ListTitleField = ({ payload, path, slug, link, query }: ListTitleFieldProps) => {
  const title = payload.map(v => {
    const richtext = v.title
    switch (richtext.type) {
      case 'text':
        return richtext.text.content
      case 'mention':
        return richtext.mention.type
      default:
        return richtext.equation.expression
    }
  }).join(',')

  const href = `${path}${slug}`

  return (
    <div className={`rotion-list-title ${Stylex(style.wrapper)}`}>
      <LinkedTitle title={title} href={href} link={link} query={query} />
    </div>
  )
}

export default ListTitleField
