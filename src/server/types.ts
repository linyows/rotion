import type {
  QueryDatabaseResponse,
  GetDatabaseResponse,
  ListBlockChildrenResponse,
  GetSelfResponse,
  ParagraphBlockObjectResponse,
  Heading1BlockObjectResponse,
  Heading2BlockObjectResponse,
  Heading3BlockObjectResponse,
  BulletedListItemBlockObjectResponse,
  NumberedListItemBlockObjectResponse,
  QuoteBlockObjectResponse,
  ToDoBlockObjectResponse,
  ToggleBlockObjectResponse,
  TemplateBlockObjectResponse,
  SyncedBlockBlockObjectResponse,
  ChildPageBlockObjectResponse,
  ChildDatabaseBlockObjectResponse,
  EquationBlockObjectResponse,
  CodeBlockObjectResponse,
  CalloutBlockObjectResponse,
  DividerBlockObjectResponse,
  BreadcrumbBlockObjectResponse,
  TableOfContentsBlockObjectResponse,
  ColumnListBlockObjectResponse,
  ColumnBlockObjectResponse,
  LinkToPageBlockObjectResponse,
  TableBlockObjectResponse,
  TableRowBlockObjectResponse,
  EmbedBlockObjectResponse,
  BookmarkBlockObjectResponse,
  ImageBlockObjectResponse,
  VideoBlockObjectResponse,
  PdfBlockObjectResponse,
  FileBlockObjectResponse,
  AudioBlockObjectResponse,
  LinkPreviewBlockObjectResponse,
  UnsupportedBlockObjectResponse,
  RichTextItemResponse,
  GetPagePropertyResponse,
  PageObjectResponse,
  PersonUserObjectResponse,
  DatabaseObjectResponse,
} from '@notionhq/client/build/src/api-endpoints'
import type { UrlObject } from 'node:url'

export * from '@notionhq/client/build/src/api-endpoints'

export type IdRequest = string | string
export type EmptyObject = Record<string, never>
export type TextRequest = string
export type StringRequest = string
export type EmojiRequest = string
export type TimeZoneRequest = string
export type DateResponse = {
  start: string
  end: string | null
  time_zone: TimeZoneRequest | null
}
export type SelectColor =
  | 'default'
  | 'gray'
  | 'brown'
  | 'orange'
  | 'yellow'
  | 'green'
  | 'blue'
  | 'purple'
  | 'pink'
  | 'red'

export type SelectColorWithBG = SelectColor
  | 'gray_background'
  | 'brown_background'
  | 'orange_background'
  | 'yellow_background'
  | 'green_background'
  | 'blue_background'
  | 'purple_background'
  | 'pink_background'
  | 'red_background'

export type SelectPropertyResponse = {
  id: StringRequest
  name: StringRequest
  color: SelectColor
}

export type UserObjectResponse = GetSelfResponse

export type PartialUserObjectResponse =
  | { id: IdRequest, object: 'user' }
  | UserObjectResponse

export type External = {
  type: 'external'
  external: { url: TextRequest }
  caption: Array<RichTextItemResponse>
}

export type File = {
  type: 'file'
  file: { url: string, expiry_time: string }
  caption: Array<RichTextItemResponse>
}

export type Icon =
    | { type: 'emoji', emoji: EmojiRequest }
    | { type: 'external', external: { url: TextRequest } }
    | { type: 'file', file: { url: string, expiry_time: string } }
    | null

