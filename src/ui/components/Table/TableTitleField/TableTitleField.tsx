import React from 'react'
import type { TableTitleFieldProps } from './TableTitleField.types'
import LinkedTitleIfLinked from './LinkedTitleIfLinked'

const TableTitleField = ({ payload, path, slug, link, query }: TableTitleFieldProps) => {
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

  return (
    <div className="rotion-table-title">
      <LinkedTitleIfLinked path={path} slug={slug} link={link} query={query}>
        {title}
      </LinkedTitleIfLinked>
    </div>
  )
}

export default TableTitleField
