import React from 'react'
import { RichText } from '../../RichText'
import type { ToDoBlockProps } from './ToDoBlock.types'
import { Checkbox } from '../../Checkbox'
import '../../tokens.css'
import './ToDoBlock.css'

const ToDoBlock = ({ block }: ToDoBlockProps) => {
  if (!block.to_do) {
    return <></>
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
