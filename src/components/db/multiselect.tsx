import React from 'react'
import Link from 'next/link'
import type {
  MultiSelectPropertyItemObjectResponse, SelectPropertyResponse,
} from '../../server/types'

export type MultiSelectProps = {
  payload: MultiSelectPropertyItemObjectResponse
  path: string
}

export const DBMultiSelectField: React.FC<MultiSelectProps> = ({ payload, path }) => {
  const listStyle = (color: string) => {
    let colorAttr = 'rgb(24, 51, 71)'
    let backgroundAttr = 'rgb(211, 229, 239)'

    switch (color) {
      case 'default':
        colorAttr = 'rgb(50, 48, 44)'
        backgroundAttr = 'rgba(227, 226, 224, 0.5)'
        break
      case 'purple':
        colorAttr = 'rgb(65, 36, 84)'
        backgroundAttr = 'rgb(232, 222, 238)'
        break
      case 'pink':
        colorAttr = 'rgb(76, 35, 55)'
        backgroundAttr = 'rgb(245, 224, 233)'
        break
      case 'yellow':
        colorAttr = 'rgb(64, 44, 27)'
        backgroundAttr = 'rgb(253, 236, 200)'
        break
      case 'blue':
        colorAttr = 'rgb(24, 51, 71)'
        backgroundAttr = 'rgb(211, 229, 239)'
        break
      case 'orange':
        colorAttr = 'rgb(73, 41, 14)'
        backgroundAttr = 'rgb(250, 222, 201)'
        break
      case 'brown':
        colorAttr = 'rgb(68, 42, 30)'
        backgroundAttr = 'rgb(238, 224, 218)'
        break
      case 'red':
        colorAttr = 'rgb(93, 23, 21)'
        backgroundAttr = 'rgb(255, 226, 221)'
        break
      case 'green':
        colorAttr = 'rgb(28, 56, 41)'
        backgroundAttr = 'rgb(219, 237, 219)'
        break
      case 'gray':
        colorAttr = 'rgb(50, 48, 44)'
        backgroundAttr = 'rgb(227, 226, 224)'
        break
    }

    return {
      color: colorAttr,
      background: `${backgroundAttr} none repeat scroll 0% 0%`,
    }
  }

  return (
    <ul className="notionate-db-multiselect-ul">
      {payload.multi_select.map(f => (
        <li key={f.id} className="notionate-db-multiselect-li" style={listStyle(f.color)}>
          {LinkedTag(f.name)}
        </li>
      ))}
    </ul>
  )
}

export default DBMultiSelectField
