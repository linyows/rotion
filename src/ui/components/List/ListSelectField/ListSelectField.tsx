import React from 'react'
import type { ListSelectFieldProps } from './ListSelectField.types'
import LinkedTagIfLinked from './LinkedTagIfLinked'
import './ListSelectField.css'

const ListSelectField = ({ select, path, link, query }: ListSelectFieldProps) => {
  if (!select) {
    return <></>
  }
  const { name, color } = select

  return (
    <div className="rotion-list-select">
      <LinkedTagIfLinked pathname={path ? `${path}tags/${encodeURIComponent(name)}` : undefined} color={color} link={link} query={query}>
        {name}
      </LinkedTagIfLinked>
    </div>
  )
}

export default ListSelectField
