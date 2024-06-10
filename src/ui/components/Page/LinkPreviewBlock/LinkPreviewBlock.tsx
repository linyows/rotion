import React from 'react'
import { cdate } from 'cdate'
import { relative } from 'cdate-relative'
import { Icon } from '../../Icon'
import type { LinkPreviewBlockProps } from './LinkPreviewBlock.types'
import '../../tokens.css'
import './LinkPreviewBlock.css'
import '../../Icon/Icon.css'
import { LinkPreviewGithubIssue, LinkPreviewGithubRepo } from '../../../../exporter/github'

interface Props {
  url: string
}

interface GithubLinkPreviewProps extends Props {
  github?: {
    type: 'issue'
    issue: LinkPreviewGithubIssue
  } | {
    type: 'repo'
    repo: LinkPreviewGithubRepo
  }
}

const GithubLinkPreview = ({ url, github }: GithubLinkPreviewProps) => {
  if (github === undefined) {
    const match = url.match(/github\.com\/(\w+)\/(\w+)/)
    const user = match ? match[1] : ''
    const repo = match ? match[2] : ''
    return (
      <div className="rotion-linkpreview-area rotion-linkpreview-github">
        <div className="rotion-linkpreview-icon">
          <Icon name='github' width='32px' height='32px' />
        </div>
        <div>
          <span className="rotion-linkpreview-title">{user}/{repo}</span>
          <span className="rotion-linkpreview-desc">Repository in Github</span>
        </div>
      </div>
    )
  }

  const rdate = cdate().handler(relative).cdateFn()

  if (github.type === 'issue') {
    const { title, login, number, created_at, closed_at, merged_at, state, avatar_src } = github.issue
    const date = merged_at || (closed_at || created_at)
    const icon = state === 'merged' ? 'codemerge' : (state === 'closed' ? 'circlecheck' : 'circledot')
    const stateClass = `rotion-linkpreview-github-state-icon rotion-linkpreview-issue-${state}`
    return (
      <div className="rotion-linkpreview-area rotion-linkpreview-github">
        <div className="rotion-linkpreview-githubicon">
          <img className="rotion-linkpreview-githubicon-user" src={avatar_src} width='32px' height='32px' />
          <Icon className="rotion-linkpreview-githubicon-octocat" name='github' width='15px' height='15px' />
        </div>
        <div>
          <div className="rotion-linkpreview-title">
            <span className="rotion-linkpreview-github-title">
              {title}
            </span>
            <span className="rotion-linkpreview-github-state">
              <Icon className={stateClass} name={icon} width='14px' height='14px' />
              <span className="rotion-linkpreview-state">{state}</span>
            </span>
          </div>
          <div className="rotion-linkpreview-desc">
            <Icon className={stateClass} name={icon} width='12px' height='12px' /> #{number}
            <span className="rotion-linkpreview-dot">•</span>
            {login}
            <span className="rotion-linkpreview-dot">•</span>
            <span className="rotion-linkpreview-state">{state}</span>
            {' '}
            <span title={date}>{rdate(date).format('F')}</span>
          </div>
        </div>
      </div>
    )
  }

  if (github.type === 'repo') {
    const { avatar_src, name, login, updated_at } = github.repo
    return (
      <div className="rotion-linkpreview-area rotion-linkpreview-github">
        <div className="rotion-linkpreview-githubicon">
          <img className="rotion-linkpreview-githubicon-user" src={avatar_src} width='32px' height='32px' />
          <Icon className="rotion-linkpreview-githubicon-octocat" name='github' width='15px' height='15px' />
        </div>
        <div>
          <div className="rotion-linkpreview-title">
            <span className="rotion-linkpreview-github-title">
              {name}
            </span>
          </div>
          <div className="rotion-linkpreview-desc">
            {login}
            <span className="rotion-linkpreview-dot">•</span>
            <span title={updated_at}>Updated {rdate(updated_at).format('F')}</span>
          </div>
        </div>
      </div>
    )
  }
}

const Slack = ({ url }: Props) => {
  const domain = url.replace('https://', '').split('/')[0]
  return (
    <div className="rotion-linkpreview-area rotion-linkpreview-slack">
      <div className="rotion-linkpreview-icon">
        <Icon name='slack' width='32px' height='32px' />
      </div>
      <div>
        <span className="rotion-linkpreview-title">Message in Slack</span>
        <span className="rotion-linkpreview-desc">{domain}</span>
      </div>
    </div>
  )
}

const Figma = ({ url }: Props) => {
  const arrayUrl = url.split('/')
  const basename = arrayUrl[arrayUrl.length - 1]
  const title = basename.split('?')[0].replace('-', ' ')
  return (
    <div className="rotion-linkpreview-area rotion-linkpreview-figma">
      <div className="rotion-linkpreview-icon">
        <Icon name='figma' width='21px' height='32px' />
      </div>
      <div>
        <span className="rotion-linkpreview-title">{title}</span>
        <span className="rotion-linkpreview-desc">Assets in Figma</span>
      </div>
    </div>
  )
}

const LinkPreviewBlock = ({ block }: LinkPreviewBlockProps) => {
  if (!block.link_preview) {
    return <></>
  }
  const { link_preview } = block
  const { url } = link_preview

  if (url.includes('figma.com') && link_preview.figma) {
    return (
      <div className="rotion-linkpreview-figma" dangerouslySetInnerHTML={{ __html: link_preview.figma?.html }} />
    )
  }

  return (
    <div className="rotion-linkpreview">
      <a className="rotion-linkpreview-link" href={url} rel="noreferrer" target="_blank">
        {url.includes('github.com') && <GithubLinkPreview url={url} github={link_preview.github} />}
        {url.includes('slack.com') && <Slack url={url} />}
        {url.includes('figma.com') && <Figma url={url} />}
        {!url.includes('github.com') && !url.includes('slack.com') && !url.includes('figma.com') && `${url}`}
      </a>
    </div>
  )
}

export default LinkPreviewBlock
