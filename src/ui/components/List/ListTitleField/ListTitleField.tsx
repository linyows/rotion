import React from 'react'
import type { ListTitleFieldProps } from './ListTitleField.types'
import LinkedTitle from './LinkedTitle'

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
    <div className="rotion-list-title">
      <LinkedTitle title={title} href={href} link={link} query={query} />
    </div>
  )
}

export default ListTitleField
