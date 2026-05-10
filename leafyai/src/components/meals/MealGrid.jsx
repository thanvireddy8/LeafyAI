import MealCard from './MealCard'
import toast from 'react-hot-toast'

export default function MealGrid({ meals = [], mealType }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {meals.map(meal => (
        <MealCard
          key={meal.id}
          meal={meal}
          mealType={mealType}
          onAdd={() => toast.success(`${meal.name.slice(0, 20)}... added!`, {
            icon: '🌱',
            style: { borderRadius: '12px', fontSize: '13px' },
          })}
        />
      ))}
    </div>
  )
}
