import Layout from '../components/layout/Layout'
import { useNutrition } from '../context/NutritionContext'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts'

const WEEKLY = [
  { day: 'Mon', calories: 2100, protein: 88 },
  { day: 'Tue', calories: 2340, protein: 102 },
  { day: 'Wed', calories: 1980, protein: 79 },
  { day: 'Thu', calories: 2210, protein: 95 },
  { day: 'Fri', calories: 2450, protein: 115 },
  { day: 'Sat', calories: 2020, protein: 85 },
  { day: 'Sun', calories: 1560, protein: 87 },
]

const ACHIEVEMENTS = [
  { emoji: '🔥', label: '12 day streak',    earned: true  },
  { emoji: '💪', label: 'Protein goal 5x',  earned: true  },
  { emoji: '🌱', label: '30 recipes saved', earned: false },
  { emoji: '⚡', label: '7-day planner',    earned: false },
]

export default function ProgressPage() {
  const { goals, consumed, streak } = useNutrition()

  return (
    <Layout title="Progress">
      <div className="space-y-6 max-w-3xl">
        {/* Streak */}
        <div className="card p-5 flex items-center gap-4">
          <div className="text-5xl">🔥</div>
          <div>
            <p className="text-3xl font-display font-bold text-gray-900">{streak} days</p>
            <p className="text-sm text-gray-400">on plan — keep it up!</p>
          </div>
        </div>

        {/* Calorie chart */}
        <div className="card p-5">
          <h2 className="text-sm font-semibold text-gray-800 mb-4">Weekly calories</h2>
          <ResponsiveContainer width="100%" height={180}>
            <AreaChart data={WEEKLY}>
              <defs>
                <linearGradient id="grad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%"  stopColor="#1D9E75" stopOpacity={0.15} />
                  <stop offset="95%" stopColor="#1D9E75" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="day" tick={{ fontSize: 12, fill: '#9ca3af' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 12, fill: '#9ca3af' }} axisLine={false} tickLine={false} domain={[1500, 2600]} />
              <Tooltip contentStyle={{ borderRadius: 12, border: 'none', boxShadow: '0 4px 16px rgba(0,0,0,.08)', fontSize: 12 }} />
              <Area type="monotone" dataKey="calories" stroke="#1D9E75" strokeWidth={2} fill="url(#grad)" dot={{ fill: '#1D9E75', r: 3 }} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Protein chart */}
        <div className="card p-5">
          <h2 className="text-sm font-semibold text-gray-800 mb-4">Weekly protein (g)</h2>
          <ResponsiveContainer width="100%" height={160}>
            <BarChart data={WEEKLY} barSize={28}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" vertical={false} />
              <XAxis dataKey="day" tick={{ fontSize: 12, fill: '#9ca3af' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 12, fill: '#9ca3af' }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ borderRadius: 12, border: 'none', fontSize: 12 }} />
              <Bar dataKey="protein" fill="#5DCAA5" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Achievements */}
        <div>
          <h2 className="text-sm font-semibold text-gray-800 mb-3">Achievements</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {ACHIEVEMENTS.map(a => (
              <div key={a.label}
                className={`card p-4 text-center transition-opacity ${a.earned ? '' : 'opacity-40'}`}>
                <p className="text-3xl mb-2">{a.emoji}</p>
                <p className="text-xs font-medium text-gray-700">{a.label}</p>
                <p className="text-xs text-gray-400 mt-0.5">{a.earned ? '✓ Earned' : 'Locked'}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  )
}
