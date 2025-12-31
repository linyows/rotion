export interface GalleryPreviewProps {
  src: string
  options?: GalleryPreviewOptions
}

export interface GalleryPreviewOptions {
  // page-content is nut supported
  preview?: 'cover' | 'content'
  size?: 'small' | 'medium' | 'large'
  fit?: boolean
  height?:
    | {
        small: string
        medium: string
        large: string
      }
    | string
}
