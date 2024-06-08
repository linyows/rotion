import { fetchWithTimeout } from './api.js'
import { saveImage } from './files.js'

interface FetchFunc<T> {
  (input: RequestInfo, init?: RequestInit): Promise<T>
}

const reqInit = {
  headers: {
    'Accept': 'application/vnd.github+json',
    'X-GitHub-Api-Version': '2022-11-28',
  }
}

export interface GithubRepoArgs {
  owner: string
  repo: string
}

export interface GithubRepoResponse {
  id: number
  node_id: string
  name: string
  full_name: string
  private: boolean
  owner: {
    login: string
    id: number
    node_id: string
    avatar_url: string
    gravatar_id: string
    url: string
    html_url: string
    followers_url: string
    following_url: string
    gists_url: string
    starred_url: string
    subscriptions_url: string
    organizations_url: string
    repos_url: string
    events_url: string
    received_events_url: string
    type: string
    site_admin: boolean
  }
  html_url: string
  description: string
  fork: boolean
  url: string
  forks_url: string
  keys_url: string
  collaborators_url: string
  teams_url: string
  hooks_url: string
  issue_events_url: string
  events_url: string
  assignees_url: string
  branches_url: string
  tags_url: string
  blobs_url: string
  git_tags_url: string
  git_refs_url: string
  trees_url: string
  statuses_url: string
  languages_url: string
  stargazers_url: string
  contributors_url: string
  subscribers_url: string
  subscription_url: string
  commits_url: string
  git_commits_url: string
  comments_url: string
  issue_comment_url: string
  contents_url: string
  compare_url: string
  merges_url: string
  archive_url: string
  downloads_url: string
  issues_url: string
  pulls_url: string
  milestones_url: string
  notifications_url: string
  labels_url: string
  releases_url: string
  deployments_url: string
  created_at: string
  updated_at: string
  pushed_at: string
  git_url: string
  ssh_url: string
  clone_url: string
  svn_url: string
  homepage: string
  size: number
  stargazers_count: number
  watchers_count: number
  language: string
  has_issues: boolean
  has_projects: boolean
  has_downloads: boolean
  has_wiki: boolean
  has_pages: boolean
  has_discussions: boolean
  forks_count: number
  mirror_url: string
  archived: boolean
  disabled: boolean
  open_issues_count: number
  license: {
    key: string
    name: string
    spdx_id: string
    url: string
    node_id: string
  }
  allow_forking: boolean
  is_template: boolean
  web_commits_signoff_required: boolean
  topics: string[]
  visibility: string
  forks: number
  open_issues: number
  watchers: number
  default_branch: string
  temp_clone_token: string
  network_count: number
  subscribers_count: number
}

export async function getRepo({ owner, repo }: GithubRepoArgs, func?: FetchFunc<GithubRepoResponse>): Promise<GithubRepoResponse> {
  const url = `https://api.github.com/repos/${owner}/${repo}`
  return (func) ? func(url, reqInit) : (await fetchWithTimeout(url, reqInit)).json()
}

export interface LinkPreviewGithubRepo {
  name: string
  login: string
  avatar_url: string
  avatar_src: string
  updated_at: string
}

export async function getRepoForLinkPreview({ owner, repo }: GithubRepoArgs, func?: FetchFunc<GithubRepoResponse>): Promise<LinkPreviewGithubRepo> {
  const res = await getRepo({ owner, repo }, func)
  const { name, owner: { login, avatar_url }, updated_at } = res
  return {
    name,
    login,
    avatar_url,
    avatar_src: await saveImage(avatar_url, 'github-link-preview'),
    updated_at
  }
}

export interface GithubIssueArgs {
  owner: string
  repo: string
  number: string
}

export interface GithubIssueResponse {
  url: string
  repository_url: string
  labels_url: string
  comments_url: string
  events_url: string
  html_url: string
  id: number
  node_id: string
  number: number
  title: string
  user: {
    login: string
    id: number
    node_id: string
    avatar_url: string
    glavatar_id: string
    url: string
    html_url: string
    followers_url: string
    following_url: string
    gist_url: string
    starred_url: string
    subscriptions_url: string
    organizations_url: string
    repos_url: string
    events_url: string
    received_events_url: string
    type: string
    site_admin: boolean
  }
  labels: [
    {
      id: number
      node_id: string
      url: string
      name: string
      color: string
      default: boolean
      description: string
    }
  ]
  state: 'open' | 'closed'
  locked: boolean
  assignee: string
  assignees: string[]
  milestone: string
  comments: number
  created_at: string
  updated_at: string
  closed_at: string | null
  author_association: string
  active_lock_reason: string
  draft: boolean
  pull_request?: {
    url: string
    html_url: string
    diff_url: string
    patch_url: string
    merged_at: string
  }
  body: string
  closed_by: {
    login: string
    id: number
    node_id: string
    avatar_url: string
    glavatar_id: string
    url: string
    html_url: string
    followers_url: string
    following_url: string
    gist_url: string
    starred_url: string
    subscriptions_url: string
    organizations_url: string
    repos_url: string
    events_url: string
    received_events_url: string
    type: string
    site_admin: boolean
  }
  reactions: {
    url: string
    total_count: number
    '+1': number
    '-1': number
    laugh: number
    hooray: number
    confused: number
    heart: number
    rocket: number
    eyes: number
  }
  timeline_url: string
  performed_via_github_app: string
  state_reason: string
}

export async function getIssue({ owner, repo, number }: GithubIssueArgs, func?: FetchFunc<GithubIssueResponse>): Promise<GithubIssueResponse> {
  const url = `https://api.github.com/repos/${owner}/${repo}/issues/${number}`
  return func ? func(url, reqInit) : (await fetchWithTimeout(url, reqInit)).json()
}

export interface LinkPreviewGithubIssue {
  title: string
  login: string
  avatar_url: string
  avatar_src: string
  created_at: string
  closed_at: string | null
  merged_at: string | null
  state: 'open' | 'closed' | 'merged'
  number: number
}

export async function getIssueForLinkPreview({ owner, repo, number }: GithubIssueArgs, func?: FetchFunc<GithubIssueResponse>): Promise<LinkPreviewGithubIssue> {
  const res = await getIssue({ owner, repo, number }, func)
  const n = res.number
  const { title, user: { login, avatar_url }, created_at, closed_at } = res
  return {
    title,
    login,
    avatar_url,
    avatar_src: await saveImage(avatar_url, 'github-link-preview'),
    created_at,
    closed_at,
    merged_at: res.pull_request ? res.pull_request.merged_at : null,
    state: res.pull_request && res.pull_request.merged_at ? 'merged' : res.state,
    number: n
  }
}
