import type { GetPagePropertyResponse } from '../../../../exporter'

export interface GalleryHandlerProps {
  items: GetPagePropertyResponse|undefined
  path: string
  size: 'small' | 'medium' | 'large'
}
