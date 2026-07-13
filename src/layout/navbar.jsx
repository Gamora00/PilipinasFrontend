import React from 'react'
import { Link } from 'react-router-dom'

// `to` = router route (works from any page); `href` = same-page scroll anchor.
const NAV_LINKS = [
  { label: 'Politicians', to: '/politicians' },
  { label: 'How It Works', href: '/#how' },
  { label: 'Akinator ', href: '/#features' },
  { label: 'Features', href: '/#features' },
  { label: 'About', href: '/#about' },
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
            Pili<span>Pinas</span>
          </span>
        </Link>

        <nav className="site-nav">
          {NAV_LINKS.map((link) =>
            link.to ? (
              <Link key={link.label} to={link.to} className="site-nav__link">
                {link.label}
              </Link>
            ) : (
              <a key={link.label} href={link.href} className="site-nav__link">
                {link.label}
              </a>
            ),
          )}
        </nav>

        <div className="site-header__actions">
          <a href="#" className="link-plain">Log in</a>
        </div>
      </div>
    </header>
  )
}

export default Navbar
