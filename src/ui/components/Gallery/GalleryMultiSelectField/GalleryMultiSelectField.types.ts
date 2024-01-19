import type { MultiSelectPropertyItemObjectResponse } from '../../../../exporter'
import type { Link } from '../../types'

export interface GalleryMultiSelectFieldProps {
  payload: MultiSelectPropertyItemObjectResponse
  path: string
  link?: Link
}
