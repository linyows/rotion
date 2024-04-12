import React from 'react'
import { RichText } from '../RichText'
import type { CalloutBlockProps } from './CalloutBlock.types'
import Stylex from '@stylexjs/stylex'
import { callout, tokens } from '../../tokens.stylex'

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
    color: callout.default,
    backgroundColor: callout.bgDefault,
  },
  default_background: {
    color: callout.default,
    backgroundColor: callout.bgDefault,
  },
  gray: {
    color: callout.gray,
    border: callout.border,
  },
  gray_background: {
    color: callout.default,
    backgroundColor: callout.bgDefault,
  },
  brown: {
    color: callout.brown,
    border: callout.border,
  },
  brown_background: {
    color: tokens.primaryText,
    backgroundColor: callout.bgBrown,
  },
  orange: {
    color: callout.orange,
    border: callout.border,
  },
  orange_background: {
    color: tokens.primaryText,
    backgroundColor: callout.bgOrange,
  },
  yellow: {
    color: callout.yellow,
    border: callout.border,
  },
  yellow_background: {
    color: tokens.primaryText,
    backgroundColor: callout.bgYellow,
  },
  green: {
    color: callout.green,
    border: callout.border,
  },
  green_background: {
    color: tokens.primaryText,
    backgroundColor: callout.bgGreen,
  },
  blue: {
    color: callout.blue,
    border: callout.border,
  },
  blue_background: {
    color: tokens.primaryText,
    backgroundColor: callout.bgBlue,
  },
  purple: {
    color: callout.purple,
    border: callout.border,
  },
  purple_background: {
    color: tokens.primaryText,
    backgroundColor: callout.bgPurple,
  },
  pink: {
    color: callout.pink,
    border: callout.border,
  },
  pink_background: {
    color: tokens.primaryText,
    backgroundColor: callout.bgPink,
  },
  red: {
    color: callout.red,
    border: callout.border,
  },
  red_background: {
    color: tokens.primaryText,
    backgroundColor: callout.bgRed,
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
    <div className={`rotion-callout rotion-callout-color-${color} ${Stylex(style.wrapper, style[color])}`}>
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
