import { useState } from 'react'
import Layout from '../components/layout/Layout'
import { useAuth } from '../context/AuthContext'
import { DIET_GOALS, CALORIE_GOALS } from '../utils/constants'
import { SUBSTITUTIONS } from '../utils/constants'
import toast from 'react-hot-toast'
import { getSubstitutions } from '../api/gemini'
import { Loader2 } from 'lucide-react'

export default function PreferencesPage() {
  const { user, updatePreferences } = useAuth()
  const prefs = user?.preferences || {}
  const [form, setForm] = useState({
    goal:        prefs.goal        || 'maintenance',
    calorieGoal: prefs.calorieGoal || 2200,
    allergies:   prefs.allergies   || '',
    cuisine:     prefs.cuisine     || '',
  })

  const [subQuery, setSubQuery] = useState('')
  const [subs, setSubs]         = useState([])
  const [subLoading, setSubLoading] = useState(false)

  const handleSave = () => {
    updatePreferences(form)
    toast.success('Preferences saved! ✅')
  }

  const handleSubSearch = async () => {
    if (!subQuery.trim()) return
    setSubLoading(true)
    const result = await getSubstitutions(subQuery.trim())
    setSubs(result)
    setSubLoading(false)
  }

  return (
    <Layout title="Preferences">
      <div className="max-w-2xl space-y-6">
        {/* Diet settings */}
        <div className="card p-5">
          <h2 className="text-sm font-semibold text-gray-800 mb-4">Diet settings</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1.5">Health goal</label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {DIET_GOALS.map(g => (
                  <button key={g.id} onClick={() => setForm(f => ({ ...f, goal: g.id, calorieGoal: CALORIE_GOALS[g.id] }))}
                    className={`flex items-center gap-2 px-3 py-2.5 rounded-xl border text-sm transition-all ${
                      form.goal === g.id ? 'border-leaf-400 bg-leaf-50 text-leaf-800 font-medium' : 'border-gray-200 text-gray-600 hover:border-gray-300'
                    }`}>
                    <span>{g.icon}</span>{g.label}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1.5">
                Daily calorie goal: <span className="text-leaf-600 font-semibold">{form.calorieGoal} kcal</span>
              </label>
              <input type="range" min={1200} max={4000} step={50}
                value={form.calorieGoal}
                onChange={e => setForm(f => ({ ...f, calorieGoal: +e.target.value }))}
                className="w-full accent-leaf-400"
              />
              <div className="flex justify-between text-xs text-gray-400 mt-1"><span>1200</span><span>4000</span></div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1.5">Allergies / avoid</label>
                <input placeholder="nuts, gluten…" value={form.allergies}
                  onChange={e => setForm(f => ({ ...f, allergies: e.target.value }))}
                  className="input-field text-sm" />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1.5">Cuisine preference</label>
                <input placeholder="Indian, Thai, Italian…" value={form.cuisine}
                  onChange={e => setForm(f => ({ ...f, cuisine: e.target.value }))}
                  className="input-field text-sm" />
              </div>
            </div>
            <button onClick={handleSave} className="btn-primary text-sm">Save preferences</button>
          </div>
        </div>

        {/* Substitution finder */}
        <div className="card p-5">
          <h2 className="text-sm font-semibold text-gray-800 mb-1">AI substitution finder</h2>
          <p className="text-xs text-gray-400 mb-4">Find vegan alternatives for any ingredient</p>
          <div className="flex gap-3 mb-4">
            <input placeholder="e.g. almond milk, butter, eggs"
              value={subQuery} onChange={e => setSubQuery(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleSubSearch()}
              className="input-field flex-1 text-sm" />
            <button onClick={handleSubSearch} disabled={subLoading}
              className="btn-primary text-sm flex items-center gap-2">
              {subLoading ? <Loader2 size={14} className="animate-spin" /> : '🔍'} Find
            </button>
          </div>
          {subs.length > 0 && (
            <div className="space-y-2">
              {subs.map((s, i) => (
                <div key={i} className="flex items-start gap-3 p-3 bg-leaf-50 rounded-xl">
                  <span className="text-leaf-600 font-semibold text-sm min-w-[120px]">{s.substitute}</span>
                  <span className="text-xs text-gray-500">{s.reason}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </Layout>
  )
}
