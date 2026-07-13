import React from 'react'

const STATS = [
  { value: '12,400', accent: '+', label: 'Politicians tracked' },
  { value: '85M', accent: '+', label: 'Filipino voters' },
  { value: '100', accent: '%', label: 'Public records' },
  { value: 'Daily', accent: '', label: 'Updated' },
]

function StatsBand() {
  return (
    <section className="stats-band">
      <div className="stats-band__inner">
        {STATS.map((stat) => (
          <div key={stat.label} className="stats-band__item">
            <div className="stats-band__value">
              {stat.value}
              <span>{stat.accent}</span>
            </div>
            <div className="stats-band__label">{stat.label}</div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default StatsBand
