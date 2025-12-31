import type { LinkedTitleProps } from './LinkedTitle.types'
import './LinkedTitle.css'
import { RichText } from '../../RichText/index.js'

const LinkedTitle = ({ textObjects, options }: LinkedTitleProps) => {
  const className = () => {
    return `rotion-list-title-wrapper ${options?.pathname ? 'rotion-list-title-link' : ''}`
  }

  if (options?.link && options?.pathname && options?.query) {
    const Link = options.link
    return (
      <Link className={className()} href={{ pathname: options.pathname, query: options.query }}>
        {textObjects.map((t, i) => (
          <RichText key={`richtext-${i}`} textObject={t} />
        ))}
      </Link>
    )
  } else if (options?.link && options?.pathname) {
    const Link = options.link
    return (
      <Link className={className()} href={options.pathname}>
        {textObjects.map((t, i) => (
          <RichText key={`richtext-${i}`} textObject={t} />
        ))}
      </Link>
    )
  } else if (options?.pathname) {
    return (
      <a className={className()} href={options.pathname}>
        {textObjects.map((t, i) => (
          <RichText key={`richtext-${i}`} textObject={t} />
        ))}
      </a>
    )
  }

  return (
    <span className={className()}>
      {textObjects.map((t, i) => (
        <RichText key={`richtext-${i}`} textObject={t} />
      ))}
    </span>
  )
}

export default LinkedTitle
