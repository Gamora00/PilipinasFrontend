import React from 'react'
import { Link } from 'react-router-dom'

const icon = (paths) => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    {paths}
  </svg>
)

const NAV_ITEMS = [
  {
    key: 'dashboard',
    label: 'Dashboard',
    icon: icon(<><rect x="3" y="3" width="7" height="9" /><rect x="14" y="3" width="7" height="5" /><rect x="14" y="12" width="7" height="9" /><rect x="3" y="16" width="7" height="5" /></>),
  },
  {
    key: 'analytics',
    label: 'Analytics',
    icon: icon(<><line x1="18" y1="20" x2="18" y2="10" /><line x1="12" y1="20" x2="12" y2="4" /><line x1="6" y1="20" x2="6" y2="14" /></>),
  },
  {
    key: 'reports',
    label: 'Reports',
    icon: icon(<><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /><line x1="16" y1="13" x2="8" y2="13" /><line x1="16" y1="17" x2="8" y2="17" /></>),
  },
  {
    key: 'questions',
    label: 'Questions',
    icon: icon(<><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" /><line x1="12" y1="17" x2="12.01" y2="17" /><circle cx="12" cy="12" r="10" /></>),
  },
  {
    key: 'politicians',
    label: 'Politicians',
    icon: icon(<><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /></>),
  },
]

function Sidebar({ tab, onSelect }) {
  return (
    <aside className="admin-sidebar">
      <div className="admin-sidebar__head">
        <Link to="/" className="brand brand--light">
          <span className="brand__mark brand__mark--sm"><span className="brand__dot" /></span>
          <span className="brand__name">pili<span>Pilinas</span></span>
        </Link>
        <div className="admin-sidebar__tag">Admin Console</div>
      </div>

      <nav className="admin-nav">
        {NAV_ITEMS.map((item) => (
          <button
            key={item.key}
            className={`admin-nav__item${tab === item.key ? ' is-active' : ''}`}
            onClick={() => onSelect(item.key)}
          >
            {item.icon}
            {item.label}
          </button>
        ))}
      </nav>

      <div className="admin-sidebar__user">
        <span className="admin-sidebar__avatar">JD</span>
        <div style={{ minWidth: 0 }}>
          <div className="admin-sidebar__name">Juan Dela Cruz</div>
          <div className="admin-sidebar__role">Super Admin</div>
        </div>
      </div>
    </aside>
  )
}

export default Sidebar
