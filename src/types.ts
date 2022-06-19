import {
  QueryDatabaseResponse,
  GetDatabaseResponse,
  GetUserResponse,
  GetPageResponse,
  ListBlockChildrenResponse,
  GetSelfResponse,
} from '@notionhq/client/build/src/api-endpoints'

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
  | "default"
  | "gray"
  | "brown"
  | "orange"
  | "yellow"
  | "green"
  | "blue"
  | "purple"
  | "pink"
  | "red"

export type SelectColorWithBG = SelectColor
  | "gray_background"
  | "brown_background"
  | "orange_background"
  | "yellow_background"
  | "green_background"
  | "blue_background"
  | "purple_background"
  | "pink_background"
  | "red_background"

// https://github.com/makenotion/notion-sdk-js/blob/d3f6c1b41c0f814e39ed202c6aa3b4a7cfdca582/src/api-endpoints.ts#L651-L755
export type RichText = {
  type: "text"
  text: { content: string; link: { url: TextRequest } | null }
  annotations: {
    bold: boolean
    italic: boolean
    strikethrough: boolean
    underline: boolean
    code: boolean
    color: SelectColorWithBG
  }
  plain_text: string
  href: string | null
}

export type RichMention = {
  type: "mention"
  mention:
    | { type: "user"; user: PartialUserObjectResponse }
    | { type: "date"; date: DateResponse }
    | { type: "link_preview"; link_preview: { url: TextRequest } }
    | { type: "page"; page: { id: IdRequest } }
    | { type: "database"; database: { id: IdRequest } }
  annotations: {
    bold: boolean
    italic: boolean
    strikethrough: boolean
    underline: boolean
    code: boolean
    color: SelectColorWithBG
  }
  plain_text: string
  href: string | null
}

export type RichEquation = {
  type: "equation"
  equation: { expression: TextRequest }
  annotations: {
    bold: boolean
    italic: boolean
    strikethrough: boolean
    underline: boolean
    code: boolean
    color: SelectColorWithBG
  }
  plain_text: string
  href: string | null
}

export type RichTextItemResponse = | RichText | RichMention | RichEquation

export type SelectPropertyResponse = {
  id: StringRequest
  name: StringRequest
  color: SelectColor
}

export type UserObjectResponse = GetSelfResponse

export type PartialUserObjectResponse =
  | { id: IdRequest, object: "user" }
  | UserObjectResponse

export type External = {
  type: "external"
  external: { url: TextRequest }
  caption: Array<RichTextItemResponse>
}

export type File = {
  type: "file"
  file: { url: string, expiry_time: string }
  caption: Array<RichTextItemResponse>
}

// Extending by adding src param
export type ExternalEx = External & { src: string }
export type FileEx = File & { src: string }
export type Url = { url: string, caption: Array<RichTextItemResponse> }
export type UrlEx = Url & { html: string }

export type Icon =
    | { type: "emoji", emoji: EmojiRequest }
    | { type: "external", external: { url: TextRequest } }
    | { type: "file", file: { url: string, expiry_time: string } }
    | null

// https://github.com/makenotion/notion-sdk-js/blob/2a45b83197314e989239f0ae9437fe9a0adb2a2b/src/api-endpoints.ts#L4479-L4880
export type BlockObjectResponse = {
  type: string
  object: string
  id: string
  created_time: string
  last_edited_time: string
  has_children: boolean
  archived: boolean
  paragraph?: { text: Array<RichTextItemResponse> }
  heading_1?: { text: Array<RichTextItemResponse>  }
  heading_2?: { text: Array<RichTextItemResponse>  }
  heading_3?: { text: Array<RichTextItemResponse>  }
  bulleted_list_item?: { text: Array<RichTextItemResponse>  }
  numbered_list_item?: { text: Array<RichTextItemResponse>  }
  quote?: { text: Array<RichTextItemResponse>  }
  to_do?: { text: Array<RichTextItemResponse> , checked: boolean }
  toggle?: { text: Array<RichTextItemResponse>  }
  template?: { text: Array<RichTextItemResponse>  }
  synced_block?: unknown
  child_page?: { title: string }
  child_database?: { title: string }
  equation?: { title: string }
  code?: { text: Array<RichText> , caption: Object[], language: string }
  callout?: { text: Array<RichTextItemResponse> , icon: Icon }
  divider?: EmptyObject
  breadcrumb?: EmptyObject
  table_of_contents?: EmptyObject
  column_list?: EmptyObject
  column?: EmptyObject
  link_to_page?:
    | { type: "page_id", page_id: IdRequest }
    | { type: "database_id", database_id: IdRequest }
  table?: { has_column_header: boolean, has_row_header: boolean, table_width: number }
  table_row?: { cells: Array<Array<RichTextItemResponse>> }
  embed?: UrlEx
  bookmark?: Url
  image?: | ExternalEx | FileEx
  video?: | External | File
  pdf?: | External | File
  file?: | External | File
  audio?: | External | File
  link_preview?: { url: TextRequest }
  unsupported?: EmptyObject
}

