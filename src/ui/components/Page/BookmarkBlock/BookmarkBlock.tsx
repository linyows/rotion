import React from 'react'
import { RichText } from '../RichText'
import type { BookmarkBlockProps } from './BookmarkBlock.types'
import Stylex from '@stylexjs/stylex'
import { tokens, link } from '../../tokens.stylex'

const style = Stylex.create({
  bookmark: {
    fontFamily: tokens.fontFamily,
    padding: '.5rem 0',
    lineHeight: 1,
    marginTop: '.4rem',
  },
  box: {
    border: '1px solid #EEE',
    borderRadius: tokens.borderRadius,
    fontSize: '.75rem',
    padding: 0,
    display: {
      default: 'flex',
      '@media (max-width: 580px)': 'block',
    },
    cursor: 'pointer',
    position: 'relative',
    backgroundColor: {
      default: 'inherit',
      ':hover': '#f5f5f5',
    },
    overflow: 'hidden',
  },
  text: {
    flex: '4 1 180px',
    padding: '.7rem 1rem 0',
    lineHeight: 1.7,
    alignSelf: 'start',
    overflow: 'hidden',
  },
  image: {
    flex: '1 1 180px',
    margin: 0,
    padding: 0,
    lineHeight: 1,
    overflow: 'hidden',
    height: '108px',
    display: {
      default: 'block',
      '@media (max-width: 580px)': 'none',
    },
  },
  img: {
    display: 'block',
    objectFit: 'cover',
    borderRadius: '1px',
    background: 'rgb(25, 25, 25)',
    width: '100%',
    height: '100%',
  },
  title: {
    fontSize: '.9rem',
    width: '100%',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    display: 'block',
    marginBottom: '2px',
  },
  desc: {
    color: '#999',
    lineHeight: '16px',
    fontSize: '12px',
    height: '32px',
    overflow: 'hidden',
  },
  url: {
    fontSize: '12px',
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
    marginTop: '8px',
    position: {
      default: 'relative',
      '@media (max-width: 580px)': 'static',
    },
    padding: {
      default: 0,
      '@media (max-width: 580px)': '1rem 0 .85rem',
    },
  },
  favicon: {
    display: 'inline',
    verticalAlign: 'bottom',
    marginRight: '10px',
    marginBottom: '1px',
  },
  caption: {
    margin: '.3rem .3rem 0',
    textAlign: 'left',
    color: '#888',
    fontSize: '.8rem',
  },
})

const BookmarkBlock = ({ block }: BookmarkBlockProps) => {
  if (!block.bookmark) {
    return <></>
  }

  const jump = () => window.open(block.bookmark?.url, '_blank', 'noreferrer')
  const { title, desc, icon, image } = block.bookmark.site
  const url = block.bookmark.url

  return (
    <div className={`rotion-bookmark ${Stylex(style.bookmark)}`}>
      <div className={`rotion-bookmark-box ${Stylex(style.box)}`} onClick={jump}>
        <div className={`rotion-bookmark-text ${Stylex(style.text)}`}>
          <div className={`rotion-bookmark-title ${Stylex(style.title)}`}>
            {title}
          </div>
          <div className={`rotion-bookmark-desc ${Stylex(style.desc)}`}>
            {desc}
          </div>
          <div className={`rotion-bookmark-url ${Stylex(style.url)}`}>
            {icon !== '' && <img className={`rotion-bookmark-favicon ${Stylex(style.favicon)}`} src={icon} width="16px" alt="icon" />}
            {url}
          </div>
        </div>
        <div className={`rotion-bookmark-image ${Stylex(style.image)}`}>
          {image !== '' && <img className={`rotion-bookmark-img ${Stylex(style.img)}`} src={image} width="200px" height="auto" alt="image" />}
        </div>
      </div>
      <div className={`rotion-bookmark-caption ${Stylex(style.caption)}`}>
        {block.bookmark.caption.map((v, i) => (
          <RichText textObject={v} key={`richtext-${i}`} />
        ))}
      </div>
    </div>
  )
}

export default BookmarkBlock
