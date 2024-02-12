import React from 'react'
import type { TableTitleFieldProps } from './TableTitleField.types'
import LinkedTitleIfLinked from './LinkedTitleIfLinked'
import Stylex from '@stylexjs/stylex'
import { tokens } from '../../tokens.stylex'

const style = Stylex.create({
  wrapper: {
    fontFamily: tokens.fontFamily,
  },
})

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
    <div className={`rotion-table-title ${Stylex(style.wrapper)}`}>
      <LinkedTitleIfLinked path={path} slug={slug} link={link} query={query}>
        {title}
      </LinkedTitleIfLinked>
    </div>
  )
}

export default TableTitleField
