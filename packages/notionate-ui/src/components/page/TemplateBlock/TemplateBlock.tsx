import React from 'react'
import type { RichTextItemResponse } from 'notionate-pages'
import type { TemplateBlockProps } from './TemplateBlock.types'
import RichText from '../TextBlock/RichText'

// TODO: Iimplement and design
const TemplateBlock = ({ block }: TemplateBlockProps) => {
  const { template } = block
  return (
    <div className="notionate-blocks-template">
      {template.rich_text.map((v: RichTextItemResponse, i) => (
        <RichText textObject={v} key={`richtext-${i}`} />
      ))}
    </div>
  )
}

export default TemplateBlock
