import React from 'react'
import { Link, useParams } from 'react-router-dom'
import { getPolitician } from '../data/politicians'
import '../style/profile.css'

function Stat({ value, label }) {
  return (
    <div className="profile-stat">
      <div className="profile-stat__value">{value}</div>
      <div className="profile-stat__label">{label}</div>
    </div>
  )
}

function Profile() {
  const { slug } = useParams()
  const official = getPolitician(slug)

  if (!official) {
    return (
      <div className="profile">
        <header className="profile-header">
          <div className="profile-header__inner">
            <Link to="/" className="brand">
              <span className="brand__mark"><span className="brand__dot" /></span>
              <span className="brand__name">pili<span>Pilinas</span></span>
            </Link>
            <Link to="/" className="profile-header__back">← Back to home</Link>
          </div>
        </header>
        <div className="profile-missing">
          <h1>Official not found.</h1>
          <p>The link may be incorrect, or this profile has been removed.</p>
          <Link to="/" className="btn btn--primary">Back to home</Link>
        </div>
      </div>
    )
  }

  return (
    <div className="profile">
      <header className="profile-header">
        <div className="profile-header__inner">
          <Link to="/" className="brand">
            <span className="brand__mark"><span className="brand__dot" /></span>
            <span className="brand__name">pili<span>Pilinas</span></span>
          </Link>
          <Link to="/" className="profile-header__back">← Back to home</Link>
        </div>
      </header>

      <div className="profile__shell">
        <div className="profile-hero">
          <div className="profile-hero__photo">
            <span>official photo</span>
          </div>
          <div className="profile-hero__body">
            <span className="profile-hero__role">{official.role}</span>
            <h1 className="profile-hero__name">{official.name}</h1>
            <p className="profile-hero__meta">{official.party} · {official.region}</p>
          </div>
        </div>

        <div className="profile-stats">
          <Stat value={official.attendance} label="Attendance" />
          <Stat value={official.bills} label="Bills filed" />
          <Stat value={official.promises} label="Promises kept" />
        </div>

        <div className="profile-note">
          <p>
            Detailed voting records, SALN, and promise tracker for{' '}
            <strong>{official.name}</strong> are coming soon.
          </p>
        </div>
      </div>
    </div>
  )
}

export default Profile
