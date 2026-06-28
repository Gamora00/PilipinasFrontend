import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import '../style/register.css'

const STEP_LABELS = ['Personal', 'Candidacy', 'Issues', 'Documents', 'Review']
const TOTAL_STEPS = STEP_LABELS.length

const ISSUES = [
  { id: 'wage',      issue: 'Economy',        text: 'Raise the minimum wage' },
  { id: 'college',   issue: 'Education',      text: 'Free college for all' },
  { id: 'mining',    issue: 'Environment',    text: 'Pause new mining' },
  { id: 'transport', issue: 'Transportation', text: 'Prioritize public transport' },
  { id: 'health',    issue: 'Health',         text: 'More funding for public hospitals' },
  { id: 'divorce',   issue: 'Rights',         text: 'Legalize divorce' },
]

const UPLOADS = [
  { id: 'coc',   label: 'Certificate of Candidacy (COC)', sub: 'Filed with COMELEC — required' },
  { id: 'id',    label: 'Government ID', sub: "Driver's license, passport, or PRC ID" },
  { id: 'photo', label: 'Official campaign photo', sub: 'Hi-res, formal shot' },
]

const EMPTY_FORM = {
  name: '', email: '', phone: '', party: '',
  role: '', region: '', electionYear: '', ballotNumber: '', platform: '', consent: false,
}

/* ---------------- Sub-components ---------------- */

function Stepper({ step }) {
  return (
    <div className="stepper">
      {STEP_LABELS.map((label, i) => {
        const n = i + 1
        const done = step > n
        const active = step === n
        const badgeClass = done
          ? 'stepper__badge stepper__badge--done'
          : active
          ? 'stepper__badge stepper__badge--active'
          : 'stepper__badge'
        return (
          <div key={label} className="stepper__item">
            <span className={badgeClass}>{done ? '✓' : n}</span>
            <span className={`stepper__label${active || done ? ' stepper__label--on' : ''}`}>
              {label}
            </span>
          </div>
        )
      })}
    </div>
  )
}

function Field({ label, value, onChange, placeholder, type = 'text' }) {
  return (
    <label className="field">
      <span className="field__label">{label}</span>
      <input
        className="field__control"
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
      />
    </label>
  )
}

function StepPersonal({ f, set }) {
  return (
    <div>
      <h2 className="step__title">Personal information</h2>
      <div className="field-grid">
        <Field label="Full name *" value={f.name} onChange={set('name')} placeholder="e.g. Maria S. Delgado" />
        <Field label="Email *" type="email" value={f.email} onChange={set('email')} placeholder="office@email.gov.ph" />
        <Field label="Phone number" value={f.phone} onChange={set('phone')} placeholder="(02) 8XXX-XXXX" />
        <Field label="Party" value={f.party} onChange={set('party')} placeholder="e.g. Independent" />
      </div>
    </div>
  )
}

function StepCandidacy({ f, set }) {
  return (
    <div>
      <h2 className="step__title step__title--tight">Candidacy details</h2>
      <p className="step__hint">Tell voters what you are running for in the upcoming election.</p>
      <div className="field-grid">
        <label className="field">
          <span className="field__label">Position you're seeking *</span>
          <select className="field__select" value={f.role} onChange={set('role')}>
            <option value="">Select a position…</option>
            <option value="President">President</option>
            <option value="Vice President">Vice President</option>
            <option value="Senator">Senator</option>
            <option value="Congressman">Congressman / Congresswoman</option>
            <option value="Governor">Governor</option>
            <option value="Mayor">Mayor</option>
            <option value="Councilor">Councilor</option>
            <option value="Barangay Captain">Barangay Captain</option>
          </select>
        </label>
        <Field label="Region / District *" value={f.region} onChange={set('region')} placeholder="e.g. Cebu City" />
        <Field label="Election year *" value={f.electionYear} onChange={set('electionYear')} placeholder="e.g. 2028" />
        <Field label="Ballot / Candidate number" value={f.ballotNumber} onChange={set('ballotNumber')} placeholder="e.g. 12" />
      </div>
      <label className="field field--full">
        <span className="field__label">Platform &amp; agenda</span>
        <textarea
          className="field__textarea"
          rows={4}
          value={f.platform}
          onChange={set('platform')}
          placeholder="Describe your campaign platform, priorities, and what you'll fight for if elected…"
        />
      </label>
    </div>
  )
}

