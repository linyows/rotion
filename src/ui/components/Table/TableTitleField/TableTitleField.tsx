import React from 'react'
import type { TableTitleFieldProps } from './TableTitleField.types'
import LinkedTitleIfLinked from './LinkedTitleIfLinked'
import { RichText } from '../../RichText'
import './TableTitleField.css'

const TableTitleField = ({ textObjects, options }: TableTitleFieldProps) => {
  return (
    <div className="rotion-table-title">
      <LinkedTitleIfLinked options={options}>
        {textObjects.map((t, i) => <RichText key={`richtext-${i}`} textObject={t} />)}
      </LinkedTitleIfLinked>
    </div>
  )
}

export default TableTitleField
