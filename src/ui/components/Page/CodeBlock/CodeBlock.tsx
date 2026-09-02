import type { RichTextItemResponseEx } from '../../../../exporter/index.js'
import { joinRichTextContent, richTextKey } from '../../lib.js'
import RichText from '../../RichText/RichText.js'
import Code from './Code/Code.js'
import type { CodeBlockProps } from './CodeBlock.types'
import '../../tokens.css'
import './CodeBlock.css'

const CodeBlock = ({ block }: CodeBlockProps) => {
  // Notion splits the code into several rich text items when a part of it has
  // its own annotations, such as a comment, so they are joined into one code
  const code = joinRichTextContent(block.code?.rich_text || [])

  const captions = block.code?.caption.map((v, i) => {
    return <RichText textObject={v as RichTextItemResponseEx} key={richTextKey(v.plain_text, i)} />
  })

  return (
    <div className="rotion-code">
      <Code language={block.code?.language || ''}>{code}</Code>
      <div className="rotion-code-caption">{captions}</div>
    </div>
  )
}

export default CodeBlock