export type BulletedListItemBlockObjectResponseEx = BulletedListItemBlockObjectResponse & {
  children?: ListBlockChildrenResponseEx
}
export type NumberedListItemBlockObjectResponseEx = NumberedListItemBlockObjectResponse & {
  children?: ListBlockChildrenResponseEx
}
export type TableBlockObjectResponseEx = TableBlockObjectResponse & {
  children: ListBlockChildrenResponseEx
}
export type ToggleBlockObjectResponseEx = ToggleBlockObjectResponse & {
  children: ListBlockChildrenResponseEx
}
export type ColumnListBlockObjectResponseEx = ColumnListBlockObjectResponse & {
  children: ListBlockChildrenResponseEx
  columns: Array<ListBlockChildrenResponseEx>
}
export type ChildPageBlockObjectResponseEx = ChildPageBlockObjectResponse & {
  children: ListBlockChildrenResponseEx
  page: GetPageResponseEx
}
export type ChildDatabaseBlockObjectResponseEx = ChildDatabaseBlockObjectResponse & {
  database: GetDatabaseResponse
}
export type BookmarkBlockObjectResponseEx = BookmarkBlockObjectResponse & {
  bookmark: {
    url: string
    caption: Array<RichTextItemResponse>
    site: {
      title: string
      desc: string
      image: string
      icon: string
    }
  }
}
export type ImageBlockObjectResponseEx = ImageBlockObjectResponse & {
  image:
  | {
    type: 'external'
    external: { url: TextRequest }
    caption: Array<RichTextItemResponse>
    src: string
  }
  | {
    type: 'file'
    file: { url: string; expiry_time: string }
    caption: Array<RichTextItemResponse>
    src: string
  }
}
export type VideoBlockObjectResponseEx = VideoBlockObjectResponse & {
  video:
  | {
    type: 'external'
    external: { url: TextRequest }
    caption: Array<RichTextItemResponse>
    html: string
  }
  | {
    type: 'file'
    file: { url: string; expiry_time: string }
    caption: Array<RichTextItemResponse>
  }
}
export type EmbedBlockObjectResponseEx = EmbedBlockObjectResponse & {
  embed: {
    url: string
    caption: Array<RichTextItemResponse>
    html: string
  }
}

export type BlockObjectResponse =
  | ParagraphBlockObjectResponse
  | Heading1BlockObjectResponse
  | Heading2BlockObjectResponse
  | Heading3BlockObjectResponse
  | BulletedListItemBlockObjectResponseEx
  | NumberedListItemBlockObjectResponseEx
  | QuoteBlockObjectResponse
  | ToDoBlockObjectResponse
  | ToggleBlockObjectResponseEx
  | TemplateBlockObjectResponse
  | SyncedBlockBlockObjectResponse
  | ChildPageBlockObjectResponseEx
  | ChildDatabaseBlockObjectResponseEx
  | EquationBlockObjectResponse
  | CodeBlockObjectResponse
  | CalloutBlockObjectResponse
  | DividerBlockObjectResponse
  | BreadcrumbBlockObjectResponse
  | TableOfContentsBlockObjectResponse
  | ColumnListBlockObjectResponseEx
  | ColumnBlockObjectResponse
  | LinkToPageBlockObjectResponse
  | TableBlockObjectResponseEx
  | TableRowBlockObjectResponse
  | EmbedBlockObjectResponseEx
  | BookmarkBlockObjectResponseEx
  | ImageBlockObjectResponseEx
  | VideoBlockObjectResponseEx
  | PdfBlockObjectResponse
  | FileBlockObjectResponse
  | AudioBlockObjectResponse
  | LinkPreviewBlockObjectResponse
  | UnsupportedBlockObjectResponse

export type ListBlockChildrenResponseEx = ListBlockChildrenResponse & {
  results: Array<BlockObjectResponse>
  children?: ListBlockChildrenResponse
  last_edited_time?: string
}

// Extending by adding src param
export type GetPageResponseEx = PageObjectResponse & {
  cover:
    | { src: string, type: 'external', external: { url: string, expiry_time: string } }
    | { src: string, type: 'file', file: { url: string, expiry_time: string } }
  icon:
    | { src: string, type: 'emoji'; emoji: EmojiRequest }
    | { src: string, type: 'external', external: { url: string, expiry_time: string } }
    | { src: string, type: 'file', file: { url: string, expiry_time: string } }
  meta?: GetPagePropertyResponse
}

export type DBPageBase = {
  object: 'page'
  id: string
  created_time: string
  last_edited_time: string
  archived: boolean
  url: string
  created_by: PartialUserObjectResponse
  last_edited_by: PartialUserObjectResponse
  parent:
    | { type: 'database_id', database_id: IdRequest }
    | { type: 'page_id', page_id: IdRequest }
    | { type: 'workspace', workspace: true }
  icon: Icon
  cover:
    | { type: 'external', external: { url: TextRequest } }
    | { type: 'file', file: { url: string, expiry_time: string } }
    | null
  properties: {}
}

