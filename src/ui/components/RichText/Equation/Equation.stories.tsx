import React from 'react'
import type { EquationRichTextItemResponse } from '../../../../exporter'
import type { Meta, StoryObj } from '@storybook/react-vite'
import Equation from './Equation'

const textObject = {
  type: 'equation',
  equation: {
    expression: 'E = mc^2',
  },
  annotations: {
    bold: false,
    italic: false,
    strikethrough: false,
    underline: false,
    code: false,
    color: 'default',
  },
  plain_text: 'E = mc^2',
  href: null,
} as EquationRichTextItemResponse

const meta = {
  title: 'RichText/Equation',
  component: Equation,
  args: {
    textObject,
    children: <></>,
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Equation>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

const sigma = structuredClone(textObject)
sigma.equation.expression = 'S=\\sum_{n=1}^\\infty a_n'
sigma.plain_text = 'S=\\sum_{n=1}^\\infty a_n'
export const Sigma: Story = {
  args: {
    textObject: sigma,
  }
}
