import React from 'react'

const FUNNEL = [
  { label: 'Started the quiz', val: '18,430', width: 100, color: '#0038A8' },
  { label: 'Reached Question 4', val: '14,720 · 80%', width: 80, color: '#3D6FCB' },
  { label: 'Completed all', val: '12,180 · 66%', width: 66, color: '#6E9BF0' },
  { label: 'Visited a profile', val: '8,940 · 49%', width: 49, color: '#FCD116' },
]

const SOURCES = [
  { label: 'Direct', pct: 42 },
  { label: 'Search', pct: 31 },
  { label: 'Social', pct: 19 },
  { label: 'Referral', pct: 8 },
]

const DEVICES = [
  { label: 'Mobile', val: '73%', flex: 73, variant: 'mobile' },
  { label: 'Desktop', val: '22%', flex: 22, variant: 'desktop' },
  { label: 'Tablet', val: '5%', flex: 12, variant: 'tablet' },
]

const ENGAGEMENT = [42, 50, 47, 60, 56, 68, 64, 75, 71, 84, 92, 100]

function AnalyticsTab() {
  return (
    <div className="admin-grid-2">
      <div className="admin-card">
        <h2 className="admin-card__title" style={{ marginBottom: 18 }}>Angkenator funnel</h2>
        <div className="funnel-list">
          {FUNNEL.map((f) => (
            <div key={f.label}>
              <div className="funnel-row__head">
                <span className="funnel-row__label">{f.label}</span>
                <span className="funnel-row__val">{f.val}</span>
              </div>
              <div className="funnel-row__bar" style={{ width: `${f.width}%`, background: f.color }} />
            </div>
          ))}
        </div>
      </div>

      <div className="admin-card">
        <h2 className="admin-card__title" style={{ marginBottom: 18 }}>Traffic sources</h2>
        <div className="meter-list">
          {SOURCES.map((s) => (
            <div className="meter-row" key={s.label}>
              <span className="meter-row__label meter-row__label--narrow">{s.label}</span>
              <div className="track"><div className="track__fill" style={{ width: `${s.pct}%` }} /></div>
              <span className="meter-row__pct" style={{ width: 38 }}>{s.pct}%</span>
            </div>
          ))}
        </div>

        <h2 className="admin-card__title" style={{ margin: '28px 0 16px' }}>Device</h2>
        <div className="device-row">
          {DEVICES.map((d) => (
            <div key={d.label} className={`device-box device-box--${d.variant}`} style={{ flex: d.flex }}>
              <div className="device-box__val">{d.val}</div>
              <div className="device-box__label">{d.label}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="admin-card span-2">
        <div className="admin-card__head">
          <h2 className="admin-card__title">Engagement (last 12 weeks)</h2>
          <span className="admin-card__note">Quiz completions per week</span>
        </div>
        <div className="bar-chart bar-chart--mini">
          {ENGAGEMENT.map((h, i) => (
            <div
              key={i}
              className={`bar${h === 100 ? ' bar--accent' : ''}`}
              style={{ height: `${h}%` }}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default AnalyticsTab
