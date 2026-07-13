import React, { useEffect, useMemo, useState } from 'react'
import Navbar from '../layout/navbar'
import Footer from '../layout/footer'
import Hero from '../components/Hero'
import Officials from '../components/Officials'
import StatsBand from '../components/StatsBand'
import HowItWorks from '../components/HowItWorks'
import Features from '../components/Features'
import CallToAction from '../components/CallToAction'
import '../style/landing.css'

const API = 'http://localhost:5000/api/candidacy'

function matches(p, q) {
  return `${p.name} ${p.role} ${p.party} ${p.region}`.toLowerCase().includes(q)
}

function Landing() {
  const [query, setQuery] = useState('')
  const [officials, setOfficials] = useState([])
  const [status, setStatus] = useState('loading') // 'loading' | 'ready' | 'error'

  useEffect(() => {
    let active = true
    fetch(API)
      .then((res) => {
        if (!res.ok) throw new Error('bad response')
        return res.json()
      })
      .then((data) => {
        if (active) {
          setOfficials(data)
          setStatus('ready')
        }
      })
      .catch(() => active && setStatus('error'))
    return () => {
      active = false
    }
  }, [])

  const results = useMemo(() => {
    const q = query.trim().toLowerCase()
    return q ? officials.filter((p) => matches(p, q)) : officials
  }, [query, officials])

  return (
    <div className="page">
      <Navbar />
      <main>
        <Hero query={query} onSearch={(e) => setQuery(e.target.value)} />
        <Officials query={query} results={results} status={status} />
        <StatsBand />
        <HowItWorks />
        <Features />
        <CallToAction />
      </main>
      <Footer />
    </div>
  )
}

export default Landing
