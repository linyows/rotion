import React from 'react'
import type {
  GetPagePropertyResponse,
  TitlePropertyItemObjectResponse,
  Link,
} from '../../server/types'

import TableTitleField from './title'
import TableDateField from './date'
import TableRichTextField from './richtext'
import TableMultiSelectField from './multiselect'
import TableSelectField from './select'
import TableUrlField from './url'
import TableCheckboxField from './checkbox'
import TableNumberField from './number'
import type { ParsedUrlQueryInput } from 'node:querystring'

export type TableHandlerProps = {
  name: string
  items: GetPagePropertyResponse|undefined
  path?: string
  slug?: string
  link?: Link
  query?: ParsedUrlQueryInput
}

export const TableHandler = ({ name, items, path, slug, link, query }: TableHandlerProps) => {
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
        return TableTitleField({ payload, path, slug, link, query })
      }

      case 'rich_text':
        return TableRichTextField({ payload: target })

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
        return TableDateField({ payload: items.date })

      case 'rich_text':
        return TableRichTextField({ payload: items })

      case 'multi_select':
        return TableMultiSelectField({ payload: items, path })

      case 'url':
        return TableUrlField({ payload: items.url })

      case 'checkbox':
        return TableCheckboxField({ payload: items.checkbox })

      case 'number':
        return TableNumberField({ payload: items })

      case 'select':
        return TableSelectField({ payload: items, path })

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

export default TableHandler
