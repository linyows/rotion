import type { Meta, StoryObj } from '@storybook/react'
import type { FetchDatabaseRes } from '../../../exporter'
import Gallery from './Gallery'
import response from '../../fixtures/fetch_database_response.json'

const meta = {
  title: 'Database/Gallery',
  component: Gallery,
  args: {
    keys: ['Name', 'Born', 'Date', 'Published', 'Url', 'Note', 'Tags'],
    db: response as FetchDatabaseRes,
    href: '/blog/[id]',
    link: undefined,
    query: undefined,
    preview: 'cover',
    size: undefined,
    fit: true,
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Gallery>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const ImageFit: Story = {
  args: {
    keys: ['Name', 'Born', 'Date', 'Published', 'Url', 'Note', 'Tags'],
    db: response as FetchDatabaseRes,
    href: '/blog/[id]',
    link: undefined,
    query: undefined,
    preview: 'cover',
    size: undefined,
    fit: false,
  }
}

export const SmallSize: Story = {
  args: {
    keys: ['Name', 'Tags'],
    db: response as FetchDatabaseRes,
    href: '/blog/[id]',
    link: undefined,
    query: undefined,
    preview: 'cover',
    size: 'small',
    fit: true,
  }
}

export const SmallLarge: Story = {
  args: {
    keys: ['Name', 'Tags'],
    db: response as FetchDatabaseRes,
    href: '/blog/[id]',
    link: undefined,
    query: undefined,
    preview: 'cover',
    size: 'large',
    fit: true,
  }
}
