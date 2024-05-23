import type { SelectPropertyResponse } from '../../../../exporter'
import { GalleryPropertyOptions } from '../GalleryCard/GalleryHandler.types'

export interface GalleryMultiSelectFieldProps {
  multiSelect: SelectPropertyResponse[]
  options?: GalleryPropertyOptions
}
