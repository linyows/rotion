import React from 'react'
import { RichText } from '../RichText'
import type { ToDoBlockProps } from './ToDoBlock.types'
import Stylex from '@stylexjs/stylex'
import { tokens } from '../../tokens.stylex'

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
    textDecorationColor: '#999',
    color: '#888',
  },
  checked: {
    width: '16px',
    height: '16px',
    display: 'flex',
    alignItems: 'stretch',
    justifyContent: 'stretch',
    flexShrink: 0,
    flexGrow: 0,
    background: 'rgb(46, 170, 220)',
    transition: 'background 200ms ease-out 0s',
  },
  checkedInner: {
    userSelect: 'none',
    transition: 'background 20ms ease-in 0s',
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  checkedCheckbox: {
    width: '12px',
    height: '12px',
    display: 'block',
    fill: 'white',
    flexShrink: 0,
    backfaceVisibility: 'hidden',
  },
  unchecked: {
    width: '16px',
    height: '16px',
    display: 'flex',
    userSelect: 'none',
    transition: 'background 20ms ease-in 0s',
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
  },
  uncheckedCheckbox: {
    width: '100%',
    height: '100%',
    display: 'block',
    fill: 'inherit',
    flexShrink: 0,
    backfaceVisibility: 'hidden',
  },
})

const CheckedBox = () => {
  return (
    <div className={`rotion-checkbox-checked ${Stylex(style.checked)}`}>
      <div className={`rotion-checkbox-checked-inner ${Stylex(style.checkedInner)}`}>
        <svg className={`rotion-checkbox-checked-checkbox ${Stylex(style.checkedCheckbox)}`} viewBox="0 0 14 14">
          <polygon points="5.5 11.9993304 14 3.49933039 12.5 2 5.5 8.99933039 1.5 4.9968652 0 6.49933039"></polygon>
        </svg>
      </div>
    </div>
  )
}

const UncheckedBox = () => {
  return (
    <div className={`rotion-checkbox-unchecked ${Stylex(style.unchecked)}`}>
      <svg className={`rotion-checkbox-unchecked-checkbox ${Stylex(style.uncheckedCheckbox)}`} viewBox="0 0 16 16">
        <path d="M1.5,1.5 L1.5,14.5 L14.5,14.5 L14.5,1.5 L1.5,1.5 Z M0,0 L16,0 L16,16 L0,16 L0,0 Z"></path>
      </svg>
    </div>
  )
}

const ToDoBlock = ({ block }: ToDoBlockProps) => {
  if (!block.to_do) {
    return <></>
  }

  const todoChecked = block.to_do.checked
  const Checkbox = todoChecked ? CheckedBox : UncheckedBox

  return (
    <div className={`rotion-todo ${Stylex(style.wrapper)}`}>
      <div className={`rotion-todo-checkbox ${Stylex(style.checkbox)}`}>
        <Checkbox />
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
