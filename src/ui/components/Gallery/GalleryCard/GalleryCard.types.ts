import type { PageObjectResponseEx } from '../../../../exporter'
import type { ParsedUrlQueryInput } from 'node:querystring'
import type { Link } from '../../types'

export interface GalleryCardProps {
  keys: string[]
  page: PageObjectResponseEx
  href: string
  link?: Link
  query?: ParsedUrlQueryInput
  preview?: 'cover' | 'content'
}
