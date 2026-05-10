import Layout from '../components/layout/Layout'
import RecipeCard from '../components/recipes/RecipeCard'
import { useNutrition } from '../context/NutritionContext'
import { Heart } from 'lucide-react'

export default function SavedRecipes() {
  const { savedRecipes } = useNutrition()

  return (
    <Layout title="Saved Recipes">
      {savedRecipes.length === 0 ? (
        <div className="text-center py-20 text-gray-400">
          <Heart size={40} className="mx-auto mb-3 opacity-20" />
          <p className="text-sm">No saved recipes yet.</p>
          <p className="text-xs mt-1">Tap the heart on any recipe to save it here.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {savedRecipes.map(r => <RecipeCard key={r.id} recipe={r} />)}
        </div>
      )}
    </Layout>
  )
}
