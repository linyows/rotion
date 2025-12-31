import React, { type JSX } from 'react'
import type { HandlerProps } from './PageHandler.types'

import BookmarkBlock from './BookmarkBlock/BookmarkBlock.js'
import BreadcrumbBlock from './BreadcrumbBlock/BreadcrumbBlock.js'
import BulletedListBlocks from './BulletedListBlock/BulletedListBlock.js'
import CalloutBlock from './CalloutBlock/CalloutBlock.js'
import ChildDatabaseBlock from './ChildDatabaseBlock/ChildDatabaseBlock.js'
import ChildPageBlock from './ChildPageBlock/ChildPageBlock.js'
import CodeBlock from './CodeBlock/CodeBlock.js'
import ColumnListBlock from './ColumnListBlock/ColumnListBlock.js'
import EmbedBlock from './EmbedBlock/EmbedBlock.js'
import EquationBlock from './EquationBlock/EquationBlock.js'
import FileBlock from './FileBlock/FileBlock.js'
import TextBlock from './TextBlock/TextBlock.js'
import ImageBlock from './ImageBlock/ImageBlock.js'
import LinkPreviewBlock from './LinkPreviewBlock/LinkPreviewBlock.js'
import NumberedListBlocks from './NumberedListBlock/NumberedListBlock.js'
import PdfBlock from './PdfBlock/PdfBlock.js'
import SyncedBlock from './SyncedBlock/SyncedBlock.js'
import TableBlock from './TableBlock/TableBlock.js'
import TableOfContentsBlock from './TableOfContentsBlock/TableOfContentsBlock.js'
import ToDoBlock from './ToDoBlock/ToDoBlock.js'
import ToggleBlock from './ToggleBlock/ToggleBlock.js'
import VideoBlock from './VideoBlock/VideoBlock.js'

export const blockType = {
  heading_1: 'h2',
  heading_2: 'h3',
  heading_3: 'h4',
  bulleted_list_item: 'li',
  numbered_list_item: 'li',
  divider: 'hr',
  paragraph: 'p',
  code: 'code',
  quote: 'blockquote',
}

export const PageHandler = ({ block, href, link, query, breadcrumb_hrefs }: HandlerProps) => {
  switch (block.type) {
    case 'bookmark':
      return <BookmarkBlock block={block} key={block.id} />
    case 'breadcrumb':
      return <BreadcrumbBlock block={block} hrefs={breadcrumb_hrefs} link={link} query={query} key={block.id} />
    case 'bulleted_list_item':
      return <BulletedListBlocks block={block} key={block.id} />
    case 'callout':
      return <CalloutBlock block={block} href={href} link={link} query={query} key={block.id} />
    case 'child_database':
      return <ChildDatabaseBlock block={block} href={href} link={link} query={query} key={block.id} />
    case 'child_page':
      return <ChildPageBlock block={block} href={href} link={link} key={block.id} />
    case 'code':
      return <CodeBlock block={block} key={block.id} />
    case 'column_list':
      // ColumnlistBlock calls blocks
      return <ColumnListBlock block={block} href={href} link={link} query={query} key={block.id} />
    case 'embed':
      return <EmbedBlock block={block} key={block.id} />
    case 'equation':
      return <EquationBlock block={block} key={block.id} />
    case 'file':
      return <FileBlock block={block} key={block.id} />
    case 'heading_1':
    case 'heading_2':
    case 'heading_3':
    case 'paragraph':
    case 'quote':
    case 'divider': {
      const tag = blockType[block.type] as keyof JSX.IntrinsicElements
      return <TextBlock tag={tag} block={block} key={block.id} />
    }
    case 'image':
      return <ImageBlock block={block} key={block.id} />
    case 'link_preview':
      return <LinkPreviewBlock block={block} key={block.id} />
    case 'numbered_list_item':
      return <NumberedListBlocks block={block} key={block.id} />
    case 'pdf':
      return <PdfBlock block={block} key={block.id} />
    case 'synced_block':
      return <SyncedBlock block={block} key={block.id} />
    case 'table':
      return <TableBlock block={block} key={block.id} />
    case 'table_of_contents':
      return <TableOfContentsBlock block={block} key={block.id} />
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
