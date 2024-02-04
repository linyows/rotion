import type { ParsedUrlQueryInput } from 'node:querystring'
import type { Link } from '../../types'

export interface LinkedTagProps {
  name: string
  path: string
  link?: Link
  query?: ParsedUrlQueryInput
}
