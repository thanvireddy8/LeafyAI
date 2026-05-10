import { useState } from 'react'
import Layout from '../components/layout/Layout'
import StatsRow from '../components/nutrition/StatsRow'
import NutritionTracker from '../components/nutrition/NutritionTracker'
import ChatInterface from '../components/chat/ChatInterface'
import MealCard from '../components/meals/MealCard'
import { SAMPLE_MEALS, GOAL_PRIORITY_TAGS } from '../utils/constants'
import { useNutrition } from '../context/NutritionContext'
import { useAuth } from '../context/AuthContext'
import { Trash2 } from 'lucide-react'
import toast from 'react-hot-toast'

function sortByGoal(recipes = [], goal = 'maintenance') {
  const priorityTags = GOAL_PRIORITY_TAGS?.[goal] || []

  return [...recipes].sort((a, b) => {
    const aScore = a.tags?.filter((t) => priorityTags.includes(t)).length || 0
    const bScore = b.tags?.filter((t) => priorityTags.includes(t)).length || 0
    return bScore - aScore
  })
}

function generateRecipeFromIngredients(ingredientsText, userGoal) {
  const clean = ingredientsText
    .split(',')
    .map((item) => item.trim())
    .filter(Boolean)

  const main = clean[0] || 'Mixed Vegetables'

  return {
    id: `gen-${Date.now()}`,
    name: `${main} Vegan Power Bowl`,
    description: `A beginner-friendly vegan recipe generated from your available ingredients: ${clean.join(', ')}.`,
    calories: userGoal === 'weight-loss' ? 350 : 480,
    protein: userGoal === 'muscle-gain' ? 28 : 18,
    carbs: 45,
    fat: 12,
    fiber: 9,
    tags:
      userGoal === 'weight-loss'
        ? ['Low Calorie', 'High Fiber']
        : userGoal === 'muscle-gain'
        ? ['High Protein', 'Energy Dense']
        : ['Balanced', 'Whole Food'],
    time: '20 min',
    servings: 1,
    ingredients: [
      `${clean.join(', ') || '2 cups mixed vegetables'}`,
      '1/2 cup cooked rice, quinoa, or millet',
      '1 tsp oil',
      '1/2 tsp cumin powder',
      '1/2 tsp black pepper',
      '1 tsp lemon juice',
      'Salt as required',
    ],
    steps: [
      'Wash and chop all vegetables or ingredients into small pieces.',
      'Heat 1 tsp oil in a pan on medium flame.',
      'Add the chopped ingredients and sauté for 4–5 minutes.',
      'Add cumin powder, black pepper, and salt.',
      'Add cooked rice, quinoa, or millet and mix well.',
      'Cook for another 3–4 minutes until everything is combined.',
      'Turn off the flame and add lemon juice.',
      'Serve warm in a bowl.',
    ],
    beginnerTip: 'Cut ingredients into small equal pieces so they cook evenly.',
  }
}

const GOAL_LABELS = {
  'weight-loss': 'your weight-loss goal',
  'muscle-gain': 'your muscle-gain goal',
  maintenance: 'your maintenance goal',
  diabetic: 'your diabetic-friendly goal',
  'iron-rich': 'your iron-rich goal',
}

const SECTION_ORDER = [
  'Breakfast',
  'Lunch',
  'Dinner',
  'Refreshers',
  'Snack',
  'Dessert',
]

