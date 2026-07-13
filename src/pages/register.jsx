import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import '../style/register.css'

const NEW_SLATE = '__new__'

const STEP_LABELS = ['Personal', 'Residence & Voter', 'Profile', 'Documents', 'Review']
const TOTAL_STEPS = STEP_LABELS.length

// COC scope (COMELEC Resolution 9740, Sec. 1):
//   Barangay: 1 Punong Barangay + 7 Sangguniang Barangay Members
//   SK:       1 Chairman + 7 Sangguniang Kabataan Members
const POSITIONS = [
  'Punong Barangay',
  'Sangguniang Barangay Member',
  'SK Chairman',
  'SK Kagawad',
]

const SK_POSITIONS = ['SK Chairman', 'SK Kagawad']

// Age qualification per office (COMELEC Resolution 9740, Sec. 2).
function ageHint(position) {
  if (SK_POSITIONS.includes(position)) {
    return 'SK candidates must be at least 15 but below 18 years old on election day.'
  }
  if (position) {
    return 'Must be at least 18 years old and a registered voter of the barangay.'
  }
  return ''
}

const ADVOCACIES = [
  'Anti-Corruption', 'Education', 'Healthcare', 'Jobs & Economy', 'Agriculture',
  'Environment & Climate', 'Infrastructure', 'Public Safety', 'Housing',
  'Women & Children', 'Youth', 'OFW Welfare', 'Indigenous Peoples', 'Disaster Resilience',
]

const UPLOADS = [
  { id: 'coc', label: 'Certificate of Candidacy (COC)', sub: 'Signed & notarized — required' },
  { id: 'id', label: 'Government ID', sub: "Driver's license, passport, or PRC ID" },
  { id: 'photo', label: 'Official photo', sub: 'Hi-res, formal shot' },
]

const EMPTY_FORM = {
  // Name (COC 1–2)
  firstName: '', middleName: '', lastName: '', nameExtension: '', nickname: '',
  // Personal (COC 12–17)
  sex: '', dob: '', pobCity: '', pobProvince: '', civilStatus: '', spouseName: '',
  profession: '', email: '', mobile: '', altPhone: '',
  // Residence / address (COC 3)
  addrHouse: '', addrStreet: '', addrBrgy: '', addrCity: '', addrProvince: '',
  addrRegion: '', addrZip: '',
  // Address for election purposes (COC 4)
  sameElectionAddress: true, electionAddress: '',
  // Office + election
  position: '', electionYear: '',
  // Group / slate (informal team — BSKE is nonpartisan)
  slateId: '', slateName: '',
  // Period of residence (COC 5)
  resPhYears: '', resPhMonths: '', resBrgyYears: '', resBrgyMonths: '',
  // Registered voter (COC 18)
  voterPrecinct: '', voterBarangay: '', voterCity: '', voterProvince: '',
  // Public profile (platform extras)
  advocacies: [], platform: '',
  // Oath / declarations (COC 6–10)
  consent: false,
}

function fullName(f) {
  return [f.firstName, f.middleName, f.lastName, f.nameExtension].filter(Boolean).join(' ')
}

function residenceLine(f) {
  return [f.addrHouse, f.addrStreet, f.addrBrgy, f.addrCity, f.addrProvince, f.addrZip]
    .filter(Boolean)
    .join(', ')
}

function computeAge(dob) {
  if (!dob) return ''
  const birth = new Date(dob)
  if (Number.isNaN(birth.getTime())) return ''
  const now = new Date()
  let age = now.getFullYear() - birth.getFullYear()
  const monthDiff = now.getMonth() - birth.getMonth()
  if (monthDiff < 0 || (monthDiff === 0 && now.getDate() < birth.getDate())) age--
  return age >= 0 ? String(age) : ''
}

/* ---------------- Primitives ---------------- */

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

function SelectField({ label, value, onChange, children }) {
  return (
    <label className="field">
      <span className="field__label">{label}</span>
      <select className="field__select" value={value} onChange={onChange}>
        {children}
      </select>
    </label>
  )
}

// Repeatable list of objects (track record).
function useList(blank) {
  const [items, setItems] = useState([])
  return {
    items,
    add: () => setItems((p) => [...p, { ...blank }]),
    change: (i, key, val) => setItems((p) => p.map((it, idx) => (idx === i ? { ...it, [key]: val } : it))),
    remove: (i) => setItems((p) => p.filter((_, idx) => idx !== i)),
    reset: () => setItems([]),
  }
}

