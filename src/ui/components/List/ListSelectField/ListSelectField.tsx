import React from 'react'
import type { ListSelectFieldProps } from './ListSelectField.types'
import LinkedTagIfLinked from './LinkedTagIfLinked.js'
import './ListSelectField.css'

const ListSelectField = ({ select, options }: ListSelectFieldProps) => {
  if (!select) {
    return <></>
  }
  const { name, color } = select
  const { pathname, link, query } = options || {}

  return (
    <div className="rotion-list-select">
      <LinkedTagIfLinked pathname={pathname ? `${pathname}/${encodeURIComponent(name)}` : undefined} color={color} link={link} query={query}>
        {name}
      </LinkedTagIfLinked>
    </div>
  )
}

export default ListSelectField
