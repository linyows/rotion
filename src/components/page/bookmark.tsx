import React from 'react'
import { TextObject } from './text'
import type {
  BookmarkBlockObjectResponseEx,
} from '../../types'

export type BookmarkBlockProps = {
  block: BookmarkBlockObjectResponseEx
}

const BookmarkBlock: React.FC<BookmarkBlockProps> = ({ block }) => {
  if (!block.bookmark) {
    return <></>
  }

  const captions = block.bookmark.caption.map((v, i) => {
    return TextObject({ textObject: v, key: `${i}` })
  })
  const jump = () => window.open(block.bookmark?.url, '_blank', 'noreferrer')
  const { title, desc, icon, image } = block.bookmark.site
  const url = block.bookmark.url

  return (
    <div className="bookmark">
      <div className="bookmark-inner" onClick={jump}>
        <div className="bookmark-text">
          <div className="site-title">
            {title}
          </div>
          <div className="site-desc">
            {desc}
          </div>
          <div className="site-url">
            <img className="favicon" src={icon} width="16px" alt={`${title} icon`} />
            {url}
          </div>
        </div>
        <div className="bookmark-image">
          <img src={image} width="200px" alt={`${title} image`} />
        </div>
      </div>
      <div className="bookmark-caption">
        {captions}
      </div>
      <style jsx>{`
        .bookmark {
          padding: .5rem 0;
        }
        .bookmark-inner {
          border: 1px solid #EEE;
          border-radius: 3px;
          font-size: .75rem;
          padding: 0;
          display: grid;
          grid-template: repeat(1, 1fr) / 1fr 200px;
          gap: 1rem;
          justify-items: end;
          cursor: pointer;
          position: relative;
        }
        .bookmark-inner:hover {
          background-color: #f5f5f5;
        }
        .bookmark-text {
          padding: .7rem 1rem 2rem;
          width: 100%;
        }
        .bookmark-caption {
          margin: .3rem .3rem 0;
          text-align: left;
          color: #888;
          font-size: .8rem;
        }
        .site-title {
          font-size: .85rem;
        }
        .site-desc {
          color: #999;
          line-height: 1;
          font-size: .65rem;
          padding-top: .1rem;
        }
        .site-url {
          position: absolute;
          left: 1rem;
          bottom: .7rem;
          font-size: .7rem;
        }
        .favicon {
          display: inline;
          vertical-align: bottom;
          margin-right: 10px;
          margin-bottom: 1px;
        }
      `}</style>
    </div>
  )
}

export default BookmarkBlock
