import type { SelectPropertyResponse } from '../../../../exporter/index.js'
import { GalleryPropertyOptions } from '../GalleryCard/GalleryHandler.types'

export interface GallerySelectFieldProps {
  select: SelectPropertyResponse
  options?: GalleryPropertyOptions
}
