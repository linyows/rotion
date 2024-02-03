import React from 'react'
import { RichText } from '../RichText'
import type { CalloutBlockProps } from './CalloutBlock.types'
import Stylex from '@stylexjs/stylex'
import { fontFamily } from '../../tokens.stylex'

const style = Stylex.create({
  callout: {
    fontFamily: fontFamily.sansserif,
    display: 'flex',
    padding: '1.2rem',
    paddingLeft: '1rem',
    width: 'calc(100% - 2.4rem)',
    borderRadius: '3px',
    backgroundColor: 'rgb(241, 241, 239)',
    marginTop: '.6rem',
  },
  icon: {
    width: '24px',
    height: '24px',
  },
  text: {
    marginLeft: '.6rem',
  },
})

const Icon = ({ block }: CalloutBlockProps) => {
  if (block.callout.icon === null) {
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
  const { rich_text } = block.callout

  return (
    <div className={`rotion-callout ${Stylex(style.callout)}`}>
      <div className={`rotion-callout-icon ${Stylex(style.icon)}`}>
        {<Icon block={block} />}
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
