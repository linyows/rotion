import React from 'react'
import { RichText } from '../RichText'
import type { CalloutBlockProps } from './CalloutBlock.types'
import Stylex from '@stylexjs/stylex'
import { tokens } from '../../tokens.stylex'

const style = Stylex.create({
  wrapper: {
    fontFamily: tokens.fontFamily,
    display: 'flex',
    padding: '1.2rem',
    paddingLeft: '1rem',
    width: 'calc(100% - 2.4rem)',
    borderRadius: '4px',
    marginTop: '.6rem',
  },
  icon: {
    width: '24px',
    height: '24px',
  },
  text: {
    marginLeft: '.6rem',
    marginTop: '.15rem',
  },
  default: {
    color: 'rgb(55, 53, 47)',
    backgroundColor: 'rgb(241, 241, 239)',
  },
  default_background: {
    color: 'rgb(55, 53, 47)',
    border: '1px solid rgba(55, 53, 47, 0.16)',
  },
  gray: {
    color: 'rgb(120, 119, 116)',
    border: '1px solid rgba(55, 53, 47, 0.16)',
  },
  gray_background: {
    backgroundColor: 'rgb(241, 241, 239)',
  },
  brown: {
    color: 'rgb(159, 107, 83)',
    border: '1px solid rgba(55, 53, 47, 0.16)',
  },
  brown_background: {
    backgroundColor: 'rgb(244, 238, 238)',
  },
  orange: {
    color: 'rgb(217, 115, 13)',
    border: '1px solid rgba(55, 53, 47, 0.16)',
  },
  orange_background: {
    backgroundColor: 'rgb(251, 236, 221)',
  },
  yellow: {
    color: 'rgb(203, 145, 47)',
    border: '1px solid rgba(55, 53, 47, 0.16)',
  },
  yellow_background: {
    backgroundColor: 'rgb(251, 243, 219)',
  },
  green: {
    color: 'rgb(68, 131, 97)',
    border: '1px solid rgba(55, 53, 47, 0.16)',
    backgroundColor: 'inherit',
  },
  green_background: {
    backgroundColor: 'rgb(237, 243, 236)',
  },
  blue: {
    color: 'rgb(51, 126, 169)',
    border: '1px solid rgba(55, 53, 47, 0.16)',
  },
  blue_background: {
    backgroundColor: 'rgb(231, 243, 248)',
  },
  purple: {
    color: 'rgb(144, 101, 176)',
    border: '1px solid rgba(55, 53, 47, 0.16)',
  },
  purple_background: {
    backgroundColor: 'rgba(244, 240, 247, 0.8)',
  },
  pink: {
    color: 'rgb(193, 76, 138)',
    border: '1px solid rgba(55, 53, 47, 0.16)',
  },
  pink_background: {
    backgroundColor: 'rgba(249, 238, 243, 0.8)',
  },
  red: {
    color: 'rgb(212, 76, 71)',
    border: '1px solid rgba(55, 53, 47, 0.16)',
  },
  red_background: {
    backgroundColor: 'rgb(253, 235, 236)',
  },
})

const Icon = ({ block }: CalloutBlockProps) => {
  if (!block.callout.icon) {
    return <></>
  }

  const { type } = block.callout.icon
  switch (type) {
    case 'emoji':
      return <>{block.callout.icon.emoji}</>
    case 'external':
    case 'file':
      return <img src={block.callout.icon.src} alt="Icon" />
    default:
      return <></>
  }
}

const CalloutBlock = ({ block }: CalloutBlockProps) => {
  const { color, rich_text } = block.callout

  return (
    <div className={`rotion-callout rotion-callout-color-${color} ${Stylex(style.wrapper)} ${Stylex(style[color])}`}>
      <div className={`rotion-callout-icon ${Stylex(style.icon)}`}>
        <Icon block={block} />
      </div>
      <div className={`rotion-callout-text ${Stylex(style.text)}`}>
        {rich_text.map((v, i) => (
          <RichText textObject={v} key={`richtext-${i}`} />
        ))}
      </div>
    </div>
  )
}

export default CalloutBlock
