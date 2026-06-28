import React from 'react'
import { Link } from 'react-router-dom'

// Same-page scroll anchors stay plain <a>; route changes use <Link>.
const NAV_LINKS = [
  { label: 'Mga Politiko', href: '#officials' },
  { label: 'Paano Gumagana', href: '#how' },
  { label: 'Angkenator', href: '#features' },
  { label: 'Features', href: '#features' },
  { label: 'Tungkol', href: '#about' },
]

function Navbar() {
  return (
    <header className="site-header">
      <div className="site-header__inner">
        <Link to="/" className="brand" aria-label="piliPilinas home">
          <span className="brand__mark">
            <span className="brand__dot" />
          </span>
          <span className="brand__name">
            pili<span>Pilinas</span>
          </span>
        </Link>

        <nav className="site-nav">
          {NAV_LINKS.map((link) => (
            <a key={link.label} href={link.href} className="site-nav__link">
              {link.label}
            </a>
          ))}
        </nav>

        <div className="site-header__actions">
          <a href="#" className="link-plain">Mag-login</a>
        </div>
      </div>
    </header>
  )
}

export default Navbar
