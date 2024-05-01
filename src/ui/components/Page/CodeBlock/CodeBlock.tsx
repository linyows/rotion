import React from 'react'
import type {
  RichTextItemResponse,
  RichTextItemResponseEx,
  TextRichTextItemResponse,
} from '../../../../exporter'
import RichText from '../../RichText/RichText'
import type { CodeBlockProps } from './CodeBlock.types'
import Code from './Code/Code'
import '../../tokens.css'
import './CodeBlock.css'

const CodeBlock = ({ block }: CodeBlockProps) => {
  const els = block.code?.rich_text.map((textObject: RichTextItemResponse, i) => {
    const text = textObject as TextRichTextItemResponse
    return (
      <Code language={block.code?.language || ''} key={`${i}`}>
        {text.text.content}
      </Code>
    )
  })

  const captions = block.code?.caption.map((v, i) => {
    return (
      <RichText textObject={v as RichTextItemResponseEx} key={`${i}`} />
    )
  })

  return (
    <div className="rotion-code">
      {els}
      <div className="rotion-code-caption">
        {captions}
      </div>
    </div>
  )
}

export default CodeBlock
