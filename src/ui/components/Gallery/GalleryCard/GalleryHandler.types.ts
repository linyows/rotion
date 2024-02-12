import type { GetPagePropertyResponse } from '../../../../exporter'
import type { ParsedUrlQueryInput } from 'node:querystring'
import type { Link } from '../../types'

export interface GalleryHandlerProps {
  items: GetPagePropertyResponse|undefined
  path: string
  size: 'small' | 'medium' | 'large'
  link?: Link
  query?: ParsedUrlQueryInput
}
