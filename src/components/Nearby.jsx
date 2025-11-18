import { useState } from 'react'

function Nearby() {
  const [center, setCenter] = useState({ lat: '', lng: '' })
  const [radius, setRadius] = useState(5)
  const [results, setResults] = useState([])
  const [loading, setLoading] = useState(false)

  const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

  const search = async () => {
    if (!center.lat || !center.lng) return
    setLoading(true)
    setResults([])
    try {
      const payload = { center: { lat: parseFloat(center.lat), lng: parseFloat(center.lng) }, radius_km: Number(radius) }
      const res = await fetch(`${baseUrl}/ambulances/nearby`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      })
      const data = await res.json()
      setResults(Array.isArray(data) ? data : [])
    } catch (e) {
      console.error(e)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="bg-white/10 border border-white/10 rounded-2xl p-6">
      <h3 className="text-white text-lg font-semibold mb-4">Find Nearby Ambulances</h3>
      <div className="grid sm:grid-cols-3 gap-3 mb-4">
        <input value={center.lat} onChange={e=>setCenter(p=>({...p, lat:e.target.value}))} placeholder="Latitude" className="bg-white/10 text-white placeholder-white/60 rounded px-3 py-2" />
        <input value={center.lng} onChange={e=>setCenter(p=>({...p, lng:e.target.value}))} placeholder="Longitude" className="bg-white/10 text-white placeholder-white/60 rounded px-3 py-2" />
        <input type="number" value={radius} onChange={e=>setRadius(e.target.value)} placeholder="Radius (km)" className="bg-white/10 text-white placeholder-white/60 rounded px-3 py-2" />
      </div>
      <button onClick={search} className="bg-white text-slate-900 rounded px-4 py-2 font-semibold">{loading ? 'Searching...' : 'Search'}</button>
      <div className="mt-4 space-y-2">
        {results.map(a => (
          <div key={a.id} className="bg-black/20 border border-white/10 rounded-xl p-3 text-white">
            <div className="flex justify-between">
              <div className="font-semibold">{a.provider || 'Independent'} • {a.type.toUpperCase()}</div>
              <div className={`text-sm ${a.available ? 'text-green-300' : 'text-red-300'}`}>{a.available ? 'Available' : 'Busy'}</div>
            </div>
            <div className="text-white/80 text-sm">Driver: {a.driver_name} • {a.driver_phone}</div>
            <div className="text-white/60 text-xs">Plate: {a.plate} • Lat: {a.location?.lat} Lng: {a.location?.lng}</div>
          </div>
        ))}
        {results.length === 0 && !loading && (
          <p className="text-white/70 text-sm">No results yet. Try searching.</p>
        )}
      </div>
    </div>
  )
}

export default Nearby