export type DBProperties = Record<
    string,
    | { type: 'title', title: Array<RichTextItemResponse>, id: string }
    | { type: 'rich_text', rich_text: Array<RichTextItemResponse>, id: string }
    | { type: 'number', number: number | null, id: string }
    | { type: 'url', url: string | null, id: string }
    | { type: 'select', select: SelectPropertyResponse | null, id: string }
    | { type: 'multi_select', multi_select: Array<SelectPropertyResponse>, id: string }
    | { type: 'people', people: Array<PartialUserObjectResponse>, id: string }
    | { type: 'email', email: string | null, id: string }
    | { type: 'phone_number', phone_number: string | null, id: string }
    | { type: 'date', date: DateResponse | null, id: string }
    | { type: 'files', files: Array<
      | { file: { url: string, expiry_time: string }, name: StringRequest, type?: 'file' }
      | { external: { url: TextRequest }, name: StringRequest, type?: 'external' }
      >, id: string }
    | { type: 'checkbox', checkbox: boolean, id: string }
    | { type: 'formula', formula:
      | { type: 'string', string: string | null }
      | { type: 'date', date: DateResponse | null }
      | { type: 'number', number: number | null }
      | { type: 'boolean', boolean: boolean | null }
      , id: string }
    | { type: 'relation', relation: Array<{ id: string }>, id: string }
    | { type: 'created_time', created_time: string, id: string }
    | { type: 'created_by', created_by: PartialUserObjectResponse, id: string }
    | { type: 'last_edited_time', last_edited_time: string, id: string }
    | { type: 'last_edited_by', last_edited_by: PartialUserObjectResponse, id: string }
  >

// https://github.com/makenotion/notion-sdk-js/blob/d3f6c1b41c0f814e39ed202c6aa3b4a7cfdca582/src/api-endpoints.ts#L10837-L11019
export type QueryDatabaseResponseResult = | {
  parent:
    | { type: 'database_id', database_id: IdRequest }
    | { type: 'page_id', page_id: IdRequest }
    | { type: 'workspace', workspace: true }
  properties: DBProperties
  icon:
    | { type: 'emoji', emoji: EmojiRequest }
    | { type: 'external', external: { url: TextRequest } }
    | { type: 'file', file: { url: string, expiry_time: string } }
    | null
  cover:
    | { type: 'external', external: { url: TextRequest } }
    | { type: 'file', file: { url: string, expiry_time: string } }
    | null
  object: 'page'
  id: string
  created_time: string
  last_edited_time: string
  archived: boolean
  url: string
} | { object: 'page'; id: string }

export type PageObjectResponseEx = PageObjectResponse & {
  property_items: Array<GetPagePropertyResponse>
  cover:
    | { src: string, type: 'external'; external: { url: TextRequest } }
    | { src: string, type: 'file'; file: { url: string; expiry_time: string } }
    | null
}

// https://github.com/makenotion/notion-sdk-js/blob/7c5b7645759bf90d71d496dc542a1a912379ee12/src/api-endpoints.ts#L4603-L4632
export type GetDatabaseResponseEx = DatabaseObjectResponse & {
  icon:
    | { type: 'emoji'; emoji: EmojiRequest }
    | { src: string, type: 'external'; external: { url: TextRequest } }
    | { src: string, type: 'file'; file: { url: string; expiry_time: string } }
    | null
  cover:
    | { src: string, type: 'external'; external: { url: TextRequest } }
    | { src: string, type: 'file'; file: { url: string; expiry_time: string } }
    | null
}

export type QueryDatabaseResponseEx = QueryDatabaseResponse & {
  results: Array<PageObjectResponseEx>
  meta: GetDatabaseResponseEx
}

export type PersonUserObjectResponseEx = PersonUserObjectResponse & {
  avatar?: string
}

export type Link = React.FC<{
  children: string | React.ReactElement<'a', string | React.JSXElementConstructor<any>>
  className?: string
  href: string | UrlObject
}>
