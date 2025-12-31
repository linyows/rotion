import { Icon } from '../../../Icon/index.js'
import { pathBasename } from '../../../lib.js'
import type { LinkPreviewMemtionProps } from './LinkPreviewMention.types'
import './LinkPreviewMention.css'

const LinkPreviewMention = ({ url, text }: LinkPreviewMemtionProps) => {
  if (url.includes('slack.com')) {
    return (
      <a className="rotion-richtext-linkpreview" href={url} rel="noreferrer" target="_blank">
        <Icon name="slack" className="rotion-richtext-linkpreview-icon" width="17px" height="17px" />
        <span className="rotion-richtext-linkprevew-text">Message in Slack</span>
      </a>
    )
  }

  if (url.includes('figma.com')) {
    return (
      <a className="rotion-richtext-linkpreview" href={url} rel="noreferrer" target="_blank">
        <Icon name="figma" className="rotion-richtext-linkpreview-icon" width="10px" height="16px" />
        <span className="rotion-richtext-linkprevew-text">{pathBasename(text).replace(/-/g, ' ')}</span>
      </a>
    )
  }

  return (
    <a className="rotion-richtext-linkpreview" href={url} rel="noreferrer" target="_blank">
      {url.includes('github.com') && (
        <Icon name="github" className="rotion-richtext-linkpreview-icon" width="17px" height="17px" />
      )}
      <span className="rotion-richtext-linkprevew-text">{pathBasename(text)}</span>
    </a>
  )
}

export default LinkPreviewMention
