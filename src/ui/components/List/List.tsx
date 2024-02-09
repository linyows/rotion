import React from 'react'
import Column from './Column'
import type { PageObjectResponseEx } from '../../../exporter'
import type { ListProps } from './List.types'
import Stylex from '@stylexjs/stylex'
import { tokens, link } from '../tokens.stylex'

const style = Stylex.create({
  wrapper: {
    fontFamily: tokens.fontFamily,
    margin: 0,
    padding: 0,
    overflowX: 'scroll',
  },
  inner: {
    margin: 0,
    padding: '0 0 .8rem',
    maxWidth: '100%',
    minWidth: '1200px',
  },
  line: {
    display: 'flex',
    margin: '4px 0',
    padding: '4px 0',
    userSelect: 'none',
    transition: 'background 20ms ease-in 0s',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: {
      default: link.backgroundColor,
      ':hover': link.backgroundColorHover,
    },
  },
  spacer: {
    width: '100%',
    flexShrink: 10,
    display: 'block',
    marginLeft: '14px',
  },
  dashed: {
    width: '100%',
    flexShrink: 10,
    display: 'block',
    marginLeft: '14px',
    borderTop: '1px dashed #999',
  },
})

function columnClassName (name: string, i: number) {
  const classArray = [`rotion-list-column${i}`]
  switch (name) {
    case 'spacer':
      classArray.push('rotion-list-spacer')
      classArray.push(Stylex(style.spacer))
      break
    case 'dashed':
      classArray.push('rotion-list-dashed')
      classArray.push(Stylex(style.dashed))
      break
  }
  return classArray.join(' ')
}

export interface ListHeaderProps {
  keys: string[]
}

const List = ({ keys, db, href, link, query }: ListProps) => {
  return (
    <div className={`rotion-list ${Stylex(style.wrapper)}`}>
      <div className={`rotion-list-inner ${Stylex(style.inner)}`}>
        {db.results.map((v: PageObjectResponseEx) => (
          <div key={v.id} className={`rotion-list-line ${Stylex(style.line)}`}>
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
