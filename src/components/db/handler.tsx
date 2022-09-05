import React from 'react'
import type {
  GetPagePropertyResponse,
  TitlePropertyItemObjectResponse,
} from '../../server/types'

import DBTitleField from './title'
import DBDateField from './date'
import DBRichTextField from './richtext'
import DBMultiSelectField from './multiselect'
import DBUrlField from './url'
import DBCheckboxField from './checkbox'
import DBNumberField from './number'

export type ListHandlerProps = {
  name: string
  items: GetPagePropertyResponse|undefined
  path: string
  slug: string
  LinkComp?: unknown
}

export const ListHandler = ({ name, items, path, slug, LinkComp }: ListHandlerProps) => {
  if (items === undefined) {
    return <></>
  }

  if (items.object === 'list') {
    const target = items.results[0]
    switch (target.type) {
      case 'title': { // Skip: Unexpected lexical declaration in case block.
        const payload = items.results as Array<TitlePropertyItemObjectResponse>
        return DBTitleField({ payload, path, slug, LinkComp })
      }

      case 'rich_text':
        return DBRichTextField({ payload: target })

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
        return DBDateField({ payload: items.date })

      case 'rich_text':
        return DBRichTextField({ payload: items })

      case 'multi_select':
        return DBMultiSelectField({ payload: items, path })

      case 'url':
        return DBUrlField({ payload: items.url })

      case 'checkbox':
        return DBCheckboxField({ payload: items.checkbox })

      case 'number':
        return DBNumberField({ payload: items })

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
