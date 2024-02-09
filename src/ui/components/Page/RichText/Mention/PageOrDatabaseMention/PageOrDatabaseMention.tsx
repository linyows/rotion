import React from 'react'
import PageIcon from '../../../PageIcon/PageIcon'
import type { PageOrDatabaseMentionProps } from './PageOrDatabaseMention.types'
import Stylex from '@stylexjs/stylex'
import { tokens } from '../../../../tokens.stylex'

const styles = Stylex.create({
  wrapper: {
    fontFamily: tokens.fontFamily,
  },
  icon: {
    position: 'relative',
    marginRight: '.5rem',
    display: 'inline-block',
    whiteSpace: 'nowrap',
  },
  img: {
    width: '1.4rem',
    height: '1.4rem',
    verticalAlign: 'bottom',
  },
  arrow: {
    width: '.7em',
    height: '.7em',
    display: 'block',
    fill: 'rgba(55, 53, 47, 1)',
    flexShrink: 0,
    position: 'absolute',
    right: '-0.1em',
    bottom: '-0.2em',
  },
  text: {
  },
})

const PageOrDatabaseMention = ({ mention }: PageOrDatabaseMentionProps) => {
  return (
    <span className={`rotion-mention-page ${Stylex(styles.wrapper)}`}>
      <span className={`rotion-mention-page-icon ${Stylex(styles.icon)}`}>
        {mention.icon.type === 'emoji' && mention.icon.emoji}
        {mention.icon.type !== 'emoji' && <img src={mention.icon.src} className={`rotion-mention-page-icon-img ${Stylex(styles.img)}`} alt='icon' />}
        <PageIcon name='link' className={`rotion-mention-page-arrow ${Stylex(styles.arrow)}`} />
      </span>
      <span className={`rotion-mention-page-title ${Stylex(styles.text)}`}>
        {mention.name}
      </span>
    </span>
  )
}

export default PageOrDatabaseMention
