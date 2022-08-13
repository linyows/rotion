import React from 'react'
import { TextObject } from './text'
import type {
  BlockObjectResponse,
} from '../../types'

export type BookmarkBlockProps = {
  block: BlockObjectResponse
}

const BookmarkBlock = ({ block }): React.FC<TodoBlockProps> => {
  const captions = block.bookmark.caption.map((v, i) => {
    return TextObject({ textObject: v, key: i})
  })
  const jump = () => window.open(block.bookmark.url, '_blank', 'noreferrer')

  return (
    <div className="bookmark">
      <div className="bookmark-inner" onClick={jump}>
        <div className="bookmark-text">
          <div className="site-title">
            {block.bookmark.site.title}
          </div>
          <div className="site-desc">
            {block.bookmark.site.desc}
          </div>
          <div className="site-url">
            {block.bookmark.url}
          </div>
        </div>
        <div className="bookmark-image">
          <img src={block.bookmark.site.image} width="200px" alt={`${block.bookmark.site.title} image`} />
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
        }
        .site-url {
          position: absolute;
          left: 1rem;
          bottom: .7rem;
          font-size: .7rem;
        }
      `}</style>
    </div>
  )
}

export default BookmarkBlock
