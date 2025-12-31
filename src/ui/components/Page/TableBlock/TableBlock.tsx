import type React from 'react'
import type { JSX } from 'react'
import type { TableRowBlockObjectResponse } from '../../../../exporter/index.js'
import RichText from '../../RichText/RichText.js'
import type { TableBlockProps, ThTdProps, TrProps } from './TableBlock.types'
import '../../tokens.css'
import './TableBlock.css'

const Td = ({ richTexts, key }: ThTdProps) => {
  return (
    <td className="rotion-table-td" key={key}>
      <div className="rotion-table-td-inner">
        {richTexts.map((r, i) => (
          <RichText textObject={r} key={`${r.plain_text || 'empty'}-${i}`} />
        ))}
      </div>
    </td>
  )
}

const TdH = ({ richTexts, key }: ThTdProps) => {
  return (
    <td className="rotion-table-td-header" key={key}>
      <div className="rotion-table-td-header-inner">
        {richTexts.map((r, i) => (
          <RichText textObject={r} key={`${r.plain_text || 'empty'}-${i}`} />
        ))}
      </div>
    </td>
  )
}

const Tr = ({ children, key }: TrProps) => {
  return (
    <tr className="rotion-table-tr" key={key}>
      {children}
    </tr>
  )
}

const TableBlock: React.FC<TableBlockProps> = ({ block }) => {
  if (!(block.table && block.children)) {
    return null
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
    v.table_row.cells.map((richTexts, ii) => {
      const key = `${v.id}-${i}-${ii}`
      if ((i === 0 && ch) || (ii === 0 && rh)) {
        columns.push(TdH({ richTexts, key }))
      } else {
        columns.push(Td({ richTexts, key }))
      }
      return ''
    })
    const key = `${block.id}-${i}`
    rows.push(Tr({ children: columns, key }))
    return ''
  })

  return (
    <div className="rotion-table">
      <table className="rotion-table-area">
        <tbody>{rows}</tbody>
      </table>
    </div>
  )
}

export default TableBlock
