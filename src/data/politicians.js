// Featured officials — placeholder data sourced from public records.
// Replace with API data when the backend is ready.
export const politicians = [
  { slug: 'maria-delgado',  name: 'Maria S. Delgado',  role: 'Senator',       party: 'Reform Coalition', region: 'Nationwide',  attendance: '94%', bills: '37', promises: '82%' },
  { slug: 'ramon-aquino',   name: 'Ramon T. Aquino',   role: 'Mayor',         party: 'Independent',      region: 'Cebu City',   attendance: '91%', bills: '12', promises: '70%' },
  { slug: 'grace-mendoza',  name: 'Grace L. Mendoza',  role: 'Congresswoman', party: 'Unity Bloc',       region: 'Davao 1st',   attendance: '97%', bills: '21', promises: '88%' },
  { slug: 'benigno-castro', name: 'Benigno R. Castro', role: 'Governor',    party: 'Independent',      region: 'Iloilo',      attendance: '89%', bills: '9',  promises: '65%' },
  { slug: 'joselito-reyes', name: 'Joselito P. Reyes', role: 'Senator',       party: "People's Front",   region: 'Nationwide',  attendance: '85%', bills: '28', promises: '74%' },
  { slug: 'anna-lim',       name: 'Anna V. Lim',       role: 'Councilor',      party: 'Reform Coalition', region: 'Quezon City', attendance: '98%', bills: '15', promises: '91%' },
]

// Look up a single official by slug.
export function getPolitician(slug) {
  return politicians.find((p) => p.slug === slug)
}

// Case-insensitive search across name, role, party and region.
export function searchPoliticians(query) {
  const q = (query || '').trim().toLowerCase()
  if (!q) return politicians
  return politicians.filter((p) =>
    `${p.name} ${p.role} ${p.party} ${p.region}`.toLowerCase().includes(q),
  )
}
