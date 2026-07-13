import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import '../style/auth.css'

const EMPTY = { fullName: '', email: '', username: '', password: '', confirm: '' }

function AdminSignup() {
  const navigate = useNavigate()
  const [f, setF] = useState(EMPTY)
  const [error, setError] = useState('')
  const [submitting, setSubmitting] = useState(false)

  const set = (key) => (e) => setF((prev) => ({ ...prev, [key]: e.target.value }))

  const submit = async (e) => {
    e.preventDefault()
    setError('')
    if (f.password.length < 8) return setError('Password must be at least 8 characters.')
    if (f.password !== f.confirm) return setError('Passwords do not match.')

    setSubmitting(true)
    try {
      const res = await fetch('http://localhost:5000/api/admin/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName: f.fullName,
          email: f.email,
          username: f.username,
          password: f.password,
        }),
      })
      const data = await res.json().catch(() => ({}))
      if (!res.ok) throw new Error(data.error || 'Registration failed.')
      navigate('/admin')
    } catch (err) {
      setError(
        err.message === 'Failed to fetch'
          ? 'Cannot reach the server. Is the backend running on port 5000?'
          : err.message,
      )
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="auth">
      <div className="auth__card">
        <Link to="/" className="brand auth__brand">
          <span className="brand__mark"><span className="brand__dot" /></span>
          <span className="brand__name">pili<span>Pilinas</span></span>
        </Link>
        <div className="auth__tag">Admin Console</div>
        <h1 className="auth__title">Create an admin account</h1>
        <p className="auth__subtitle">Register to manage candidates and platform data.</p>

        <form onSubmit={submit} className="auth__form">
          <label className="auth__field">
            <span>Full name</span>
            <input value={f.fullName} onChange={set('fullName')} placeholder="e.g. Juan Dela Cruz" />
          </label>
          <label className="auth__field">
            <span>Email</span>
            <input type="email" value={f.email} onChange={set('email')} placeholder="admin@email.com" />
          </label>
          <label className="auth__field">
            <span>Username</span>
            <input value={f.username} onChange={set('username')} placeholder="e.g. jdelacruz" />
          </label>
          <label className="auth__field">
            <span>Password</span>
            <input type="password" value={f.password} onChange={set('password')} placeholder="At least 8 characters" />
          </label>
          <label className="auth__field">
            <span>Confirm password</span>
            <input type="password" value={f.confirm} onChange={set('confirm')} placeholder="Re-enter password" />
          </label>

          {error && <p className="auth__error">{error}</p>}

          <button type="submit" className="btn btn--primary auth__submit" disabled={submitting}>
            {submitting ? 'Creating…' : 'Create account'}
          </button>
        </form>

        <p className="auth__foot">
          Already have an account? <Link to="/admin">Go to admin</Link>
        </p>
      </div>
    </div>
  )
}

export default AdminSignup
