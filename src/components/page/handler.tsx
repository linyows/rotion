import React from 'react'
import ColumnlistBlock from './columnlist'
import VideoBlock from './video'
import EmbedBlock from './embed'
import CodeBlock from './code'
import ImageBlock from './image'
import TodoBlock from './todo'
import ToggleBlock from './toggle'
import TableBlock from './table'
import BookmarkBlock from './bookmark'
import CalloutBlock from './callout'
import LinkpreviewBlock from './linkpreview'
import ChildpageBlock from './childpage'
import ChilddatabaseBlock from './childdatabase'
import TextBlock, { TextObject } from './text'
import path from 'path'
import type { BlockObjectResponse } from '../../server/types'
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

export type BlockHandlerProps = {
  block: BlockObjectResponse
  link?: string
  LinkComp?: unknown
}

export const BlockHandler = ({ block, link, LinkComp }: BlockHandlerProps): JSX.Element | undefined => {
  switch (block.type) {
    case 'heading_1':
    case 'heading_2':
    case 'heading_3':
    case 'paragraph':
    case 'quote':
    case 'divider':
    case 'numbered_list_item':
    case 'bulleted_list_item':
      const tag = blockType[block.type] as keyof JSX.IntrinsicElements
      // @ts-ignore
      const text = block[block.type]?.rich_text
      return <TextBlock tag={tag} block={text} key={block.id} />
      break

    case 'image':
      return <ImageBlock block={block} key={block.id} />
      break

    case 'code':
      return <CodeBlock block={block} key={block.id} />
      break

    case 'video':
      return <VideoBlock block={block} key={block.id} />
      break

    case 'embed':
      return <EmbedBlock block={block} key={block.id} />
      break

    case 'bookmark':
      return <BookmarkBlock block={block} key={block.id} />
      break

    case 'link_preview':
      return <LinkpreviewBlock block={block} key={block.id} />
      break

    case 'to_do':
      return <TodoBlock block={block} key={block.id} />
      break

    case 'table':
      return <TableBlock block={block} key={block.id} />
      break

    case 'callout':
      return <CalloutBlock block={block} key={block.id} />
      break

    case 'column_list':
      return <ColumnlistBlock block={block} key={block.id} />
      break

    case 'child_page':
      return <ChildpageBlock block={block} link={link} LinkComp={LinkComp} key={block.id} />
      break

    case 'child_database':
      return <ChilddatabaseBlock block={block} link={link} LinkComp={LinkComp} key={block.id} />
      break

    case 'toggle':
      return <ToggleBlock block={block} key={block.id} />
      break

    default:
      console.log(`still a not supported component: ${block.type}`, block)
      break
  }
}

export default BlockHandler
