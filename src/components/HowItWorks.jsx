import React from 'react'

const STEPS = [
  {
    n: '1',
    variant: 'blue',
    title: 'Hanapin',
    text: 'I-type ang pangalan ng kahit sinong opisyal — mula barangay captain hanggang senador.',
  },
  {
    n: '2',
    variant: 'red',
    title: 'Suriin',
    text: 'Tingnan ang voting record, attendance, SALN, at mga naipasang batas — walang spin.',
  },
  {
    n: '3',
    variant: 'gold',
    title: 'Pumili',
    text: 'Mag-compare side-by-side at magdesisyon base sa facts — hindi sa ads o sayaw.',
  },
]

function HowItWorks() {
  return (
    <section id="how" className="how">
      <div className="section-head section-head--center">
        <div className="section-head__eyebrow">Paano gumagana</div>
        <h2 className="section-head__title">Tatlong hakbang lang.</h2>
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
