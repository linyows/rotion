import React from 'react'
import type { TableOfContentsBlockProps } from './TableOfContentsBlock.types'

// TODO: Implement and design
const TableOfContentsBlock = ({ block }: TableOfContentsBlockProps) => {
  const { table_of_contents } = block
  return (
    <div className="notionate-blocks-tableofcontents">
     {table_of_contents.color}
    </div>
  )
}

export default TableOfContentsBlock
