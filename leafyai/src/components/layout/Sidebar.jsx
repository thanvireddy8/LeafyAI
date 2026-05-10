import { NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import {
  LayoutDashboard, Salad, Search, MessageCircle, Camera,
  LineChart, Heart, Settings, LogOut, Leaf,
} from 'lucide-react'

const links = [
  { to: '/',           icon: LayoutDashboard, label: 'Dashboard'    },
  { to: '/planner',    icon: Salad,           label: 'Meal Planner' },
  { to: '/recipes',    icon: Search,          label: 'Recipes'      },
  { to: '/chat',       icon: MessageCircle,   label: 'AI Chat'      },
  { to: '/progress',   icon: LineChart,       label: 'Progress'     },
  { to: '/saved',      icon: Heart,           label: 'Saved'        },
  { to: '/preferences',icon: Settings,        label: 'Preferences'  },
]

export default function Sidebar() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const initials = user?.name
    ? user.name.split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2)
    : 'U'

  return (
    <aside className="w-56 h-screen bg-white border-r border-gray-100 flex flex-col py-5 flex-shrink-0 sticky top-0">
      {/* Logo */}
      <div className="flex items-center gap-2.5 px-5 pb-5 border-b border-gray-100 mb-4">
        <div className="w-8 h-8 bg-leaf-400 rounded-xl flex items-center justify-center">
          <Leaf size={16} className="text-white" />
        </div>
        <div>
          <p className="font-display font-semibold text-sm text-gray-900 leading-none">LeafyAI</p>
          <p className="text-xs text-gray-400 mt-0.5">Nutrition Assistant</p>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 space-y-0.5">
        {links.map(({ to, icon: Icon, label }) => (
          <NavLink
            key={to}
            to={to}
            end={to === '/'}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-all duration-150 ${
                isActive
                  ? 'bg-leaf-50 text-leaf-600 font-medium border-l-2 border-leaf-400 rounded-l-none pl-[10px]'
                  : 'text-gray-500 hover:bg-gray-50 hover:text-gray-800'
              }`
            }
          >
            <Icon size={17} />
            {label}
          </NavLink>
        ))}
      </nav>

      {/* User footer */}
      <div className="px-3 pt-4 border-t border-gray-100 mt-4">
        <div className="flex items-center gap-2.5 mb-3">
          <div className="w-8 h-8 rounded-full bg-leaf-100 flex items-center justify-center text-xs font-semibold text-leaf-800">
            {initials}
          </div>
          <div className="overflow-hidden">
            <p className="text-sm font-medium text-gray-800 truncate">{user?.name || 'Guest'}</p>
            <p className="text-xs text-gray-400 truncate">{user?.preferences?.goal || 'Set goal'}</p>
          </div>
        </div>
        <button
          onClick={() => { logout(); navigate('/login') }}
          className="flex items-center gap-2 text-xs text-gray-400 hover:text-red-500 transition-colors w-full px-2 py-1.5 rounded-lg hover:bg-red-50"
        >
          <LogOut size={14} /> Sign out
        </button>
      </div>
    </aside>
  )
}
