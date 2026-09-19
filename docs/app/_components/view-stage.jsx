'use client'

import { useId } from 'react'
import { Calendar, Gallery, List, Page, Table } from 'rotion/ui'

// A page, then one database drawn by four components. Both were fetched
// from Notion when the site was built; switching tabs only changes which
// component draws them.
export const VIEWS = [
  {
    key: 'page',
    render: ({ blocks }) => <Page blocks={blocks} />,
    code: '<Page blocks={blocks} />'
  },
  {
    key: 'gallery',
    Component: Gallery,
    props: {
      keys: ['Name', 'Date', 'Tags'],
      options: { image: { preview: 'cover', size: 'medium' } }
    },
    code: "<Gallery db={db} keys={['Name', 'Date', 'Tags']} />"
  },
  {
    key: 'table',
    Component: Table,
    props: { keys: ['Name', 'Date', 'Tags', 'Url', 'Note'] },
    code: "<Table db={db} keys={['Name', 'Date', 'Tags', 'Url', 'Note']} />"
  },
  {
    key: 'list',
    Component: List,
    props: { keys: ['Name', 'spacer', 'Tags', 'Date'] },
    code: "<List db={db} keys={['Name', 'spacer', 'Tags', 'Date']} />"
  },
  {
    key: 'calendar',
    Component: Calendar,
    props: {
      keys: ['Name', 'Tags'],
      date: 'Date',
      options: { initialDate: '2022-08' }
    },
    code: "<Calendar db={db} date=\"Date\" keys={['Name', 'Tags']} />"
  }
]

// Every view but the page draws the database.
for (const view of VIEWS) {
  view.render ??= ({ db }) => <view.Component db={db} {...view.props} />
}

// The window itself. Which view it shows is decided by whoever holds it: the
// hero turns it along with the word it is typing, and a reader turns it with
// the tabs.
export const StageWindow = ({ current, onSelect, blocks, db, labels, ...rest }) => {
  const id = useId()
  const view = VIEWS[current]

  return (
    <div className="lp-stage-window" {...rest}>
      <div className="lp-stage-bar" role="tablist" aria-label={labels.tablist}>
        {VIEWS.map((v, i) => (
          <button
            key={v.key}
            type="button"
            role="tab"
            id={`${id}-tab-${v.key}`}
            aria-controls={`${id}-panel`}
            aria-selected={i === current}
            tabIndex={i === current ? 0 : -1}
            className="lp-stage-tab"
            onClick={() => onSelect(i)}
            onKeyDown={e => {
              const step = { ArrowRight: 1, ArrowLeft: -1 }[e.key]
              if (!step) return
              const next = (current + step + VIEWS.length) % VIEWS.length
              onSelect(next)
              document.getElementById(`${id}-tab-${VIEWS[next].key}`)?.focus()
            }}
          >
            {labels[v.key]}
          </button>
        ))}
      </div>
      <div
        className="lp-stage-panel"
        id={`${id}-panel`}
        role="tabpanel"
        aria-labelledby={`${id}-tab-${view.key}`}
        data-view={view.key}
        key={view.key}
      >
        {view.render({ blocks, db })}
      </div>
      <pre className="lp-stage-code">
        <code>{view.code}</code>
      </pre>
    </div>
  )
}
