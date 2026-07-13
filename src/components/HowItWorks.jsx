import React from 'react'

const STEPS = [
  {
    n: '1',
    variant: 'blue',
    title: 'Search',
    text: 'Type the name of any official — from barangay captain to senator.',
  },
  {
    n: '2',
    variant: 'red',
    title: 'Review',
    text: 'See voting records, attendance, SALN, and passed bills — no spin.',
  },
  {
    n: '3',
    variant: 'gold',
    title: 'Decide',
    text: 'Compare side-by-side and decide based on facts — not ads or dance numbers.',
  },
]

function HowItWorks() {
  return (
    <section id="how" className="how">
      <div className="section-head section-head--center">
        <div className="section-head__eyebrow">How it works</div>
        <h2 className="section-head__title">Just three steps.</h2>
      </div>
      <div className="how__grid">
        {STEPS.map((step) => (
          <div key={step.n} className="how__step">
            <div className={`how__num how__num--${step.variant}`}>{step.n}</div>
            <h3 className="how__step-title">{step.title}</h3>
            <p className="how__step-text">{step.text}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

export default HowItWorks
