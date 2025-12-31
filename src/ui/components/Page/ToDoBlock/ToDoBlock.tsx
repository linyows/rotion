import { Checkbox } from '../../Checkbox/index.js'
import { RichText } from '../../RichText/index.js'
import type { ToDoBlockProps } from './ToDoBlock.types'
import '../../tokens.css'
import './ToDoBlock.css'

const ToDoBlock = ({ block }: ToDoBlockProps) => {
  if (!block.to_do) {
    return null
  }

  const todoChecked = block.to_do.checked

  return (
    <div className="rotion-todo">
      <div className="rotion-todo-checkbox">
        <Checkbox bool={todoChecked} />
      </div>
      <div className="rotion-todo-text">
        <div className={`rotion-todo-text-inner ${todoChecked ? 'rotion-todo-text-inner-checked' : ''}`}>
          {block.to_do.rich_text.map((v, i) => (
            <RichText textObject={v} key={`richtext-${i}`} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default ToDoBlock
