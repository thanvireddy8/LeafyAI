import { useState } from 'react'
import Layout from '../components/layout/Layout'
import RecipeCard from '../components/recipes/RecipeCard'
import { generateRecipe } from '../api/gemini'
import { SAMPLE_MEALS, DIET_GOALS } from '../utils/constants'
import { Search, Sparkles, Loader2 } from 'lucide-react'
import toast from 'react-hot-toast'

const ALL_RECIPES = Object.entries(SAMPLE_MEALS).flatMap(([type, meals]) =>
  meals.map(m => ({ ...m, mealType: type }))
)

export default function RecipesPage() {
  const [query, setQuery] = useState('')
  const [filter, setFilter] = useState('All')
  const [aiIngredients, setAiIngredients] = useState('')
  const [aiGoal, setAiGoal] = useState('maintenance')
  const [aiResult, setAiResult] = useState(null)
  const [loading, setLoading] = useState(false)

  const filters = ['All', 'Breakfast', 'Lunch', 'Dinner', 'Snack']

  const filtered = ALL_RECIPES.filter(r => {
    const matchType = filter === 'All' || r.mealType === filter
    const matchQ = !query || r.name.toLowerCase().includes(query.toLowerCase()) ||
      r.tags?.some(t => t.toLowerCase().includes(query.toLowerCase()))
    return matchType && matchQ
  })

  const handleGenerate = async () => {
    if (!aiIngredients.trim()) return toast.error('Enter ingredients first')
    setLoading(true)
    setAiResult(null)
    try {
      const ings = aiIngredients.split(',').map(s => s.trim()).filter(Boolean)
      const recipe = await generateRecipe({ ingredients: ings, goal: aiGoal, maxCalories: 600 })
      setAiResult({ ...recipe, id: `ai-${Date.now()}`, mealType: 'AI Generated' })
      toast.success('Recipe created! 🌿')
    } catch {
      toast.error('Generation failed')
    }
    setLoading(false)
  }

  return (
    <Layout title="Recipes">
      <div className="space-y-6">
        {/* AI Generator */}
        <div className="card p-5">
          <div className="flex items-center gap-2 mb-3">
            <Sparkles size={16} className="text-leaf-500" />
            <h2 className="text-sm font-semibold text-gray-800">AI recipe generator</h2>
          </div>
          <div className="flex gap-3 flex-wrap">
            <input
              placeholder="Ingredients (e.g. tofu, spinach, cumin)"
              value={aiIngredients}
              onChange={e => setAiIngredients(e.target.value)}
              className="input-field flex-1 min-w-48 text-sm"
              onKeyDown={e => e.key === 'Enter' && handleGenerate()}
            />
            <select
              value={aiGoal}
              onChange={e => setAiGoal(e.target.value)}
              className="input-field w-44 text-sm"
            >
              {DIET_GOALS.map(g => <option key={g.id} value={g.id}>{g.icon} {g.label}</option>)}
            </select>
            <button onClick={handleGenerate} disabled={loading}
              className="btn-primary text-sm flex items-center gap-2 whitespace-nowrap">
              {loading ? <><Loader2 size={14} className="animate-spin" />Generating…</> : '✨ Generate'}
            </button>
          </div>
          {aiResult && (
            <div className="mt-4 max-w-xs">
              <RecipeCard recipe={aiResult} />
            </div>
          )}
        </div>

        {/* Search + Filter */}
        <div className="flex items-center gap-3 flex-wrap">
          <div className="relative flex-1 min-w-48">
            <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              placeholder="Search recipes or tags…"
              value={query}
              onChange={e => setQuery(e.target.value)}
              className="input-field pl-9 text-sm"
            />
          </div>
          <div className="flex gap-2">
            {filters.map(f => (
              <button key={f} onClick={() => setFilter(f)}
                className={`text-xs px-3 py-1.5 rounded-full border transition-all ${
                  filter === f ? 'bg-leaf-400 text-white border-leaf-400' : 'border-gray-200 text-gray-500 hover:border-leaf-300'
                }`}>
                {f}
              </button>
            ))}
          </div>
        </div>

        {/* Results */}
        <div>
          <p className="text-xs text-gray-400 mb-3">{filtered.length} recipes</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filtered.map(r => <RecipeCard key={r.id} recipe={r} />)}
          </div>
        </div>
      </div>
    </Layout>
  )
}
