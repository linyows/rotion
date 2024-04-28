import React from 'react'
import { pathBasename } from '../../../lib'
import PageIcon from '../../../Page/PageIcon/PageIcon'
import type { LinkPreviewMemtionProps } from './LinkPreviewMention.types'

const LinkPreviewMention = ({ url, text }: LinkPreviewMemtionProps) => {
  if (url.includes('slack.com')) {
    return (
      <a className="rotion-richtext-linkpreview" href={url} rel="noreferrer" target="_blank">
        <PageIcon name="slack" className="rotion-richtext-linkpreview-icon" width='17px' height='17px' />
        <span className="rotion-richtext-linkprevew-text">
          Message in Slack
        </span>
      </a>
    )
  }

  if (url.includes('figma.com')) {
    return (
      <a className="rotion-richtext-linkpreview" href={url} rel="noreferrer" target="_blank">
        <PageIcon name='figma' className="rotion-richtext-linkpreview-icon" width='10px' height='16px' />
        <span className="rotion-richtext-linkprevew-text">
          {pathBasename(text).replace(/-/g, ' ')}
        </span>
      </a>
    )
  }

  return (
    <a className="rotion-richtext-linkpreview" href={url} rel="noreferrer" target="_blank">
      {url.includes('github.com') && <PageIcon name='github' className="rotion-richtext-linkpreview-icon" width='17px' height='17px' />}
      <span className="rotion-richtext-linkprevew-text">
        {pathBasename(text)}
      </span>
    </a>
  )
}

export default LinkPreviewMention
