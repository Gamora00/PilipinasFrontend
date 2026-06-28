import React from 'react'

const TRAFFIC = [
  { day: 'Mon', height: 58 },
  { day: 'Tue', height: 72 },
  { day: 'Wed', height: 54 },
  { day: 'Thu', height: 86 },
  { day: 'Fri', height: 100, accent: true },
  { day: 'Sat', height: 78 },
  { day: 'Sun', height: 67 },
]

const TOP_SEARCHED = [
  { name: 'Maria S. Delgado', count: '14,820' },
  { name: 'Anna V. Lim', count: '11,340' },
  { name: 'Joselito P. Reyes', count: '9,210' },
  { name: 'Grace L. Mendoza', count: '7,650' },
  { name: 'Benigno R. Castro', count: '5,980' },
]

const ISSUES = [
  { label: 'Economy', pct: 78 },
  { label: 'Education', pct: 71 },
  { label: 'Health', pct: 64 },
  { label: 'Transportation', pct: 52 },
  { label: 'Environment', pct: 47 },
  { label: 'Rights', pct: 39 },
]

function DashboardTab({ activeCount, totalCount }) {
  const kpis = [
    { label: 'Total visits', value: '248,910', delta: '▲ 12.4% vs. last month' },
    { label: 'Completed quizzes', value: '18,430', delta: '▲ 8.1% vs. last month' },
    { label: 'Profile views', value: '96,200', delta: '▲ 15.0% vs. last month' },
    { label: 'Active officials', value: String(activeCount), delta: `of ${totalCount} total`, muted: true },
  ]

  return (
    <div>
      <div className="kpi-grid">
        {kpis.map((k) => (
          <div className="kpi" key={k.label}>
            <div className="kpi__label">{k.label}</div>
            <div className="kpi__value">{k.value}</div>
            <div className={`kpi__delta${k.muted ? ' kpi__delta--muted' : ''}`}>{k.delta}</div>
          </div>
        ))}
      </div>

      <div className="admin-grid-main">
        <div className="admin-card">
          <div className="admin-card__head">
            <h2 className="admin-card__title">Weekly traffic</h2>
            <span className="admin-card__note">Visitors per day</span>
          </div>
          <div className="bar-chart">
            {TRAFFIC.map((d) => (
              <div className="bar-col" key={d.day}>
                <div className={`bar${d.accent ? ' bar--accent' : ''}`} style={{ height: `${d.height}%` }} />
                <span className={`bar-col__label${d.accent ? ' bar-col__label--accent' : ''}`}>{d.day}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="admin-card">
          <h2 className="admin-card__title" style={{ marginBottom: 18 }}>Most searched</h2>
          <div>
            {TOP_SEARCHED.map((r) => (
              <div className="rank-row" key={r.name}>
                <span className="rank-row__name">{r.name}</span>
                <span className="rank-row__val">{r.count}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="admin-card">
        <h2 className="admin-card__title" style={{ marginBottom: 4 }}>Most valued issues</h2>
        <p className="admin-card__note" style={{ display: 'block', margin: '0 0 20px' }}>
          Based on Angkenator quiz answers.
        </p>
        <div className="meter-list">
          {ISSUES.map((it) => (
            <div className="meter-row" key={it.label}>
              <span className="meter-row__label meter-row__label--wide">{it.label}</span>
              <div className="track"><div className="track__fill" style={{ width: `${it.pct}%` }} /></div>
              <span className="meter-row__pct" style={{ width: 42 }}>{it.pct}%</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default DashboardTab
