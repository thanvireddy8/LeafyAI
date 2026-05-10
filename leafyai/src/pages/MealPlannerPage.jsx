import { useState } from 'react'
import Layout from '../components/layout/Layout'
import { generateMealPlan } from '../api/gemini'
import { useAuth } from '../context/AuthContext'
import { useNutrition } from '../context/NutritionContext'
import { Loader2, RefreshCw, Plus } from 'lucide-react'
import { DIET_GOALS, CALORIE_GOALS } from '../utils/constants'
import toast from 'react-hot-toast'

const MealSlot = ({ label, meal, onAdd }) => {
  if (!meal) return null
  return (
    <div className="card p-4">
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs font-semibold text-gray-400 uppercase tracking-wide">{label}</span>
        <span className="text-xs bg-leaf-50 text-leaf-700 px-2 py-0.5 rounded-full">{meal.time}</span>
      </div>
      <h3 className="text-sm font-semibold text-gray-900 mb-2">{meal.name}</h3>
      <div className="flex flex-wrap gap-1.5 mb-3">
        {meal.tags?.map(t => (
          <span key={t} className="tag-green text-xs">{t}</span>
        ))}
      </div>
      <div className="grid grid-cols-4 gap-2 mb-3 text-center">
        {[['Cal', meal.calories], ['Pro', `${meal.protein}g`], ['Carbs', `${meal.carbs}g`], ['Fat', `${meal.fat}g`]].map(([l, v]) => (
          <div key={l} className="bg-gray-50 rounded-lg py-1.5">
            <p className="text-xs font-semibold text-gray-800">{v}</p>
            <p className="text-xs text-gray-400">{l}</p>
          </div>
        ))}
      </div>
      <button onClick={() => onAdd(meal, label)}
        className="btn-outline w-full text-xs py-1.5 flex items-center justify-center gap-1">
        <Plus size={12} /> Log this meal
      </button>
    </div>
  )
}

export default function MealPlannerPage() {
  const { user } = useAuth()
  const { addMeal } = useNutrition()
  const [plan, setPlan] = useState(null)
  const [loading, setLoading] = useState(false)
  const [settings, setSettings] = useState({
    goal: user?.preferences?.goal || 'maintenance',
    calories: user?.preferences?.calorieGoal || 2200,
    preferences: '',
  })

  const generate = async () => {
    setLoading(true)
    try {
      const result = await generateMealPlan(settings)
      setPlan(result)
      toast.success('Meal plan generated! 🌱')
    } catch {
      toast.error('Failed to generate plan')
    }
    setLoading(false)
  }

  const handleAdd = (meal, label) => {
    addMeal({ ...meal, id: `${label}-${Date.now()}`, mealType: label })
    toast.success(`${label} logged!`, { icon: '🌿' })
  }

  const totalCal = plan
    ? Object.values(plan).reduce((s, m) => s + (m.calories || 0), 0)
    : 0

  return (
    <Layout title="Meal Planner">
      <div className="max-w-3xl space-y-6">
        {/* Settings */}
        <div className="card p-5">
          <h2 className="text-sm font-semibold text-gray-800 mb-4">Generate your meal plan</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1.5">Health goal</label>
              <select
                value={settings.goal}
                onChange={e => setSettings(s => ({ ...s, goal: e.target.value, calories: CALORIE_GOALS[e.target.value] || 2200 }))}
                className="input-field text-sm"
              >
                {DIET_GOALS.map(g => (
                  <option key={g.id} value={g.id}>{g.icon} {g.label}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1.5">Daily calories</label>
              <input
                type="number"
                min={1200} max={4000}
                value={settings.calories}
                onChange={e => setSettings(s => ({ ...s, calories: +e.target.value }))}
                className="input-field text-sm"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1.5">Preferences</label>
              <input
                placeholder="e.g. Indian, Low carb"
                value={settings.preferences}
                onChange={e => setSettings(s => ({ ...s, preferences: e.target.value }))}
                className="input-field text-sm"
              />
            </div>
          </div>
          <button onClick={generate} disabled={loading}
            className="btn-primary text-sm flex items-center gap-2">
            {loading
              ? <><Loader2 size={15} className="animate-spin" /> Generating…</>
              : <><RefreshCw size={15} /> Generate plan</>
            }
          </button>
        </div>

        {/* Results */}
        {plan && (
          <>
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-semibold text-gray-800">Your AI meal plan</h2>
              <span className="text-sm text-gray-500">{totalCal} kcal total</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[['Breakfast', plan.breakfast], ['Lunch', plan.lunch], ['Dinner', plan.dinner], ['Snack', plan.snack]].map(([l, m]) => (
                <MealSlot key={l} label={l} meal={m} onAdd={handleAdd} />
              ))}
            </div>
          </>
        )}

        {!plan && !loading && (
          <div className="text-center py-16 text-gray-400">
            <p className="text-4xl mb-3">🌱</p>
            <p className="text-sm">Click "Generate plan" to get your personalized vegan meal plan</p>
          </div>
        )}
      </div>
    </Layout>
  )
}
