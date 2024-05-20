import React from 'react'
import type { TableTitleFieldProps } from './TableTitleField.types'
import LinkedTitleIfLinked from './LinkedTitleIfLinked'
import './TableTitleField.css'
import { RichText } from '../../RichText'

const TableTitleField = ({ textObjects, path, slug, link, query }: TableTitleFieldProps) => {
  return (
    <div className="rotion-table-title">
      <LinkedTitleIfLinked path={path} slug={slug} link={link} query={query}>
        {textObjects.map((t, i) => <RichText key={`richtext-${i}`} textObject={t} />)}
      </LinkedTitleIfLinked>
    </div>
  )
}

export default TableTitleField
