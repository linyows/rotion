import type { PageObjectResponseEx } from '../../../../exporter/index.js'
import type { GalleryOptions } from '../Gallery.types'

export interface GalleryCardProps {
  keys: string[]
  page: PageObjectResponseEx
  options?: GalleryOptions
}
