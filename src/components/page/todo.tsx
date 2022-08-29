import React from 'react'
import TextBlock from './text'
import type {
  ToDoBlockObjectResponse,
} from '../../server/types'

export type TodoBlockProps = {
  block: ToDoBlockObjectResponse
}

const checkedBox: React.FC = () => {
  return (
    <div className="notionate-blocks-checked">
      <div className="notionate-blocks-checked-inner">
        <svg className="notionate-blocks-checked-checkbox" viewBox="0 0 14 14">
          <polygon points="5.5 11.9993304 14 3.49933039 12.5 2 5.5 8.99933039 1.5 4.9968652 0 6.49933039"></polygon>
        </svg>
      </div>
    </div>
  )
}

const uncheckedBox: React.FC = () => {
  return (
    <div className="notionate-blocks-unchecked">
      <svg className="notionate-blocks-unchecked-checkbox" viewBox="0 0 16 16">
        <path d="M1.5,1.5 L1.5,14.5 L14.5,14.5 L14.5,1.5 L1.5,1.5 Z M0,0 L16,0 L16,16 L0,16 L0,0 Z"></path>
      </svg>
    </div>
  )
}

const TodoBlock: React.FC<TodoBlockProps> = ({ block }) => {
  if (!block.to_do) {
    return <></>
  }

  const todoChecked = block.to_do.checked
  const TodoCheckbox = todoChecked ? checkedBox : uncheckedBox

  return (
    <div className="notionate-blocks-todo">
      <div className="notionate-blocks-todo-check">
        <TodoCheckbox />
      </div>
      <div className="notionate-blocks-todo-text">
        <div className={`notionate-blocks-todo-text-inner${todoChecked ? ' notionate-blocks-todo-text-inner-checked' : ''}`}>
          <TextBlock tag="span" block={block.to_do.rich_text} />
        </div>
      </div>
    </div>
  )
}

export default TodoBlock
