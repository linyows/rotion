import React from 'react'
import GalleryTitleField from '../GalleryTitleField/GalleryTitleField.js'
import GalleryDateField from '../GalleryDateField/GalleryDateField.js'
import GalleryRichTextField from '../GalleryRichTextField/GalleryRichTextField.js'
import GalleryMultiSelectField from '../GalleryMultiSelectField/GalleryMultiSelectField.js'
import GalleryUrlField from '../GalleryUrlField/GalleryUrlField.js'
import GalleryCheckboxField from '../GalleryCheckboxField/GalleryCheckboxField.js'
import GalleryNumberField from '../GalleryNumberField/GalleryNumberField.js'
import GallerySelectField from '../GallerySelectField/GallerySelectField.js'
import GalleryFormulaField from '../GalleryFormulaField/GalleryFormulaField.js'
import type { GalleryHandlerProps } from './GalleryHandler.types'

const GalleryHandler = ({ property, options }: GalleryHandlerProps) => {
  if (!property || !property.type) {
    console.log('property empty in gallery handler: ', property)
    return <></>
  }

  switch (property.type) {
    case 'title':
      return <GalleryTitleField textObjects={property.title as any} />
    case 'rich_text':
      return <GalleryRichTextField textObjects={property.rich_text as any} />
    case 'multi_select':
      return <GalleryMultiSelectField multiSelect={property.multi_select} options={options} />
    case 'select':
      return <GallerySelectField select={property.select} options={options} />
    case 'date':
      return <GalleryDateField date={property.date} />
    case 'url':
      return <GalleryUrlField url={property.url} />
    case 'checkbox':
      return <GalleryCheckboxField checked={property.checkbox} options={options} />
    case 'number':
      return <GalleryNumberField number={property.number} options={options} />
    case 'formula':
      return <GalleryFormulaField number={property.formula.number} options={options} />
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

export default GalleryHandler
