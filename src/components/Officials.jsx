import React from 'react'
import OfficialCard from './OfficialCard'

function Officials({ query, results }) {
  const trimmed = query.trim()
  const heading = trimmed
    ? `Mga resulta para sa “${trimmed}”`
    : 'Mga featured na opisyal'

  return (
    <section id="officials" className="officials">
      <div className="officials__head">
        <h2 className="officials__title">{heading}</h2>
        <span className="officials__count">{results.length} na opisyal</span>
      </div>

      {results.length > 0 ? (
        <div className="officials__grid">
          {results.map((official) => (
            <OfficialCard key={official.slug} official={official} />
          ))}
        </div>
      ) : (
        <div className="officials__empty">
          <p className="officials__empty-title">Walang nahanap na opisyal.</p>
          <p className="officials__empty-text">
            Subukan ang ibang pangalan, posisyon, o rehiyon.
          </p>
        </div>
      )}
    </section>
  )
}

export default Officials
