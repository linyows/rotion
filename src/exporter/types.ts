import type {
  QueryDatabaseResponse,
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
  MentionRichTextItemResponse,
  TextRichTextItemResponse,
  EquationRichTextItemResponse,
} from '@notionhq/client/build/src/api-endpoints.js'
import { LinkPreviewGithubRepo, LinkPreviewGithubIssue } from './github.js'

export * from '@notionhq/client/build/src/api-endpoints.js'

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
  database: GetDatabaseResponseEx
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
export type CalloutBlockObjectResponseEx = CalloutBlockObjectResponse & {
  callout: {
    rich_text: Array<RichTextItemResponse>
    color: SelectColorWithBG
    icon:
    | { type: 'emoji', emoji: EmojiRequest }
    | { src: string, type: 'external', external: { url: TextRequest } }
    | { src: string, type: 'file', file: { url: string, expiry_time: string } }
  }
  children?: ListBlockChildrenResponseEx
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

export type VideoExternal = {
  type: 'external'
  external: { url: TextRequest }
  caption: Array<RichTextItemResponse>
  html: string
}
export type VideoFile = {
  type: 'file'
  file: { url: string, expiry_time: string }
  caption: Array<RichTextItemResponse>
  src: string
  videoType: 'video/mp4' | 'video/webm' | 'video/ogg' | 'video/ogv' | ''
}
export type VideoBlockObjectResponseEx = VideoBlockObjectResponse & {
  video: VideoExternal | VideoFile
}

export type EmbedBlockObjectResponseEx = EmbedBlockObjectResponse & {
  embed: {
    url: string
    caption: Array<RichTextItemResponse>
    html: string
  }
}

export type TemplateMentionDateTemplateMentionResponse = {
  type: "template_mention_date"
  template_mention_date: "today" | "now"
}
export type TemplateMentionUserTemplateMentionResponse = {
  type: "template_mention_user"
  template_mention_user: "me"
}
export type TemplateMentionResponse = TemplateMentionDateTemplateMentionResponse | TemplateMentionUserTemplateMentionResponse
export type LinkPreviewMentionResponse = {
  url: TextRequest
}
export type MentionEmoji = { type: 'emoji', emoji: string }
export type MentionExternalOrFile = { type: 'external' | 'file', src: string, url: string }
export type MentionIcon = MentionEmoji | MentionExternalOrFile
export type PageOrDatabaseMention = { id: IdRequest, name: string, icon: MentionIcon }
export type MentionRichTextItemResponseEx = MentionRichTextItemResponse & {
  mention:
  | { type: "user", user: PartialUserObjectResponse | UserObjectResponse }
  | { type: "date", date: DateResponse }
  | { type: "link_preview", link_preview: LinkPreviewMentionResponse }
  | { type: "template_mention", template_mention: TemplateMentionResponse }
  | { type: "page", page: PageOrDatabaseMention }
  | { type: "database", database: PageOrDatabaseMention }
}

export type RichTextItemResponseEx = TextRichTextItemResponse | MentionRichTextItemResponseEx | EquationRichTextItemResponse
export type ParagraphBlockObjectResponseEx = ParagraphBlockObjectResponse & {
  paragraph: {
    rich_text: Array<RichTextItemResponseEx>
    color: SelectColor
  }
}
export type Breadcrumb = {
  id: string
  name: string
  icon: MentionIcon
}
export type BreadcrumbBlockObjectResponseEx = BreadcrumbBlockObjectResponse & {
  list: Breadcrumb[]
}

/* Add src and size */
export type FileBlockObjectResponseEx = FileBlockObjectResponse & {
  file: {
    type: "external",
    external: {
      url: TextRequest,
    },
    caption: Array<RichTextItemResponse>,
    src: string,
    size: number,
  } | {
    type: 'file',
    file: {
      url: string,
      expiry_time: string,
    },
    caption: Array<RichTextItemResponse>,
    src: string,
    size: number,
  }
}

/* Add src and size */
export type PdfBlockObjectResponseEx = PdfBlockObjectResponse & {
  pdf: {
    type: "external",
    external: {
      url: TextRequest,
    },
    caption: Array<RichTextItemResponse>,
    src: string,
    size: number,
  } | {
    type: 'file',
    file: {
      url: string,
      expiry_time: string,
    },
    caption: Array<RichTextItemResponse>,
    src: string,
    size: number,
  }
}

/* Add children */
export type SyncedBlockBlockObjectResponseEx = SyncedBlockBlockObjectResponse & {
  children?: ListBlockChildrenResponseEx
}

export type BlockObjectResponse =
  | ParagraphBlockObjectResponseEx
  | Heading1BlockObjectResponse
  | Heading2BlockObjectResponse
  | Heading3BlockObjectResponse
  | BulletedListItemBlockObjectResponseEx
  | NumberedListItemBlockObjectResponseEx
  | QuoteBlockObjectResponse
  | ToDoBlockObjectResponse
  | ToggleBlockObjectResponseEx
  | TemplateBlockObjectResponse
  | SyncedBlockBlockObjectResponseEx
  | ChildPageBlockObjectResponseEx
  | ChildDatabaseBlockObjectResponseEx
  | EquationBlockObjectResponse
  | CodeBlockObjectResponse
  | CalloutBlockObjectResponseEx
  | DividerBlockObjectResponse
  | BreadcrumbBlockObjectResponseEx
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
  | PdfBlockObjectResponseEx
  | FileBlockObjectResponseEx
  | AudioBlockObjectResponse
  | LinkPreviewBlockObjectResponseEx
  | UnsupportedBlockObjectResponse

export type ListBlockChildrenResponseEx = ListBlockChildrenResponse & {
  results: Array<BlockObjectResponse>
  children?: ListBlockChildrenResponse
  last_edited_time?: string
}
export type LinkPreviewBlockObjectResponseEx = LinkPreviewBlockObjectResponse & {
  link_preview: {
    url: string
    github?:
      | { type: 'issue', issue: LinkPreviewGithubIssue }
      | { type: 'repo', repo: LinkPreviewGithubRepo }
    figma?: { html: string }
  }
}

// Extending by adding src param
export type GetPageResponseEx = PageObjectResponse & {
  cover:
    | { src: string, type: 'external', external: { url: string, expiry_time: string } }
    | { src: string, type: 'file', file: { url: string, expiry_time: string } }
    | null
  icon:
    | { src: string, type: 'emoji'; emoji: EmojiRequest }
    | { src: string, type: 'external', external: { url: string, expiry_time: string } }
    | { src: string, type: 'file', file: { url: string, expiry_time: string } }
    | null
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
  icon:
    | { type: 'emoji', emoji: EmojiRequest }
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

export type Parent = 
| { type: "database_id"; database_id: string }
| { type: "page_id"; page_id: string }
| { type: "block_id"; block_id: string }
| { type: "workspace"; workspace: true }

export type DatabaseProperty = DatabasePropertyConfigResponse

export type DatabasePropertyConfigResponse =
  | NumberDatabasePropertyConfigResponse
  | FormulaDatabasePropertyConfigResponse
  | SelectDatabasePropertyConfigResponse
  | MultiSelectDatabasePropertyConfigResponse
  | StatusDatabasePropertyConfigResponse
  | RelationDatabasePropertyConfigResponse
  | RollupDatabasePropertyConfigResponse
  | UniqueIdDatabasePropertyConfigResponse
  | TitleDatabasePropertyConfigResponse
  | RichTextDatabasePropertyConfigResponse
  | UrlDatabasePropertyConfigResponse
  | PeopleDatabasePropertyConfigResponse
  | FilesDatabasePropertyConfigResponse
  | EmailDatabasePropertyConfigResponse
  | PhoneNumberDatabasePropertyConfigResponse
  | DateDatabasePropertyConfigResponse
  | CheckboxDatabasePropertyConfigResponse
  | CreatedByDatabasePropertyConfigResponse
  | CreatedTimeDatabasePropertyConfigResponse
  | LastEditedByDatabasePropertyConfigResponse
  | LastEditedTimeDatabasePropertyConfigResponse

type RollupFunction =
  | "count"
  | "count_values"
  | "empty"
  | "not_empty"
  | "unique"
  | "show_unique"
  | "percent_empty"
  | "percent_not_empty"
  | "sum"
  | "average"
  | "median"
  | "min"
  | "max"
  | "range"
  | "earliest_date"
  | "latest_date"
  | "date_range"
  | "checked"
  | "unchecked"
  | "percent_checked"
  | "percent_unchecked"
  | "count_per_group"
  | "percent_per_group"
  | "show_original"

export type NumberDatabasePropertyConfigResponse = {
  type: "number"
  number: number | null
  id: string
}

export type FormulaDatabasePropertyConfigResponse = {
  type: "formula"
  formula: NumberDatabasePropertyConfigResponse
  id: string
}

export type SelectDatabasePropertyConfigResponse = {
  type: "select"
  select: SelectPropertyResponse
  id: string
}

export type MultiSelectDatabasePropertyConfigResponse = {
  type: "multi_select"
  multi_select: SelectPropertyResponse[]
  id: string
}

export type StatusPropertyResponse = {
  id: StringRequest
  name: StringRequest
  color: SelectColor
}

export type StatusDatabasePropertyConfigResponse = {
  type: "status"
  status: {
    options: Array<StatusPropertyResponse>
    groups: Array<{
      id: StringRequest
      name: StringRequest
      color: SelectColor
      option_ids: Array<string>
    }>
  }
  id: string
}

export type SinglePropertyDatabasePropertyRelationConfigResponse = {
  type: "single_property"
  single_property: EmptyObject
  database_id: IdRequest
}

export type DualPropertyDatabasePropertyRelationConfigResponse = {
  type: "dual_property"
  dual_property: {
    synced_property_id: StringRequest
    synced_property_name: StringRequest
  }
  database_id: IdRequest
}

export type DatabasePropertyRelationConfigResponse =
  | SinglePropertyDatabasePropertyRelationConfigResponse
  | DualPropertyDatabasePropertyRelationConfigResponse

export type RelationDatabasePropertyConfigResponse = {
  type: "relation"
  relation: DatabasePropertyRelationConfigResponse
  id: string
}

export type RollupDatabasePropertyConfigResponse = {
  type: "rollup"
  rollup: {
    rollup_property_name: string
    relation_property_name: string
    rollup_property_id: string
    relation_property_id: string
    function: RollupFunction
  }
  id: string
}

export type UniqueIdDatabasePropertyConfigResponse = {
  type: "unique_id"
  unique_id: { prefix: string | null }
  id: string
}

export type TitleDatabasePropertyConfigResponse = {
  type: "title"
  title: TextRichTextItemResponse[]
  id: string
}

export type RichTextDatabasePropertyConfigResponse = {
  type: "rich_text"
  rich_text: TextRichTextItemResponse[]
  id: string
}

export type UrlDatabasePropertyConfigResponse = {
  type: "url"
  url: string | null
  id: string
}

export type PeopleDatabasePropertyConfigResponse = {
  type: "people"
  people: EmptyObject
  id: string
}

export type FilesDatabasePropertyConfigResponse = {
  type: "files"
  files: EmptyObject
  id: string
}

export type EmailDatabasePropertyConfigResponse = {
  type: "email"
  email: string | null
  id: string
}

export type PhoneNumberDatabasePropertyConfigResponse = {
  type: "phone_number"
  phone_number: number | null
  id: string
}

export type DateDatabasePropertyConfigResponse = {
  type: "date"
  date: DateResponse | null
  id: string
}

export type CheckboxDatabasePropertyConfigResponse = {
  type: "checkbox"
  checkbox: boolean
  id: string
}

export type CreatedByDatabasePropertyConfigResponse = {
  type: "created_by"
  created_by: EmptyObject
  id: string
}

export type CreatedTimeDatabasePropertyConfigResponse = {
  type: "created_time"
  created_time: EmptyObject
  id: string
}

export type LastEditedByDatabasePropertyConfigResponse = {
  type: "last_edited_by"
  last_edited_by: EmptyObject
  id: string
}

export type LastEditedTimeDatabasePropertyConfigResponse = {
  type: "last_edited_time"
  last_edited_time: EmptyObject
  id: string
}
