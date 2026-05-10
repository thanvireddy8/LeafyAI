import MacroBar from './MacroBar'
import { useNutrition } from '../../context/NutritionContext'

export default function NutritionTracker() {
  const { consumed, goals } = useNutrition()

  const bars = [
    { label: 'Calories', consumed: consumed.calories, goal: goals.calories, unit: ' kcal', colorKey: 'calories' },
    { label: 'Protein',  consumed: consumed.protein,  goal: goals.protein,  unit: 'g',     colorKey: 'protein'  },
    { label: 'Carbs',    consumed: consumed.carbs,    goal: goals.carbs,    unit: 'g',     colorKey: 'carbs'    },
    { label: 'Fat',      consumed: consumed.fat,      goal: goals.fat,      unit: 'g',     colorKey: 'fat'      },
    { label: 'Fiber',    consumed: consumed.fiber,    goal: goals.fiber,    unit: 'g',     colorKey: 'fiber'    },
  ]

  return (
    <div className="card p-5">
      <h2 className="text-sm font-semibold text-gray-800 mb-4">Nutrition tracker</h2>
      <div className="space-y-3.5">
        {bars.map(b => <MacroBar key={b.label} {...b} />)}
      </div>
      <p className="text-xs text-gray-400 mt-4 text-center">Updates as you log meals</p>
    </div>
  )
}
