import React, { useState } from 'react'
import TextBlock from '../TextBlock/TextBlock'
import type { ParagraphBlockObjectResponse } from '../../../../exporter'
import type { ToggleBlockProps } from './ToggleBlock.types'

interface TriangleProps {
  open: boolean
}

const Triangle = ({ open }: TriangleProps) => {
  const style = {
    transform: `rotateZ(${open ? 180 : 90}deg)`,
  }
  return (
    <svg className="notionate-blocks-toggle-triangle-svg" style={style} viewBox="0 0 100 100">
      <polygon points="5.9,88.2 50,11.8 94.1,88.2 "></polygon>
    </svg>
  )
}

const ToggleBlock = ({ block }: ToggleBlockProps) => {
  const [open, setOpen] = useState(false)
  const onClick = () => setOpen(!open)

  const text = block.children.results.map((vv, i) => {
    const v = vv as ParagraphBlockObjectResponse
    return <TextBlock tag="div" block={v.paragraph.rich_text} key={`${i}`} />
  })

  return (
    <div className="notionate-blocks-toggle">
      <div className="notionate-blocks-toggle-triangle" onClick={onClick}>
        <Triangle open={open} />
      </div>
      <div className="notionate-blocks-toggle-box">
        <TextBlock tag="div" block={block.toggle.rich_text} />
        {open ? text : null }
      </div>
    </div>
  )
}

export default ToggleBlock
