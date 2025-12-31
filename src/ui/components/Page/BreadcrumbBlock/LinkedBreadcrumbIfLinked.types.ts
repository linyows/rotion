import type { ParsedUrlQueryInput } from 'node:querystring'
import type { ReactNode } from 'react'
import type { Breadcrumb } from '../../../../exporter/index.js'
import type { Link } from '../../types.js'

export interface LinkedBreadcrumbIfLinkedProps {
  breadcrumb: Breadcrumb
  link?: Link
  href?: string
  query?: ParsedUrlQueryInput
  children?: ReactNode
}
