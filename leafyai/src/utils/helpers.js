export const formatDate = (date = new Date()) => {
  return date.toLocaleDateString('en-IN', {
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
  })
}

export const getGreeting = () => {
  const h = new Date().getHours()
  if (h < 12) return 'Good morning'
  if (h < 17) return 'Good afternoon'
  return 'Good evening'
}

export const calcMacroPercent = (consumed, goal) =>
  Math.min(Math.round((consumed / goal) * 100), 100)

export const getTagColor = (tag) => {
  const map = {
    'High Protein': 'tag-green',
    'Iron-rich':    'tag-blue',
    'Diabetic-safe':'tag-amber',
    'Low Fat':      'tag-green',
    'High Fiber':   'tag-blue',
    'Gluten-free':  'tag-amber',
    'Calcium boost':'tag-blue',
    'Energy Boost': 'tag-amber',
    'Probiotic':    'tag-green',
    'Low Sugar':    'tag-green',
    'Whole Food':   'tag-blue',
  }
  return map[tag] || 'tag-green'
}

export const generateMealId = () =>
  Math.random().toString(36).slice(2, 9)

export const sumNutrition = (meals) =>
  meals.reduce((acc, m) => ({
    calories: acc.calories + (m.calories || 0),
    protein:  acc.protein  + (m.protein  || 0),
    carbs:    acc.carbs    + (m.carbs    || 0),
    fat:      acc.fat      + (m.fat      || 0),
    fiber:    acc.fiber    + (m.fiber    || 0),
  }), { calories: 0, protein: 0, carbs: 0, fat: 0, fiber: 0 })
