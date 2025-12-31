import type { Meta, StoryObj } from '@storybook/react-vite'
import type { FetchDatabaseRes } from '../../../exporter/index.js'
import response from '../../fixtures/fetch_database_response.json'
import List from './List.js'

const db = response as unknown as FetchDatabaseRes

const meta = {
  title: 'Database/List',
  component: List,
  args: {
    keys: ['Name', 'spacer', 'Note', 'Published', 'Tags', 'Url', 'Born', 'Category', 'Date'],
    db,
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
  },
}

export const Linked: Story = {
  args: {
    keys: ['Name', 'Note', 'dashed', 'Published', 'Tags', 'Url', 'Born', 'Category', 'Date'],
    db,
    options: {
      href: {
        Name: '/blog/[id]',
        Tags: '/blog/tags',
        Category: '/blog/category',
      },
    },
  },
}

export const PrefixSuffix: Story = {
  args: {
    keys: ['Name', 'Note', 'dashed', 'Published', 'Tags', 'Url', 'Born', 'Category', 'Date'],
    db,
    options: {
      prefix: {
        Born: 'Born in',
        Published: 'Published',
      },
      suffix: {
        Born: 's',
      },
    },
  },
}
