import GalleryCheckboxField from '../GalleryCheckboxField/GalleryCheckboxField.js'
import GalleryDateField from '../GalleryDateField/GalleryDateField.js'
import GalleryFormulaField from '../GalleryFormulaField/GalleryFormulaField.js'
import GalleryMultiSelectField from '../GalleryMultiSelectField/GalleryMultiSelectField.js'
import GalleryNumberField from '../GalleryNumberField/GalleryNumberField.js'
import GalleryRichTextField from '../GalleryRichTextField/GalleryRichTextField.js'
import GallerySelectField from '../GallerySelectField/GallerySelectField.js'
import GalleryTitleField from '../GalleryTitleField/GalleryTitleField.js'
import GalleryUrlField from '../GalleryUrlField/GalleryUrlField.js'
import type { GalleryHandlerProps } from './GalleryHandler.types'

const GalleryHandler = ({ property, options }: GalleryHandlerProps) => {
  if (!property?.type) {
    console.log('property empty in gallery handler: ', property)
    return null
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
    default:
      console.log('unsupport database property:', property)
      return null
  }
}

export default GalleryHandler
