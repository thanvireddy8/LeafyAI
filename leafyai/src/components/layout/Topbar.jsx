import { useAuth } from '../../context/AuthContext'
import { getGreeting, formatDate } from '../../utils/helpers'
import { Bell } from 'lucide-react'

export default function Topbar({ title }) {
  const { user } = useAuth()
  return (
    <header className="h-14 border-b border-gray-100 bg-white px-6 flex items-center justify-between flex-shrink-0">
      <div>
        <h1 className="font-display font-semibold text-gray-900 text-base leading-none">{title}</h1>
        <p className="text-xs text-gray-400 mt-0.5">{formatDate()}</p>
      </div>
      <div className="flex items-center gap-3">
        <button className="w-8 h-8 rounded-xl border border-gray-100 flex items-center justify-center text-gray-400 hover:bg-gray-50 transition">
          <Bell size={16} />
        </button>
        <div className="text-right">
          <p className="text-xs font-medium text-gray-700">{getGreeting()}, {user?.name?.split(' ')[0] || 'there'} 👋</p>
          <p className="text-xs text-gray-400">{user?.preferences?.calorieGoal || 2200} kcal goal</p>
        </div>
      </div>
    </header>
  )
}
