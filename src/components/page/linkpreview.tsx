import React from 'react'
import { GithubIcon, SlackIcon, FigmaIcon } from './icons'
import type {
  LinkPreviewBlockObjectResponse,
} from '../../server/types'

export type LinkpreviewBlockProps = {
  block: LinkPreviewBlockObjectResponse
}

const LinkpreviewBlock: React.FC<LinkpreviewBlockProps> = ({ block }) => {
  if (!block.link_preview) {
    return <></>
  }

  return (
    <div className="notionate-blocks-linkpreview">
      <a className="notionate-blocks-linkpreview-a" href={block.link_preview.url} rel="noreferrer" target="_blank">
        {block.link_preview.url.includes('github.com') && <GithubIcon />}
        {block.link_preview.url.includes('slack.com') && <SlackIcon />}
        {block.link_preview.url.includes('figma.com') && <FigmaIcon />}
        {block.link_preview.url}
      </a>
    </div>
  )
}

export default LinkpreviewBlock