function RepeatableSection({ title, hint, addLabel, fields, list }) {
  return (
    <div className="track-section">
      <div className="track-section__head">
        <h3 className="track-section__title">{title}</h3>
        <button type="button" className="track-add" onClick={list.add}>+ {addLabel}</button>
      </div>
      {hint && <p className="track-section__hint">{hint}</p>}
      {list.items.length === 0 ? (
        <p className="track-empty">None added yet.</p>
      ) : (
        list.items.map((item, i) => (
          <div className="track-row" key={i}>
            <div className="track-row__fields">
              {fields.map((fld) => (
                <input
                  key={fld.key}
                  className="field__control"
                  style={{ flex: fld.width || 1 }}
                  placeholder={fld.placeholder}
                  value={item[fld.key]}
                  onChange={(e) => list.change(i, fld.key, e.target.value)}
                />
              ))}
            </div>
            <button
              type="button"
              className="track-remove"
              onClick={() => list.remove(i)}
              aria-label="Remove entry"
            >
              ×
            </button>
          </div>
        ))
      )}
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

/* ---------------- Steps ---------------- */

function StepPersonal({ f, set }) {
  const age = computeAge(f.dob)
  return (
    <div>
      <h2 className="step__title">Personal information</h2>
      <h3 className="step__subhead">Name</h3>
      <div className="field-grid">
        <Field label="Last name *" value={f.lastName} onChange={set('lastName')} placeholder="e.g. Delgado" />
        <Field label="First name *" value={f.firstName} onChange={set('firstName')} placeholder="e.g. Maria" />
        <Field label="Middle name" value={f.middleName} onChange={set('middleName')} placeholder="e.g. Santos" />
        <Field label="Name extension" value={f.nameExtension} onChange={set('nameExtension')} placeholder="Jr., Sr., III" />
        <Field label="Nickname / stage name (on ballot)" value={f.nickname} onChange={set('nickname')} placeholder="One name only" />
      </div>

      <h3 className="step__subhead">Details</h3>
      <div className="field-grid">
        <SelectField label="Gender *" value={f.sex} onChange={set('sex')}>
          <option value="">Select…</option>
          <option>Male</option>
          <option>Female</option>
        </SelectField>
        <Field label="Date of birth *" type="date" value={f.dob} onChange={set('dob')} />
        <label className="field">
          <span className="field__label">Age</span>
          <input className="field__control" value={age} placeholder="Auto-computed" readOnly disabled />
        </label>
        <Field label="Place of birth — City / Municipality" value={f.pobCity} onChange={set('pobCity')} placeholder="e.g. Cebu City" />
        <Field label="Place of birth — Province" value={f.pobProvince} onChange={set('pobProvince')} placeholder="e.g. Cebu" />
        <SelectField label="Civil status *" value={f.civilStatus} onChange={set('civilStatus')}>
          <option value="">Select…</option>
          <option>Single</option>
          <option>Married</option>
          <option>Widowed</option>
        </SelectField>
        {f.civilStatus === 'Married' && (
          <Field label="Full name of spouse" value={f.spouseName} onChange={set('spouseName')} placeholder="Spouse's full name" />
        )}
        <Field label="Profession / occupation" value={f.profession} onChange={set('profession')} placeholder="e.g. Teacher" />
      </div>

      <h3 className="step__subhead">Contact</h3>
      <div className="field-grid">
        <Field label="Email *" type="email" value={f.email} onChange={set('email')} placeholder="name@email.com" />
        <Field label="Mobile # *" type="tel" value={f.mobile} onChange={set('mobile')} placeholder="0917 XXX XXXX" />
        <Field label="Alternative #" type="tel" value={f.altPhone} onChange={set('altPhone')} placeholder="(02) 8XXX-XXXX" />
      </div>
    </div>
  )
}

function StepResidenceVoter({ f, set, slates }) {
  return (
    <div>
      <h2 className="step__title step__title--tight">Candidacy, residence &amp; voter info</h2>
      <p className="step__hint">As required on the Certificate of Candidacy.</p>

      <h3 className="step__subhead">Office sought</h3>
      <div className="field-grid">
        <SelectField label="Position *" value={f.position} onChange={set('position')}>
          <option value="">Select a position…</option>
          {POSITIONS.map((p) => <option key={p} value={p}>{p}</option>)}
        </SelectField>
        <Field label="Election year *" value={f.electionYear} onChange={set('electionYear')} placeholder="e.g. 2028" />
        <SelectField label="Group / Slate (optional)" value={f.slateId} onChange={set('slateId')}>
          <option value="">No group / independent</option>
          {slates.map((s) => <option key={s.id} value={s.id}>{s.name}</option>)}
          <option value={NEW_SLATE}>+ Create a new group…</option>
        </SelectField>
        {f.slateId === NEW_SLATE && (
          <Field label="New group name" value={f.slateName} onChange={set('slateName')} placeholder="e.g. Team Kaunlaran" />
        )}
      </div>
      {f.position && <p className="step__note">{ageHint(f.position)}</p>}

      <h3 className="step__subhead">Residence / address</h3>
      <div className="field-grid">
        <Field label="House No. / Street / Subdivision" value={f.addrHouse} onChange={set('addrHouse')} placeholder="e.g. 123 Rizal St." />
        <Field label="Barangay *" value={f.addrBrgy} onChange={set('addrBrgy')} placeholder="e.g. Brgy. San Antonio" />
        <Field label="City / Municipality *" value={f.addrCity} onChange={set('addrCity')} placeholder="e.g. Pasig" />
        <Field label="Province *" value={f.addrProvince} onChange={set('addrProvince')} placeholder="e.g. Metro Manila" />
        <Field label="Region" value={f.addrRegion} onChange={set('addrRegion')} placeholder="e.g. NCR" />
        <Field label="ZIP code" value={f.addrZip} onChange={set('addrZip')} placeholder="e.g. 1600" />
      </div>
      <label className="consent consent--inline">
        <input type="checkbox" checked={f.sameElectionAddress} onChange={set('sameElectionAddress')} />
        <span>Address for election purposes is the same as my residence address.</span>
      </label>
      {!f.sameElectionAddress && (
        <label className="field field--full">
          <span className="field__label">Address for election purposes</span>
          <input className="field__control" value={f.electionAddress} onChange={set('electionAddress')} placeholder="Mailing address for election notices" />
        </label>
      )}

      <h3 className="step__subhead">Period of residence (before election day)</h3>
      <div className="field-grid">
        <Field label="In the Philippines — Years" type="number" value={f.resPhYears} onChange={set('resPhYears')} placeholder="e.g. 30" />
        <Field label="In the Philippines — Months" type="number" value={f.resPhMonths} onChange={set('resPhMonths')} placeholder="e.g. 0" />
        <Field label="In the barangay — Years" type="number" value={f.resBrgyYears} onChange={set('resBrgyYears')} placeholder="e.g. 5" />
        <Field label="In the barangay — Months" type="number" value={f.resBrgyMonths} onChange={set('resBrgyMonths')} placeholder="e.g. 0" />
      </div>

      <h3 className="step__subhead">Registered voter of</h3>
      <div className="field-grid">
        <Field label="Precinct No." value={f.voterPrecinct} onChange={set('voterPrecinct')} placeholder="e.g. 0123A" />
        <Field label="Barangay" value={f.voterBarangay} onChange={set('voterBarangay')} placeholder="e.g. Brgy. San Antonio" />
        <Field label="City / Municipality" value={f.voterCity} onChange={set('voterCity')} placeholder="e.g. Pasig" />
        <Field label="Province" value={f.voterProvince} onChange={set('voterProvince')} placeholder="e.g. Metro Manila" />
      </div>
    </div>
  )
}

function StepProfile({ f, set, toggleAdvocacy, education, bills, achievements, experience }) {
  return (
    <div>
      <h2 className="step__title step__title--tight">Public profile</h2>
      <p className="step__hint">Optional — shown on the candidate's transparency profile (not part of the COC).</p>

      <label className="field field--full">
        <span className="field__label">Platform &amp; agenda</span>
        <textarea
          className="field__textarea"
          rows={4}
          value={f.platform}
          onChange={set('platform')}
          placeholder="Describe your platform, priorities, and what you'll fight for if elected…"
        />
      </label>

      <div className="field field--full" style={{ marginTop: 18 }}>
        <span className="field__label">
          Advocacies <span className="field__hint-inline">— select all that apply</span>
        </span>
        <div className="chip-group">
          {ADVOCACIES.map((opt) => {
            const selected = f.advocacies.includes(opt)
            return (
              <button
                type="button"
                key={opt}
                className={`chip${selected ? ' is-selected' : ''}`}
                aria-pressed={selected}
                onClick={() => toggleAdvocacy(opt)}
              >
                {opt}
              </button>
            )
          })}
        </div>
      </div>

      <h3 className="step__subhead">Track record</h3>
      <RepeatableSection
        title="Educational background"
        addLabel="Add education"
        list={education}
        fields={[
          { key: 'school', placeholder: 'School / Institution', width: 2 },
          { key: 'degree', placeholder: 'Degree / Level', width: 2 },
          { key: 'year', placeholder: 'Year', width: 1 },
        ]}
      />
      <RepeatableSection
        title="Authored / passed bills"
        hint="For incumbents or re-electionists."
        addLabel="Add bill"
        list={bills}
        fields={[
          { key: 'title', placeholder: 'Bill title', width: 2 },
          { key: 'year', placeholder: 'Year', width: 1 },
          { key: 'description', placeholder: 'Short description', width: 3 },
        ]}
      />
      <RepeatableSection
        title="Past achievements & awards"
        addLabel="Add achievement"
        list={achievements}
        fields={[
          { key: 'title', placeholder: 'Achievement / Award', width: 3 },
          { key: 'year', placeholder: 'Year', width: 1 },
        ]}
      />
      <RepeatableSection
        title="Work / career experience"
        addLabel="Add experience"
        list={experience}
        fields={[
          { key: 'position', placeholder: 'Position', width: 2 },
          { key: 'organization', placeholder: 'Organization', width: 2 },
          { key: 'years', placeholder: 'Years (e.g. 2016–2019)', width: 2 },
        ]}
      />
    </div>
  )
}

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
                <div className="upload-row__sub">{done ? `Uploaded · ${uploads[u.id]}` : u.sub}</div>
              </div>
              <span className="upload-row__action">{done ? 'Replace' : 'Upload'}</span>
            </div>
          )
        })}
      </div>
      <label className="consent">
        <input type="checkbox" checked={f.consent} onChange={set('consent')} />
        <span>
          I am a Filipino citizen; I am not a permanent resident of, or an immigrant to, a
          foreign country; I am eligible for the office I seek; I will file my Statement of
          Contributions and Expenditures (SOCE) within 30 days after election day; and I will
          support and defend the Constitution. I certify that all information given is true and
          correct.
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

