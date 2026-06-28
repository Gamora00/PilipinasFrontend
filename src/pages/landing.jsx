import React, { useMemo, useState } from 'react'
import Navbar from '../layout/navbar'
import Footer from '../layout/footer'
import Hero from '../components/Hero'
import Officials from '../components/Officials'
import StatsBand from '../components/StatsBand'
import HowItWorks from '../components/HowItWorks'
import Features from '../components/Features'
import CallToAction from '../components/CallToAction'
import { searchPoliticians } from '../data/politicians'
import '../style/landing.css'

function Landing() {
  const [query, setQuery] = useState('')
  const results = useMemo(() => searchPoliticians(query), [query])

  return (
    <div className="page">
      <Navbar />
      <main>
        <Hero query={query} onSearch={(e) => setQuery(e.target.value)} />
        <Officials query={query} results={results} />
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
