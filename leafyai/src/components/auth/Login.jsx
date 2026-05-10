import { useState } from 'react'
import axios from 'axios'
import toast from 'react-hot-toast'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'

export default function Login() {
  const navigate = useNavigate()
  const { login } = useAuth()

  const [form, setForm] = useState({
    email: '',
    password: '',
  })

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const response = await axios.post('http://127.0.0.1:8000/login', {
        email: form.email,
        password: form.password,
      })

      if (response.data.success) {
        login(response.data.user)
        toast.success('Login successful 🌱')
        navigate('/dashboard')
      } else {
        toast.error(response.data.message || 'Login failed')
      }
    } catch (error) {
      console.log(error)
      toast.error('Login failed')
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white w-full max-w-md rounded-2xl shadow-sm border border-gray-100 p-6"
      >
        <h1 className="text-2xl font-bold text-gray-900 mb-1">Welcome back</h1>
        <p className="text-sm text-gray-400 mb-6">Login to continue your meal plan</p>

        <div className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-leaf-200"
            required
          />

          <input
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-leaf-200"
            required
          />

          <button className="w-full btn-primary py-3 text-sm">
            Login
          </button>
        </div>

        <p className="text-center text-sm text-gray-400 mt-5">
          New user?{' '}
          <Link to="/signup" className="text-leaf-600 font-medium">
            Create account
          </Link>
        </p>
      </form>
    </div>
  )
}