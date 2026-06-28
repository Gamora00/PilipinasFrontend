import React from 'react'
import { Link } from 'react-router-dom'

function Stat({ value, label }) {
  return (
    <div className="official-card__stat">
      <div className="official-card__stat-value">{value}</div>
      <div className="official-card__stat-label">{label}</div>
    </div>
  )
}

function OfficialCard({ official }) {
  return (
    <Link to={`/profile/${official.slug}`} className="official-card">
      <div className="official-card__photo">
        <span>official photo</span>
      </div>
      <span className="official-card__role">{official.role}</span>
      <h3 className="official-card__name">{official.name}</h3>
      <p className="official-card__meta">
        {official.party} · {official.region}
      </p>
      <div className="official-card__stats">
        <Stat value={official.attendance} label="Attendance" />
        <Stat value={official.bills} label="Bills filed" />
        <Stat value={official.promises} label="Promises kept" />
      </div>
    </Link>
  )
}

export default OfficialCard
