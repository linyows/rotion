import { splitUrl } from '../../lib.js'
import type { TableUrlFieldProps } from './TableUrlField.types'
import './TableUrlField.css'

const TableUrlField = ({ url }: TableUrlFieldProps) => {
  if (!url) {
    return null
  }

  const { domain, omittedPath } = splitUrl(url)
  return (
    <div className="rotion-table-url">
      <a className="rotion-table-url-link" href={url} rel="noreferrer" target="_blank">
        <span className="rotion-table-url-domain">{domain}</span>
        <span className="rotion-table-url-path">{omittedPath}</span>
      </a>
    </div>
  )
}

export default TableUrlField
