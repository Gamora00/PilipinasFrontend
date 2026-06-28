import React from 'react'

const TYPES = ['Traffic Summary', 'Quiz Analytics', 'Politician Engagement', 'SALN Audit']
const RANGES = ['Last 7 days', 'Last 30 days', 'Last 90 days', 'Full year']

const ROWS = [
  { name: 'Traffic – June 2026', type: 'Traffic Summary', range: 'Jun 1 – 26', status: 'Ready' },
  { name: 'Quiz Analytics Q2', type: 'Quiz Analytics', range: 'Apr – Jun', status: 'Ready' },
  { name: 'Official Engagement', type: 'Politician Eng.', range: 'Last 90 days', status: 'Ready' },
  { name: 'SALN Audit 2026', type: 'SALN Audit', range: '2024 – 2026', status: 'Processing' },
  { name: 'Traffic – May 2026', type: 'Traffic Summary', range: 'May 1 – 31', status: 'Ready' },
]

function ReportsTab() {
  return (
    <div>
      <div className="admin-card report-toolbar">
        <div>
          <h2 className="admin-card__title" style={{ marginBottom: 4 }}>Generate a new report</h2>
          <p className="admin-card__note" style={{ margin: 0 }}>Choose a type and date range.</p>
        </div>
        <div className="report-toolbar__controls">
          <select className="admin-select">
            {TYPES.map((t) => <option key={t}>{t}</option>)}
          </select>
          <select className="admin-select">
            {RANGES.map((r) => <option key={r}>{r}</option>)}
          </select>
          <button className="btn btn--primary btn--sm">Generate report</button>
        </div>
      </div>

      <div className="admin-table reports-table">
        <div className="admin-table__head">
          <span>Report</span>
          <span>Type</span>
          <span>Range</span>
          <span>Status</span>
          <span className="admin-table__right">Action</span>
        </div>
        {ROWS.map((r) => {
          const ready = r.status === 'Ready'
          return (
            <div className="admin-table__row" key={r.name}>
              <span className="cell-strong">{r.name}</span>
              <span className="cell-muted">{r.type}</span>
              <span className="cell-muted">{r.range}</span>
              <span>
                <span className={`badge ${ready ? 'badge--ready' : 'badge--processing'}`}>{r.status}</span>
              </span>
              <span className="admin-table__right">
                {ready
                  ? <a href="#" className="cell-link">Download</a>
                  : <span className="cell-link--disabled">Download</span>}
              </span>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default ReportsTab
