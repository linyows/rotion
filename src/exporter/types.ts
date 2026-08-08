import type {
  QueryDataSourceResponse,
  QueryDataSourceParameters,
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
  NumberFormat,
  GetPagePropertyResponse,
  PageObjectResponse,
  UserObjectResponse,
  DatabaseObjectResponse,
  MentionRichTextItemResponse,
  EquationRichTextItemResponse,
  PropertyItemListResponse,
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
    site: HtmlMetadata
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
    | { src: string, type: 'icon', icon: { name: string, color: string } }
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
    width?: number
    height?: number
  }
  | {
    type: 'file'
    file: { url: string; expiry_time: string }
    caption: Array<RichTextItemResponse>
    src: string
    width?: number
    height?: number
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
export type PageOrDatabaseMention = { id: IdRequest, name?: string, icon?: MentionIcon }
export type MentionRichTextItemResponseEx = RichTextItemResponse & {
  type: 'mention'
  mention:
  | { type: "user", user: PartialUserObjectResponse | UserObjectResponse }
  | { type: "date", date: DateResponse }
  | { type: "link_preview", link_preview: LinkPreviewMentionResponse }
  | { type: "template_mention", template_mention: TemplateMentionResponse }
  | { type: "page", page: PageOrDatabaseMention }
  | { type: "database", database: PageOrDatabaseMention }
  | { type: "link_mention", link_mention: any }
  | { type: "custom_emoji", custom_emoji: any }
}

export type RichTextItemResponseEx = RichTextItemResponse
export type ParagraphBlockObjectResponseEx = ParagraphBlockObjectResponse & {
  paragraph: {
    rich_text: Array<RichTextItemResponseEx>
    color: SelectColor
  }
}
export type Breadcrumb = {
  id: string
  name: string
  icon?: MentionIcon
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
    | { src: string, type: 'icon', icon: { name: string, color: string } }
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

export type DBProperties = Record<string, DatabasePropertyValue>

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
    | { src: string, type: 'icon'; icon: { name: string; color: string } }
    | null
  cover:
    | { src: string, type: 'external'; external: { url: TextRequest } }
    | { src: string, type: 'file'; file: { url: string; expiry_time: string } }
    | null
  // In v5, properties are in data sources, but we add them here for backward compatibility
  properties?: Record<string, DatabasePropertyConfigResponse>
}

export type QueryDatabaseResponseEx = QueryDataSourceResponse & {
  results: Array<PageObjectResponseEx>
  meta: GetDatabaseResponseEx
}

export type PersonUserObjectResponseEx = UserObjectResponse & {
  avatar?: string
}

export type Parent =
| { type: "database_id"; database_id: string }
| { type: "page_id"; page_id: string }
| { type: "block_id"; block_id: string }
| { type: "workspace"; workspace: true }
| { type: "data_source_id"; data_source_id: string }
| { type: "agent_id"; agent_id: string }

// A database property has two shapes in the notion api: its schema, returned
// in the `properties` of a data source, and the value it holds on a page,
// returned in the `properties` of a page. They are not interchangeable -- a
// select property is `{ options: [...] }` in the schema and a single option
// in a page. `DatabasePropertyConfigResponse` is the former,
// `DatabasePropertyValue` the latter.
export type DatabaseProperty = DatabasePropertyValue

export type DatabasePropertyConfigResponse = DatabasePropertyConfigResponseCommon & (
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
  | ButtonDatabasePropertyConfigResponse
  | VerificationDatabasePropertyConfigResponse
)

export type DatabasePropertyConfigResponseCommon = {
  id: string
  name: string
  description: string | null
}

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

// An option of a select/multi_select/status property in the schema. The same
// option on a page has no description, hence SelectPropertyResponse.
export type SelectOptionResponse = SelectPropertyResponse & {
  description: string | null
}

export type StatusOptionResponse = StatusPropertyResponse & {
  description: string | null
}

export type NumberDatabasePropertyConfigResponse = {
  type: "number"
  number: { format: NumberFormat }
}

export type FormulaDatabasePropertyConfigResponse = {
  type: "formula"
  formula: { expression: string }
}

export type SelectDatabasePropertyConfigResponse = {
  type: "select"
  select: { options: Array<SelectOptionResponse> }
}

export type MultiSelectDatabasePropertyConfigResponse = {
  type: "multi_select"
  multi_select: { options: Array<SelectOptionResponse> }
}

export type StatusPropertyResponse = {
  id: StringRequest
  name: StringRequest
  color: SelectColor
}

export type StatusDatabasePropertyConfigResponse = {
  type: "status"
  status: {
    options: Array<StatusOptionResponse>
    groups: Array<{
      id: StringRequest
      name: StringRequest
      color: SelectColor
      option_ids: Array<string>
    }>
  }
}

export type SinglePropertyDatabasePropertyRelationConfigResponse = {
  type: "single_property"
  single_property: EmptyObject
}

export type DualPropertyDatabasePropertyRelationConfigResponse = {
  type: "dual_property"
  dual_property: {
    synced_property_id: StringRequest
    synced_property_name: StringRequest
  }
}

export type DatabasePropertyRelationConfigResponse = {
  database_id: IdRequest
  data_source_id: IdRequest
} & (
  | SinglePropertyDatabasePropertyRelationConfigResponse
  | DualPropertyDatabasePropertyRelationConfigResponse
)

export type RelationDatabasePropertyConfigResponse = {
  type: "relation"
  relation: DatabasePropertyRelationConfigResponse
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
}

export type UniqueIdDatabasePropertyConfigResponse = {
  type: "unique_id"
  unique_id: { prefix: string | null }
}

export type TitleDatabasePropertyConfigResponse = {
  type: "title"
  title: EmptyObject
}

export type RichTextDatabasePropertyConfigResponse = {
  type: "rich_text"
  rich_text: EmptyObject
}

export type UrlDatabasePropertyConfigResponse = {
  type: "url"
  url: EmptyObject
}

export type PeopleDatabasePropertyConfigResponse = {
  type: "people"
  people: EmptyObject
}

export type FilesDatabasePropertyConfigResponse = {
  type: "files"
  files: EmptyObject
}

export type EmailDatabasePropertyConfigResponse = {
  type: "email"
  email: EmptyObject
}

export type PhoneNumberDatabasePropertyConfigResponse = {
  type: "phone_number"
  phone_number: EmptyObject
}

export type DateDatabasePropertyConfigResponse = {
  type: "date"
  date: EmptyObject
}

export type CheckboxDatabasePropertyConfigResponse = {
  type: "checkbox"
  checkbox: EmptyObject
}

export type CreatedByDatabasePropertyConfigResponse = {
  type: "created_by"
  created_by: EmptyObject
}

export type CreatedTimeDatabasePropertyConfigResponse = {
  type: "created_time"
  created_time: EmptyObject
}

export type LastEditedByDatabasePropertyConfigResponse = {
  type: "last_edited_by"
  last_edited_by: EmptyObject
}

export type LastEditedTimeDatabasePropertyConfigResponse = {
  type: "last_edited_time"
  last_edited_time: EmptyObject
}

export type ButtonDatabasePropertyConfigResponse = {
  type: "button"
  button: EmptyObject
}

export type VerificationDatabasePropertyConfigResponse = {
  type: "verification"
  verification: EmptyObject
}

// The value a database property holds on a page.
export type DatabasePropertyValue = { id: string } & (
  | SimpleOrArrayPropertyValueResponse
  | { type: 'rollup', rollup: RollupPropertyValueResponse }
)

export type SimpleOrArrayPropertyValueResponse =
  | { type: 'title', title: Array<RichTextItemResponse> }
  | { type: 'rich_text', rich_text: Array<RichTextItemResponse> }
  | { type: 'people', people: Array<PartialUserObjectResponse> }
  | { type: 'relation', relation: Array<{ id: IdRequest }> }
  | { type: 'number', number: number | null }
  | { type: 'url', url: string | null }
  | { type: 'select', select: SelectPropertyResponse | null }
  | { type: 'multi_select', multi_select: Array<SelectPropertyResponse> }
  | { type: 'status', status: StatusPropertyResponse | null }
  | { type: 'date', date: DateResponse | null }
  | { type: 'email', email: string | null }
  | { type: 'phone_number', phone_number: string | null }
  | { type: 'checkbox', checkbox: boolean }
  | { type: 'files', files: Array<FileWithNameResponse> }
  | { type: 'created_by', created_by: PartialUserObjectResponse }
  | { type: 'created_time', created_time: string }
  | { type: 'last_edited_by', last_edited_by: PartialUserObjectResponse }
  | { type: 'last_edited_time', last_edited_time: string }
  | { type: 'formula', formula: FormulaPropertyValueResponse }
  | { type: 'button', button: EmptyObject }
  | { type: 'unique_id', unique_id: { prefix: string | null, number: number | null } }
  | { type: 'verification', verification: VerificationPropertyValueResponse | null }

export type FileWithNameResponse = { name: StringRequest } & (
  | { type: 'file', file: { url: string, expiry_time: string } }
  | { type: 'external', external: { url: TextRequest } }
)

export type FormulaPropertyValueResponse =
  | { type: 'string', string: string | null }
  | { type: 'date', date: DateResponse | null }
  | { type: 'number', number: number | null }
  | { type: 'boolean', boolean: boolean | null }
  | { type: 'unsupported', unsupported: EmptyObject }

export type RollupPropertyValueResponse = { function: RollupFunction } & (
  | { type: 'number', number: number | null }
  | { type: 'date', date: DateResponse | null }
  | { type: 'array', array: Array<SimpleOrArrayPropertyValueResponse> }
  | { type: 'unsupported', unsupported: EmptyObject }
)

export type VerificationPropertyValueResponse =
  | { state: 'unverified', date: null, verified_by: null }
  | {
    state: 'verified' | 'expired'
    date: DateResponse | null
    verified_by: PartialUserObjectResponse | null
  }

export type ImagePathWithSize = {
  path: string
  width?: number
  height?: number
}

export type HtmlMetadata = {
  title: string
  desc: string
  image: string
  icon: string
}
