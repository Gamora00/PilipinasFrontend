import React from 'react'
import OfficialCard from './OfficialCard'

function Officials({ query, results, status }) {
  const trimmed = query.trim()
  const heading = trimmed
    ? `Results for “${trimmed}”`
    : 'Featured officials'

  return (
    <section id="officials" className="officials">
      <div className="officials__head">
        <h2 className="officials__title">{heading}</h2>
        {status === 'ready' && (
          <span className="officials__count">{results.length} officials</span>
        )}
      </div>

      {status === 'loading' && (
        <div className="officials__empty">
          <p className="officials__empty-text">Loading officials…</p>
        </div>
      )}

      {status === 'error' && (
        <div className="officials__empty">
          <p className="officials__empty-title">Could not load data.</p>
          <p className="officials__empty-text">
            Make sure the server is running on port 5000, then refresh.
          </p>
        </div>
      )}

      {status === 'ready' && results.length > 0 && (
        <div className="officials__grid">
          {results.map((official) => (
            <OfficialCard key={official.slug} official={official} />
          ))}
        </div>
      )}

      {status === 'ready' && results.length === 0 && (
        <div className="officials__empty">
          <p className="officials__empty-title">No officials found.</p>
          <p className="officials__empty-text">
            Try a different name, position, or region.
          </p>
        </div>
      )}
    </section>
  )
}

export default Officials
