import { useState } from 'react'
import Navbar from './components/Navbar'
import RequestForm from './components/RequestForm'
import Nearby from './components/Nearby'
import RegisterAmbulance from './components/RegisterAmbulance'

function App() {
  const [tab, setTab] = useState('request')

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 relative">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(239,68,68,0.15),transparent_40%),radial-gradient(circle_at_70%_60%,rgba(59,130,246,0.12),transparent_40%)]" />

      <div className="relative max-w-5xl mx-auto px-6 py-10">
        <Navbar current={tab} onChange={setTab} />

        <div className="mt-8 grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            {tab === 'request' && <RequestForm />}
            {tab === 'nearby' && <Nearby />}
            {tab === 'register' && <RegisterAmbulance />}
          </div>

          <div className="bg-white/5 border border-white/10 rounded-2xl p-6 text-white/80">
            <h3 className="text-white font-semibold mb-2">How it works</h3>
            <ol className="list-decimal list-inside space-y-2 text-sm">
              <li>Share the pickup location and priority.</li>
              <li>We match you with the closest available ambulance.</li>
              <li>Track status until you reach the hospital.</li>
            </ol>
            <div className="mt-4 text-xs text-white/60">
              Focused on Ethiopia: local phone support and region-aware defaults.
            </div>
            <a href="/test" className="inline-block mt-6 text-xs bg-white/10 hover:bg-white/20 px-3 py-1.5 rounded">System status</a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App