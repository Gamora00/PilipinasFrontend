import React from 'react'

const SearchIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#8A93A3" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
    <circle cx="11" cy="11" r="7" />
    <line x1="21" y1="21" x2="16.65" y2="16.65" />
  </svg>
)

function Hero({ query, onSearch }) {
  return (
    <section className="hero">
      <div className="hero__inner">
        <div className="eyebrow-pill">
          <span className="flag-dots">
            <span style={{ background: '#0038A8' }} />
            <span style={{ background: '#CE1126' }} />
            <span style={{ background: '#FCD116' }} />
          </span>
          <span className="eyebrow-pill__text">Transparency platform • Pilipinas</span>
        </div>

        <h1 className="hero__title">
          Know who you're<br />really <span>voting for</span>.
        </h1>
        <p className="hero__subtitle">
          Track records, voting history, and every politician's promises — all in
          one place. Do your research before you vote.
        </p>

        <div className="hero__search">
          <div className="search-bar">
            <SearchIcon />
            <input
              value={query}
              onChange={onSearch}
              placeholder="Search for a senator, mayor, or congressman…"
              className="search-bar__input"
              aria-label="Search officials"
            />
            <button className="btn btn--primary">Search</button>
          </div>
          <p className="hero__hint">Free and unbiased. 100% from public records.</p>

          <div className="hero__angkenator">
            <span>Not sure who to pick?</span>
            <a href="Angkenator.dc.html" className="btn btn--ghost">
              🎯 Try the Angkenator →
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero
