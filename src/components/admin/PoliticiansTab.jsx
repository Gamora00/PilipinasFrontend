import React from 'react'
import { Link } from 'react-router-dom'

export const STATUS_OPTIONS = ['Published', 'Under Review', 'Flagged', 'Archived']

export const STATUS_COLOR = {
  Published: '#0E7A4B',
  'Under Review': '#A8820B',
  Flagged: '#CE1126',
  Archived: '#9AA2AF',
}

function PoliticiansTab({ politicians, statuses, onStatusChange }) {
  return (
    <div>
      <div className="admin-toolbar">
        <p className="admin-toolbar__note">
          {politicians.length} officials. Set the publication status for each profile.
        </p>
        <Link to="/admin/register" className="btn btn--primary btn--sm">+ Register a candidate</Link>
      </div>

      <div className="admin-table pol-table">
        <div className="admin-table__head">
          <span>Official</span>
          <span>Region</span>
          <span>Status</span>
          <span className="admin-table__right">Profile</span>
        </div>
        {politicians.map((p) => {
          const status = statuses[p.slug] || 'Published'
          return (
            <div className="admin-table__row" key={p.slug}>
              <div className="pol-cell">
                <span className="pol-cell__avatar">{p.name.charAt(0)}</span>
                <div style={{ minWidth: 0 }}>
                  <div className="pol-cell__name">{p.name}</div>
                  <div className="pol-cell__role">{p.role}</div>
                </div>
              </div>
              <span className="cell-muted">{p.region}</span>
              <div className="pol-status">
                <span className="pol-status__dot" style={{ background: STATUS_COLOR[status] }} />
                <select
                  className="pol-status__select"
                  value={status}
                  onChange={(e) => onStatusChange(p.slug, e.target.value)}
                >
                  {STATUS_OPTIONS.map((s) => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>
              <span className="admin-table__right">
                <Link to={`/profile/${p.slug}`} className="cell-link">View ↗</Link>
              </span>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default PoliticiansTab
