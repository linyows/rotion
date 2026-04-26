import type { Meta, StoryObj } from '@storybook/react-vite'
import type { FetchDatabaseRes, PageObjectResponseEx } from '../../../exporter/index.js'
import response from '../../fixtures/fetch_database_response.json'
import Calendar from './Calendar.js'

const db = response as unknown as FetchDatabaseRes

const pad = (n: number) => String(n).padStart(2, '0')
const now = new Date()
const thisYear = now.getFullYear()
const thisMonth = now.getMonth() + 1
const ymd = (day: number) => `${thisYear}-${pad(thisMonth)}-${pad(day)}`
const initialDateThisMonth = `${thisYear}-${pad(thisMonth)}-01`

const ranges: Array<{ start: string; end?: string }> = [
  { start: ymd(2) },
  { start: ymd(4), end: ymd(7) },
  { start: ymd(6), end: ymd(10) },
  { start: ymd(9) },
  { start: ymd(12), end: ymd(20) },
  { start: ymd(15) },
  { start: ymd(22), end: ymd(28) },
  { start: ymd(25) },
]

const thisMonthDb = (() => {
  const cloned = structuredClone(db)
  cloned.results.forEach((page, i) => {
    if (i >= ranges.length) return
    const p = page as PageObjectResponseEx
    const prop = p.properties.Date as { type: 'date'; date: { start: string; end: string | null; time_zone: string | null } } | undefined
    if (!prop || prop.type !== 'date') return
    const r = ranges[i]
    prop.date = { start: r.start, end: r.end ?? null, time_zone: null }
  })
  return cloned
})()

const meta = {
  title: 'Database/Calendar',
  component: Calendar,
  args: {
    keys: ['Name', 'Tags'],
    date: 'Date',
    db,
    options: {
      initialDate: '2022-09-01',
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Calendar>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const Linked: Story = {
  args: {
    keys: ['Name', 'Tags'],
    date: 'Date',
    db,
    options: {
      initialDate: '2022-09-01',
      href: {
        Name: '/blog/[id]',
      },
    },
  },
}

export const MondayStart: Story = {
  args: {
    keys: ['Name'],
    date: 'Date',
    db,
    options: {
      initialDate: '2022-09-01',
      weekStart: 'monday',
    },
  },
}

export const Japanese: Story = {
  args: {
    keys: ['Name', 'Tags'],
    date: 'Date',
    db,
    options: {
      initialDate: '2022-09-01',
      locale: 'ja-JP',
    },
  },
}

export const TitleOnly: Story = {
  args: {
    keys: ['Name'],
    date: 'Date',
    db,
    options: {
      initialDate: '2022-09-01',
    },
  },
}

export const ThisMonthMultiDaySpans: Story = {
  args: {
    keys: ['Name', 'Tags'],
    date: 'Date',
    db: thisMonthDb,
    options: {
      initialDate: initialDateThisMonth,
    },
  },
}

export const ThisMonthMultiDaySpansLinked: Story = {
  args: {
    keys: ['Name', 'Tags'],
    date: 'Date',
    db: thisMonthDb,
    options: {
      initialDate: initialDateThisMonth,
      href: {
        Name: '/blog/[id]',
      },
    },
  },
}
