import type { Meta, StoryObj } from '@storybook/react'
import type { FetchDatabaseRes } from '../../../exporter'
import Table from './Table'
import response from '../../fixtures/fetch_database_response.json'
const db = response as unknown as FetchDatabaseRes

const meta = {
  title: 'Database/Table',
  component: Table,
  args: {
    keys: ['Name', 'Note', 'Published', 'Tags', 'Url', 'Born', 'Date', 'Category'],
    db,
    href: undefined,
    link: undefined,
    query: undefined,
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Table>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const Linked: Story = {
  args: {
    keys: ['Name', 'Note', 'Published', 'Tags', 'Url', 'Born', 'Date', 'Category'],
    db,
    href: '/blog/[id]',
  }
}
