import type { ReactNode } from 'react'
import type { ParsedUrlQueryInput } from 'node:querystring'
import type { Link } from '../../types'

export interface GalleryLinkedCardProps {
  link?: Link
  query?: ParsedUrlQueryInput
  pathname?: string
  children?: ReactNode
}
