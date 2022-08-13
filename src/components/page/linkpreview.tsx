import React from 'react'
import { GithubIcon, SlackIcon, FigmaIcon } from './icons'
import type {
  BlockObjectResponse,
} from '../../types'

export type LinkpreviewBlockProps = {
  block: BlockObjectResponse
}

const LinkpreviewBlock = ({ block }): React.FC<TodoBlockProps> => {
  let Icon
  if (block.link_preview.url.includes('github.com')) {
    Icon = GithubIcon
  } else if (block.link_preview.url.includes('slack.com')) {
    Icon = SlackIcon
  } else if (block.link_preview.url.includes('figma.com')) {
    Icon = FigmaIcon
  } else {
    console.log(`unsupport link preview: ${block.link_preview.url}`)
  }

  return (
    <div className="linkpreview">
      <a className="linkpreview-anchor" href={block.link_preview.url} rel="noreferrer" target="_blank">
        {Icon && <Icon />}
        {block.link_preview.url}
      </a>
      <style jsx>{`
        .linkpreview {
          margin: 1rem 0;
        }
        .linkpreview-anchor {
          display: block;
          text-decoration: none;
          border: 1px solid #ddd;
          padding: 1rem;
          color: #888;
          font-size: .8rem;
        }
        .linkpreview-anchor:hover {
          background-color: #eee;
        }
      `}</style>
    </div>
  )
}

export default LinkpreviewBlock
