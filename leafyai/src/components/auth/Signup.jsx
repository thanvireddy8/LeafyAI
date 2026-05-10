import axios from "axios";
import React, { useState } from "react";
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { Leaf } from 'lucide-react'
import toast from 'react-hot-toast'
import { DIET_GOALS, CALORIE_GOALS } from '../../utils/constants'

export default function Signup() {
  
  const { login } = useAuth()
  const navigate = useNavigate()
  const [step, setStep] = useState(1)
  const [form, setForm] = useState({ name: '', email: '', password: '', goal: '', calorieGoal: 2200 })

  const handleStep1 = (e) => {
    e.preventDefault()
    if (!form.name || !form.email || !form.password) return toast.error('Fill in all fields')
    setStep(2)
  }

  const handleFinish = async () => {
  if (!form.goal) {
    return toast.error("Select a goal");
  }

  try {
    const response = await axios.post("http://127.0.0.1:8000/signup", {
      full_name: form.name,
      email: form.email,
      password: form.password,
      diet_goal: form.goal,
      calorie_goal: CALORIE_GOALS[form.goal] || 2200,
    });

    console.log("Signup success:", response.data);

    login(response.data.user);

    toast.success("Account created successfully 🌱");
    navigate("/dashboard");

  } catch (error) {
    console.log("Signup error:", error.response?.data || error.message);
    toast.error(error.response?.data?.detail || "Signup failed");
  }
};

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <div className="w-12 h-12 bg-leaf-400 rounded-2xl flex items-center justify-center mx-auto mb-3">
            <Leaf size={24} className="text-white" />
          </div>
          <h1 className="font-display font-bold text-2xl text-gray-900">Create account</h1>
          <div className="flex justify-center gap-2 mt-3">
            {[1, 2].map(s => (
              <div key={s} className={`h-1 w-8 rounded-full transition-colors ${step >= s ? 'bg-leaf-400' : 'bg-gray-200'}`} />
            ))}
          </div>
        </div>

        <div className="card p-6">
          {step === 1 ? (
            <>
              <h2 className="font-semibold text-gray-900 mb-5">Your details</h2>
              <form onSubmit={handleStep1} className="space-y-4">
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1.5">Full name</label>
                  <input className="input-field" placeholder="Ravi Kumar"
                    value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1.5">Email</label>
                  <input type="email" className="input-field" placeholder="ravi@example.com"
                    value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1.5">Password</label>
                  <input type="password" className="input-field" placeholder="••••••••"
                    value={form.password} onChange={e => setForm(f => ({ ...f, password: e.target.value }))} />
                </div>
                <button type="submit" className="btn-primary w-full py-2.5 text-sm">
                  Continue →
                </button>
              </form>
            </>
          ) : (
            <>
              <h2 className="font-semibold text-gray-900 mb-1">Your health goal</h2>
              <p className="text-xs text-gray-400 mb-5">We'll personalize your meal plans</p>
              <div className="space-y-2 mb-6">
                {DIET_GOALS.map(g => (
                  <button
                    key={g.id}
                    onClick={() => setForm(f => ({ ...f, goal: g.id }))}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl border text-sm transition-all ${
                      form.goal === g.id
                        ? 'border-leaf-400 bg-leaf-50 text-leaf-800 font-medium'
                        : 'border-gray-200 text-gray-600 hover:border-gray-300'
                    }`}
                  >
                    <span className="text-lg">{g.icon}</span>
                    {g.label}
                    {form.goal === g.id && (
                      <span className="ml-auto text-xs text-leaf-600 font-medium">
                        {CALORIE_GOALS[g.id]} kcal/day
                      </span>
                    )}
                  </button>
                ))}
              </div>
              <button onClick={handleFinish} className="btn-primary w-full py-2.5 text-sm">
                Start my plan 🌱
              </button>
            </>
          )}

          <p className="text-center text-xs text-gray-400 mt-4">
            Already have an account?{' '}
            <Link to="/login" className="text-leaf-600 font-medium hover:underline">Sign in</Link>
          </p>
        </div>
      </div>
    </div>
  )
}
