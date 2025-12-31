import type { BreadcrumbBlockProps } from './BreadcrumbBlock.types'
import Breadcrumbs from './Breadcrumbs.js'
import '../../tokens.css'
import './BreadcrumbBlock.css'

const BreadcrumbBlock = ({ block, link, hrefs, query }: BreadcrumbBlockProps) => {
  return <Breadcrumbs list={block.list} link={link} hrefs={hrefs} query={query} />
}

export default BreadcrumbBlock
