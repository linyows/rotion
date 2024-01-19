import type { QueryDatabaseResponseEx } from '../../../exporter'
import type { ParsedUrlQueryInput } from 'node:querystring'
import type { Link } from '../types'

export interface GalleryProps {
  keys: string[]
  db: QueryDatabaseResponseEx
  href?: string
  link?: Link
  query?: ParsedUrlQueryInput
  // page-content is nut supported
  preview?: 'cover' | 'content'
  size?: 'small' | 'medium' | 'large'
  fit?: boolean
}
