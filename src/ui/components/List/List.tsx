import React from 'react'
import Column from './Column'
import type { PageObjectResponseEx } from '../../../exporter'
import type { ListProps } from './List.types'
import '../tokens.css'
import './List.css'

function columnClassName (name: string, i: number) {
  const classArray = [`rotion-list-column${i}`]
  switch (name) {
    case 'spacer':
      classArray.push('rotion-list-spacer')
      break
    case 'dashed':
      classArray.push('rotion-list-dashed')
      break
  }
  return classArray.join(' ')
}

export interface ListHeaderProps {
  keys: string[]
}

const List = ({ keys, db, href, link, query }: ListProps) => {
  return (
    <div className="rotion-list">
      <div className="rotion-list-inner">
        {db.results.map((v: PageObjectResponseEx) => (
          <div key={v.id} className="rotion-list-line">
            {keys.map((name, i) => (
              <div key={`${v.id}${name}`} className={columnClassName(name, i)}>
                <Column name={name} page={v} href={href} link={link} query={query} />
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}

export default List
