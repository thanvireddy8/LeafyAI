import { createContext, useContext, useState } from 'react'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('leafyai_user')) || null
    } catch {
      return null
    }
  })

  const login = (userData) => {
    const formattedUser = {
      id: userData.id,
      full_name: userData.full_name,
      name: userData.full_name,
      email: userData.email,
      preferences: {
        goal: userData.preferences?.goal || userData.diet_goal || 'maintenance',
        calorieGoal:
          userData.preferences?.calorieGoal ||
          userData.calorie_goal ||
          2200,
      },
    }

    setUser(formattedUser)
    localStorage.setItem('leafyai_user', JSON.stringify(formattedUser))
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('leafyai_user')
  }

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoggedIn: !!user }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used inside AuthProvider')
  return ctx
}