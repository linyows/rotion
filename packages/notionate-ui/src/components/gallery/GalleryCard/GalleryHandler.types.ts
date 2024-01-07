import type { GetPagePropertyResponse } from 'notionate-pages'

export interface GalleryHandlerProps {
  items: GetPagePropertyResponse|undefined
  path: string
}
