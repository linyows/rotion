import type { Meta, StoryObj } from '@storybook/react'
import type { FetchDatabaseRes } from '../../../exporter'
import List from './List'
import response from '../../fixtures/fetch_database_response.json'

const meta = {
  title: 'Database/List',
  component: List,
  args: {
    keys: ['Name', 'spacer', 'Note', 'Date', 'Published', 'Url', 'Tags'],
    db: response as FetchDatabaseRes,
    href: '/blog/[id]',
    link: undefined,
    query: undefined,
  },
  tags: ['autodocs'],
} satisfies Meta<typeof List>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
