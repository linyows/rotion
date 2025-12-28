import type { Meta, StoryObj } from '@storybook/react-vite'
import type { FetchDatabaseRes } from '../../../exporter/index.js'
import Table from './Table.js'
import response from '../../fixtures/fetch_database_response.json'
const db = response as unknown as FetchDatabaseRes

const meta = {
  title: 'Database/Table',
  component: Table,
  args: {
    keys: ['Name', 'Note', 'Published', 'Tags', 'Url', 'Born', 'Date', 'Category'],
    db,
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
    options: {
      href: {
        Name: '/blog/[id]',
        Tags: '/blog/tags',
        Category: '/blog/category',
      }
    },
  }
}

export const PrefixSuffix: Story = {
  args: {
    keys: ['Name', 'Note', 'Published', 'Tags', 'Url', 'Born', 'Date', 'Category'],
    db,
    options: {
      prefix: {
        Born: 'Born in',
      },
      suffix: {
        Born: 's',
        Published: 'Published',
      },
    },
  }
}

export const NoVerticalLines: Story = {
  args: {
    keys: ['Name', 'Note', 'Published', 'Tags', 'Url', 'Born', 'Date', 'Category'],
    db,
    options: {
      verticalLines: false,
    },
  }
}
