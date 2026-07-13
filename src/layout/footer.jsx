import React from 'react'
import { Link } from 'react-router-dom'

const COLUMNS = [
  {
    title: 'Platform',
    links: ['Politicians', 'Compare', 'Election Data'],
  },
  {
    title: 'About',
    links: ['Our Mission', 'Data Sources', 'Contact'],
  },
  {
    title: 'Legal',
    links: ['Privacy', 'Terms'],
  },
]

function Footer() {
  return (
    <footer id="about" className="footer">
      <div className="footer__inner">
        <div className="footer__brand">
          <Link to="/" className="brand">
            <span className="brand__mark brand__mark--sm">
              <span className="brand__dot" />
            </span>
            <span className="brand__name">
              pili<span>Pilinas</span>
            </span>
          </Link>
          <p className="footer__about">
            A nonpartisan platform for transparency and accountability in
            Philippine politics.
          </p>
        </div>

        {COLUMNS.map((col) => (
          <div key={col.title} className="footer__col">
            <div className="footer__col-title">{col.title}</div>
            {col.links.map((link) => (
              <a key={link} href="#" className="footer__link">
                {link}
              </a>
            ))}
          </div>
        ))}
      </div>

      <div className="footer__bar">
        <div className="footer__bar-inner">
          <span>© 2026 piliPilinas. For the nation.</span>
          <span className="flag-dots flag-dots--lg">
            <span style={{ background: '#0038A8' }} />
            <span style={{ background: '#CE1126' }} />
            <span style={{ background: '#FCD116' }} />
          </span>
        </div>
      </div>
    </footer>
  )
}

export default Footer
