import { useState } from 'react'
import { Heart, Clock, Plus } from 'lucide-react'
import { useNutrition } from '../../context/NutritionContext'
import { getTagColor } from '../../utils/helpers'
import { getFoodImage } from '../../utils/foodImages'
import RecipeDetail from '../recipes/RecipeDetail'
import toast from 'react-hot-toast'

const FALLBACK = 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=600&h=400&fit=crop&auto=format&q=80'

export default function MealCard({ meal, mealType, onAdd }) {
  const { toggleSave, isSaved, addMeal } = useNutrition()
  const [imgLoaded, setImgLoaded] = useState(false)
  const [imgError, setImgError]   = useState(false)
  const [open, setOpen]           = useState(false)
  const saved = isSaved(meal.id)

  // Pass BOTH name and id — id gives exact unique photo, name is fallback
  const imageSrc = imgError ? FALLBACK : getFoodImage(meal.name)

  const handleAdd = (e) => {
    e.stopPropagation()
    addMeal({ ...meal, mealType })
    onAdd?.()
    toast.success(`Added to today!`, {
      icon: '🌱',
      style: { borderRadius: '12px', fontSize: '13px' },
    })
  }

  const handleSave = (e) => {
    e.stopPropagation()
    toggleSave(meal)
  }

  return (
    <>
      <div
        onClick={() => setOpen(true)}
        className="card w-[380px] min-h-[460px] p-4 hover:shadow-md transition-all duration-200 flex flex-col cursor-pointer group"
      >
        <div className="relative w-full h-48 rounded-2xl overflow-hidden mb-4 bg-gray-100 flex-shrink-0">
          {!imgLoaded && (
            <div className="absolute inset-0 bg-gradient-to-r from-gray-100 via-gray-200 to-gray-100 animate-pulse rounded-2xl" />
          )}
          <img
            src={imageSrc}
            alt={meal.name}
            loading="lazy"
            onLoad={() => setImgLoaded(true)}
            onError={() => { setImgError(true); setImgLoaded(true) }}
            className={`w-full h-full object-cover rounded-2xl transition-opacity duration-500 ${imgLoaded ? 'opacity-100' : 'opacity-0'}`}
          />
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-200 rounded-2xl flex items-center justify-center">
            <span className="opacity-0 group-hover:opacity-100 text-white text-xs font-medium bg-black/50 px-3 py-1 rounded-full transition-all duration-200">
              View recipe
            </span>
          </div>
        </div>

        <div className="flex items-start justify-between mb-2">
          <span className="text-xs text-gray-400 font-medium uppercase tracking-wide">{mealType}</span>
          <button onClick={handleSave}
            className={`transition-colors ${saved ? 'text-red-400' : 'text-gray-300 hover:text-red-400'}`}>
            <Heart size={15} fill={saved ? 'currentColor' : 'none'} />
          </button>
        </div>

        <h3 className="text-sm font-semibold text-gray-900 mb-3 leading-snug group-hover:text-leaf-600 transition-colors">
          {meal.name}
        </h3>

        <div className="flex flex-wrap gap-1.5 mb-3">
          {meal.tags?.map(tag => (
            <span key={tag} className={`${getTagColor(tag)} text-xs px-2 py-0.5 rounded-full font-medium`}>{tag}</span>
          ))}
        </div>

        <div className="mt-auto">
          <div className="grid grid-cols-3 gap-2 mb-3 text-center">
            {[
              { label: 'Cal',     val: meal.calories       },
              { label: 'Protein', val: `${meal.protein}g` },
              { label: 'Carbs',   val: `${meal.carbs}g`   },
            ].map(({ label, val }) => (
              <div key={label} className="bg-gray-50 rounded-lg py-2">
                <p className="text-xs font-semibold text-gray-800">{val}</p>
                <p className="text-xs text-gray-400">{label}</p>
              </div>
            ))}
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1 text-gray-400">
              <Clock size={12} />
              <span className="text-xs">{meal.time}</span>
            </div>
            <button onClick={handleAdd} className="flex items-center gap-1 text-xs btn-primary py-2 px-4">
              <Plus size={12} /> Add to today
            </button>
          </div>
        </div>
      </div>

      {open && <RecipeDetail recipe={meal} onClose={() => setOpen(false)} />}
    </>
  )
}