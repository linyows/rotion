import { richTextKey } from '../../lib.js'
import { RichText } from '../../RichText/index.js'
import type { ListRichTextFieldProps } from './ListRichTextField.types'
import './ListRichTextField.css'

const ListRichTextField = ({ textObjects }: ListRichTextFieldProps) => {
  return (
    <div className="rotion-list-richtext">
      {textObjects.map((t, i) => (
        <RichText key={richTextKey(t.plain_text, i)} textObject={t} />
      ))}
    </div>
  )
}

export default ListRichTextField
