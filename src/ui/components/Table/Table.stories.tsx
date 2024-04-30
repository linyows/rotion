import type { Meta, StoryObj } from '@storybook/react'
import type { FetchDatabaseRes } from '../../../exporter'
import Table from './Table'
import response from '../../fixtures/fetch_database_response.json'
import './Table.css'
import './TableDateField/TableDateField.css'
import './TableMultiSelectField/TableMultiSelectField.css'
import './TableMultiSelectField/LinkedTagIfLinked.css'
import './TableNumberField/TableNumberField.css'
import './TableRichTextField/TableRichTextField.css'
import './TableSelectField/TableSelectField.css'
import './TableSelectField/LinkedTagIfLinked.css'
import './TableTitleField/TableTitleField.css'
import './TableTitleField/LinkedTitleIfLinked.css'
import './TableUrlField/TableUrlField.css'
import './TableCheckboxField/TableCheckboxField.css'
import '../Checkbox/Checkbox.css'

const meta = {
  title: 'Database/Table',
  component: Table,
  args: {
    keys: ['Name', 'Note', 'Published', 'Tags', 'Url', 'Born', 'Date'],
    db: response as FetchDatabaseRes,
    href: '/blog/[id]',
    link: undefined,
    query: undefined,
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Table>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
