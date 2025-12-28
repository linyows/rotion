'use client'

import React, { useState } from 'react'
import { RichText } from '../../RichText/index.js'
import type { ParagraphBlockObjectResponse } from '../../../../exporter/index.js'
import type { ToggleBlockProps } from './ToggleBlock.types'
import '../../tokens.css'
import './ToggleBlock.css'

interface TriangleProps {
  open: boolean
}

const Triangle = ({ open }: TriangleProps) => {
  const css = {
    transform: `rotateZ(${open ? 180 : 90}deg)`,
  }
  return (
    <svg className="rotion-toggle-icon" style={css} viewBox="0 0 100 100">
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
    <div className="rotion-toggle">
      <div className="rotion-toggle-triangle" onClick={onClick}>
        <Triangle open={open} />
      </div>
      <div className="rotion-toggle-text">
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
