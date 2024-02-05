import React from 'react'
import RichText from '../RichText/RichText'
import type { TableRowBlockObjectResponse } from '../../../../exporter'
import type { ThTdProps, TrProps, TableBlockProps } from './TableBlock.types'
import Stylex from '@stylexjs/stylex'
import { fontFamily } from '../../tokens.stylex'

const style = Stylex.create({
  wrapper: {
    fontFamily: fontFamily.sansserif,
    paddingTop: '.6rem',
  },
  table: {
    borderCollapse: 'collapse',
    borderSpacing: 0,
    fontSize: '.9rem',
    width: '100%',
  },
  td: {
    border: '1px solid rgb(233, 233, 231)',
    margin: 0,
    padding: '.3rem',
  },
  tdInner: {
    padding: '.2rem .4rem',
  },
  tdHeader: {
    border: '1px solid rgb(233, 233, 231)',
    backgroundColor: 'rgb(247, 246, 243)',
    margin: 0,
    padding: '.3rem',
    fontWeight: 500,
    textAlign: 'left',
  },
  tdHeaderInner: {
    padding: '.2rem .4rem',
  },
  tr: {
    margin: 0,
  },
})

const Td = ({ cell, key }: ThTdProps) => {
  return (
    <td className={`rotion-table-td ${Stylex(style.td)}`} key={key}>
      <div className={`rotion-table-td-inner ${Stylex(style.tdInner)}`}>
        <RichText textObject={cell} />
      </div>
    </td>
  )
}

const TdH = ({ cell, key }: ThTdProps) => {
  return (
    <td className={`rotiona-table-td-header ${Stylex(style.tdHeader)}`} key={key}>
      <div className={`rotion-table-td-header-inner ${Stylex(style.tdHeaderInner)}`}>
        <RichText textObject={cell} />
      </div>
    </td>
  )
}

const Tr = ({ children, key }: TrProps) => {
  return (
    <tr className={`rotion-table-tr ${Stylex(style.tr)}`} key={key}>
      {children}
    </tr>
  )
}

const TableBlock: React.FC<TableBlockProps> = ({ block }) => {
  if (!block.table || !block.children) {
    return <></>
  }

  const rows: JSX.Element[] = []
  // const tw = block.table.table_width
  // column header ||
  const ch = block.table.has_column_header
  // row header =
  const rh = block.table.has_row_header

  block.children.results.map((vv, i) => {
    const v = vv as TableRowBlockObjectResponse
    const columns: JSX.Element[] = []
    if (v.table_row === undefined) {
      return ''
    }
    v.table_row.cells.map((cells, ii) => {
      cells.map((cell, iii) => {
        const key = `${v.id}-${i}-${ii}-${iii}`
        if ((i === 0 && ch) || (ii === 0 && rh)) {
          columns.push(TdH({ cell, key }) || <></>)
        } else {
          columns.push(Td({ cell, key }) || <></>)
        }
        return ''
      })
      return ''
    })
    const key = `${block.id}-${i}`
    rows.push(Tr({ children: columns, key }) || <></>)
    return ''
  })

  return (
    <div className={`rotion-table ${Stylex(style.wrapper)}`}>
      <table className={`rotion-table-table ${Stylex(style.table)}`}>
        <tbody>
          {rows}
        </tbody>
      </table>
    </div>
  )
}

export default TableBlock
