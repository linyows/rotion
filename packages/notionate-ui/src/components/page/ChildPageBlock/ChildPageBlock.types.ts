import type { ChildPageBlockObjectResponseEx } from 'notionate-pages'
import type { Link } from '../../types'

export interface ChildPageBlockProps {
  block: ChildPageBlockObjectResponseEx
  href?: string
  link?: Link
}
