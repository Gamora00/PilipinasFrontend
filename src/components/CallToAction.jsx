import React from 'react'

function CallToAction() {
  return (
    <section id="cta" className="cta">
      <div className="cta__card">
        <h2 className="cta__title">
          Ready to research<br />before you vote?
        </h2>
        <p className="cta__text">
          Sign up for free access and updates whenever new election data is
          available.
        </p>
        <form
          className="cta__form"
          onSubmit={(e) => e.preventDefault()}
        >
          <input
            type="email"
            placeholder="Enter your email"
            className="cta__input"
            aria-label="Email address"
          />
          <button type="submit" className="btn btn--gold">Sign up</button>
        </form>
      </div>
    </section>
  )
}

export default CallToAction
