const API_KEY = import.meta.env.VITE_GEMINI_API_KEY
const BASE_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent'

const callGemini = async (prompt) => {
  if (!API_KEY) {
    // Demo fallback when no key is set
    return null
  }
  const res = await fetch(`${BASE_URL}?key=${API_KEY}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      contents: [{ parts: [{ text: prompt }] }],
      generationConfig: { temperature: 0.8, maxOutputTokens: 1024 },
    }),
  })
  const data = await res.json()
  return data.candidates?.[0]?.content?.parts?.[0]?.text || ''
}

// Generate a single recipe from ingredients + goal
export const generateRecipe = async ({ ingredients, goal, maxCalories }) => {
  const prompt = `You are a vegan nutrition expert. Create a detailed vegan recipe using these ingredients: ${ingredients.join(', ')}.
Dietary goal: ${goal}. Target calories: under ${maxCalories} kcal.
Respond ONLY as JSON:
{
  "name": "Recipe Name",
  "description": "One sentence description",
  "calories": 400,
  "protein": 20,
  "carbs": 45,
  "fat": 12,
  "fiber": 8,
  "time": "20 min",
  "servings": 2,
  "tags": ["High Protein"],
  "ingredients": ["1 cup tofu", "2 cups spinach"],
  "steps": ["Step 1...", "Step 2..."],
  "tip": "Pro tip..."
}`
  const raw = await callGemini(prompt)
  if (!raw) return getDemoRecipe(ingredients)
  try {
    const clean = raw.replace(/```json|```/g, '').trim()
    return JSON.parse(clean)
  } catch {
    return getDemoRecipe(ingredients)
  }
}

// Generate a full day meal plan
export const generateMealPlan = async ({ goal, calories, preferences }) => {
  const prompt = `You are a vegan nutritionist. Create a complete vegan meal plan for one day.
Goal: ${goal}. Daily calories: ${calories}. Preferences: ${preferences || 'none'}.
Respond ONLY as JSON with this structure:
{
  "breakfast": { "name": "...", "calories": 400, "protein": 20, "carbs": 40, "fat": 12, "fiber": 6, "time": "15 min", "tags": ["High Protein"] },
  "lunch":     { "name": "...", "calories": 520, "protein": 22, "carbs": 60, "fat": 10, "fiber": 12, "time": "25 min", "tags": ["High Fiber"] },
  "dinner":    { "name": "...", "calories": 550, "protein": 30, "carbs": 55, "fat": 16, "fiber": 9,  "time": "30 min", "tags": ["High Protein"] },
  "snack":     { "name": "...", "calories": 180, "protein": 8,  "carbs": 20, "fat": 6,  "fiber": 4,  "time": "5 min",  "tags": ["Low Sugar"] }
}`
  const raw = await callGemini(prompt)
  if (!raw) return getDemoMealPlan(goal)
  try {
    const clean = raw.replace(/```json|```/g, '').trim()
    return JSON.parse(clean)
  } catch {
    return getDemoMealPlan(goal)
  }
}

// AI Chat — nutrition assistant
export const chatWithAI = async (messages) => {
  const systemPrompt = `You are LeafyAI, a friendly vegan nutrition assistant. 
Help users with: vegan recipes, ingredient substitutions, meal planning, nutritional advice.
Keep responses concise (2-4 sentences). Use simple language. Suggest only vegan options.
If asked about non-vegan substitutes, always suggest the vegan alternative.`

  const conversation = messages.map(m => `${m.role === 'user' ? 'User' : 'Assistant'}: ${m.content}`).join('\n')
  const prompt = `${systemPrompt}\n\nConversation:\n${conversation}\nAssistant:`

  const raw = await callGemini(prompt)
  if (!raw) return getDemoReply(messages[messages.length - 1]?.content || '')
  return raw.trim()
}

// Ingredient substitution
export const getSubstitutions = async (ingredient) => {
  const prompt = `List 4 vegan substitutes for "${ingredient}" in cooking. For each, give 1 short sentence why it works.
Respond ONLY as JSON array:
[{"substitute": "oat milk", "reason": "Creamy texture, works well in baking and smoothies"}]`
  const raw = await callGemini(prompt)
  if (!raw) return getDefaultSubs(ingredient)
  try {
    const clean = raw.replace(/```json|```/g, '').trim()
    return JSON.parse(clean)
  } catch {
    return getDefaultSubs(ingredient)
  }
}

// ── Demo fallbacks (no API key needed) ──────────────────────────────────────

const getDemoRecipe = (ingredients) => ({
  name: `Spiced ${ingredients[0] || 'Tofu'} Bowl`,
  description: 'A nourishing high-protein vegan bowl with bold Indian spices.',
  calories: 480, protein: 26, carbs: 52, fat: 14, fiber: 9,
  time: '20 min', servings: 2,
  tags: ['High Protein', 'Iron-rich'],
  ingredients: ingredients.map(i => `1 cup ${i}`),
  steps: [
    'Prep and chop all vegetables.',
    'Sauté spices in oil for 1 minute.',
    `Add ${ingredients[0] || 'tofu'} and cook for 5 minutes.`,
    'Combine remaining ingredients and cook for 10 minutes.',
    'Season and serve hot.',
  ],
  tip: 'Add a squeeze of lemon for extra flavour and vitamin C boost.',
})

const getDemoMealPlan = (goal) => ({
  breakfast: { name: 'Masala Tofu Scramble with Roti', calories: 420, protein: 28, carbs: 38, fat: 14, fiber: 6, time: '15 min', tags: ['High Protein'] },
  lunch:     { name: 'Chickpea Dal with Brown Rice',   calories: 510, protein: 22, carbs: 64, fat: 9,  fiber: 14, time: '25 min', tags: ['High Fiber'] },
  dinner:    { name: 'Palak Tofu with Quinoa',          calories: 530, protein: 32, carbs: 48, fat: 16, fiber: 10, time: '30 min', tags: ['High Protein'] },
  snack:     { name: 'Roasted Chana & Nuts',            calories: 180, protein: 9,  carbs: 18, fat: 8,  fiber: 5,  time: '5 min',  tags: ['Low Sugar'] },
})

const getDemoReply = (query) => {
  const q = query.toLowerCase()
  if (q.includes('almond milk'))
    return 'Great substitutes for almond milk: oat milk (creamiest, best for lattes), soy milk (highest protein), or coconut milk (richer flavour for curries). All work equally well in recipes! 🌱'
  if (q.includes('protein'))
    return 'Top vegan protein sources: tofu (20g/100g), tempeh (19g/100g), lentils (9g/100g), chickpeas (8g/100g), and edamame (11g/100g). Combine legumes + grains for complete amino acids!'
  if (q.includes('snack'))
    return 'Quick high-protein vegan snacks: roasted chana (160 kcal, 8g protein), peanut butter on rice cake (200 kcal), or a small handful of edamame (120 kcal, 11g protein). 💪'
  return 'I can help with vegan recipes, ingredient substitutions, meal planning, and nutrition advice. What would you like to know? 🌿'
}

const getDefaultSubs = (ingredient) => [
  { substitute: 'oat milk',     reason: 'Creamy and neutral, works in most recipes.' },
  { substitute: 'soy milk',     reason: 'Highest protein content among plant milks.' },
  { substitute: 'coconut milk', reason: 'Richer flavour, ideal for curries and desserts.' },
  { substitute: 'cashew milk',  reason: 'Very creamy, great for sauces and soups.' },
]
