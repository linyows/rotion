import React from 'react'
import TableTitleField from './TableTitleField/TableTitleField'
import TableDateField from './TableDateField/TableDateField'
import TableRichTextField from './TableRichTextField/TableRichTextField'
import TableMultiSelectField from './TableMultiSelectField/TableMultiSelectField'
import TableSelectField from './TableSelectField/TableSelectField'
import TableUrlField from './TableUrlField/TableUrlField'
import TableCheckboxField from './TableCheckboxField/TableCheckboxField'
import TableNumberField from './TableNumberField/TableNumberField'
import TableFormulaField from './TableFormulaField/TableFormulaField'
import type { TableHandlerProps } from './TableHandler.types'

const TableHandler = ({ property, path, slug, link, query }: TableHandlerProps) => {
  if (!property || !property.type) {
    console.log('property empty in table handler: ', property)
    return <></>
  }

  switch (property.type) {
    case 'title':
      return <TableTitleField textObjects={property.title} path={path} slug={slug} link={link} query={query} />
    case 'rich_text':
      return <TableRichTextField textObjects={property.rich_text} />
    case 'url':
      return <TableUrlField url={property.url} />
    case 'date':
      return <TableDateField date={property.date} />
    case 'multi_select':
      return <TableMultiSelectField multiSelect={property.multi_select} path={path} query={query} />
    case 'checkbox':
      return <TableCheckboxField checked={property.checkbox} />
    case 'number':
      return <TableNumberField number={property.number} />
    case 'select':
      return <TableSelectField select={property.select} path={path} query={query} />
    case 'formula':
      return <TableFormulaField number={property.formula.number} />
    case 'status':
    case 'email':
    case 'phone_number':
    case 'files':
    case 'created_by':
    case 'created_time':
    case 'last_edited_by':
    case 'last_edited_time':
    case 'people':
    case 'relation':
    case 'rollup':
    default:
      console.log('unsupport database property:', property)
      return <></>
  }
}

export default TableHandler
