import type { RichTextProps } from '../RichText.types'
import '../../tokens.css'
import './Annotation.css'

const Annotation = ({ textObject, children }: RichTextProps) => {
  if (!textObject) {
    return null
  }
  const { annotations } = textObject
  const { color } = annotations
  const css = ['rotion-richtext-annot']
  css.push(annotations.code && color === 'default' ? '' : `rotion-richtext-${color.replace('_background', '-bg')}`)
  if (annotations.bold) css.push('rotion-richtext-bold')
  if (annotations.italic) css.push('rotion-richtext-italic')
  if (annotations.strikethrough) css.push('rotion-richtext-strikethrough')
  if (annotations.underline) css.push('rotion-richtext-underline')
  if (annotations.code)
    css.push(
      `rotion-richtext-code ${color === 'default' || color.includes('background') ? 'rotion-richtext-code-color' : ''}`,
    )
  if (!annotations.code && color.includes('background')) css.push('rotion-richtext-nocode-bg')

  if (children) {
    return <span className={css.join(' ')}>{children}</span>
  }

  const html = textObject.plain_text.replace(/\n/g, '<br />')
  return <span className={css.join(' ')} dangerouslySetInnerHTML={{ __html: html }} />
}

export default Annotation
