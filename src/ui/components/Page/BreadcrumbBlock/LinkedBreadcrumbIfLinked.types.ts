import type { ReactNode } from 'react'
import type { ParsedUrlQueryInput } from 'node:querystring'
import type { Link } from '../../types'
import type { Breadcrumb } from '../../../../exporter'

export interface LinkedBreadcrumbIfLinkedProps {
  breadcrumb: Breadcrumb
  link?: Link
  href?: string
  query?: ParsedUrlQueryInput
  children?: ReactNode
}
