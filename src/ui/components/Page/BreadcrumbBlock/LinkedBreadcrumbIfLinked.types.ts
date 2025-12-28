import type { ReactNode } from 'react'
import type { ParsedUrlQueryInput } from 'node:querystring'
import type { Link } from '../../types.js'
import type { Breadcrumb } from '../../../../exporter/index.js'

export interface LinkedBreadcrumbIfLinkedProps {
  breadcrumb: Breadcrumb
  link?: Link
  href?: string
  query?: ParsedUrlQueryInput
  children?: ReactNode
}
