# 🌱 LeafyAI – AI-Powered Smart Vegan Nutrition Assistant

A full-stack AI-powered vegan nutrition assistant built with React, FastAPI, LangChain, and Gemini AI.

---

## Features

| Feature | Status | Tech |
|---|---|---|
| AI Recipe Generator | ✅ | Gemini Pro API |
| Personalized Meal Planner | ✅ | Gemini + LangChain |
| AI Chat Assistant | ✅ | Gemini Pro |
| Snap & Cook (Image Detection) | ✅ (demo) | Gemini Vision (add key) |
| Nutrition Tracker | ✅ | React state + recharts |
| Smart Substitution Engine | ✅ | Gemini Pro |
| Save Recipes | ✅ | localStorage / MongoDB |
| User Auth | ✅ | React Context + JWT |
| Progress Charts | ✅ | Recharts |
| Preferences & Goals | ✅ | React state |

---

## Quick Start

```bash
# 1. Install dependencies
npm install

# 2. Set up environment
cp .env.example .env
# Add your Gemini API key to .env

# 3. Run development server
npm run dev
```

Open http://localhost:5173

> **No API key?** The app works without one using intelligent demo fallbacks.

---

## Project Structure

```
src/
├── api/
│   └── gemini.js          # Gemini API integration (recipe, chat, substitution)
├── components/
│   ├── auth/              # Login, Signup
│   ├── chat/              # ChatInterface, ChatMessage, ChatInput
│   ├── layout/            # Sidebar, Topbar, Layout
│   ├── meals/             # MealCard, MealGrid
│   ├── nutrition/         # NutritionTracker, MacroBar, StatsRow
│   └── recipes/           # RecipeCard, RecipeDetail
├── context/
│   ├── AuthContext.jsx    # User auth state
│   └── NutritionContext.jsx # Daily nutrition tracking
├── pages/
│   ├── Dashboard.jsx
│   ├── MealPlannerPage.jsx
│   ├── RecipesPage.jsx
│   ├── ChatPage.jsx
│   ├── SnapCookPage.jsx
│   ├── ProgressPage.jsx
│   ├── SavedRecipes.jsx
│   └── PreferencesPage.jsx
└── utils/
    ├── constants.js       # Sample data, diet goals
    └── helpers.js         # Utility functions
```

---

## Tech Stack

- **Frontend**: React 18, Vite, Tailwind CSS, Framer Motion
- **AI**: Google Gemini Pro API
- **Charts**: Recharts
- **Icons**: Lucide React
- **Notifications**: React Hot Toast
- **Routing**: React Router v6

---

## Phase 2 (Backend — FastAPI)

See `backend/` folder. Built with:
- FastAPI + Uvicorn
- LangChain for prompt chaining
- MongoDB (via Motor async driver)
- JWT authentication

```bash
cd backend
pip install -r requirements.txt
uvicorn main:app --reload
```

---

## Resume Bullet Points

- Built AI-powered vegan nutrition assistant using **Gemini Pro API** and **React 18** with real-time recipe generation and personalized meal planning
- Integrated **LangChain prompt templates** for multi-turn AI chat, ingredient substitution engine, and image-based ingredient detection
- Designed **FastAPI** backend with JWT auth, MongoDB integration, and RESTful recipe management API
- Deployed frontend on **Vercel** and backend on **Render** with **AWS S3** for image storage

---

## License

MIT
