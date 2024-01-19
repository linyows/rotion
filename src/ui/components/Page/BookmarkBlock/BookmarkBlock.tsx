import React from 'react'
import TextBlock from '../TextBlock/TextBlock'
import type { BookmarkBlockProps } from './BookmarkBlock.types'

const BookmarkBlock = ({ block }: BookmarkBlockProps) => {
  if (!block.bookmark) {
    return <></>
  }

  const jump = () => window.open(block.bookmark?.url, '_blank', 'noreferrer')
  const { title, desc, icon, image } = block.bookmark.site
  const url = block.bookmark.url

  return (
    <div className="notionate-blocks-bookmark">
      <div className="notionate-blocks-bookmark-inner" onClick={jump}>
        <div className="notionate-blocks-bookmark-text">
          <div className="notionate-blocks-bookmark-title">
            {title}
          </div>
          <div className="notionate-blocks-bookmark-desc">
            {desc}
          </div>
          <div className="notionate-blocks-bookmark-url">
            {icon !== '' && <img className="notionate-blocks-bookmark-favicon" src={icon} width="16px" alt="icon" />}
            {url}
          </div>
        </div>
        <div className="notionate-blocks-bookmark-image">
          {image !== '' && <img src={image} width="200px" height="auto" alt="image" />}
        </div>
      </div>
      <div className="notionate-blocks-bookmark-caption">
        <TextBlock tag="span" block={block.bookmark.caption} />
      </div>
    </div>
  )
}

export default BookmarkBlock
