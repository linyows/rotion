import type { Meta, StoryObj } from '@storybook/react-vite'
import type { EquationBlockObjectResponse } from '../../../../exporter/index.js'
import EquationBlock from './EquationBlock.js'

const block: EquationBlockObjectResponse = {
  object: 'block',
  id: '12345678-1234-1234-1234-1234567890ab',
  created_time: '',
  last_edited_time: '',
  created_by: {
    object: 'user',
    id: '12345678-1234-1234-1234-1234567890ab',
  },
  last_edited_by: {
    object: 'user',
    id: '12345678-1234-1234-1234-1234567890ab',
  },
  has_children: false,
  archived: false,
  type: 'equation',
  parent: {
    type: 'page_id',
    page_id: '12345678-1234-1234-1234-1234567890ab',
  },
  equation: {
    expression: '\\frac{{ - b \\pm \\sqrt {b^2 - 4ac} }}{{2a}}',
  },
  in_trash: false,
}

const meta = {
  title: 'Page/EquationBlock',
  component: EquationBlock,
  args: {
    block,
  },
  tags: ['autodocs'],
} satisfies Meta<typeof EquationBlock>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
