import React from 'react'
import Stylex from '@stylexjs/stylex'
import { tokens } from '../tokens.stylex'

const style = Stylex.create({
  checked: {
    width: '16px',
    height: '16px',
    display: 'flex',
    alignItems: 'stretch',
    justifyContent: 'stretch',
    flexShrink: 0,
    flexGrow: 0,
    background: 'rgb(35, 131, 226)',
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
    fill: tokens.primaryText,
    flexShrink: 0,
    backfaceVisibility: 'hidden',
  },
})

const CheckedBox = () => {
  return (
    <div className={`rotion-table-checkbox-checked ${Stylex(style.checked)}`}>
      <div className={`rotion-table-checkbox-checked-inner ${Stylex(style.checkedInner)}`}>
        <svg className={`rotion-table-checkbox-checked-checkbox ${Stylex(style.checkedCheckbox)}`} viewBox="0 0 14 14">
          <polygon points="5.5 11.9993304 14 3.49933039 12.5 2 5.5 8.99933039 1.5 4.9968652 0 6.49933039"></polygon>
        </svg>
      </div>
    </div>
  )
}

const UncheckedBox = () => {
  return (
    <div className={`rotion-table-checkbox-unchecked ${Stylex(style.unchecked)}`}>
      <svg className={`rotion-table-checkbox-unchecked-checkbox ${Stylex(style.uncheckedCheckbox)}`} viewBox="0 0 16 16">
        <path d="M1.5,1.5 L1.5,14.5 L14.5,14.5 L14.5,1.5 L1.5,1.5 Z M0,0 L16,0 L16,16 L0,16 L0,0 Z"></path>
      </svg>
    </div>
  )
}

const Checkbox = ({ bool }: { bool: boolean }) => {
  return bool ? <CheckedBox /> : <UncheckedBox />
}

export default Checkbox
