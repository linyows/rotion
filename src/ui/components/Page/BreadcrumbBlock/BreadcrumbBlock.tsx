import React from 'react'
import { getLinkPathAndLinkKey, queryToString } from '../../lib'
import type { Breadcrumb } from '../../../../exporter'
import type { BreadcrumbBlockProps, BreadcrumbLinkProps } from './BreadcrumbBlock.types'

function buildPathname (id: string, name: string, href?: string) {
  if (href === '/') {
    return href
  }

  const [path, slugKey] = getLinkPathAndLinkKey(href || '')
  let file = ''

  if (slugKey === 'id') {
    file = id
  } else {
    file = encodeURIComponent(name.toLowerCase()).replace(/%20/g, '-')
  }

  return `${path}${file}`
}

const BreadcrumbLink = ({ breadcrumb, link, href, query, children }: BreadcrumbLinkProps) => {
  const { id, name } = breadcrumb
  const pathname = buildPathname(id, name, href)

  if (link && href) {
    const Link = link
    return (
      <Link className="notionate-blocks-breadcrumb-a" href={{ pathname, query }}>
        {children}
      </Link>
    )
  }

  if (href) {
    return (
      <a className="notionate-blocks-breadcrumb-a" href={`${pathname}${queryToString(query)}`}>
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
        <span key={`crumb-${i}`}>
          <BreadcrumbLink breadcrumb={v} href={hrefs === undefined ? undefined : hrefs[i]} link={link} query={query}>
            {v.icon.type === 'emoji' && <span className="notionate-blocks-breadcrumb-emoji">{v.icon.emoji}</span>}
            {v.icon.type !== 'emoji' && <img className="notionate-blocks-breadcrumb-icon" src={v.icon.src} width={20} height={20} alt={v.name} />}
            <span className="notionate-blocks-breadcrumb-title">
              {v.name}
            </span>
          </BreadcrumbLink>
          {i + 1 < max && <span className="notionate-blocks-breadcrumb-slash">/</span>}
        </span>
      ))}
    </div>
  )
}

export default BreadcrumbBlock
