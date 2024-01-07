import React from 'react'
import type {
  RichTextItemResponse,
  TextRichTextItemResponse,
} from 'notionate-pages'
import RichText from '../TextBlock/RichText/RichText'
import type { CodeBlockProps } from './CodeBlock.types'
import Code from './Code/Code'

const CodeBlock = ({ block, modules }: CodeBlockProps) => {
  const els = block.code?.rich_text.map((textObject: RichTextItemResponse, i) => {
    const text = textObject as TextRichTextItemResponse
    return (
      <Code language={block.code?.language || ''} key={`${i}`} modules={modules}>
        {text.text.content}
      </Code>
    )
  })

  const captions = block.code?.caption.map((v, i) => {
    return (
      <RichText textObject={v as RichTextItemResponse} key={`${i}`} />
    )
  })

  return (
    <>
      {els}
      <div className="notionate-blocks-code-caption">
        {captions}
      </div>
    </>
  )
}

export default CodeBlock
