import React from 'react'
import type { ListTitleFieldProps } from './ListTitleField.types'
import LinkedTitle from './LinkedTitle'
import './ListTitleField.css'

const ListTitleField = ({ textObjects, path, slug, link, query }: ListTitleFieldProps) => {
  return (
    <div className="rotion-list-title">
      <LinkedTitle textObjects={textObjects} href={`${path}${slug}`} link={link} query={query} />
    </div>
  )
}

export default ListTitleField
