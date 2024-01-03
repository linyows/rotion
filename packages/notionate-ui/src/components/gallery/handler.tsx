import React from 'react'
import type {
  GetPagePropertyResponse,
  TitlePropertyItemObjectResponse,
} from 'notionate-pages'

import GalleryTitleField from './title'
import GalleryDateField from './date'
import GalleryRichTextField from './richtext'
import GalleryMultiSelectField from './multiselect'
import GalleryUrlField from './url'
import GalleryCheckboxField from './checkbox'
import GalleryNumberField from './number'

export type GalleryHandlerProps = {
  items: GetPagePropertyResponse|undefined
  path: string
}

export const GalleryHandler = ({ items, path }: GalleryHandlerProps) => {
  if (items === undefined) {
    return <></>
  }

  if (items.object === 'list') {
    if (items.results.length === 0) {
      return <></>
    }

    const target = items.results[0]
    switch (target.type) {
      case 'title':
        return GalleryTitleField({ payload: items.results as Array<TitlePropertyItemObjectResponse> })

      case 'rich_text':
        return GalleryRichTextField({ payload: target })

      case 'people':
      case 'relation':
      case 'rollup':
      default:
        console.log('unsupport database property:', target)
        break
    }
  } else {
    switch (items.type) {
      case 'date':
        return GalleryDateField({ payload: items.date })

      case 'rich_text':
        return GalleryRichTextField({ payload: items })

      case 'multi_select':
        return GalleryMultiSelectField({ payload: items, path })

      case 'url':
        return GalleryUrlField({ payload: items.url })

      case 'checkbox':
        return GalleryCheckboxField({ payload: items.checkbox })

      case 'number':
        return GalleryNumberField({ payload: items })

      case 'select':
      case 'status':
      case 'email':
      case 'phone_number':
      case 'files':
      case 'created_by':
      case 'created_time':
      case 'last_edited_by':
      case 'last_edited_time':
      case 'formula':
      case 'people':
      case 'relation':
      case 'rollup':
      default:
        console.log('unsupport database property:', items)
        break
    }
  }
}

export default GalleryHandler