function StepIssues({ stances, setStance }) {
  return (
    <div>
      <h2 className="step__title step__title--tight">Stance on issues</h2>
      <p className="step__hint">Set your official stance. This is used for Angkenator matching.</p>
      <div className="stance-list">
        {ISSUES.map((it) => {
          const v = stances[it.id]
          return (
            <div key={it.id} className="stance-row">
              <div style={{ minWidth: 0 }}>
                <div className="stance-row__issue">{it.issue}</div>
                <div className="stance-row__text">{it.text}</div>
              </div>
              <div className="stance-row__actions">
                <button
                  className={`stance-btn stance-btn--agree${v === 'a' ? ' is-active' : ''}`}
                  onClick={() => setStance(it.id, 'a')}
                >
                  Agree
                </button>
                <button
                  className={`stance-btn stance-btn--neutral${v === 'n' ? ' is-active' : ''}`}
                  onClick={() => setStance(it.id, 'n')}
                >
                  Neutral
                </button>
                <button
                  className={`stance-btn stance-btn--disagree${v === 'd' ? ' is-active' : ''}`}
                  onClick={() => setStance(it.id, 'd')}
                >
                  Disagree
                </button>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

const CheckIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#0E7A4B" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <polyline points="20 6 9 17 4 12" />
  </svg>
)
const UploadIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#8A93A3" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
    <polyline points="17 8 12 3 7 8" />
    <line x1="12" y1="3" x2="12" y2="15" />
  </svg>
)

function StepDocuments({ uploads, addUpload, f, set }) {
  return (
    <div>
      <h2 className="step__title step__title--tight">Verification &amp; documents</h2>
      <p className="step__hint">Upload documents for verification. These will not be shown to the public.</p>
      <div className="upload-list">
        {UPLOADS.map((u) => {
          const done = !!uploads[u.id]
          return (
            <div
              key={u.id}
              className={`upload-row${done ? ' is-done' : ''}`}
              onClick={() => addUpload(u.id)}
            >
              <span className="upload-row__icon">{done ? <CheckIcon /> : <UploadIcon />}</span>
              <div className="upload-row__body">
                <div className="upload-row__label">{u.label}</div>
                <div className="upload-row__sub">
                  {done ? `Uploaded · ${uploads[u.id]}` : u.sub}
                </div>
              </div>
              <span className="upload-row__action">{done ? 'Replace' : 'Upload'}</span>
            </div>
          )
        })}
      </div>
      <label className="consent">
        <input type="checkbox" checked={f.consent} onChange={set('consent')} />
        <span>
          I certify that I am a duly filed candidate and that all information provided is
          true and correct, and I agree to piliPilinas'{' '}
          <a href="#">Terms</a> and <a href="#">Data Policy</a>.
        </span>
      </label>
    </div>
  )
}

function ReviewCell({ label, value }) {
  return (
    <div className="review-cell">
      <div className="review-cell__label">{label}</div>
      <div className="review-cell__value">{value || '—'}</div>
    </div>
  )
}

function StepReview({ f, stanceCount }) {
  return (
    <div>
      <h2 className="step__title">Review before submitting</h2>
      <div className="review-grid">
        <ReviewCell label="Name" value={f.name} />
        <ReviewCell label="Email" value={f.email} />
        <ReviewCell label="Running for" value={f.role} />
        <ReviewCell label="Region / District" value={f.region} />
        <ReviewCell label="Election year" value={f.electionYear} />
        <ReviewCell label="Party" value={f.party} />
        <ReviewCell label="Ballot number" value={f.ballotNumber} />
        <ReviewCell label="Issue stances set" value={`${stanceCount} / ${ISSUES.length}`} />
      </div>
      <div className="review-note">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#A8820B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <circle cx="12" cy="12" r="10" />
          <line x1="12" y1="8" x2="12" y2="12" />
          <line x1="12" y1="16" x2="12.01" y2="16" />
        </svg>
        <span>
          After submitting, our verification team will review your application within{' '}
          <strong>3–5 days</strong>.
        </span>
      </div>
    </div>
  )
}

/* ---------------- Page ---------------- */

function Register() {
  const [stage, setStage] = useState('form') // 'form' | 'done'
  const [step, setStep] = useState(1)
  const [f, setForm] = useState(EMPTY_FORM)
  const [stances, setStances] = useState({})
  const [uploads, setUploads] = useState({})

  const set = (key) => (e) =>
    setForm((prev) => ({
      ...prev,
      [key]: key === 'consent' ? e.target.checked : e.target.value,
    }))

  const setStance = (id, value) => setStances((prev) => ({ ...prev, [id]: value }))
  const addUpload = (id) => setUploads((prev) => ({ ...prev, [id]: `${id}_document.pdf` }))

  const next = () => setStep((s) => Math.min(s + 1, TOTAL_STEPS))
  const back = () => setStep((s) => Math.max(s - 1, 1))

  const reset = () => {
    setForm(EMPTY_FORM)
    setStances({})
    setUploads({})
    setStep(1)
    setStage('form')
  }

  if (stage === 'done') {
    return (
      <div className="register">
        <div className="register-success">
          <div className="register-success__icon">
            <svg width="38" height="38" viewBox="0 0 24 24" fill="none" stroke="#0E7A4B" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <polyline points="20 6 9 17 4 12" />
            </svg>
          </div>
          <h1 className="register-success__title">Candidacy submitted!</h1>
          <p className="register-success__text">
            Thank you, <strong>{f.name || 'candidate'}</strong>. We've received your
            candidacy application. We'll email <strong>{f.email || 'your inbox'}</strong>{' '}
            within 3–5 days with the verification result.
          </p>
          <div className="register-success__actions">
            <Link to="/admin" className="register-success__home">Back to admin</Link>
            <button className="register-success__again" onClick={reset}>Register another</button>
          </div>
        </div>
      </div>
    )
  }

  const stanceCount = Object.keys(stances).length

  return (
    <div className="register">
      <header className="register-header">
        <div className="register-header__inner">
          <Link to="/admin" className="brand">
            <span className="brand__mark"><span className="brand__dot" /></span>
            <span className="brand__name">pili<span>Pilinas</span></span>
          </Link>
          <Link to="/admin" className="register-header__back">← Back to admin</Link>
        </div>
      </header>

      <div className="register__shell">
        <div className="register__intro">
          <span className="register__eyebrow">Candidacy Form · For Candidates</span>
          <h1 className="register__title">Register your candidacy</h1>
          <p className="register__subtitle">
            File your candidacy on the transparency platform. Our team verifies every
            application against COMELEC records before publishing.
          </p>
        </div>

        <Stepper step={step} />

        <div className="register-card">
          {step === 1 && <StepPersonal f={f} set={set} />}
          {step === 2 && <StepCandidacy f={f} set={set} />}
          {step === 3 && <StepIssues stances={stances} setStance={setStance} />}
          {step === 4 && <StepDocuments uploads={uploads} addUpload={addUpload} f={f} set={set} />}
          {step === 5 && <StepReview f={f} stanceCount={stanceCount} />}

          <div className="form-nav">
            <button className="btn-back" onClick={back} disabled={step === 1}>
              ← Back
            </button>
            <span className="form-nav__count">Step {step} / {TOTAL_STEPS}</span>
            {step < TOTAL_STEPS ? (
              <button className="btn-next" onClick={next}>Continue →</button>
            ) : (
              <button className="btn-submit" onClick={() => setStage('done')}>
                Submit application
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Register
