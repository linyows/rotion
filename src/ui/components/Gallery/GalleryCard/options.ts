import type { GalleryOptions } from '../Gallery.types'
import type { GalleryPropertyOptions } from './GalleryHandler.types'

/**
 * propertyOptions returns the options for one property on a card: the card's
 * options with the property's pathname, prefix and suffix added.
 *
 * It returns a new object rather than changing the card's, and the copy is a
 * shallow one. The options carry the link component, which is a function, and
 * structuredClone throws a DataCloneError on a function.
 */
export function propertyOptions(name: string, cardOpts: GalleryPropertyOptions, srcOpts?: GalleryOptions): GalleryPropertyOptions {
  const dstOpts: GalleryPropertyOptions = { ...cardOpts }
  if (!srcOpts) {
    return dstOpts
  }
  const { href, prefix, suffix } = srcOpts

  if (href?.[name]) {
    dstOpts.pathname = href[name]
  }
  if (prefix?.[name]) {
    dstOpts.prefix = prefix[name]
  }
  if (suffix?.[name]) {
    dstOpts.suffix = suffix[name]
  }

  return dstOpts
}
