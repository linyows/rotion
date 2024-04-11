import React from 'react'
import { RichText } from '../RichText'
import type { ToDoBlockProps } from './ToDoBlock.types'
import Stylex from '@stylexjs/stylex'
import { tokens } from '../../tokens.stylex'
import { Checkbox } from '../../Checkbox'

const style = Stylex.create({
  wrapper: {
    fontFamily: tokens.fontFamily,
    display: 'flex',
    alignItems: 'flex-start',
    width: '100%',
    padding: '4px 0 1px 2px',
    lineHeight: 1.7,
  },
  checkbox: {
    userSelect: 'none',
    marginRight: '4px',
    width: '22px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexGrow: 0,
    flexShrink: 0,
    minHeight: 'calc(1.5em + 3px + 3px)',
  },
  text: {
    flex: '1 1 0',
    minWidth: '1px',
    display: 'flex',
    flexDirection: 'column',
    color: tokens.primaryText,
  },
  textInner: {
    maxWidth: '100%',
    whiteSpace: 'pre-wrap',
    wordBreak: 'break-word',
    padding: '1px 2px',
    textAlign: 'left',
    flexGrow: 1,
  },
  textInnerChecked: {
    textDecorationLine: 'line-through',
    textDecorationColor: tokens.thirdText,
    color: tokens.secondaryText,
  },
})

const ToDoBlock = ({ block }: ToDoBlockProps) => {
  if (!block.to_do) {
    return <></>
  }

  const todoChecked = block.to_do.checked

  return (
    <div className={`rotion-todo ${Stylex(style.wrapper)}`}>
      <div className={`rotion-todo-checkbox ${Stylex(style.checkbox)}`}>
        <Checkbox bool={todoChecked} />
      </div>
      <div className={`rotion-todo-text ${Stylex(style.text)}`}>
        <div className={`rotion-todo-text-inner ${Stylex(style.textInner)} ${todoChecked ? `rotion-todo-text-inner-checked ${Stylex(style.textInnerChecked)}` : ''}`}>
          {block.to_do.rich_text.map((v, i) => (
            <RichText textObject={v} key={`richtext-${i}`} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default ToDoBlock
