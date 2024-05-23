import type { PageObjectResponseEx } from '../../../../exporter'
import { GalleryOptions } from '../Gallery.types'

export interface GalleryCardProps {
  keys: string[]
  page: PageObjectResponseEx
  options?: GalleryOptions
}
