import React, { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import Sidebar from '../components/admin/Sidebar'
import DashboardTab from '../components/admin/DashboardTab'
import AnalyticsTab from '../components/admin/AnalyticsTab'
import ReportsTab from '../components/admin/ReportsTab'
import QuestionsTab from '../components/admin/QuestionsTab'
import PoliticiansTab from '../components/admin/PoliticiansTab'
import { politicians } from '../data/politicians'
import '../style/admin.css'

const STATUS_KEY = 'pp_admin_status'

const PAGE_META = {
  dashboard: ['Dashboard', 'Platform performance overview'],
  analytics: ['Analytics', 'In-depth usage data'],
  reports: ['Reports', 'Generate and download reports'],
  questions: ['Angkenator Questions', 'Edit, add, or remove questions'],
  politicians: ['Politicians', "Manage each profile's status"],
}

function loadStatuses() {
  try {
    const saved = localStorage.getItem(STATUS_KEY)
    if (saved) return JSON.parse(saved)
  } catch (e) { /* ignore */ }
  return {}
}

function Admin() {
  const [tab, setTab] = useState('dashboard')
  const [statuses, setStatuses] = useState(loadStatuses)

  useEffect(() => {
    try { localStorage.setItem(STATUS_KEY, JSON.stringify(statuses)) } catch (e) { /* ignore */ }
  }, [statuses])

  const setStatus = (slug, value) =>
    setStatuses((prev) => ({ ...prev, [slug]: value }))

  const activeCount = useMemo(
    () => politicians.filter((p) => (statuses[p.slug] || 'Published') === 'Published').length,
    [statuses],
  )

  const [title, subtitle] = PAGE_META[tab]

  return (
    <div className="admin">
      <Sidebar tab={tab} onSelect={setTab} />

      <div className="admin-main">
        <header className="admin-topbar">
          <div>
            <h1 className="admin-topbar__title">{title}</h1>
            <p className="admin-topbar__subtitle">{subtitle}</p>
          </div>
          <div className="admin-topbar__actions">
            <span className="admin-topbar__update">Last updated: June 26, 2026</span>
            <Link to="/" className="admin-topbar__view">View site ↗</Link>
          </div>
        </header>

        <main className="admin-content">
          {tab === 'dashboard' && (
            <DashboardTab activeCount={activeCount} totalCount={politicians.length} />
          )}
          {tab === 'analytics' && <AnalyticsTab />}
          {tab === 'reports' && <ReportsTab />}
          {tab === 'questions' && <QuestionsTab />}
          {tab === 'politicians' && (
            <PoliticiansTab
              politicians={politicians}
              statuses={statuses}
              onStatusChange={setStatus}
            />
          )}
        </main>
      </div>
    </div>
  )
}

export default Admin
