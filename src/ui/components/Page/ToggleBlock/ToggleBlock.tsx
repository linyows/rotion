import React, { useState } from 'react'
import { RichText } from '../RichText'
import type { ParagraphBlockObjectResponse } from '../../../../exporter'
import type { ToggleBlockProps } from './ToggleBlock.types'
import Stylex from '@stylexjs/stylex'
import { fontFamily } from '../../tokens.stylex'

const style = Stylex.create({
  wrapper: {
    fontFamily: fontFamily.sansserif,
    display: 'flex',
    alignItems: 'flex-start',
    width: '100%',
    marginTop: '.6rem',
    lineHeight: 1.8,
  },
  triangle: {
    transition: 'background 20ms ease-in 0s',
    cursor: 'pointer',
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '24px',
    height: '24px',
    borderRadius: '3px',
    padding: '4px',
    marginTop: 0,
    marginRight: '4px',
    backgroundColor: {
      default: 'inherit',
      ':hover': '#eee',
    },
  },
  text: {
  },
  icon: {
    width: '0.6875em',
    height: '0.6875em',
    display: 'block',
    fill: 'inherit',
    flexShrink: 0,
    backfaceVisibility: 'hidden',
    transition: 'transform 200ms ease-out 0s',
    opacity: 1,
  },
})

interface TriangleProps {
  open: boolean
}

const Triangle = ({ open }: TriangleProps) => {
  const css = {
    transform: `rotateZ(${open ? 180 : 90}deg)`,
  }
  return (
    <svg className={`rotion-toggle-triangle-svg ${Stylex(style.icon)}`} style={css} viewBox="0 0 100 100">
      <polygon points="5.9,88.2 50,11.8 94.1,88.2 "></polygon>
    </svg>
  )
}

const ToggleBlock = ({ block }: ToggleBlockProps) => {
  const [open, setOpen] = useState(false)
  const onClick = () => setOpen(!open)

  const text = block.children.results.map((vv, i) => {
    const v = vv as ParagraphBlockObjectResponse
    return (
      <>
        {v.paragraph.rich_text.map((v, i) => (
          <RichText textObject={v} key={`richtext-${i}`} />
        ))}
      </>
    )
  })

  return (
    <div className={`rotion-toggle ${Stylex(style.wrapper)}`}>
      <div className={`rotion-toggle-triangle ${Stylex(style.triangle)}`} onClick={onClick}>
        <Triangle open={open} />
      </div>
      <div className={`rotion-toggle-text ${Stylex(style.text)}`}>
        <div>
          {block.toggle.rich_text.map((v, i) => (
            <RichText textObject={v} key={`richtext-${i}`} />
          ))}
        </div>
        {open ? text : null }
      </div>
    </div>
  )
}

export default ToggleBlock
