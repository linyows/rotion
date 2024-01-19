import React from 'react'
import type { BreadcrumbBlockProps } from './BreadcrumbBlock.types'

// TODO: Iimplement and design
const BreadcrumbBlock = ({ block }: BreadcrumbBlockProps) => {
  const { parent } = block
  return (
    <div className="notionate-blocks-breadcrumb">
      {parent.type}
    </div>
  )
}

export default BreadcrumbBlock
