import React from 'react'
import RichText from './RichText'
import type { TextBlockProps } from './TextBlock.types'

const TextBlock = ({ tag, block }: TextBlockProps) => {
  const CustomTag = tag
  if (block === undefined) {
    return (
      <div className="notionate-blocks-text-hr">
      </div>
    )
  }

  return (
    <>
      <CustomTag className={`notionate-blocks-text-${tag}`}>
        {block.map((v, i) => (
          <RichText textObject={v} key={`${i}`} />
        ))}
      </CustomTag>
    </>
  )
}

export default TextBlock
