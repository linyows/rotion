import { richTextKey } from '../../lib.js'
import { RichText } from '../../RichText/index.js'
import LinkedTitleIfLinked from './LinkedTitleIfLinked.js'
import type { TableTitleFieldProps } from './TableTitleField.types'
import './TableTitleField.css'

const TableTitleField = ({ textObjects, options }: TableTitleFieldProps) => {
  return (
    <div className="rotion-table-title">
      <LinkedTitleIfLinked options={options}>
        {textObjects.map((t, i) => (
          <RichText key={richTextKey(t.plain_text, i)} textObject={t} />
        ))}
      </LinkedTitleIfLinked>
    </div>
  )
}

export default TableTitleField
