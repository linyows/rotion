import type { Meta, StoryObj } from '@storybook/react-vite'
import type { ListBlockChildrenResponseEx } from '../../../exporter/index.js'
import TableOfContents from './TableOfContents.js'
import response from '../../fixtures/fetch_blocks_response.json'
const blocks = response as unknown as ListBlockChildrenResponseEx

const meta = {
  title: 'Page/TableOfContents',
  component: TableOfContents,
  args: { blocks },
  tags: ['autodocs'],
} satisfies Meta<typeof TableOfContents>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
