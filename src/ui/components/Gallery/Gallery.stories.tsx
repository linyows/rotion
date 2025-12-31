import type { Meta, StoryObj } from '@storybook/react-vite'
import type { FetchDatabaseRes } from '../../../exporter/index.js'
import response from '../../fixtures/fetch_database_response.json'
import Gallery from './Gallery.js'

const db = response as unknown as FetchDatabaseRes

const meta = {
  title: 'Database/Gallery',
  component: Gallery,
  args: {
    keys: ['Name', 'Born', 'Date', 'Published', 'Url', 'Note', 'Tags', 'Category'],
    db,
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Gallery>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const Linked: Story = {
  args: {
    keys: ['Name', 'Born', 'Date', 'Published', 'Url', 'Note', 'Tags', 'Category'],
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

export const LinkedOnlyTags: Story = {
  args: {
    keys: ['Name', 'Born', 'Date', 'Published', 'Url', 'Note', 'Tags', 'Category'],
    db,
    options: {
      href: {
        Tags: '/blog/tags',
      },
    },
  },
}

export const NoFitImage: Story = {
  args: {
    keys: ['Name', 'Born', 'Date', 'Published', 'Url', 'Note', 'Tags', 'Category'],
    db,
    options: {
      image: {
        fit: false,
      },
    },
  },
}

export const SmallSizeImage: Story = {
  args: {
    keys: ['Name', 'Tags'],
    db,
    options: {
      image: {
        size: 'small',
      },
    },
  },
}

export const LargeSizeImage: Story = {
  args: {
    keys: ['Name', 'Tags'],
    db,
    options: {
      image: {
        size: 'large',
      },
    },
  },
}

export const SpecifyHight: Story = {
  args: {
    keys: ['Name', 'Born', 'Date', 'Published', 'Url', 'Note', 'Tags', 'Category'],
    db,
    options: {
      image: {
        fit: false,
        size: 'large',
        height: '400px',
      },
    },
  },
}

export const PrefixSuffix: Story = {
  args: {
    keys: ['Name', 'Born', 'Date', 'Published', 'Url', 'Note', 'Tags', 'Category'],
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
  },
}
