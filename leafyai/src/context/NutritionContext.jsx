import { createContext, useContext, useState, useEffect } from 'react'
import { useAuth } from './AuthContext'
import { sumNutrition } from '../utils/helpers'
import { CALORIE_GOALS } from '../utils/constants'

const NutritionContext = createContext(null)

export const NutritionProvider = ({ children }) => {
  const { user } = useAuth()

  const [todayMeals, setTodayMeals] = useState([])
  const [savedRecipes, setSavedRecipes] = useState([])
  const [streak] = useState(12)

  const userId = user?.id || user?.user_id

  const calorieGoal =
    CALORIE_GOALS[user?.preferences?.goal] ||
    user?.preferences?.calorieGoal ||
    2200

  const goals = {
    calories: calorieGoal,
    protein: Math.round(calorieGoal * 0.2 / 4),
    carbs: Math.round(calorieGoal * 0.5 / 4),
    fat: Math.round(calorieGoal * 0.3 / 9),
    fiber: 30,
  }

  const consumed = sumNutrition(todayMeals)

  useEffect(() => {
    const fetchSavedRecipes = async () => {
      if (!userId) {
        setSavedRecipes([])
        return
      }

      try {
        const res = await fetch(`http://127.0.0.1:8000/saved-recipes/${userId}`)
        const data = await res.json()

        const recipes = data.map(item => item.recipe_data)
        setSavedRecipes(recipes)
      } catch (error) {
        console.log('Failed to fetch saved recipes:', error)
      }
    }

    fetchSavedRecipes()
  }, [userId])

  const addMeal = (meal) => {
    setTodayMeals(prev => [...prev, { ...meal, addedAt: Date.now() }])
  }

  const removeMeal = (mealId) => {
    setTodayMeals(prev => prev.filter(m => m.id !== mealId))
  }

  const toggleSave = async (recipe) => {
    if (!userId) {
      console.log('Current user:', user)
      alert('User ID missing. Please sign out and login again.')
      return
    }

    const exists = savedRecipes.find(r => r.id === recipe.id)

    if (exists) {
      setSavedRecipes(prev => prev.filter(r => r.id !== recipe.id))
      return
    }

    try {
      const res = await fetch('http://127.0.0.1:8000/save-recipe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user_id: userId,
          recipe_id: recipe.id,
          recipe_name: recipe.name,
          recipe_data: JSON.stringify(recipe),
        }),
      })

      const data = await res.json()

      if (data.success) {
        setSavedRecipes(prev => [...prev, recipe])
      } else {
        alert(data.message)
      }
    } catch (error) {
      console.log('Save recipe failed:', error)
      alert('Recipe save failed')
    }
  }

  const isSaved = (id) => savedRecipes.some(r => r.id === id)

  return (
    <NutritionContext.Provider
      value={{
        todayMeals,
        consumed,
        goals,
        addMeal,
        removeMeal,
        savedRecipes,
        toggleSave,
        isSaved,
        streak,
      }}
    >
      {children}
    </NutritionContext.Provider>
  )
}

export const useNutrition = () => {
  const ctx = useContext(NutritionContext)
  if (!ctx) throw new Error('useNutrition must be inside NutritionProvider')
  return ctx
}