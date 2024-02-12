import React from 'react'
import Breadcrumbs from './Breadcrumbs'
import type { BreadcrumbBlockProps } from './BreadcrumbBlock.types'

const BreadcrumbBlock = ({ block, link, hrefs, query }: BreadcrumbBlockProps) => {
  return <Breadcrumbs list={block.list} link={link} hrefs={hrefs} query={query} />
}

export default BreadcrumbBlock
