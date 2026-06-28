import React from 'react'

const STATS = [
  { value: '12,400', accent: '+', label: 'Politiko na-track' },
  { value: '85M', accent: '+', label: 'Botanteng Pilipino' },
  { value: '100', accent: '%', label: 'Public records' },
  { value: 'Daily', accent: '', label: 'Na-uupdate' },
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
