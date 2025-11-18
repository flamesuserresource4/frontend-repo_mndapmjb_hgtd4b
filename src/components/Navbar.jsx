import { useState } from 'react'

function Navbar({ current, onChange }) {
  const tabs = [
    { key: 'request', label: 'Request Ambulance' },
    { key: 'nearby', label: 'Find Nearby' },
    { key: 'register', label: 'Register Ambulance' },
  ]

  return (
    <div className="w-full flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-red-500 flex items-center justify-center text-white font-bold shadow-lg">M</div>
        <div>
          <h1 className="text-2xl font-bold text-white leading-none">Mella</h1>
          <p className="text-xs text-red-200/80">Ambulance on-demand for Ethiopia</p>
        </div>
      </div>

      <div className="flex items-center gap-2 bg-white/10 p-1 rounded-xl">
        {tabs.map(t => (
          <button
            key={t.key}
            onClick={() => onChange(t.key)}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${current === t.key ? 'bg-white text-slate-900' : 'text-white/80 hover:bg-white/10'}`}
          >
            {t.label}
          </button>
        ))}
      </div>
    </div>
  )
}

export default Navbar
