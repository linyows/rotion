import type { FetchDatabaseRes } from '../../../exporter'
import type { ParsedUrlQueryInput } from 'node:querystring'
import type { Link } from '../types'
import { GalleryPreviewOptions } from './GalleryPreview/GalleryPreview.types'

export interface GalleryProps {
  keys: string[]
  db: FetchDatabaseRes
  options?: GalleryOptions
}

export interface GalleryOptions {
  href?: { [key: string]: string }
  link?: Link
  query?: ParsedUrlQueryInput
  image?: GalleryPreviewOptions
  prefix?: { [key: string]: string } 
  suffix?: { [key: string]: string }
}
