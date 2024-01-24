import React from 'react'
import type { HandlerProps } from './PageHandler.types'

import BookmarkBlock from './BookmarkBlock/BookmarkBlock'
import BreadcrumbBlock from './BreadcrumbBlock/BreadcrumbBlock'
import BulletedListBlocks from './BulletedListBlocks/BulletedListBlocks'
import CalloutBlock from './CalloutBlock/CalloutBlock'
import ChildDatabaseBlock from './ChildDatabaseBlock/ChildDatabaseBlock'
import ChildPageBlock from './ChildPageBlock/ChildPageBlock'
import CodeBlock from './CodeBlock/CodeBlock'
import ColumnListBlock from './ColumnListBlock/ColumnListBlock'
import EmbedBlock from './EmbedBlock/EmbedBlock'
import EquationBlock from './EquationBlock/EquationBlock'
import FileBlock from './FileBlock/FileBlock'
import TextBlock from './TextBlock/TextBlock'
import ImageBlock from './ImageBlock/ImageBlock'
import LinkPreviewBlock from './LinkPreviewBlock/LinkPreviewBlock'
import NumberedListBlocks from './NumberedListBlocks/NumberedListBlocks'
import PdfBlock from './PdfBlock/PdfBlock'
import SyncedBlock from './SyncedBlock/SyncedBlock'
import TableBlock from './TableBlock/TableBlock'
import TableOfContentsBlock from './TableOfContentsBlock/TableOfContentsBlock'
import TemplateBlock from './TemplateBlock/TemplateBlock'
import ToDoBlock from './ToDoBlock/ToDoBlock'
import ToggleBlock from './ToggleBlock/ToggleBlock'
import VideoBlock from './VideoBlock/VideoBlock'

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

export const PageHandler = ({ block, href, link, query, modules, breadcrumb_hrefs }: HandlerProps) => {
  switch (block.type) {
    case 'bookmark':
      return <BookmarkBlock block={block} key={block.id} />
    case 'breadcrumb':
      return <BreadcrumbBlock block={block} hrefs={breadcrumb_hrefs} link={link} query={query} key={block.id} />
    case 'bulleted_list_item':
      return <BulletedListBlocks block={block} key={block.id} />
    case 'callout':
      return <CalloutBlock block={block} key={block.id} />
    case 'child_database':
      return <ChildDatabaseBlock block={block} href={href} link={link} query={query} key={block.id} />
    case 'child_page':
      return <ChildPageBlock block={block} href={href} link={link} key={block.id} />
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
      console.log(`still a not supported component: ${block.type}`)
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
      console.log(`still a not supported component: ${block.type}`)
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
