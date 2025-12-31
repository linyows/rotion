import { PrefixSuffix } from '../../PrefixSuffix/index.js'
import type { TableNumberFieldProps } from './TableNumberField.types'
import './TableNumberField.css'

const TableNumberField = ({ number, options }: TableNumberFieldProps) => {
  const { prefix, suffix } = options || {}
  return (
    <div className="rotion-table-number">
      <PrefixSuffix prefix={prefix} suffix={suffix}>
        {number}
      </PrefixSuffix>
    </div>
  )
}

export default TableNumberField
