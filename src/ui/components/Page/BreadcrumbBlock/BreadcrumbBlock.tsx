import React from 'react'
import { getLinkPathAndLinkKey, queryToString } from '../../lib'
import type { Breadcrumb } from '../../../../exporter'
import type { BreadcrumbBlockProps, BreadcrumbLinkProps } from './BreadcrumbBlock.types'

const BreadcrumbLink = ({ breadcrumb, link, href, query, children }: BreadcrumbLinkProps) => {
  const { id, name } = breadcrumb
  const [path, slugKey] = getLinkPathAndLinkKey(href || '')
  const file = slugKey === 'id' ? id : encodeURIComponent(name.toLowerCase()).replace(/%20/g, '-')

  if (link && href) {
    const Link = link
    return (
      <Link className="notionate-blocks-breadcrumb-a" href={{ pathname: `${path}${file}`, query }}>
        {children}
      </Link>
    )
  }

  if (href) {
    return (
      <a className="notionate-blocks-breadcrumb-a" href={`${path}${file}${queryToString(query)}`}>
        {children}
      </a>
    )
  }

  return (
    <span className="notionate-blocks-breadcrumb-a">
      {children}
    </span>
  )
}

const BreadcrumbBlock = ({ block, link, hrefs, query }: BreadcrumbBlockProps) => {
  const max = block.list.length
  return (
    <div className="notionate-blocks-breadcrumb">
      {block.list.map((v: Breadcrumb, i: number) => (
        <BreadcrumbLink key={`crumb-${i}`} breadcrumb={v} href={hrefs === undefined ? undefined : hrefs[i]} link={link} query={query}>
          {v.icon.type === 'emoji' && <span className="notionate-blocks-breadcrumb-emoji">{v.icon.emoji}</span>}
          {v.icon.type !== 'emoji' && <img className="notionate-blocks-breadcrumb-icon" src={v.icon.src} width={20} height={20} alt={v.name} />}
          <span className="notionate-blocks-breadcrumb-title">
            {v.name}
          </span>
          {i+1 < max && <span className="notionate-blocks-breadcrumb-slash">/</span>}
        </BreadcrumbLink>
      ))}
    </div>
  )
}

export default BreadcrumbBlock
