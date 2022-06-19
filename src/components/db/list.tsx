import React from 'react'
//import { useSize } from 'react-use'
import {
  QueryDatabaseResponse,
} from '@notionhq/client/build/src/api-endpoints'
import {
  DBProperties,
  RichTextItemResponse,
  DateResponse,
  SelectPropertyResponse,
  RichText,
} from '../../types'

export const DBTitleField: React.FC<{ payload: Array<RichTextItemResponse> }> = ({ payload }) => {
  const title = payload.map(v => {
    const richtext = v as RichText
    return richtext.text.content
  }).join(',')
  /*
  const pxToRem = 36
  const words = (w) => Math.floor(w/pxToRem)
  const slice = (subject, w) => `${subject.slice(0, words(w) - 3)}...`
  const [sized, { width, height }] = useSize(
    ({ width }) => <div title={title}>{ title.length > words(width) ? slice(title, width) : title }</div>,
    { width: 240, height: 18 }
  )
  */

  return (
    <div className="title">
      {title}
      <style jsx>{`
        .title {
          white-space: nowrap;
          font-size: var(--fontSize-1);
          font-family: var(--fontFamily-sans);
          display: flex;
          max-width: 400px;
          overflow: hidden;
          margin-right: auto;
        }
      `}</style>
    </div>
  )
}

export const DBDateField: React.FC<{ payload: DateResponse | null }> = ({ payload }) => {
  return (
    <div className="date">
      {payload?.start}
      <style jsx>{`
        .date {
          white-space: nowrap;
          font-size: var(--fontSize-0);
          font-family: var(--fontFamily-sans);
          display: flex;
          align-items: center;
          margin-left: 14px;
          margin-right: 0px;
          min-width: 20px;
        }
      `}</style>
    </div>
  )
}

export const DBRichTextField: React.FC<{ payload: Array<RichTextItemResponse> }> = ({ payload }) => {
  return (
    <div>
      {payload}
    </div>
  )
}

export const DBMultiSelectField: React.FC<{ payload: Array<SelectPropertyResponse> }> = ({ payload }) => {
  return (
    <>
      <ul>
        {payload.map(f => (
          <li key={f.id} className={f.color}>
            {f.name}
          </li>
        ))}
      </ul>
      <style jsx>{`
        ul {
          list-style-type: none;
          display: flex;
          flex-shrink: 0;
          align-items: center;
          padding: 0;
          margin: 0;
          max-width: 300px;
          overflow: hidden;
          margin-left: 14px;
        }
        li {
          font-family: var(--fontFamily-sans);
          font-size: var(--fontSize-0);
          display: flex;
          align-items: center;
          flex-shrink: 0;
          min-width: 0px;
          border-radius: 3px;
          padding: var(--spacing-1);
          color: rgb(24, 51, 71);
          background: rgb(211, 229, 239) none repeat scroll 0% 0%;
          margin: 0px 6px 0px 0px;
          cursor: pointer;
        }
        .default {
          color: rgb(50, 48, 44);
          background: rgba(227, 226, 224, 0.5) none repeat scroll 0% 0%;
        }
        .purple {
          color: rgb(65, 36, 84);
          background: rgb(232, 222, 238) none repeat scroll 0% 0%;
        }
        .pink {
          color: rgb(76, 35, 55);
          background: rgb(245, 224, 233) none repeat scroll 0% 0%;
        }
        .yellow {
          color: rgb(64, 44, 27);
          background: rgb(253, 236, 200) none repeat scroll 0% 0%;
        }
        .blue {
          color: rgb(24, 51, 71);
          background: rgb(211, 229, 239) none repeat scroll 0% 0%;
        }
        .orange {
          color: rgb(73, 41, 14);
          background: rgb(250, 222, 201) none repeat scroll 0% 0%;
        }
        .brown {
          color: rgb(68, 42, 30);
          background: rgb(238, 224, 218) none repeat scroll 0% 0%;
        }
        .red {
          color: rgb(93, 23, 21);
          background: rgb(255, 226, 221) none repeat scroll 0% 0%;
        }
        .green {
          color: rgb(28, 56, 41);
          background: rgb(219, 237, 219) none repeat scroll 0% 0%;
        }
        .gray {
          color: rgb(50, 48, 44);
          background: rgb(227, 226, 224) none repeat scroll 0% 0%;
        }
      `}</style>
    </>
  )
}

