import React from 'react'
import type { HandlerProps } from './PageHandler.types'

import BookmarkBlock from './BookmarkBlock'
import BreadcrumbBlock from './BreadcrumbBlock'
import BulletedListBlocks from './BulletedListBlocks'
import CalloutBlock from './CalloutBlock'
import ChildDatabaseBlock from './ChildDatabaseBlock'
import ChildPageBlock from './ChildPageBlock'
import CodeBlock from './CodeBlock'
import ColumnListBlock from './ColumnListBlock'
import EmbedBlock from './EmbedBlock'
import EquationBlock from './EquationBlock'
import FileBlock from './FileBlock'
import TextBlock from './TextBlock'
import ImageBlock from './ImageBlock'
import LinkPreviewBlock from './LinkPreviewBlock'
import NumberedListBlocks from './NumberedListBlocks'
import PdfBlock from './PdfBlock'
import SyncedBlock from './SyncedBlock'
import TableBlock from './TableBlock'
import TableOfContentsBlock from './TableOfContentsBlock'
import TemplateBlock from './TemplateBlock'
import ToDoBlock from './ToDoBlock'
import ToggleBlock from './ToggleBlock'
import VideoBlock from './VideoBlock'

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

export const PageHandler = ({ block, href, link, query, modules }: HandlerProps) => {
  switch (block.type) {
    case 'bookmark':
      return <BookmarkBlock block={block} key={block.id} />
    case 'breadcrumb':
      console.log(`still a not supported component: ${block.type}`, block)
      return <BreadcrumbBlock block={block} key={block.id} />
    case 'bulleted_list_item':
      return <BulletedListBlocks block={block} key={block.id} />
    case 'callout':
      return <CalloutBlock block={block} key={block.id} />
    case 'child_database':
      return <ChildDatabaseBlock block={block} href={href} link={link} query={query} key={block.id} />
    case 'child_page':
      return <ChildPageBlock block={block} href={href} link={link} query={query} key={block.id} />
    case 'code':
      return <CodeBlock block={block} key={block.id} modules={modules} />
    case 'column_list':
      // ColumnlistBlock calls blocks
      return <ColumnListBlock block={block} href={href} link={link} query={query} key={block.id} />
    case 'embed':
      return <EmbedBlock block={block} key={block.id} />
    case 'equation':
      return <EquationBlock block={block} key={block.id} />
    case 'file':
      console.log(`still a not supported component: ${block.type}`, block)
      return <FileBlock block={block} key={block.id} />
    case 'heading_1':
    case 'heading_2':
    case 'heading_3':
    case 'paragraph':
    case 'quote':
    case 'divider': {
      const tag = blockType[block.type] as keyof JSX.IntrinsicElements
      // @ts-ignore
      const text = block[block.type]?.rich_text
      return <TextBlock tag={tag} block={text} key={block.id} />
    }
    case 'image':
      return <ImageBlock block={block} key={block.id} />
    case 'link_preview':
      return <LinkPreviewBlock block={block} key={block.id} />
    case 'numbered_list_item':
      return <NumberedListBlocks block={block} key={block.id} />
    case 'pdf':
      console.log(`still a not supported component: ${block.type}`, block)
      return <PdfBlock block={block} key={block.id} />
    case 'synced_block':
      console.log(`still a not supported component: ${block.type}`, block)
      return <SyncedBlock block={block} key={block.id} />
    case 'table':
      return <TableBlock block={block} key={block.id} />
    case 'table_of_contents':
      console.log(`still a not supported component: ${block.type}`, block)
      return <TableOfContentsBlock block={block} key={block.id} />
    case 'template':
      console.log(`still a not supported component: ${block.type}`, block)
      return <TemplateBlock block={block} key={block.id} />
    case 'to_do':
      return <ToDoBlock block={block} key={block.id} />
    case 'toggle':
      return <ToggleBlock block={block} key={block.id} />
    case 'video':
      return <VideoBlock block={block} key={block.id} />
    default:
      console.log(`unknown component: ${block.type}`, block)
      return <></>
  }
}

export default PageHandler
