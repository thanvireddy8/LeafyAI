import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import { AuthProvider, useAuth } from './context/AuthContext'
import { NutritionProvider } from './context/NutritionContext'

import Login           from './components/auth/Login'
import Signup          from './components/auth/Signup'
import Dashboard       from './pages/Dashboard'
import MealPlannerPage from './pages/MealPlannerPage'
import RecipesPage     from './pages/RecipesPage'
import ChatPage        from './pages/ChatPage'
import ProgressPage    from './pages/ProgressPage'
import SavedRecipes    from './pages/SavedRecipes'
import PreferencesPage from './pages/PreferencesPage'
import Home            from './pages/Home'

const Protected = ({ children }) => {
  const { isLoggedIn } = useAuth()
  return isLoggedIn ? children : <Navigate to="/login" replace />
}

export default function App() {
  return (
    <AuthProvider>
      <NutritionProvider>
        <BrowserRouter>
          <Toaster position="top-right" />
          <Routes>
            {/* Public marketing home page */}
            <Route path="/" element={<Home />} />
            <Route path="/login"  element={<Login />} />
            <Route path="/signup" element={<Signup />} />

            {/* Protected app routes */}
            <Route path="/dashboard"    element={<Protected><Dashboard /></Protected>} />
            <Route path="/planner"      element={<Protected><MealPlannerPage /></Protected>} />
            <Route path="/recipes" element={<RecipesPage />} />
            <Route path="/chat"         element={<Protected><ChatPage /></Protected>} />
            <Route path="/progress"     element={<Protected><ProgressPage /></Protected>} />
            <Route path="/saved"        element={<Protected><SavedRecipes /></Protected>} />
            <Route path="/preferences"  element={<Protected><PreferencesPage /></Protected>} />

            {/* Redirect unknown routes to home */}
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </BrowserRouter>
      </NutritionProvider>
    </AuthProvider>
  )
}
