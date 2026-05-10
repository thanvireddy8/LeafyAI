import { useState } from 'react'
import { Heart, Clock, Users, ChevronRight } from 'lucide-react'
import { useNutrition } from '../../context/NutritionContext'
import { getTagColor } from '../../utils/helpers'
import { getFoodImage } from '../../utils/foodImages'
import RecipeDetail from './RecipeDetail'

const FALLBACK = 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=600&h=400&fit=crop&auto=format&q=80'

export default function RecipeCard({ recipe }) {
  const { toggleSave, isSaved } = useNutrition()
  const [open, setOpen]           = useState(false)
  const [imgLoaded, setImgLoaded] = useState(false)
  const [imgError, setImgError]   = useState(false)
  const saved = isSaved(recipe.id)

  // Pass both name and id for best match
  const imageSrc = imgError ? FALLBACK : getFoodImage(recipe.name)

  return (
    <>
      <div
        onClick={() => setOpen(true)}
        className="card cursor-pointer hover:shadow-md transition-all duration-200 flex flex-col overflow-hidden group"
      >
        <div className="relative w-full h-40 bg-gray-100 flex-shrink-0">
          {!imgLoaded && (
            <div className="absolute inset-0 bg-gradient-to-r from-gray-100 via-gray-200 to-gray-100 animate-pulse" />
          )}
          <img
            src={imageSrc}
            alt={recipe.name}
            loading="lazy"
            onLoad={() => setImgLoaded(true)}
            onError={() => { setImgError(true); setImgLoaded(true) }}
            className={`w-full h-full object-cover transition-all duration-500 group-hover:scale-105 ${imgLoaded ? 'opacity-100' : 'opacity-0'}`}
          />
          <button
            onClick={e => { e.stopPropagation(); toggleSave(recipe) }}
            className={`absolute top-2 right-2 w-7 h-7 rounded-full flex items-center justify-center transition-colors bg-white/80 backdrop-blur-sm shadow-sm ${
              saved ? 'text-red-400' : 'text-gray-400 hover:text-red-400'
            }`}
          >
            <Heart size={13} fill={saved ? 'currentColor' : 'none'} />
          </button>
        </div>

        <div className="p-4">
          <h3 className="text-sm font-semibold text-gray-900 group-hover:text-leaf-600 transition-colors leading-snug mb-2">
            {recipe.name}
          </h3>
          {recipe.description && (
            <p className="text-xs text-gray-400 mb-2 line-clamp-2">{recipe.description}</p>
          )}
          <div className="flex flex-wrap gap-1.5 mb-3">
            {recipe.tags?.slice(0, 2).map(tag => (
              <span key={tag} className={`${getTagColor(tag)} text-xs px-2 py-0.5 rounded-full`}>{tag}</span>
            ))}
          </div>
          <div className="flex items-center justify-between text-xs text-gray-400">
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1"><Clock size={11} />{recipe.time}</span>
              {recipe.servings && <span className="flex items-center gap-1"><Users size={11} />{recipe.servings}</span>}
            </div>
            <div className="flex items-center gap-2">
              <span className="font-medium text-gray-700">{recipe.calories} kcal</span>
              <span className="text-leaf-600 font-medium flex items-center gap-0.5">View <ChevronRight size={12} /></span>
            </div>
          </div>
        </div>
      </div>

      {open && <RecipeDetail recipe={recipe} onClose={() => setOpen(false)} />}
    </>
  )
}