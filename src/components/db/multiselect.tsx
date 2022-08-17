import React from 'react'
import Link from 'next/link'
import type {
  MultiSelectPropertyItemObjectResponse,
} from '../../types'

export type MultiSelectProps = {
  payload: MultiSelectPropertyItemObjectResponse
  path: string
}

export const DBMultiSelectField: React.FC<MultiSelectProps> = ({ payload, path }) => {
  return (
    <>
      <ul className="multiselect">
        {payload.multi_select.map(f => (
          <li key={f.id} className={`multiselect-li ${f.color}`}>
            <Link href={`${path}tags/${encodeURIComponent(f.name)}`}>
              <a className="tag-anchor">
                {f.name}
              </a>
            </Link>
          </li>
        ))}
      </ul>
      <style jsx>{`
        .multiselect {
          list-style-type: none;
          display: flex;
          flex-shrink: 0;
          align-items: center;
          padding: 0;
          margin: 0;
          max-width: 400px;
          overflow: hidden;
          margin-left: 14px;
          text-overflow: ellipsis;
        }
        .multiselect-li {
          font-size: .85rem;
          display: flex;
          align-items: center;
          flex-shrink: 0;
          min-width: 0px;
          border-radius: 3px;
          padding: 0;
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
        .tag-anchor {
          text-decoration: none;
          color: inherit;
          cursor: pointer;
          padding: 0 10px;
        }
      `}</style>
    </>
  )
}

export default DBMultiSelectField