function StepReview({ f, counts, group }) {
  const trackRecord = [
    counts.education && `${counts.education} education`,
    counts.bills && `${counts.bills} bills`,
    counts.achievements && `${counts.achievements} achievements`,
    counts.experience && `${counts.experience} experience`,
  ]
    .filter(Boolean)
    .join(' · ')

  return (
    <div>
      <h2 className="step__title">Review before submitting</h2>
      <div className="review-grid">
        <ReviewCell label="Full name" value={fullName(f)} />
        <ReviewCell label="Nickname" value={f.nickname} />
        <ReviewCell label="Running for" value={f.position} />
        <ReviewCell label="Group / Slate" value={group} />
        <ReviewCell label="Election year" value={f.electionYear} />
        <ReviewCell label="Gender" value={f.sex} />
        <ReviewCell label="Date of birth" value={f.dob} />
        <ReviewCell label="Place of birth" value={[f.pobCity, f.pobProvince].filter(Boolean).join(', ')} />
        <ReviewCell label="Civil status" value={f.civilStatus} />
        <ReviewCell label="Profession" value={f.profession} />
        <ReviewCell label="Residence" value={residenceLine(f)} />
        <ReviewCell label="Registered voter of" value={[f.voterBarangay, f.voterCity, f.voterProvince].filter(Boolean).join(', ')} />
        <ReviewCell label="Email" value={f.email} />
        <ReviewCell label="Mobile #" value={f.mobile} />
        <ReviewCell label="Advocacies" value={f.advocacies.join(', ')} />
        <ReviewCell label="Track record" value={trackRecord} />
      </div>
      <div className="review-note">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#A8820B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <circle cx="12" cy="12" r="10" />
          <line x1="12" y1="8" x2="12" y2="12" />
          <line x1="12" y1="16" x2="12.01" y2="16" />
        </svg>
        <span>
          After submitting, the candidacy is <strong>listed on the platform right away</strong>.
          You can edit or remove it anytime from the admin console.
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
  const [uploads, setUploads] = useState({})
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')
  const [slates, setSlates] = useState([])

  useEffect(() => {
    fetch('http://localhost:5000/api/candidacy/slates')
      .then((r) => r.json())
      .then((d) => setSlates(Array.isArray(d) ? d : []))
      .catch(() => {})
  }, [])

  const education = useList({ school: '', degree: '', year: '' })
  const bills = useList({ title: '', year: '', description: '' })
  const achievements = useList({ title: '', year: '' })
  const experience = useList({ position: '', organization: '', years: '' })

  const set = (key) => (e) =>
    setForm((prev) => ({
      ...prev,
      [key]: key === 'consent' || key === 'sameElectionAddress' ? e.target.checked : e.target.value,
    }))

  const toggleAdvocacy = (val) =>
    setForm((prev) => ({
      ...prev,
      advocacies: prev.advocacies.includes(val)
        ? prev.advocacies.filter((a) => a !== val)
        : [...prev.advocacies, val],
    }))

  const addUpload = (id) => setUploads((prev) => ({ ...prev, [id]: `${id}_document.pdf` }))

  const next = () => setStep((s) => Math.min(s + 1, TOTAL_STEPS))
  const back = () => setStep((s) => Math.max(s - 1, 1))

  const handleSubmit = async () => {
    setSubmitting(true)
    setError('')
    const creatingSlate = f.slateId === NEW_SLATE
    const payload = {
      ...f,
      slateId: creatingSlate ? null : f.slateId || null,
      slateName: creatingSlate ? f.slateName : null,
      electionAddress: f.sameElectionAddress ? residenceLine(f) : f.electionAddress,
      cocDocument: uploads.coc || null,
      governmentId: uploads.id || null,
      campaignPhoto: uploads.photo || null,
      education: education.items,
      bills: bills.items,
      achievements: achievements.items,
      experience: experience.items,
    }
    try {
      const res = await fetch('http://localhost:5000/api/candidacy', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      if (!res.ok) {
        const data = await res.json().catch(() => ({}))
        throw new Error(data.error || 'Submission failed. Please try again.')
      }
      setStage('done')
    } catch (e) {
      setError(
        e.message === 'Failed to fetch'
          ? 'Cannot reach the server. Is the backend running on port 5000?'
          : e.message,
      )
    } finally {
      setSubmitting(false)
    }
  }

  const reset = () => {
    setForm(EMPTY_FORM)
    setUploads({})
    education.reset()
    bills.reset()
    achievements.reset()
    experience.reset()
    setStep(1)
    setError('')
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
          <h1 className="register-success__title">Candidacy registered!</h1>
          <p className="register-success__text">
            <strong>{fullName(f) || 'The candidate'}</strong> is now listed on the platform.
            You can find them on the Politicians page right away.
          </p>
          <div className="register-success__actions">
            <Link to="/admin" className="register-success__home">Back to admin</Link>
            <button className="register-success__again" onClick={reset}>Register another</button>
          </div>
        </div>
      </div>
    )
  }

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
          <span className="register__eyebrow">Certificate of Candidacy · Barangay &amp; SK</span>
          <h1 className="register__title">Register a candidacy</h1>
          <p className="register__subtitle">
            File a candidacy for Punong Barangay or Sangguniang Kabataan. Fields follow the
            official COMELEC Certificate of Candidacy.
          </p>
        </div>

        <Stepper step={step} />

        <div className="register-card">
          {step === 1 && <StepPersonal f={f} set={set} />}
          {step === 2 && <StepResidenceVoter f={f} set={set} slates={slates} />}
          {step === 3 && (
            <StepProfile
              f={f}
              set={set}
              toggleAdvocacy={toggleAdvocacy}
              education={education}
              bills={bills}
              achievements={achievements}
              experience={experience}
            />
          )}
          {step === 4 && <StepDocuments uploads={uploads} addUpload={addUpload} f={f} set={set} />}
          {step === 5 && (
            <StepReview
              f={f}
              group={
                f.slateId === NEW_SLATE
                  ? f.slateName
                  : slates.find((s) => String(s.id) === String(f.slateId))?.name || ''
              }
              counts={{
                education: education.items.length,
                bills: bills.items.length,
                achievements: achievements.items.length,
                experience: experience.items.length,
              }}
            />
          )}

          {error && <p className="form-error">{error}</p>}

          <div className="form-nav">
            <button className="btn-back" onClick={back} disabled={step === 1 || submitting}>
              ← Back
            </button>
            <span className="form-nav__count">Step {step} / {TOTAL_STEPS}</span>
            {step < TOTAL_STEPS ? (
              <button className="btn-next" onClick={next}>Continue →</button>
            ) : (
              <button className="btn-submit" onClick={handleSubmit} disabled={submitting}>
                {submitting ? 'Submitting…' : 'Submit candidacy'}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Register
