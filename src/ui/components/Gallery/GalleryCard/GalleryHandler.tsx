import React from 'react'
import type { TitlePropertyItemObjectResponse } from '../../../../exporter'

import GalleryTitleField from '../GalleryTitleField/GalleryTitleField'
import GalleryDateField from '../GalleryDateField/GalleryDateField'
import GalleryRichTextField from '../GalleryRichTextField/RichTextField'
import GalleryMultiSelectField from '../GalleryMultiSelectField/GalleryMultiSelectField'
import GalleryUrlField from '../GalleryUrlField/GalleryUrlField'
import GalleryCheckboxField from '../GalleryCheckboxField/GalleryCheckboxField'
import GalleryNumberField from '../GalleryNumberField/GalleryNumberField'
import type { GalleryHandlerProps } from './GalleryHandler.types'

const GalleryHandler = ({ items, path, size }: GalleryHandlerProps) => {
  if (!items) {
    return <></>
  }

  if (items.object === 'list') {
    if (items.results.length === 0) {
      return <></>
    }

    const target = items.results[0]
    switch (target.type) {
      case 'title':
        return <GalleryTitleField payload={items.results as Array<TitlePropertyItemObjectResponse>} />
      case 'rich_text':
        return <GalleryRichTextField payload={target} />
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
        return <GalleryDateField payload={items.date} />
      case 'rich_text':
        return <GalleryRichTextField payload={items} size={size} />
      case 'multi_select':
        return <GalleryMultiSelectField payload={items} path={path} />
      case 'url':
        return <GalleryUrlField payload={items.url} />
      case 'checkbox':
        return <GalleryCheckboxField payload={items.checkbox} />
      case 'number':
        return <GalleryNumberField payload={items} />
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

  return <></>
}

export default GalleryHandler
