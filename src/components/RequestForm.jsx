import { useState } from 'react'

const initial = {
  patient_name: '',
  patient_phone: '',
  pickup_lat: '',
  pickup_lng: '',
  destination: '',
  priority: 'normal'
}

function RequestForm() {
  const [form, setForm] = useState(initial)
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState(null)

  const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setResult(null)
    try {
      const payload = {
        patient_name: form.patient_name,
        patient_phone: form.patient_phone,
        pickup: { lat: parseFloat(form.pickup_lat), lng: parseFloat(form.pickup_lng) },
        destination: form.destination || null,
        priority: form.priority
      }
      const res = await fetch(`${baseUrl}/rides`, {
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
      <h3 className="text-white text-lg font-semibold mb-4">Request an Ambulance</h3>
      <form onSubmit={handleSubmit} className="grid sm:grid-cols-2 gap-4">
        <input name="patient_name" value={form.patient_name} onChange={handleChange} placeholder="Patient name" className="bg-white/10 text-white placeholder-white/60 rounded px-3 py-2" required />
        <input name="patient_phone" value={form.patient_phone} onChange={handleChange} placeholder="Phone (ETH)" className="bg-white/10 text-white placeholder-white/60 rounded px-3 py-2" required />
        <input name="pickup_lat" value={form.pickup_lat} onChange={handleChange} placeholder="Pickup latitude" className="bg-white/10 text-white placeholder-white/60 rounded px-3 py-2" required />
        <input name="pickup_lng" value={form.pickup_lng} onChange={handleChange} placeholder="Pickup longitude" className="bg-white/10 text-white placeholder-white/60 rounded px-3 py-2" required />
        <input name="destination" value={form.destination} onChange={handleChange} placeholder="Destination (optional)" className="bg-white/10 text-white placeholder-white/60 rounded px-3 py-2 sm:col-span-2" />
        <select name="priority" value={form.priority} onChange={handleChange} className="bg-white/10 text-white rounded px-3 py-2">
          <option value="normal">Normal</option>
          <option value="urgent">Urgent</option>
          <option value="critical">Critical</option>
        </select>
        <button disabled={loading} className="bg-red-500 hover:bg-red-600 text-white rounded px-4 py-2 font-semibold disabled:opacity-50">
          {loading ? 'Requesting...' : 'Request Ambulance'}
        </button>
      </form>
      {result && (
        <div className={`mt-4 text-sm ${result.ok ? 'text-green-300' : 'text-red-300'}`}>
          {result.ok ? (
            <p>Request created. Reference ID: {result.id}</p>
          ) : (
            <p>Error: {result.message}</p>
          )}
        </div>
      )}
    </div>
  )
}

export default RequestForm
