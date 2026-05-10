import { useNutrition } from '../../context/NutritionContext'
import { Flame, Dumbbell, BookOpen, Zap } from 'lucide-react'

const StatCard = ({ icon: Icon, label, value, sub, color }) => (
  <div className="card p-4">
    <div className="flex items-start justify-between mb-2">
      <p className="text-xs text-gray-400 font-medium">{label}</p>
      <div className={`w-7 h-7 rounded-lg flex items-center justify-center ${color}`}>
        <Icon size={14} className="text-white" />
      </div>
    </div>
    <p className="text-2xl font-display font-semibold text-gray-900">{value}</p>
    <p className="text-xs text-gray-400 mt-0.5">{sub}</p>
  </div>
)

export default function StatsRow() {
  const { consumed, goals, savedRecipes, streak } = useNutrition()
  const remaining = Math.max(0, goals.calories - consumed.calories)

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      <StatCard
        icon={Flame}
        label="Calories left"
        value={remaining.toLocaleString()}
        sub={`of ${goals.calories.toLocaleString()} kcal goal`}
        color="bg-orange-400"
      />
      <StatCard
        icon={Dumbbell}
        label="Protein today"
        value={`${consumed.protein}g`}
        sub={`target ${goals.protein}g`}
        color="bg-leaf-400"
      />
      <StatCard
        icon={BookOpen}
        label="Saved recipes"
        value={savedRecipes.length}
        sub="in your collection"
        color="bg-blue-400"
      />
      <StatCard
        icon={Zap}
        label="Day streak"
        value={`${streak} 🔥`}
        sub="days on plan"
        color="bg-amber-400"
      />
    </div>
  )
}
