import Page from '../Page.js'
import type { ColumnListBlockProps } from './ColumnListBlock.types'
import '../../tokens.css'
import './ColumnListBlock.css'

const ColumnListBlock = ({ block, href, link, query }: ColumnListBlockProps) => {
  const columns = block.columns.map((v, i) => {
    return (
      <div key={i} className="rotion-columnlist-column">
        <Page blocks={v} href={href} link={link} query={query} />
      </div>
    )
  })

  const l = columns.length
  const columnlistStyle = {
    gridTemplate: `repeat(1, 1fr) / repeat(${l}, 1fr)`,
  }

  return (
    <div className="rotion-columnlist" style={columnlistStyle}>
      {columns}
    </div>
  )
}

export default ColumnListBlock
