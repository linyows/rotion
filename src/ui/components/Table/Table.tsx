import React from 'react'
import type { PageObjectResponseEx } from '../../../exporter'
import TableIcon from './TableIcon/TableIcon'
import Column from './Column'
import type { TableProps } from './Table.types'
import Stylex from '@stylexjs/stylex'
import { tokens } from '../tokens.stylex'

const style = Stylex.create({
  wrapper: {
    fontFamily: tokens.fontFamily,
    margin: 0,
    padding: '0 0 10px',
    width: '100%',
    overflowX: 'scroll',
  },
  inner: {
    position: 'relative',
    float: 'left',
    minWidth: '100%',
  },
  header: {
  },
  row: {
    display: 'inline-flex',
    background: 'inherit',
    height: '33px',
    color: 'rgba(55, 53, 47, 0.65)',
    borderTop: '1px solid rgb(233, 233, 231)',
    boxShadow: 'white -3px 0px 0px, rgb(233 233 231) 0px 1px 0px',
    minWidth: 'calc((100% - 192px) - 0px)',
  },
  cell: {
    display: 'flex',
    flexDirection: 'row',
    lineHeight: 1.5,
  },
  cellInner: {
    display: 'flex',
    flexShrink: 0,
    overflow: 'hidden',
    fontSize: '14px',
    padding: '5px 8px',
    width: '174px',
    borderRight: '1px solid rgba(55, 53, 47, 0.09)',
  },
  cellText: {
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
  icon: {
    width: '14px',
    height: '14px',
    display: 'block',
    fill: 'rgba(55, 53, 47, 0.45)',
    flexshrink: 0,
    backfaceVisibility: 'hidden',
    marginTop: '4px',
    marginRight: '7px',
  }
})

export const Table = ({ keys, db, href, link, query }: TableProps) => {
  const propType = (name: string) => {
    return (db.meta.properties[name]) ? db.meta.properties[name].type : `Unknown "${name}"`
  }

  return (
    <div className={`rotion-table ${Stylex(style.wrapper)}`}>
      <div className={`rotion-table-inner ${Stylex(style.inner)}`}>
        <div className={`rotion-table-header rotion-table-row ${Stylex(style.header)} ${Stylex(style.row)}`}>
          {keys.map((name, i) => (
            <div key={`${name}-${i}`} className={`rotion-table-cell rotion-table-column${i} ${Stylex(style.cell)}`}>
              <div className={`rotion-table-cell-inner ${Stylex(style.cellInner)}`}>
                <TableIcon type={propType(name)} className={`rotion-table-header-icon ${Stylex(style.icon)}`} />
                <div className={`rotion-table-cell-text ${Stylex(style.cellText)}`}>
                  {name}
                </div>
              </div>
            </div>
          ))}
        </div>
        {db.results.map((v: PageObjectResponseEx) => (
          <div key={v.id} className={`rotion-table-row ${Stylex(style.row)}`}>
            {keys.map((name, i) => (
              <div key={`${v.id}${name}`} className={`rotion-table-cell rotion-table-column${i} ${Stylex(style.cell)}`}>
                <div className={`rotion-table-cell-inner ${Stylex(style.cellInner)}`}>
                  <Column name={name} page={v} href={href} link={link} query={query} />
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}

export default Table
