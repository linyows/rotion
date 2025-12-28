import type { Meta, StoryObj } from '@storybook/react-vite'
import type { LinkPreviewBlockObjectResponseEx } from '../../../../exporter/index.js'
import LinkPreviewBlock from './LinkPreviewBlock.js'

const block: LinkPreviewBlockObjectResponseEx = {
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
  type: 'link_preview',
  parent: {
    type: 'page_id',
    page_id: '12345678-1234-1234-1234-1234567890ab',
  },
  link_preview: {
    url: 'https://github.com/linyows/rotion/pull/3',
  },
  in_trash: false,
}

const meta = {
  title: 'Page/LinkPreviewBlock',
  component: LinkPreviewBlock,
  args: {
    block,
  },
  tags: ['autodocs'],
} satisfies Meta<typeof LinkPreviewBlock>

export default meta
type Story = StoryObj<typeof meta>

const githubIssueMerged = structuredClone(block)
githubIssueMerged.link_preview.github = {
  type: 'issue',
  issue: {
    title: 'Bump node-fetch from 2.6.5 to 2.6.7',
    login: 'dependabot',
    avatar_url: 'https://avatars.githubusercontent.com/u/12345678?v=4',
    avatar_src: '/images/github-link-preview-5b0242cb708cf8ca2d89bb732351e64473497f64.webp',
    created_at: '2021-08-01T00:00:00Z',
    closed_at: '2024-06-03T14:10:07Z',
    merged_at: '2024-06-03T14:10:07Z',
    state: 'merged',
    number: 3,
  },
}
export const GithubPullsMerged: Story = {
  args: {
    block: githubIssueMerged,
  },
}

const githubIssueOpen = structuredClone(block)
githubIssueOpen.link_preview.github = {
  type: 'issue',
  issue: {
    title: 'Raised unknown error',
    login: 'linyows',
    avatar_url: 'https://avatars.githubusercontent.com/u/12345678?v=4',
    avatar_src: '/images/github-link-preview-b9799f95f6f7bdd0914f8c9a53dd2a044be72549.webp',
    created_at: '2021-08-01T00:00:00Z',
    closed_at: null,
    merged_at: null,
    state: 'open',
    number: 335,
  },
}
export const GithubIssueOpen: Story = {
  args: {
    block: githubIssueOpen,
  },
}

const githubIssueClosed = structuredClone(block)
githubIssueClosed.link_preview.github = {
  type: 'issue',
  issue: {
    title: 'Support github link preview',
    login: 'linyows',
    avatar_url: 'https://avatars.githubusercontent.com/u/12345678?v=4',
    avatar_src: '/images/github-link-preview-b9799f95f6f7bdd0914f8c9a53dd2a044be72549.webp',
    created_at: '2021-08-01T00:00:00Z',
    closed_at: '2023-12-27T08:36:00Z',
    merged_at: null,
    state: 'closed',
    number: 26,
  },
}
export const GithubIssueClosed: Story = {
  args: {
    block: githubIssueClosed,
  },
}

const githubRepo = structuredClone(block)
githubRepo.link_preview.github = {
  type: 'repo',
  repo: {
    name: 'rotion',
    login: 'linyows',
    avatar_url: 'https://avatars.githubusercontent.com/u/12345678?v=4',
    avatar_src: '/images/github-link-preview-b9799f95f6f7bdd0914f8c9a53dd2a044be72549.webp',
    updated_at: '2024-06-03T14:10:07Z',
  },
}
export const GithubRepository: Story = {
  args: {
    block: githubRepo,
  },
}

const slack = structuredClone(block)
slack.link_preview.url = 'https://linyows.slack.com/archives/C02FCHEQH/p1658643567381379'
export const Slack: Story = {
  args: {
    block: slack,
  },
}

const figma = structuredClone(block)
figma.link_preview.url = 'https://www.figma.com/file/GfHZFRpWGd0QXsRg9igdw8/Google-Material-Design?node-id=0%3A1'
figma.link_preview.figma = {
  html: `<iframe width="100%" height="450" src="https://www.figma.com/embed?embed_host=share&url=${encodeURI(figma.link_preview.url)}" allowfullscreen></iframe>`
}
export const Figma: Story = {
  args: {
    block: figma,
  },
}
