import type { Meta, StoryObj } from '@storybook/react'
import type { CalloutBlockObjectResponseEx, RichTextItemResponse } from '../../../../exporter'
import CalloutBlock from './CalloutBlock'

const richText: RichTextItemResponse = {
  type: 'text',
  text: {
    content: 'This is callout block',
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
  plain_text: 'This is callout block',
  href: null,
}

const block: CalloutBlockObjectResponseEx = {
  object: 'block',
  id: '12345678-1234-1234-1234-1234567890ab',
  parent: {
    type: 'page_id',
    page_id: '12345678-1234-1234-1234-1234567890ab',
  },
  created_time: '2020-02-22T22:22:22.000Z',
  last_edited_time: '2020-02-22T22:22:22.000Z',
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
  type: 'callout',
  callout: {
    rich_text: [richText],
    color: 'default',
    icon: {
      type: 'emoji',
      emoji: '💡',
    }
  },
}

const meta = {
  title: 'Page/CalloutBlock',
  component: CalloutBlock,
  args: {
    block,
  },
  tags: ['autodocs'],
} satisfies Meta<typeof CalloutBlock>

export default meta
type Story = StoryObj<typeof meta>

export const Emoji: Story = {}

const icon = structuredClone(block)
icon.callout.icon! = {
  type: 'external',
  external: {
    url: 'https://www.notion.so/icons/light-bulb_default.svg?mode=light',
  },
  src: 'https://www.notion.so/icons/light-bulb_gray.svg?mode=light',
}
export const Icon: Story = {
  args: {
    block: icon
  }
}

/* GRAY */
const gray = structuredClone(icon)
gray.callout.color = 'gray'
// @ts-ignore
gray.callout.icon.src = 'https://www.notion.so/icons/light-bulb_lightgray.svg'
export const Gray: Story = {
  args: {
    block: gray
  }
}
const bgGray = structuredClone(gray)
bgGray.callout.color = 'gray_background'
export const BgGray: Story = {
  args: {
    block: bgGray
  }
}

/* BROWN */
const brown = structuredClone(icon)
brown.callout.color = 'brown'
// @ts-ignore
brown.callout.icon.src = 'https://www.notion.so/icons/light-bulb_brown.svg'
export const Brown: Story = {
  args: {
    block: brown
  }
}
const bgBrown = structuredClone(brown)
bgBrown.callout.color = 'brown_background'
export const BgBrown: Story = {
  args: {
    block: bgBrown
  }
}

/* ORANGE */
const orange = structuredClone(icon)
orange.callout.color = 'orange'
// @ts-ignore
orange.callout.icon.src = 'https://www.notion.so/icons/light-bulb_orange.svg'
export const Orange: Story = {
  args: {
    block: orange
  }
}
const bgOrange = structuredClone(orange)
bgOrange.callout.color = 'orange_background'
export const BgOrange: Story = {
  args: {
    block: bgOrange
  }
}

/* YELLOW */
const yellow = structuredClone(icon)
yellow.callout.color = 'yellow'
// @ts-ignore
yellow.callout.icon.src = 'https://www.notion.so/icons/light-bulb_yellow.svg'
export const Yellow: Story = {
  args: {
    block: yellow
  }
}
const bgYellow = structuredClone(yellow)
bgYellow.callout.color = 'yellow_background'
export const BgYellow: Story = {
  args: {
    block: bgYellow
  }
}

/* GREEN */
const green = structuredClone(icon)
green.callout.color = 'green'
// @ts-ignore
green.callout.icon.src = 'https://www.notion.so/icons/light-bulb_green.svg'
export const Green: Story = {
  args: {
    block: green
  }
}
const bgGreen = structuredClone(green)
bgGreen.callout.color = 'green_background'
export const BgGreen: Story = {
  args: {
    block: bgGreen
  }
}

/* BLUE */
const blue = structuredClone(icon)
blue.callout.color = 'blue'
// @ts-ignore
blue.callout.icon.src = 'https://www.notion.so/icons/light-bulb_blue.svg'
export const Blue: Story = {
  args: {
    block: blue
  }
}
const bgBlue = structuredClone(blue)
bgBlue.callout.color = 'blue_background'
export const BgBlue: Story = {
  args: {
    block: bgBlue
  }
}

/* PURPLE */
const purple = structuredClone(icon)
purple.callout.color = 'purple'
// @ts-ignore
purple.callout.icon.src = 'https://www.notion.so/icons/light-bulb_purple.svg'
export const Purple: Story = {
  args: {
    block: purple
  }
}
const bgPurple = structuredClone(purple)
bgPurple.callout.color = 'purple_background'
export const BgPurple: Story = {
  args: {
    block: bgPurple
  }
}

/* PINK */
const pink = structuredClone(icon)
pink.callout.color = 'pink'
// @ts-ignore
pink.callout.icon.src = 'https://www.notion.so/icons/light-bulb_pink.svg'
export const Pink: Story = {
  args: {
    block: pink
  }
}
const bgPink = structuredClone(pink)
bgPink.callout.color = 'pink_background'
export const BgPink: Story = {
  args: {
    block: bgPink
  }
}

/* RED */
const red = structuredClone(icon)
red.callout.color = 'red'
// @ts-ignore
red.callout.icon.src = 'https://www.notion.so/icons/light-bulb_red.svg'
export const Red: Story = {
  args: {
    block: red
  }
}
const bgRed = structuredClone(red)
bgRed.callout.color = 'red_background'
export const BgRed: Story = {
  args: {
    block: bgRed
  }
}
