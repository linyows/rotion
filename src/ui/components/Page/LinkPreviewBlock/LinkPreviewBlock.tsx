import React from 'react'
import { Icon } from '../../Icon'
import type { LinkPreviewBlockProps } from './LinkPreviewBlock.types'

interface Props {
  url: string
}

const Github = ({ url }: Props) => {
  const match = url.match(/github\.com\/(\w+)\/(\w+)/)
  const user = match ? match[1] : ''
  const repo = match ? match[2] : ''
  return (
    <span className="rotion-linkpreview-area rotion-linkpreview-github">
      <span className="rotion-linkpreview-icon">
        <Icon name='github' width='32px' height='32px' />
      </span>
      <span>
        <span className="rotion-linkpreview-title">{user}/{repo}</span>
        <span className="rotion-linkpreview-desc">Repository in Github</span>
      </span>
    </span>
  )
}

const Slack = ({ url }: Props) => {
  const domain = url.replace('https://', '').split('/')[0]
  return (
    <span className="rotion-linkpreview-area rotion-linkpreview-slack">
      <span className="rotion-linkpreview-icon">
        <Icon name='slack' width='32px' height='32px' />
      </span>
      <span>
        <span className="rotion-linkpreview-title">Message in Slack</span>
        <span className="rotion-linkpreview-desc">{domain}</span>
      </span>
    </span>
  )
}

const Figma = ({ url }: Props) => {
  const arrayUrl = url.split('/')
  const basename = arrayUrl[arrayUrl.length - 1]
  const title = basename.split('?')[0].replace('-', ' ')
  return (
    <span className="rotion-linkpreview-area rotion-linkpreview-figma">
      <span className="rotion-linkpreview-icon">
        <Icon name='figma' width='21px' height='32px' />
      </span>
      <span>
        <span className="rotion-linkpreview-title">{title}</span>
        <span className="rotion-linkpreview-desc">Assets in Figma</span>
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
    <div className="rotion-linkpreview">
      <a className="rotion-linkpreview-link" href={url} rel="noreferrer" target="_blank">
        {url.includes('github.com') && <Github url={url} />}
        {url.includes('slack.com') && <Slack url={url} />}
        {url.includes('figma.com') && <Figma url={url} />}
        {!url.includes('github.com') && !url.includes('slack.com') && !url.includes('figma.com') && `${url}`}
      </a>
    </div>
  )
}

export default LinkPreviewBlock
