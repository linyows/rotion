import React from 'react'
import PageIcon from '../PageIcon/PageIcon'
import type { LinkPreviewBlockProps } from './LinkPreviewBlock.types'
import Stylex from '@stylexjs/stylex'
import { tokens, link } from '../../tokens.stylex'

const style = Stylex.create({
  wrapper: {
    fontFamily: tokens.fontFamily,
    margin: '1rem 0',
  },
  link: {
    display: 'block',
    textDecoration: link.textDecoration,
    border: link.borderBottom,
    padding: '1rem',
    color: {
      default: link.color,
      ':hover': link.colorHover,
    },
    fontSize: '.8rem',
    borderRadius: tokens.borderRadius,
    backgroundColor: {
      default: link.backgroundColor,
      ':hover': link.backgroundColorHover,
    },
    overflow: 'hidden',
  },
  box: {
    display: 'grid',
    gridTemplateColumns: '32px 1fr',
    gap: '10px',
  },
  icon: {
    height: '100%',
  },
  title: {
    display: 'block',
    fontSize: '.9rem',
  },
  desc: {
    display: 'block',
    fontSize: '.8rem',
    color: tokens.thirdText,
  },
})

interface Props {
  url: string
}

const Github = ({ url }: Props) => {
  const match = url.match(/github\.com\/(\w+)\/(\w+)/)
  const user = match ? match[1] : ''
  const repo = match ? match[2] : ''
  return (
    <span className={`rotion-linkpreview-github ${Stylex(style.box)}`}>
      <span className={`rotion-linkpreview-icon ${Stylex(style.icon)}`}>
        <PageIcon name='github' width='32px' height='32px' />
      </span>
      <span>
        <span className={`rotion-linkpreview-github-repo ${Stylex(style.title)}`}>{user}/{repo}</span>
        <span className={`rotion-linkpreview-github-repo ${Stylex(style.desc)}`}>Repository in Github</span>
      </span>
    </span>
  )
}

const Slack = ({ url }: Props) => {
  const domain = url.replace('https://', '').split('/')[0]
  return (
    <span className={`rotion-linkpreview-slack ${Stylex(style.box)}`}>
      <span className={`rotion-linkpreview-icon ${Stylex(style.icon)}`}>
        <PageIcon name='slack' width='32px' height='32px' />
      </span>
      <span>
        <span className={`rotion-linkpreview-slack-title ${Stylex(style.title)}`}>Message in Slack</span>
        <span className={`rotion-linkpreview-slack-domain ${Stylex(style.desc)}`}>{domain}</span>
      </span>
    </span>
  )
}

const Figma = ({ url }: Props) => {
  const arrayUrl = url.split('/')
  const basename = arrayUrl[arrayUrl.length - 1]
  const title = basename.split('?')[0].replace('-', ' ')
  return (
    <span className={`rotion-linkpreview-figma ${Stylex(style.box)}`}>
      <span className={`rotion-linkpreview-icon ${Stylex(style.icon)}`}>
        <PageIcon name='figma' width='21px' height='32px' />
      </span>
      <span>
        <span className={`rotion-linkpreview-figma-title ${Stylex(style.title)}`}>{title}</span>
        <span className={`rotion-linkpreview-figma-desc ${Stylex(style.desc)}`}>Assets in Figma</span>
      </span>
    </span>
  )
}

const LinkPreviewBlock = ({ block }: LinkPreviewBlockProps) => {
  if (!block.link_preview) {
    return <></>
  }
  const { url } = block.link_preview

  return (
    <div className={`rotion-linkpreview ${Stylex(style.wrapper)}`}>
      <a className={`rotion-linkpreview-link ${Stylex(style.link)}`} href={url} rel="noreferrer" target="_blank">
        {url.includes('github.com') && <Github url={url} />}
        {url.includes('slack.com') && <Slack url={url} />}
        {url.includes('figma.com') && <Figma url={url} />}
        {!url.includes('github.com') && !url.includes('slack.com') && !url.includes('figma.com') && `${url}`}
      </a>
    </div>
  )
}

export default LinkPreviewBlock
