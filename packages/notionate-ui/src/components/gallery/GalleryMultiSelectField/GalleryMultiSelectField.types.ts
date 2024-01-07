import type { MultiSelectPropertyItemObjectResponse } from 'notionate-pages'
import type { Link } from '../../types'

export interface GalleryMultiSelectFieldProps {
  payload: MultiSelectPropertyItemObjectResponse
  path: string
  link?: Link
}
