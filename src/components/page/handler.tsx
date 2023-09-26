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
import TextBlock from './text'
import type {
  BlockObjectResponse,
  Link,
} from '../../server/types'
import type { ParsedUrlQueryInput } from 'node:querystring'

export type ExternalModules = {
  mermaid?: {
    init: (config?: {}, nodes?: string | HTMLElement, callback?: ((id: string) => unknown) | undefined) => Promise<void>
  }
  prism?: {
    highlightElement: (element: Element, async?: boolean | undefined, callback?: (element: Element) => void | undefined) => void
  }
}

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
  href?: string
  link?: Link
  query?: ParsedUrlQueryInput
  modules?: ExternalModules
}

export const BlockHandler = ({ block, href, link, query, modules }: BlockHandlerProps): JSX.Element | undefined => {
  switch (block.type) {
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

    case 'numbered_list_item': {
      const tag = blockType[block.type] as keyof JSX.IntrinsicElements
      // @ts-ignore
      const text = block[block.type]?.rich_text
      if (block.has_children && block.children !== undefined) {
        return (
          <>
            <TextBlock tag={tag} block={text} key={block.id} />
            {block.children.results.map((bb) => (
              BlockHandler({ block: (bb as BlockObjectResponse), href, link, query })
            ))}
          </>
        )
      }
      return <TextBlock tag={tag} block={text} key={block.id} />
    }

    case 'bulleted_list_item': {
      const tag = blockType[block.type] as keyof JSX.IntrinsicElements
      // @ts-ignore
      const text = block[block.type]?.rich_text
      if (block.has_children && block.children !== undefined) {
        return (
          <>
            <TextBlock tag={tag} block={text} key={block.id} />
            {block.children.results.map((bb) => (
              BlockHandler({ block: (bb as BlockObjectResponse), href, link, query })
            ))}
          </>
        )
      }
      return <TextBlock tag={tag} block={text} key={block.id} />
    }

    case 'image':
      return <ImageBlock block={block} key={block.id} />

    case 'code':
      return <CodeBlock block={block} key={block.id} modules={modules} />

    case 'video':
      return <VideoBlock block={block} key={block.id} />

    case 'embed':
      return <EmbedBlock block={block} key={block.id} />

    case 'bookmark':
      return <BookmarkBlock block={block} key={block.id} />

    case 'link_preview':
      return <LinkpreviewBlock block={block} key={block.id} />

    case 'to_do':
      return <TodoBlock block={block} key={block.id} />

    case 'table':
      return <TableBlock block={block} key={block.id} />

    case 'callout':
      return <CalloutBlock block={block} key={block.id} />

    case 'column_list':
      // ColumnlistBlock calls blocks
      return <ColumnlistBlock block={block} href={href} link={link} query={query} key={block.id} />

    case 'child_page':
      return <ChildpageBlock block={block} href={href} link={link} query={query} key={block.id} />

    case 'child_database':
      return <ChilddatabaseBlock block={block} href={href} link={link} query={query} key={block.id} />

    case 'toggle':
      return <ToggleBlock block={block} key={block.id} />

    default:
      console.log(`still a not supported component: ${block.type}`, block)
      break
  }
}

export default BlockHandler
