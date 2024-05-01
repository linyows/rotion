import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import type { RichTextItemResponseEx } from '../../../../exporter'
import Annotation from './Annotation'

const textObject = {
  type: 'text',
  text: {
    content: 'Text Style',
    link: null,
  },
  annotations: {
    bold: false,
    italic: false,
    strikethrough: false,
    underline: false,
    code: false,
    color: 'default',
  },
  plain_text: 'Text Style',
  href: null,
} as RichTextItemResponseEx

const meta = {
  title: 'RichText/Annotation',
  component: Annotation,
  args: {
    textObject,
    children: <>Text Style</>,
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Annotation>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

const bold = structuredClone(textObject)
bold.annotations.bold = true
export const Bold: Story = {
  args: {
    textObject: bold,
  }
}

const italic = structuredClone(textObject)
italic.annotations.italic = true
export const Italic: Story = {
  args: {
    textObject: italic,
  }
}

const strikethrough = structuredClone(textObject)
strikethrough.annotations.strikethrough = true
export const Strikethrough: Story = {
  args: {
    textObject: strikethrough,
  }
}

const underline = structuredClone(textObject)
underline.annotations.underline = true
export const Underline: Story = {
  args: {
    textObject: underline,
  }
}

const code = structuredClone(textObject)
code.annotations.code = true
export const Code: Story = {
  args: {
    textObject: code,
  }
}

const codeBlue = structuredClone(textObject)
codeBlue.annotations.code = true
codeBlue.annotations.color = 'blue'
export const CodeBlue: Story = {
  args: {
    textObject: codeBlue,
  }
}

const codeBgBlue = structuredClone(textObject)
codeBgBlue.annotations.code = true
codeBgBlue.annotations.color = 'blue_background'
export const CodeBgBlue: Story = {
  args: {
    textObject: codeBgBlue,
  }
}

const gray = structuredClone(textObject)
gray.annotations.color = 'gray'
export const Gray: Story = {
  args: {
    textObject: gray,
  }
}

const bgGray = structuredClone(textObject)
bgGray.annotations.color = 'gray_background'
export const BgGray: Story = {
  args: {
    textObject: bgGray,
  }
}

const brown = structuredClone(textObject)
brown.annotations.color = 'brown'
export const Brown: Story = {
  args: {
    textObject: brown,
  }
}

const bgBrown = structuredClone(textObject)
bgBrown.annotations.color = 'brown_background'
export const BgBrown: Story = {
  args: {
    textObject: bgBrown,
  }
}

const orange = structuredClone(textObject)
orange.annotations.color = 'orange'
export const Orange: Story = {
  args: {
    textObject: orange,
  }
}

const bgOrange = structuredClone(textObject)
bgOrange.annotations.color = 'orange_background'
export const BgOrange: Story = {
  args: {
    textObject: bgOrange,
  }
}

const yellow = structuredClone(textObject)
yellow.annotations.color = 'yellow'
export const Yellow: Story = {
  args: {
    textObject: yellow,
  }
}

const bgYellow = structuredClone(textObject)
bgYellow.annotations.color = 'yellow_background'
export const BgYellow: Story = {
  args: {
    textObject: bgYellow,
  }
}

const green = structuredClone(textObject)
green.annotations.color = 'green'
export const Green: Story = {
  args: {
    textObject: green,
  }
}

const bgGreen = structuredClone(textObject)
bgGreen.annotations.color = 'green_background'
export const BgGreen: Story = {
  args: {
    textObject: bgGreen,
  }
}

const blue = structuredClone(textObject)
blue.annotations.color = 'blue'
export const Blue: Story = {
  args: {
    textObject: blue,
  }
}

const bgBlue = structuredClone(textObject)
bgBlue.annotations.color = 'blue_background'
export const BgBlue: Story = {
  args: {
    textObject: bgBlue,
  }
}

const purple = structuredClone(textObject)
purple.annotations.color = 'purple'
export const Purple: Story = {
  args: {
    textObject: purple,
  }
}

const bgPurple = structuredClone(textObject)
bgPurple.annotations.color = 'purple_background'
export const BgPurple: Story = {
  args: {
    textObject: bgPurple,
  }
}

const pink = structuredClone(textObject)
pink.annotations.color = 'pink'
export const Pink: Story = {
  args: {
    textObject: pink,
  }
}

const bgPink = structuredClone(textObject)
bgPink.annotations.color = 'pink_background'
export const BgPink: Story = {
  args: {
    textObject: bgPink,
  }
}

const red = structuredClone(textObject)
red.annotations.color = 'red'
export const Red: Story = {
  args: {
    textObject: red,
  }
}

const bgRed = structuredClone(textObject)
bgRed.annotations.color = 'red_background'
export const BgRed: Story = {
  args: {
    textObject: bgRed,
  }
}
