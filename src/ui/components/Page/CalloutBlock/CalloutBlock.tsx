import React from 'react'
import { RichText } from '../RichText'
import type { CalloutBlockProps } from './CalloutBlock.types'
import Stylex from '@stylexjs/stylex'
import { colors, tokens } from '../../tokens.stylex'

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
    color: colors.default,
    backgroundColor: colors.bgDefault,
  },
  default_background: {
    color: colors.default,
    backgroundColor: colors.bgDefault,
  },
  gray: {
    color: colors.gray,
    border: colors.border,
  },
  gray_background: {
    color: colors.default,
    backgroundColor: colors.bgDefault,
  },
  brown: {
    color: colors.brown,
    border: colors.border,
  },
  brown_background: {
    color: tokens.primaryText,
    backgroundColor: colors.bgBrown,
  },
  orange: {
    color: colors.orange,
    border: colors.border,
  },
  orange_background: {
    color: tokens.primaryText,
    backgroundColor: colors.bgOrange,
  },
  yellow: {
    color: colors.yellow,
    border: colors.border,
  },
  yellow_background: {
    color: tokens.primaryText,
    backgroundColor: colors.bgYellow,
  },
  green: {
    color: colors.green,
    border: colors.border,
  },
  green_background: {
    color: tokens.primaryText,
    backgroundColor: colors.bgGreen,
  },
  blue: {
    color: colors.blue,
    border: colors.border,
  },
  blue_background: {
    color: tokens.primaryText,
    backgroundColor: colors.bgBlue,
  },
  purple: {
    color: colors.purple,
    border: colors.border,
  },
  purple_background: {
    color: tokens.primaryText,
    backgroundColor: colors.bgPurple,
  },
  pink: {
    color: colors.pink,
    border: colors.border,
  },
  pink_background: {
    color: tokens.primaryText,
    backgroundColor: colors.bgPink,
  },
  red: {
    color: colors.red,
    border: colors.border,
  },
  red_background: {
    color: tokens.primaryText,
    backgroundColor: colors.bgRed,
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
