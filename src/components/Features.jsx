import React from 'react'

const FEATURES = [
  {
    variant: 'blue',
    title: 'Voting Records',
    text: 'Bawat boto sa bawat panukala, naka-log at searchable.',
    icon: (
      <>
        <path d="M9 11l3 3L22 4" />
        <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
      </>
    ),
  },
  {
    variant: 'red',
    title: 'Promise Tracker',
    text: 'Natupad ba ang mga pangako noong campaign? Alamin.',
    icon: (
      <>
        <circle cx="12" cy="12" r="10" />
        <polyline points="12 6 12 12 16 14" />
      </>
    ),
  },
  {
    variant: 'gold',
    title: 'SALN, Simplified',
    text: 'Asset declarations na madaling basahin at i-compare.',
    icon: (
      <>
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <polyline points="14 2 14 8 20 8" />
      </>
    ),
  },
  {
    variant: 'navy',
    title: 'Side-by-Side',
    text: 'I-compare ang mga kandidato nang magkatabi, instantly.',
    icon: (
      <>
        <line x1="18" y1="20" x2="18" y2="10" />
        <line x1="12" y1="20" x2="12" y2="4" />
        <line x1="6" y1="20" x2="6" y2="14" />
      </>
    ),
  },
]

function Features() {
  return (
    <section id="features" className="features">
      <div className="features__inner">
        <div className="features__intro">
          <div className="section-head__eyebrow">Ang laman</div>
          <h2 className="features__title">
            Lahat ng kailangan mong malaman, sa isang profile.
          </h2>
          <p className="features__text">
            Hindi opinyon. Hindi propaganda. Datos lang na galing sa opisyal na
            records ng gobyerno, organisado para madali mong maintindihan.
          </p>
        </div>

        <div className="features__grid">
          {FEATURES.map((f) => (
            <div key={f.title} className="feature-card">
              <div className={`feature-card__icon feature-card__icon--${f.variant}`}>
                <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  {f.icon}
                </svg>
              </div>
              <h3 className="feature-card__title">{f.title}</h3>
              <p className="feature-card__text">{f.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Features
