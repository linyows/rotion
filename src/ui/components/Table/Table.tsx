import React from 'react'
import type { PageObjectResponseEx } from '../../../exporter'
import TableIcon from './TableIcon/TableIcon'
import Column from './Column'
import type { TableProps } from './Table.types'
import '../tokens.css'
import './Table.css'

export const Table = ({ keys, db, options }: TableProps) => {
  const propType = (name: string) => {
    return (db.meta.properties[name]) ? db.meta.properties[name].type : `Unknown "${name}"`
  }
  const { verticalLines = true } = options || {}

  return (
    <div className={`rotion-table ${verticalLines ? 'rotion-table-verticallines' : ''}`}>
      <div className="rotion-table-inner">
        <div className="rotion-table-header rotion-table-row">
          {keys.map((name, i) => (
            <div key={`${name}-${i}`} className={`rotion-table-cell rotion-table-column${i}`}>
              <div className="rotion-table-cell-inner">
                <TableIcon type={propType(name)} className="rotion-table-header-icon" />
                <div className="rotion-table-header-text">
                  {name}
                </div>
              </div>
            </div>
          ))}
        </div>
        {db.results.map((v: PageObjectResponseEx) => (
          <div key={v.id} className="rotion-table-row">
            {keys.map((name, i) => (
              <div key={`${v.id}${name}`} className={`rotion-table-cell rotion-table-column${i}`}>
                <div className="rotion-table-cell-inner">
                  <Column name={name} page={v} options={options} />
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
