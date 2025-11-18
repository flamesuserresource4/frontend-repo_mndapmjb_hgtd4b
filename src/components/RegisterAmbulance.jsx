import { useState } from 'react'

const initial = {
  plate: '', type: 'basic', driver_name: '', driver_phone: '', provider: '', lat: '', lng: '', available: true
}

function RegisterAmbulance() {
  const [form, setForm] = useState(initial)
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState(null)

  const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setForm(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setResult(null)
    try {
      const payload = {
        plate: form.plate,
        type: form.type,
        driver_name: form.driver_name,
        driver_phone: form.driver_phone,
        provider: form.provider || null,
        location: { lat: parseFloat(form.lat), lng: parseFloat(form.lng) },
        available: Boolean(form.available)
      }
      const res = await fetch(`${baseUrl}/ambulances`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.detail || 'Failed')
      setResult({ ok: true, id: data.id })
      setForm(initial)
    } catch (err) {
      setResult({ ok: false, message: err.message })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="bg-white/10 border border-white/10 rounded-2xl p-6">
      <h3 className="text-white text-lg font-semibold mb-4">Register Ambulance</h3>
      <form onSubmit={handleSubmit} className="grid sm:grid-cols-2 gap-4">
        <input name="plate" value={form.plate} onChange={handleChange} placeholder="Plate" className="bg-white/10 text-white placeholder-white/60 rounded px-3 py-2" required />
        <select name="type" value={form.type} onChange={handleChange} className="bg-white/10 text-white rounded px-3 py-2">
          <option value="basic">Basic</option>
          <option value="advanced">Advanced</option>
          <option value="icu">ICU</option>
        </select>
        <input name="driver_name" value={form.driver_name} onChange={handleChange} placeholder="Driver name" className="bg-white/10 text-white placeholder-white/60 rounded px-3 py-2" required />
        <input name="driver_phone" value={form.driver_phone} onChange={handleChange} placeholder="Driver phone" className="bg-white/10 text-white placeholder-white/60 rounded px-3 py-2" required />
        <input name="provider" value={form.provider} onChange={handleChange} placeholder="Provider (hospital)" className="bg-white/10 text-white placeholder-white/60 rounded px-3 py-2 sm:col-span-2" />
        <input name="lat" value={form.lat} onChange={handleChange} placeholder="Latitude" className="bg-white/10 text-white placeholder-white/60 rounded px-3 py-2" required />
        <input name="lng" value={form.lng} onChange={handleChange} placeholder="Longitude" className="bg-white/10 text-white placeholder-white/60 rounded px-3 py-2" required />
        <label className="flex items-center gap-2 text-white text-sm">
          <input type="checkbox" name="available" checked={form.available} onChange={handleChange} /> Available
        </label>
        <button disabled={loading} className="bg-white text-slate-900 rounded px-4 py-2 font-semibold">
          {loading ? 'Saving...' : 'Save'}
        </button>
      </form>
      {result && (
        <div className={`mt-4 text-sm ${result.ok ? 'text-green-300' : 'text-red-300'}`}>
          {result.ok ? (
            <p>Ambulance registered. ID: {result.id}</p>
          ) : (
            <p>Error: {result.message}</p>
          )}
        </div>
      )}
    </div>
  )
}

export default RegisterAmbulance
