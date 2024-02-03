import React from 'react'
import { getLinkPathAndLinkKey, queryToString } from '../../lib'
import type { Breadcrumb } from '../../../../exporter'
import type { BreadcrumbBlockProps, BreadcrumbLinkProps, BreadcrumbsProps } from './BreadcrumbBlock.types'
import Stylex from '@stylexjs/stylex'
import { fontFamily } from '../../tokens.stylex'

const style = Stylex.create({
  link: {
    fontFamily: fontFamily.sansserif,
    textDecoration: 'none',
    color: '#333',
    fontSize: '.9rem',
    padding: '.2rem .3rem',
    borderRadius: '4px',
    backgroundColor: {
      default: 'inherit',
      ':hover': 'rgba(55, 53, 47, 0.08)',
    },
    cursor: 'pointer',
  },
  icon: {
    verticalAlign: 'middle',
    paddingRight: '.4rem',
    paddingBottom: '.2rem',
  },
  slash: {
    fontSize: '.9rem',
    opacity: '.5',
    padding: '0 .3rem',
  },
})

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
      <Link className={`rotion-blocks-breadcrumb-a ${Stylex(style.link)}`} href={{ pathname, query }}>
        {children}
      </Link>
    )
  }

  if (href) {
    return (
      <a className={`rotion-blocks-breadcrumb-a ${Stylex(style.link)}`} href={`${pathname}${queryToString(query)}`}>
        {children}
      </a>
    )
  }

  return (
    <span className={`rotion-blocks-breadcrumb-a ${Stylex(style.link)}`}>
      {children}
    </span>
  )
}

export const Breadcrumbs = ({ list, link, hrefs, query }: BreadcrumbsProps) => {
  const max = list.length
  return (
    <div className="notionate-blocks-breadcrumb">
      {list.map((v: Breadcrumb, i: number) => (
        <span key={`crumb-${i}`}>
          <BreadcrumbLink breadcrumb={v} href={hrefs === undefined ? undefined : hrefs[i]} link={link} query={query}>
            {v.icon.type === 'emoji' && <span className="notionate-blocks-breadcrumb-emoji">{v.icon.emoji}</span>}
            {v.icon.type !== 'emoji' && <img className={`rotion-blocks-breadcrumb-icon ${Stylex(style.icon)}`} src={v.icon.src} width={20} height={20} alt={v.name} />}
            <span className="notionate-blocks-breadcrumb-title">
              {v.name}
            </span>
          </BreadcrumbLink>
          {i + 1 < max && <span className={`rotion-blocks-breadcrumb-slash ${Stylex(style.slash)}`}>/</span>}
        </span>
      ))}
    </div>
  )
}

const BreadcrumbBlock = ({ block, link, hrefs, query }: BreadcrumbBlockProps) => {
  return <Breadcrumbs list={block.list} link={link} hrefs={hrefs} query={query} />
}

export default BreadcrumbBlock
