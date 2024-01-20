import React from 'react'
import PageIcon from '../PageIcon/PageIcon'
import type { LinkPreviewBlockProps } from './LinkPreviewBlock.types'

const LinkPreviewBlock = ({ block }: LinkPreviewBlockProps) => {
  if (!block.link_preview) {
    return <></>
  }

  return (
    <div className="notionate-blocks-linkpreview">
      <a className="notionate-blocks-linkpreview-a" href={block.link_preview.url} rel="noreferrer" target="_blank">
        {block.link_preview.url.includes('github.com') && <PageIcon name='github' />}
        {block.link_preview.url.includes('slack.com') && <PageIcon name='slack' />}
        {block.link_preview.url.includes('figma.com') && <PageIcon name='figma' />}
        {block.link_preview.url}
      </a>
    </div>
  )
}

export default LinkPreviewBlock
