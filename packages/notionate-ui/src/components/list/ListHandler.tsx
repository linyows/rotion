import React from 'react'
import type { TitlePropertyItemObjectResponse } from 'notionate-pages'
import type { ListHandlerProps } from './ListHandler.types'

import ListTitleField from './ListTitleField'
import ListDateField from './ListDateField'
import ListRichTextField from './ListRichTextField'
import ListMultiSelectField from './ListMultiSelectField'
import ListUrlField from './ListUrlField'
import ListCheckboxField from './ListCheckboxField'
import ListNumberField from './ListNumberField'

const ListHandler = ({ name, items, path, slug, link, query }: ListHandlerProps) => {
  if (items === undefined) {
    return <></>
  }

  if (items.object === 'list') {
    if (items.results.length === 0) {
      return <></>
    }

    const target = items.results[0]
    switch (target.type) {
      case 'title': { // Skip: Unexpected lexical declaration in case block.
        const payload = items.results as Array<TitlePropertyItemObjectResponse>
        return ListTitleField({ payload, path, slug, link, query })
      }

      case 'rich_text':
        return ListRichTextField({ payload: target })

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
        return ListDateField({ payload: items.date })

      case 'rich_text':
        return ListRichTextField({ payload: items })

      case 'multi_select':
        return ListMultiSelectField({ payload: items, path })

      case 'url':
        return ListUrlField({ payload: items.url })

      case 'checkbox':
        return ListCheckboxField({ payload: items.checkbox })

      case 'number':
        return ListNumberField({ payload: items })

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

export default ListHandler
