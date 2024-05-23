import React from 'react'
import type { ListSelectFieldProps } from './ListSelectField.types'
import LinkedTagIfLinked from './LinkedTagIfLinked'
import './ListSelectField.css'

const ListSelectField = ({ select, options }: ListSelectFieldProps) => {
  if (!select) {
    return <></>
  }
  const { name, color } = select

  return (
    <div className="rotion-list-select">
      <LinkedTagIfLinked pathname={options?.pathname ? `${options.pathname}/${encodeURIComponent(name)}` : undefined} color={color} link={options?.link} query={options?.query}>
        {name}
      </LinkedTagIfLinked>
    </div>
  )
}

export default ListSelectField