export default function Dashboard() {
  const { todayMeals, removeMeal } = useNutrition()
  const { user } = useAuth()

  const userGoal = user?.preferences?.goal || 'maintenance'

  const [ingredientsText, setIngredientsText] = useState('')
  const [generatedRecipes, setGeneratedRecipes] = useState([])

  const handleGenerateRecipe = () => {
    if (!ingredientsText.trim()) {
      toast.error('Please enter some ingredients')
      return
    }

    const recipe = generateRecipeFromIngredients(ingredientsText, userGoal)
    setGeneratedRecipes((prev) => [recipe, ...prev])
    setIngredientsText('')
    toast.success('Recipe generated successfully 🌱')
  }

  return (
    <Layout title="Dashboard">
      <div className="space-y-8">
        <StatsRow />

        <div>
          <h2 className="text-base font-semibold text-gray-900">
            Recommended for {GOAL_LABELS[userGoal] || 'you'}
          </h2>

          <p className="text-sm text-gray-400 mt-0.5">
            {userGoal === 'weight-loss' &&
              'Low calorie, high fiber meals to support your goal.'}
            {userGoal === 'muscle-gain' &&
              'High protein, energy-dense meals to fuel your workouts.'}
            {userGoal === 'maintenance' &&
              'Balanced everyday nutrition for sustained energy.'}
            {userGoal === 'diabetic' &&
              'Smart meal suggestions focused on balanced carbs, fiber, and stable energy.'}
            {userGoal === 'iron-rich' &&
              'Iron-packed plant-based meals to meet your daily needs.'}
          </p>
        </div>

        <div className="card p-5">
          <h2 className="text-sm font-semibold text-gray-800 mb-2">
            Generate recipe from your available ingredients
          </h2>

          <p className="text-xs text-gray-400 mb-3">
            Enter ingredients separated by commas. Example: tofu, spinach, rice, lemon.
          </p>

          <textarea
            value={ingredientsText}
            onChange={(e) => setIngredientsText(e.target.value)}
            className="w-full border border-gray-200 rounded-xl p-3 text-sm outline-none focus:ring-2 focus:ring-leaf-200 resize-none"
            rows="3"
            placeholder="Example: oats, banana, chia seeds, almond milk"
          />

          <button
            onClick={handleGenerateRecipe}
            className="btn-primary mt-3 px-4 py-2 text-sm"
          >
            Generate Vegan Recipe
          </button>
        </div>

        {generatedRecipes.length > 0 && (
          <div>
            <h3 className="text-sm font-semibold text-gray-700 mb-3">
              Generated Recipes
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
              {generatedRecipes.map((meal) => (
                <MealCard key={meal.id} meal={meal} mealType="Generated" />
              ))}
            </div>
          </div>
        )}

        {SECTION_ORDER.map((type) => {
          const meals = SAMPLE_MEALS[type]

          if (!meals?.length) return null

          const sorted = sortByGoal(meals, userGoal)

          return (
            <div key={type}>
              <h3 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
                {type}
                <span className="text-xs font-normal text-gray-400">
                  {sorted.length} recipe{sorted.length !== 1 ? 's' : ''}
                </span>
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
                {sorted.map((meal) => (
                  <MealCard key={meal.id} meal={meal} mealType={type} />
                ))}
              </div>
            </div>
          )
        })}

        {todayMeals.length > 0 && (
          <div>
            <h2 className="text-sm font-semibold text-gray-800 mb-3">
              Today's logged meals
              <span className="ml-2 text-xs font-normal text-gray-400">
                ({todayMeals.length} items)
              </span>
            </h2>

            <div className="card divide-y divide-gray-50">
              {todayMeals.map((meal, i) => (
                <div
                  key={`${meal.id}-${i}`}
                  className="flex items-center justify-between px-4 py-3"
                >
                  <div>
                    <p className="text-sm font-medium text-gray-800">
                      {meal.name}
                    </p>

                    <p className="text-xs text-gray-400">
                      {meal.mealType} · {meal.calories} kcal · {meal.protein}g protein
                    </p>
                  </div>

                  <button
                    onClick={() => {
                      removeMeal(meal.id)
                      toast.success('Removed from today', {
                        style: {
                          borderRadius: '12px',
                          fontSize: '13px',
                        },
                      })
                    }}
                    className="text-gray-300 hover:text-red-400 transition-colors"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <NutritionTracker />

          <div className="h-96">
            <ChatInterface compact />
          </div>
        </div>
      </div>
    </Layout>
  )
}