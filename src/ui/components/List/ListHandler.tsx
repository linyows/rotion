import React from 'react'
import type { ListHandlerProps } from './ListHandler.types'

import ListTitleField from './ListTitleField/ListTitleField'
import ListDateField from './ListDateField/ListDateField'
import ListRichTextField from './ListRichTextField/ListRichTextField'
import ListMultiSelectField from './ListMultiSelectField/ListMultiSelectField'
import ListSelectField from './ListSelectField/ListSelectField'
import ListUrlField from './ListUrlField/ListUrlField'
import ListCheckboxField from './ListCheckboxField/ListCheckboxField'
import ListNumberField from './ListNumberField/ListNumberField'
import ListFormulaField from './ListFormulaField/ListFormulaField'

const ListHandler = ({ property, options }: ListHandlerProps) => {
  if (!property || !property.type) {
    console.log('property empty in table handler: ', property)
    return <></>
  }

  switch (property.type) {
    case 'title':
      return <ListTitleField textObjects={property.title} options={options} />
    case 'rich_text':
      return <ListRichTextField textObjects={property.rich_text} />
    case 'url':
      return <ListUrlField url={property.url} />
    case 'date':
      return <ListDateField date={property.date} />
    case 'multi_select':
      return <ListMultiSelectField multiSelect={property.multi_select} options={options} />
    case 'checkbox':
      return <ListCheckboxField checked={property.checkbox} options={options} />
    case 'number':
      return <ListNumberField number={property.number} options={options} />
    case 'select':
      return <ListSelectField select={property.select} options={options} />
    case 'formula':
      return <ListFormulaField number={property.formula.number} options={options} />
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

export default ListHandler
