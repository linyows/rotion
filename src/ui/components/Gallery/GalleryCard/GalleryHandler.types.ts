import type { DatabaseProperty } from '../../../../exporter'
import type { ParsedUrlQueryInput } from 'node:querystring'
import type { Link } from '../../types'

export interface GalleryHandlerProps {
  property?: DatabaseProperty
  path?: string
  size: 'small' | 'medium' | 'large'
  link?: Link
  query?: ParsedUrlQueryInput
}
