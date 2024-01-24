import type { ReactNode } from 'react'
import type { ParsedUrlQueryInput } from 'node:querystring'
import type { Link } from '../../types'
import type { Breadcrumb, BreadcrumbBlockObjectResponseEx } from '../../../../exporter'

export interface BreadcrumbLinkProps {
  breadcrumb: Breadcrumb
  link?: Link
  href?: string
  query?: ParsedUrlQueryInput
  children?: ReactNode
}

export interface BreadcrumbsProps {
  list: Breadcrumb[]
  link?: Link
  hrefs?: string[]
  query?: ParsedUrlQueryInput
}

export interface BreadcrumbBlockProps {
  block: BreadcrumbBlockObjectResponseEx
  link?: Link
  hrefs?: string[]
  query?: ParsedUrlQueryInput
}
