import type { SelectPropertyResponse } from '../../../../exporter/index.js'
import { GalleryPropertyOptions } from '../GalleryCard/GalleryHandler.types'

export interface GalleryMultiSelectFieldProps {
  multiSelect: SelectPropertyResponse[]
  options?: GalleryPropertyOptions
}
