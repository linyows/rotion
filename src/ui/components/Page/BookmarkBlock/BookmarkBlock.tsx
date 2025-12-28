import React from 'react'
import { RichText } from '../../RichText/index.js'
import type { BookmarkBlockProps } from './BookmarkBlock.types'
import '../../tokens.css'
import './BookmarkBlock.css'

const BookmarkBlock = ({ block }: BookmarkBlockProps) => {
  if (!block.bookmark) {
    return <></>
  }

  const { title, desc, icon, image } = block.bookmark.site
  const jump = () => window.open(block.bookmark?.url, '_blank', 'noreferrer')
  const url = block.bookmark.url

  return (
    <div className="rotion-bookmark">
      <div className="rotion-bookmark-area" onClick={jump}>
        <div className="rotion-bookmark-text">
          <div className="rotion-bookmark-title">
            {title !== '' ? title : url.substring(url.lastIndexOf('/') + 1)}
          </div>
          {desc !== '' && (
            <div className="rotion-bookmark-desc">
              {desc}
            </div>
          )}
          <div className="rotion-bookmark-url">
            {icon !== '' && <img className="rotion-bookmark-favicon" src={icon} width="16px" alt="icon" />}
            {url}
          </div>
        </div>
        {image !== '' && (
          <div className="rotion-bookmark-image" key="image">
            <img className="rotion-bookmark-img" src={image} width="200px" height="auto" alt="image" />
          </div>
        )}
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
