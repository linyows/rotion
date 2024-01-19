import React from 'react'
import type { TitlePropertyItemObjectResponse } from '../../../exporter'

import TableTitleField from './TableTitleField/TableTitleField'
import TableDateField from './TableDateField/TableDateField'
import TableRichTextField from './TableRichTextField/TableRichTextField'
import TableMultiSelectField from './TableMultiSelectField/TableMultiSelectField'
import TableSelectField from './TableSelectField/TableSelectField'
import TableUrlField from './TableUrlField/TableUrlField'
import TableCheckboxField from './TableCheckboxField/TableCheckboxField'
import TableNumberField from './TableNumberField/TableNumberField'
import type { TableHandlerProps } from './TableHandler.types'

const TableHandler = ({ name, items, path, slug, link, query }: TableHandlerProps) => {
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
