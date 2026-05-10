import { X, Heart, Clock, Users, ChefHat } from 'lucide-react'
import { useNutrition } from '../../context/NutritionContext'
import { getTagColor } from '../../utils/helpers'
import MacroBar from '../nutrition/MacroBar'

export default function RecipeDetail({ recipe, onClose }) {
  const { toggleSave, isSaved, addMeal } = useNutrition()
  const saved = isSaved(recipe.id)

  return (
    <div
      className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl">
        <div className="sticky top-0 bg-white border-b border-gray-100 px-5 py-4 flex items-start justify-between z-10">
          <div className="flex-1 pr-4">
            <h2 className="font-display font-semibold text-gray-900 leading-snug text-lg">
              {recipe.name}
            </h2>

            {recipe.description && (
              <p className="text-sm text-gray-400 mt-1">
                {recipe.description}
              </p>
            )}
          </div>

          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-700 transition mt-0.5"
          >
            <X size={18} />
          </button>
        </div>

        <div className="p-5 space-y-6">
          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
            <span className="flex items-center gap-1.5">
              <Clock size={14} /> {recipe.time}
            </span>

            {recipe.servings && (
              <span className="flex items-center gap-1.5">
                <Users size={14} /> {recipe.servings} servings
              </span>
            )}

            <span className="flex items-center gap-1.5">
              <ChefHat size={14} /> Vegan
            </span>
          </div>

          <div className="flex flex-wrap gap-2">
            {recipe.tags?.map((tag) => (
              <span
                key={tag}
                className={`${getTagColor(tag)} text-xs px-2.5 py-1 rounded-full`}
              >
                {tag}
              </span>
            ))}
          </div>

          <div className="space-y-2.5">
            <h3 className="text-sm font-semibold text-gray-800">
              Nutrition per serving
            </h3>

            <MacroBar label="Calories" consumed={recipe.calories} goal={recipe.calories} unit=" kcal" colorKey="calories" />
            <MacroBar label="Protein" consumed={recipe.protein} goal={recipe.protein} unit="g" colorKey="protein" />
            <MacroBar label="Carbs" consumed={recipe.carbs} goal={recipe.carbs} unit="g" colorKey="carbs" />
            <MacroBar label="Fat" consumed={recipe.fat} goal={recipe.fat} unit="g" colorKey="fat" />

            {recipe.fiber && (
              <MacroBar label="Fiber" consumed={recipe.fiber} goal={recipe.fiber} unit="g" colorKey="fiber" />
            )}
          </div>

          {recipe.ingredients?.length > 0 && (
            <div>
              <h3 className="text-sm font-semibold text-gray-800 mb-3">
                Ingredients with measurements
              </h3>

              <ul className="space-y-2">
                {recipe.ingredients.map((ing, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                    <span className="w-1.5 h-1.5 rounded-full bg-leaf-400 flex-shrink-0 mt-2" />
                    <span>{ing}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {recipe.steps?.length > 0 && (
            <div>
              <h3 className="text-sm font-semibold text-gray-800 mb-3">
                Beginner-friendly cooking steps
              </h3>

              <ol className="space-y-3">
                {recipe.steps.map((step, i) => (
                  <li key={i} className="flex gap-3 text-sm text-gray-600 leading-relaxed">
                    <span className="w-6 h-6 rounded-full bg-leaf-100 text-leaf-700 flex items-center justify-center text-xs font-semibold flex-shrink-0 mt-0.5">
                      {i + 1}
                    </span>
                    <span>{step}</span>
                  </li>
                ))}
              </ol>
            </div>
          )}

          {recipe.beginnerTip && (
            <div className="bg-leaf-50 border border-leaf-100 rounded-xl p-3 text-sm text-leaf-800">
              💡 <span className="font-semibold">Beginner tip:</span> {recipe.beginnerTip}
            </div>
          )}

          {recipe.tip && !recipe.beginnerTip && (
            <div className="bg-leaf-50 border border-leaf-100 rounded-xl p-3 text-sm text-leaf-800">
              💡 <span className="font-semibold">Tip:</span> {recipe.tip}
            </div>
          )}

          <div className="flex gap-3 pt-2">
            <button
              onClick={() => {
                addMeal(recipe)
                onClose()
              }}
              className="flex-1 btn-primary text-sm py-2.5"
            >
              + Add to today
            </button>

            <button
              onClick={() => toggleSave(recipe)}
              className={`flex items-center gap-2 btn-outline text-sm py-2.5 px-4 ${
                saved ? 'text-red-500 border-red-200' : ''
              }`}
            >
              <Heart size={15} fill={saved ? 'currentColor' : 'none'} />
              {saved ? 'Saved' : 'Save'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}