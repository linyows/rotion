import React from 'react'
import ColumnlistBlock from './columnlist'
import VideoBlock from './video'
import CodeBlock from './code'
import ImageBlock from './image'
import TodoBlock from './todo'
import ToggleBlock from './toggle'
import TableBlock from './table'
import CalloutBlock from './callout'
import ChildpageBlock from './childpage'
import path from 'path'
import type { BlockObjectResponse } from '../../types'
import { JSXElementConstructor } from 'react'

export const blockType = {
  heading_1: 'h1',
  heading_2: 'h2',
  heading_3: 'h3',
  bulleted_list_item: 'li',
  numbered_list_item: 'li',
  divider: 'hr',
  paragraph: 'p',
  code: 'code',
  quote: 'blockquote',
}

export type HandlerProps = {
  block: BlockObjectResponse
}

export const Handler = ({ block }: HandlerProps): JSX.Element | undefined => {
  const { id, type, code } = block
  switch (type) {
    case 'heading_1':
    case 'heading_2':
    case 'heading_3':
    case 'divider':
    case 'paragraph':
    case 'quote':
    case 'numbered_list_item':
    case 'bulleted_list_item':
      const tag = blockType[type] as keyof JSX.IntrinsicElements
      const text = block[type]?.text
      return (
        <TextBlock tag={tag} block={text} key={`${id}-${tag}`} />
      )
      break

    case 'image':
      return <ImageBlock block={block} key={block.id} />
      break

    case 'code':
      return <CodeBlock block={block} />
      break

    case 'video':
      return <VideoBlock block={block} />
      break

    case 'embed':
      if (block.embed?.html !== undefined) {
        return (
          <div dangerouslySetInnerHTML={{ __html: block.embed.html }} />
        )
      } else {
        console.log('embed:', block)
      }
      break

    case 'mention':
      console.log('mention:', block)
      break

    case 'bookmark':
      console.log('bookmark:', block)
      break

    case 'link_preview':
      break

    case 'to_do':
      return <TodoBlock block={block} />
      break

    case 'table':
      return <TableBlock block={block} />
      break

    case 'callout':
      return <CalloutBlock block={block} />
      break

    case 'column_list':
      return <ColumnlistBlock block={block} />
      break

    case 'child_page':
      return <ChildpageBlock block={block} />
      break

    case 'toggle':
      return <ToggleBlock block={block} />
      break

    default:
      console.log(`out of switch: ${type}`, block)
      break
  }
}

export default Handler
