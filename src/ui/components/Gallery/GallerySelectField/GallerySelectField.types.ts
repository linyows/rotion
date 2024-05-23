import type { SelectPropertyResponse } from '../../../../exporter'
import { GalleryPropertyOptions } from '../GalleryCard/GalleryHandler.types'

export interface GallerySelectFieldProps {
  select: SelectPropertyResponse
  options?: GalleryPropertyOptions
}
