import React, { useEffect, useMemo, useState } from 'react'
import Navbar from '../layout/navbar'
import Footer from '../layout/footer'
import OfficialCard from '../components/OfficialCard'
import '../style/landing.css'
import '../style/politicians.css'

const API = 'http://localhost:5000/api/candidacy'
const PAGE_SIZE = 9

function Pagination({ page, totalPages, onPage }) {
  if (totalPages <= 1) return null
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1)
  return (
    <div className="pager">
      <button className="pager__btn" onClick={() => onPage(page - 1)} disabled={page === 1}>
        ← Previous
      </button>
      <div className="pager__pages">
        {pages.map((n) => (
          <button
            key={n}
            className={`pager__num${n === page ? ' is-active' : ''}`}
            onClick={() => onPage(n)}
          >
            {n}
          </button>
        ))}
      </div>
      <button className="pager__btn" onClick={() => onPage(page + 1)} disabled={page === totalPages}>
        Next →
      </button>
    </div>
  )
}

const EMPTY_FILTERS = { q: '', position: '', region: '', province: '', city: '', barangay: '' }

// Distinct values of `field` from the location tree, narrowed by already-chosen parents.
function locOptions(locations, field, picked) {
  const set = new Set()
  for (const loc of locations) {
    if (picked.region && loc.region !== picked.region) continue
    if (picked.province && loc.province !== picked.province) continue
    if (picked.city && loc.city !== picked.city) continue
    if (loc[field]) set.add(loc[field])
  }
  return [...set].sort()
}

function Politicians() {
  const [filters, setFilters] = useState(EMPTY_FILTERS)
  const [page, setPage] = useState(1)
  const [result, setResult] = useState({ data: [], total: 0, totalPages: 1, page: 1 })
  const [options, setOptions] = useState({ positions: [], locations: [] })
  const [status, setStatus] = useState('loading')

  // Filter dropdown options — fetched once.
  useEffect(() => {
    fetch(`${API}/filters`)
      .then((r) => r.json())
      .then(setOptions)
      .catch(() => {})
  }, [])

  // List — refetched whenever filters or page change.
  const query = useMemo(() => {
    const p = new URLSearchParams({ page: String(page), limit: String(PAGE_SIZE) })
    if (filters.q.trim()) p.set('q', filters.q.trim())
    if (filters.position) p.set('position', filters.position)
    if (filters.region) p.set('region', filters.region)
    if (filters.province) p.set('province', filters.province)
    if (filters.city) p.set('city', filters.city)
    if (filters.barangay) p.set('barangay', filters.barangay)
    return p.toString()
  }, [filters, page])

  // Cascading dropdown options derived from the location tree.
  const regions = useMemo(() => locOptions(options.locations, 'region', {}), [options.locations])
  const provinces = useMemo(
    () => locOptions(options.locations, 'province', { region: filters.region }),
    [options.locations, filters.region],
  )
  const cities = useMemo(
    () => locOptions(options.locations, 'city', { region: filters.region, province: filters.province }),
    [options.locations, filters.region, filters.province],
  )
  const barangays = useMemo(
    () => locOptions(options.locations, 'barangay', { region: filters.region, province: filters.province, city: filters.city }),
    [options.locations, filters.region, filters.province, filters.city],
  )

  useEffect(() => {
    let active = true
    setStatus('loading')
    fetch(`${API}/browse?${query}`)
      .then((r) => {
        if (!r.ok) throw new Error('bad')
        return r.json()
      })
      .then((d) => {
        if (active) {
          setResult(d)
          setStatus('ready')
        }
      })
      .catch(() => active && setStatus('error'))
    return () => {
      active = false
    }
  }, [query])

  const setFilter = (key, val) => {
    setFilters((f) => ({ ...f, [key]: val }))
    setPage(1)
  }
  // Choosing a location level clears the levels below it.
  const setLocation = (level, val) => {
    setFilters((f) => {
      const next = { ...f, [level]: val }
      if (level === 'region') Object.assign(next, { province: '', city: '', barangay: '' })
      if (level === 'province') Object.assign(next, { city: '', barangay: '' })
      if (level === 'city') Object.assign(next, { barangay: '' })
      return next
    })
    setPage(1)
  }
  const clearFilters = () => {
    setFilters(EMPTY_FILTERS)
    setPage(1)
  }

  const hasFilters = Object.values(filters).some(Boolean)

  return (
    <div className="page">
      <Navbar />
      <main>
        <section className="browse">
          <div className="browse__head">
            <h1 className="browse__title">Politicians</h1>
            <p className="browse__subtitle">
              Browse all candidates. Filter by position or region, or search for your
              area to see who's running in your election.
            </p>
          </div>

          <div className="filters">
            <input
              className="filters__search"
              placeholder="Search by name, city, or barangay…"
              value={filters.q}
              onChange={(e) => setFilter('q', e.target.value)}
            />
            <select
              className="filters__select"
              value={filters.position}
              onChange={(e) => setFilter('position', e.target.value)}
            >
              <option value="">All positions</option>
              {options.positions.map((p) => (
                <option key={p} value={p}>{p}</option>
              ))}
            </select>
            <select
              className="filters__select"
              value={filters.region}
              onChange={(e) => setLocation('region', e.target.value)}
            >
              <option value="">All regions</option>
              {regions.map((r) => <option key={r} value={r}>{r}</option>)}
            </select>
            <select
              className="filters__select"
              value={filters.province}
              onChange={(e) => setLocation('province', e.target.value)}
            >
              <option value="">All provinces</option>
              {provinces.map((p) => <option key={p} value={p}>{p}</option>)}
            </select>
            <select
              className="filters__select"
              value={filters.city}
              onChange={(e) => setLocation('city', e.target.value)}
            >
              <option value="">All cities / municipalities</option>
              {cities.map((c) => <option key={c} value={c}>{c}</option>)}
            </select>
            <select
              className="filters__select"
              value={filters.barangay}
              onChange={(e) => setLocation('barangay', e.target.value)}
            >
              <option value="">All barangays</option>
              {barangays.map((b) => <option key={b} value={b}>{b}</option>)}
            </select>
            {hasFilters && (
              <button className="filters__clear" onClick={clearFilters}>Clear</button>
            )}
          </div>

          {status === 'ready' && (
            <p className="browse__count">{result.total} results</p>
          )}

          {status === 'loading' && (
            <div className="officials__empty"><p className="officials__empty-text">Loading…</p></div>
          )}
          {status === 'error' && (
            <div className="officials__empty">
              <p className="officials__empty-title">Could not load data.</p>
              <p className="officials__empty-text">Make sure the server is running on port 5000.</p>
            </div>
          )}
          {status === 'ready' && result.data.length === 0 && (
            <div className="officials__empty">
              <p className="officials__empty-title">No politicians found.</p>
              <p className="officials__empty-text">Try changing the filters or search.</p>
            </div>
          )}
          {status === 'ready' && result.data.length > 0 && (
            <div className="officials__grid">
              {result.data.map((official) => (
                <OfficialCard key={official.slug} official={official} />
              ))}
            </div>
          )}

          <Pagination page={result.page} totalPages={result.totalPages} onPage={setPage} />
        </section>
      </main>
      <Footer />
    </div>
  )
}

export default Politicians
