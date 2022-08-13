import React from 'react'
import TextBlock from './text'
import type {
  BlockObjectResponse,
} from '../../types'

export type TodoBlockProps = {
  block: BlockObjectResponse
}

const checkedBox = () => {
  return (
    <>
      <div className="todo-check-bg">
        <div className="todo-check-inner">
          <svg viewBox="0 0 14 14" className="todo-checkbox">
            <polygon points="5.5 11.9993304 14 3.49933039 12.5 2 5.5 8.99933039 1.5 4.9968652 0 6.49933039"></polygon>
          </svg>
        </div>
      </div>
      <style jsx>{`
        .todo-check-bg {
          width: 16px;
          height: 16px;
          display: flex;
          align-items: stretch;
          justify-content: stretch;
          flex-shrink: 0;
          flex-grow: 0;
          background: rgb(46, 170, 220);
          transition: background 200ms ease-out 0s;
        }
        .todo-check-inner {
          user-select: none;
          transition: background 20ms ease-in 0s;
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          width: 100%;
        }
        .todo-checkbox {
          width: 12px;
          height: 12px;
          display: block;
          fill: white;
          flex-shrink: 0;
          backface-visibility: hidden;
        }
      `}</style>
    </>
  )
}

const uncheckedBox = () => {
  return (
    <>
      <div className="todo-check-inner">
        <svg viewBox="0 0 16 16" className="todo-checkbox">
          <path d="M1.5,1.5 L1.5,14.5 L14.5,14.5 L14.5,1.5 L1.5,1.5 Z M0,0 L16,0 L16,16 L0,16 L0,0 Z"></path>
        </svg>
      </div>
      <style jsx>{`
        .todo-check-inner {
          user-select: none;
          transition: background 20ms ease-in 0s;
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          width: 16px;
          height: 16px;
        }
        .todo-checkbox {
          width: 100%;
          height: 100%;
          display: block;
          fill: inherit;
          flex-shrink: 0;
          backface-visibility: hidden;
        }
      `}</style>
    </>
  )
}

const TodoBlock = ({ block }): React.FC<TodoBlockProps> => {
  const todoChecked = block.to_do.checked
  const TodoCheckbox = todoChecked ? checkedBox : uncheckedBox

  return (
    <>
      <div className="todo">
        <div className="todo-check">
          <TodoCheckbox />
        </div>
        <div className="todo-text">
          <div className="todo-text-inner">
            <TextBlock tag="span" block={block.to_do.text} />
          </div>
        </div>
      </div>
      <style jsx>{`
        .todo {
          display: flex;
          align-items: flex-start;
          width: 100%;
          padding-left: 2px;
        }
        .todo-check {
          user-select: none;
          margin-right: 4px;
          width: 22px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-grow: 0;
          flex-shrink: 0;
          min-height: calc(1.5em + 3px + 3px);
        }
        .todo-text {
          flex: 1 1 0px;
          min-width: 1px;
          display: flex;
          flex-direction: column;
        }
        .todo-text-inner {
          max-width: 100%;
          white-space: pre-wrap;
          word-break: break-word;
          padding: 1px 2px;
          text-align: left;
          flex-grow: 1;
          ${todoChecked ? `
          text-decoration-line: line-through;
          color: #888;
          text-decoration-color: #999;` : ``}
        }
      `}</style>
    </>
  )
}

export default TodoBlock