export type ListBlockChildrenResponseEx = ListBlockChildrenResponse & { results: Array<BlockObjectResponse> }

// Extending by adding src param
export type GetPageResponseEx = GetPageResponse & {
  cover:
    | { src: string, type: "external", file: { url: string, expiry_time: string } }
    | { src: string, type: "file", file: { url: string, expiry_time: string } }
  icon:
    | { src: string, type: "external", file: { url: string, expiry_time: string } }
    | { src: string, type: "file", file: { url: string, expiry_time: string } }
}

export type DBPageBase = {
  object: "page"
  id: string
  created_time: string
  last_edited_time: string
  archived: boolean
  url: string
  created_by: PartialUserObjectResponse
  last_edited_by: PartialUserObjectResponse
  parent:
    | { type: "database_id", database_id: IdRequest }
    | { type: "page_id", page_id: IdRequest }
    | { type: "workspace", workspace: true }
  icon: Icon
  cover:
    | { type: "external", external: { url: TextRequest } }
    | { type: "file", file: { url: string, expiry_time: string } }
    | null
  properties: {}
}

export type DBProperties = Record<
    string,
    | { type: "title", title: Array<RichTextItemResponse>, id: string }
    | { type: "rich_text", rich_text: Array<RichTextItemResponse>, id: string }
    | { type: "number", number: number | null, id: string }
    | { type: "url", url: string | null, id: string }
    | { type: "select", select: SelectPropertyResponse | null, id: string }
    | { type: "multi_select", multi_select: Array<SelectPropertyResponse>, id: string }
    | { type: "people", people: Array<PartialUserObjectResponse>, id: string }
    | { type: "email", email: string | null, id: string }
    | { type: "phone_number", phone_number: string | null, id: string }
    | { type: "date", date: DateResponse | null, id: string }
    | { type: "files", files: Array<
      | { file: { url: string, expiry_time: string }, name: StringRequest, type?: "file" }
      | { external: { url: TextRequest }, name: StringRequest, type?: "external" }
      >, id: string }
    | { type: "checkbox", checkbox: boolean, id: string }
    | { type: "formula", formula:
      | { type: "string", string: string | null }
      | { type: "date", date: DateResponse | null }
      | { type: "number", number: number | null }
      | { type: "boolean", boolean: boolean | null }
      , id: string }
    | { type: "relation", relation: Array<{ id: string }>, id: string }
    | { type: "created_time", created_time: string, id: string }
    | { type: "created_by", created_by: PartialUserObjectResponse, id: string }
    | { type: "last_edited_time", last_edited_time: string, id: string }
    | { type: "last_edited_by", last_edited_by: PartialUserObjectResponse, id: string }
  >

// https://github.com/makenotion/notion-sdk-js/blob/d3f6c1b41c0f814e39ed202c6aa3b4a7cfdca582/src/api-endpoints.ts#L10837-L11019
export type QueryDatabaseResponseResult = | {
  parent:
    | { type: "database_id", database_id: IdRequest }
    | { type: "page_id", page_id: IdRequest }
    | { type: "workspace", workspace: true }
  properties: DBProperties
  icon:
    | { type: "emoji", emoji: EmojiRequest }
    | { type: "external", external: { url: TextRequest } }
    | { type: "file", file: { url: string, expiry_time: string } }
    | null
  cover:
    | { type: "external", external: { url: TextRequest } }
    | { type: "file", file: { url: string, expiry_time: string } }
    | null
  object: "page"
  id: string
  created_time: string
  last_edited_time: string
  archived: boolean
  url: string
} | { object: "page"; id: string }
