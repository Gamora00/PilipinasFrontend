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
          Alamin kung sino<br />talaga ang <span>ihahalal</span> mo.
        </h1>
        <p className="hero__subtitle">
          Track records, voting history, at mga pangako ng bawat politiko — nasa
          isang lugar lang. Mag-research muna bago mag-vote.
        </p>

        <div className="hero__search">
          <div className="search-bar">
            <SearchIcon />
            <input
              value={query}
              onChange={onSearch}
              placeholder="Hanapin ang senador, mayor, o congressman…"
              className="search-bar__input"
              aria-label="Search officials"
            />
            <button className="btn btn--primary">Hanapin</button>
          </div>
          <p className="hero__hint">Libre at walang bias. 100% mula sa public records.</p>

          <div className="hero__angkenator">
            <span>Hindi sigurado kung sino?</span>
            <a href="Angkenator.dc.html" className="btn btn--ghost">
              🎯 Subukan ang Angkenator →
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero
