import React from 'react'
import LinkedBreadcrumbIfLinked from './LinkedBreadcrumbIfLinked'
import type { Breadcrumb } from '../../../../exporter'
import type { BreadcrumbBlockProps } from './BreadcrumbBlock.types'
import Stylex from '@stylexjs/stylex'
import { fontFamily } from '../../tokens.stylex'

const style = Stylex.create({
  wrapper: {
    fontFamily: fontFamily.sansserif,
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
  title: {
  },
})

const BreadcrumbBlock = ({ block, link, hrefs, query }: BreadcrumbBlockProps) => {
  const { list } = block
  const max = list.length
  return (
    <div className={`rotion-breadcrumb ${Stylex(style.wrapper)}`}>
      {list.map((v: Breadcrumb, i: number) => (
        <span key={`crumb-${i}`}>
          <LinkedBreadcrumbIfLinked breadcrumb={v} href={hrefs === undefined ? undefined : hrefs[i]} link={link} query={query}>
            {v.icon.type === 'emoji' && <span className="rotion-breadcrumb-emoji">{v.icon.emoji}</span>}
            {v.icon.type !== 'emoji' && <img className={`rotion-breadcrumb-icon ${Stylex(style.icon)}`} src={v.icon.src} width={20} height={20} alt={v.name} />}
            <span className={`rotion-breadcrumb-title ${Stylex(style.title)}`}>
              {v.name}
            </span>
          </LinkedBreadcrumbIfLinked>
          {i + 1 < max && <span className={`rotion-breadcrumb-slash ${Stylex(style.slash)}`}>/</span>}
        </span>
      ))}
    </div>
  )
}

export default BreadcrumbBlock
