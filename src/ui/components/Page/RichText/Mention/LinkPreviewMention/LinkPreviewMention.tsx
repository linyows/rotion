import React from 'react'
import { pathBasename } from '../../../../lib'
import PageIcon from '../../../PageIcon/PageIcon'
import type { LinkPreviewMemtionProps } from './LinkPreviewMention.types'
import Stylex from '@stylexjs/stylex'
import { tokens, link } from '../../../../tokens.stylex'

const styles = Stylex.create({
  wrapper: {
    fontFamily: tokens.fontFamily,
    color: link.color,
    backgroundColor: {
      default: link.backgroundColor,
      ':hover': link.backgroundColorHover,
    },
    padding: '.1rem .2rem',
    borderRadius: tokens.borderRadius,
    lineHeight: 1,
    textDecoration: link.textDecoration,
  },
  icon: {
    verticalAlign: 'middle',
    paddingRight: '.3rem',
  },
  text: {
    borderBottom: {
      default: link.borderBottom,
      ':hover': link.borderBottomHover,
    },
  }
})

const LinkPreviewMention = ({ url, text }: LinkPreviewMemtionProps) => {
  if (url.includes('slack.com')) {
    return (
      <a className={`rotion-mention-linkpreview ${Stylex(styles.wrapper)}`} href={url} rel="noreferrer" target="_blank">
        <PageIcon name='slack' className={Stylex(styles.icon)} width='17px' height='17px' />
        <span className={`rotion-mention-linkprevew-text ${Stylex(styles.text)}`}>
          Message in Slack
        </span>
      </a>
    )
  }

  if (url.includes('figma.com')) {
    return (
      <a className={`rotion-mention-linkpreview ${Stylex(styles.wrapper)}`} href={url} rel="noreferrer" target="_blank">
        <PageIcon name='figma' className={Stylex(styles.icon)} width='10px' height='16px' />
        <span className={`rotion-mention-linkprevew-text ${Stylex(styles.text)}`}>
          {pathBasename(text).replace(/-/g, ' ')}
        </span>
      </a>
    )
  }

  return (
    <a className={`rotion-mention-linkpreview ${Stylex(styles.wrapper)}`} href={url} rel="noreferrer" target="_blank">
      {url.includes('github.com') && <PageIcon name='github' className={Stylex(styles.icon)} width='17px' height='17px' />}
      <span className={`rotion-mention-linkprevew-text ${Stylex(styles.text)}`}>
        {pathBasename(text)}
      </span>
    </a>
  )
}

export default LinkPreviewMention
