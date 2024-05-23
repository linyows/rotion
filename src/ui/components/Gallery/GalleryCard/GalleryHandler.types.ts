import type { DatabaseProperty } from '../../../../exporter'
import type { ParsedUrlQueryInput } from 'node:querystring'
import type { Link } from '../../types'

export interface GalleryHandlerProps {
  property?: DatabaseProperty
  options: GalleryPropertyOptions
}

export interface GalleryPropertyOptions {
  pathname?: string
  link?: Link
  query?: ParsedUrlQueryInput
  prefix?: string
  suffix?: string
}
