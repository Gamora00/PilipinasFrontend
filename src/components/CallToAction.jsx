import React from 'react'

function CallToAction() {
  return (
    <section id="cta" className="cta">
      <div className="cta__card">
        <h2 className="cta__title">
          Handa nang mag-research<br />bago mag-vote?
        </h2>
        <p className="cta__text">
          Mag-sign up para sa libreng access at updates tuwing may bagong
          election data.
        </p>
        <form
          className="cta__form"
          onSubmit={(e) => e.preventDefault()}
        >
          <input
            type="email"
            placeholder="Ilagay ang iyong email"
            className="cta__input"
            aria-label="Email address"
          />
          <button type="submit" className="btn btn--gold">Mag-sign up</button>
        </form>
      </div>
    </section>
  )
}

export default CallToAction
