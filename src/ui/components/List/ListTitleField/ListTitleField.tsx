import LinkedTitle from './LinkedTitle.js'
import type { ListTitleFieldProps } from './ListTitleField.types'
import './ListTitleField.css'

const ListTitleField = ({ textObjects, options }: ListTitleFieldProps) => {
  return (
    <div className="rotion-list-title">
      <LinkedTitle textObjects={textObjects} options={options} />
    </div>
  )
}

export default ListTitleField
