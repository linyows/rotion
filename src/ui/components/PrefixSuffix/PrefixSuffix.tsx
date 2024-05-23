import React from 'react'
import type { PrefixSuffixProps } from './PrefixSuffix.types'
import './PrefixSuffix.css'

const PrefixSuffix = ({ prefix, suffix, children }: PrefixSuffixProps) => {
  return (
    <>
      {prefix && <span className="rotion-prefix">{prefix}</span>}
      {children}
      {suffix && <span className="rotion-suffix">{suffix}</span>}
    </>
  )
}

export default PrefixSuffix