export const DBUrlField: React.FC<{ payload: string | null }> = ({ payload }) => {
  if (payload === null) {
    return (<></>)
  }

  const regex = /https?:\/\/([0-9A-z.-]+)/
  const result = payload.match(regex)
  if (result === null) {
    return (<></>)
  }

  const domain = result[1]
  return (
    <div className="url">
      <a href={payload} rel={"noreferrer"} target={"_blank"}>
        <svg width="16" height="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" fill="currentColor">
          <path fill-rule="evenodd" clip-rule="evenodd" d="M4.4 3h3.085a3.4 3.4 0 0 1 3.4 3.4v.205A3.4 3.4 0 0 1 7.485 10H7V9h.485A2.4 2.4 0 0 0 9.88 6.61V6.4A2.4 2.4 0 0 0 7.49 4H4.4A2.4 2.4 0 0 0 2 6.4v.205A2.394 2.394 0 0 0 4 8.96v1a3.4 3.4 0 0 1-3-3.35V6.4A3.405 3.405 0 0 1 4.4 3zM12 7.04v-1a3.4 3.4 0 0 1 3 3.36v.205A3.405 3.405 0 0 1 11.605 13h-3.09A3.4 3.4 0 0 1 5.12 9.61V9.4A3.4 3.4 0 0 1 8.515 6H9v1h-.485A2.4 2.4 0 0 0 6.12 9.4v.205A2.4 2.4 0 0 0 8.515 12h3.09A2.4 2.4 0 0 0 14 9.61V9.4a2.394 2.394 0 0 0-2-2.36z"/>
        </svg>
        <span>
          {domain}
        </span>
      </a>
      <style jsx>{`
        .url {
          display: fles;
          white-space: nowrap;
          margin-left: 14px;
        }
        a {
          display: block;
          text-decoration: none;
          cursor: pointer;
          color: inherit;
          font-family: var(--fontFamily-sans);
        }
        a:hover {
          color: rgb(50, 48, 44);
          background: rgb(227, 226, 224) none repeat scroll 0% 0%;
        }
        svg {
          display: inline-block;
          width: 12px;
          height: 12px;
          margin-right: 4px;
          vertical-align: middle;
        }
        span {
          display: inline-block;
          font-size: var(--fontSize-0);
          line-height: 1.2;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          background-image: linear-gradient(to right, rgba(55, 53, 47, 0.16) 0%, rgba(55, 53, 47, 0.16) 100%);
          background-repeat: repeat-x;
          background-position: 0px 100%;
          background-size: 100% 1px;
        }
      `}</style>
    </div>
  )
}

export const DBCheckboxField: React.FC<{ payload: boolean }> = ({ payload }) => {
  return (
    <div>
      {payload}
    </div>
  )
}

export type DBFieldProps = {
  name: string
  properties: DBProperties
}

export const DBField = ({ name, properties }: DBFieldProps) => {
  const data = properties[name]

  switch (data.type) {
    case 'title':
      return DBTitleField({ payload: data[data.type] })
      break

    case 'date':
      return DBDateField({ payload: data[data.type] })
      break

    case 'rich_text':
      return DBRichTextField({ payload: data[data.type] })
      break

    case 'multi_select':
      return DBMultiSelectField({ payload: data[data.type] })
      break

    case 'url':
      return DBUrlField({ payload: data[data.type] })
      break

    case 'checkbox':
      return DBCheckboxField({ payload: data[data.type] })
      break

    default:
      console.log('unsupport db field:', data)
      break
  }
}

export type DBListProps = {
  keys: string[]
  db: QueryDatabaseResponse
}

export const DBList: React.FC<DBListProps> = ({ keys, db }) => {
  return (
    <>
      {db.results.map((v) => (
        <div key={v.id} className="record">
          {keys.map((name, i) => (
            <div key={`${v.id}${name}`} className={`${name === 'spacer' ? 'spacer ' : ''}field${i}`}>
              {name === 'spacer' ? '' : DBField({ name, properties: v.properties as DBProperties })}
            </div>
          ))}
        </div>
      ))}
      <style jsx>{`
        .record {
          display: flex;
          margin: 4px 0;
          padding: 4px 0;
          user-select: none;
          transition: background 20ms ease-in 0s;
          width: 100%;
          display: flex;
          align-items: center;
          padding-right: 4px;
          justify-content: flex-start;
        }
        .spacer {
          width: 100%;
          flex-shrink: 2;
          display: block;
          margin-left: 14px;
          border-top: 1px dashed #999;
        }
      `}</style>
    </>
  )
}

export default DBList
