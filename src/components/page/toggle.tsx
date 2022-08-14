import React from 'react'
import TextBlock from './text'
import type {
  ToggleBlockObjectResponseEx,
  ParagraphBlockObjectResponse,
} from '../../types'

export type ToggleBlockProps = {
  block: ToggleBlockObjectResponseEx
}

type Triangle = {
  open: boolean
}

const Triangle: React.FC<Triangle> = ({ open }) => {
  return (
    <svg viewBox="0 0 100 100" className="triangle-closed">
      <polygon points="5.9,88.2 50,11.8 94.1,88.2 "></polygon>
      <style jsx>{`
        .triangle-closed {
          width: 0.6875em;
          height: 0.6875em;
          display: block;
          fill: inherit;
          flex-shrink: 0;
          backface-visibility: hidden;
          transition: transform 200ms ease-out 0s;
          transform: rotateZ(${open ? 180 : 90}deg);
          opacity: 1;
        }
      `}</style>
    </svg>
  )
}

const ToggleBlock: React.FC<ToggleBlockProps> = ({ block }) => {
  const [open, setOpen] = React.useState(false)
  const onClick = () => setOpen(!open)
  const text = block.children.results.map((vv, i) => {
    const v = vv as ParagraphBlockObjectResponse
    return <TextBlock tag="div" block={v.paragraph.rich_text} key={`${i}`} />
  })

  return (
    <div className="toggle">
      <div className="triangle-box" onClick={onClick}>
        <Triangle open={open} />
      </div>
      <div className="toggle-box">
        <TextBlock tag="div" block={block.toggle.rich_text} />
        {open ? text : null }
      </div>
      <style jsx>{`
        .toggle {
          display: flex;
          align-items: flex-start;
          width: 100%;
        }
        .triangle-box {
          transition: background 20ms ease-in 0s;
          cursor: pointer;
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          width: 24px;
          height: 24px;
          border-radius: 3px;
          padding: 4px;
          margin-top: 4px;
          margin-right: 4px;
        }
        .triangle-box:hover {
          background-color: #eee;
        }
        .toggle-box {
          flex: 1 1 0px;
          min-width: 1px;
        }
      `}</style>
    </div>
  )
}

export default ToggleBlock
