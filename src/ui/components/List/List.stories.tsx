import type { Meta, StoryObj } from '@storybook/react'
import type { FetchDatabaseRes } from '../../../exporter'
import List from './List'
import response from '../../fixtures/fetch_database_response.json'
const db = response as unknown as FetchDatabaseRes

const meta = {
  title: 'Database/List',
  component: List,
  args: {
    keys: ['Name', 'spacer', 'Note', 'Published', 'Tags', 'Url', 'Born', 'Category', 'Date'],
    db,
    href: undefined,
    link: undefined,
    query: undefined,
  },
  tags: ['autodocs'],
} satisfies Meta<typeof List>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const Dashed: Story = {
  args: {
    keys: ['Name', 'Note', 'dashed', 'Published', 'Tags', 'Url', 'Born', 'Category', 'Date'],
    db,
    href: '/blog/[id]',
  }
}
