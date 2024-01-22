import React from 'react'
import { pathBasename } from '../../../../lib'
import PageIcon from '../../../PageIcon/PageIcon'
import type { LinkPreviewMemtionProps } from './LinkPreviewMention.types'

const LinkPreviewMention = ({ url, text, children }: LinkPreviewMemtionProps) => {
  return (
    <span className="notionate-blocks-text-mention">
      {url.includes('github.com') && <PageIcon name='github' />}
      {url.includes('slack.com') && <PageIcon name='slack' />}
      {url.includes('figma.com') && <PageIcon name='figma' />}
      {pathBasename(text)}
      {children}
    </span>
  )
}

export default LinkPreviewMention
