import LinkedTagIfLinked from './LinkedTagIfLinked.js'
import type { TableSelectFieldProps } from './TableSelectField.types'
import './TableSelectField.css'

const TableSelectField = ({ select, options }: TableSelectFieldProps) => {
  if (!select) {
    return null
  }
  const { pathname, link, query } = options || {}

  return (
    <div className="rotion-table-select">
      <LinkedTagIfLinked
        pathname={pathname ? `${pathname}/${encodeURIComponent(select.name)}` : ''}
        color={select.color}
        link={link}
        query={query}
      >
        {select.name}
      </LinkedTagIfLinked>
    </div>
  )
}

export default TableSelectField
