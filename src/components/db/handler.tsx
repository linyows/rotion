import React from 'react'
import type {
  GetPagePropertyResponse,
  TitlePropertyItemObjectResponse,
} from '../../types'

import DBTitleField from './title'
import DBDateField from './date'
import DBRichTextField from './richtext'
import DBMultiSelectField from './multiselect'
import DBUrlField from './url'
import DBCheckboxField from './checkbox'

export type HandlerProps = {
  name: string
  items: GetPagePropertyResponse|undefined
  path: string
  slug: string
}

export const Handler = ({ name, items, path, slug }: HandlerProps) => {
  if (items === undefined) {
    return <></>
  }

  if (items.object === 'list') {
    const target = items.results[0]
    switch (target.type) {
      case 'title':
        const payload = items.results as Array<TitlePropertyItemObjectResponse>
        return DBTitleField({ payload, path, slug })
        break

      case 'rich_text':
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
        break

      case 'rich_text':
        return DBRichTextField({ payload: items })
        break

      case 'multi_select':
        return DBMultiSelectField({ payload: items, path })
        break

      case 'url':
        return DBUrlField({ payload: items.url })
        break

      case 'checkbox':
        return DBCheckboxField({ payload: items.checkbox })
        break

      case 'number':
      case 'select':
      case 'status':
      case 'email':
      case 'phone_number':
      case 'checkbox':
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

export default Handler
