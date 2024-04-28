import React from 'react'
import { RichText } from '../../RichText'
import type { BookmarkBlockProps } from './BookmarkBlock.types'

const BookmarkBlock = ({ block }: BookmarkBlockProps) => {
  if (!block.bookmark) {
    return <></>
  }

  const { title, desc, icon, image } = block.bookmark.site
  const jump = () => window.open(block.bookmark?.url, '_blank', 'noreferrer')
  const url = block.bookmark.url

  if (title === '' && desc === '' && image === '') {
    return (
      <div className="rotion-bookmark">
        <div className="rotion-bookmark-area" onClick={jump}>
          <div className="rotion-bookmark-text">
            <div className="rotion-bookmark-title">
              {url.substring(url.lastIndexOf('/') + 1)}
            </div>
            <div className="rotion-bookmark-desc">
              {url}
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="rotion-bookmark">
      <div className="rotion-bookmark-area" onClick={jump}>
        <div className="rotion-bookmark-text">
          <div className="rotion-bookmark-title">
            {title}
          </div>
          <div className="rotion-bookmark-desc">
            {desc}
          </div>
          <div className="rotion-bookmark-url">
            {icon !== '' && <img className="rotion-bookmark-favicon" src={icon} width="16px" alt="icon" />}
            {url}
          </div>
        </div>
        <div className="rotion-bookmark-image">
          {image !== '' && <img className="rotion-bookmark-img" src={image} width="200px" height="auto" alt="image" />}
        </div>
      </div>
      <div className="rotion-bookmark-caption">
        {block.bookmark.caption.map((v, i) => (
          <RichText textObject={v} key={`richtext-${i}`} />
        ))}
      </div>
    </div>
  )
}

export default BookmarkBlock
