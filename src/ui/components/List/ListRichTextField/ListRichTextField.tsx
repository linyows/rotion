import { RichText } from '../../RichText/index.js'
import type { ListRichTextFieldProps } from './ListRichTextField.types'
import './ListRichTextField.css'

const ListRichTextField = ({ textObjects }: ListRichTextFieldProps) => {
  return (
    <div className="rotion-list-richtext">
      {textObjects.map((t, i) => (
        <RichText key={`${t.plain_text || 'empty'}-${i}`} textObject={t} />
      ))}
    </div>
  )
}

export default ListRichTextField
