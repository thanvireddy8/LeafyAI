
import React from 'react';
import { Link } from 'react-router-dom';
import veganBowl from "../assets/Vegan-bowl.png";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#FCFCF7] flex flex-col">
      {/* Header */}
      <header className="flex justify-between items-center px-8 py-6 bg-white shadow-sm">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 bg-leaf-400 rounded-xl flex items-center justify-center">
            <svg width="20" height="20" fill="none" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12c0 5.52 4.48 10 10 10s10-4.48 10-10C22 6.48 17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8 0-1.85.63-3.55 1.69-4.9C7.1 10.28 9.41 12 12 12c2.59 0 4.9-1.72 6.31-4.9C19.37 8.45 20 10.15 20 12c0 4.41-3.59 8-8 8z" fill="#34C759"/></svg>
          </div>
          <span className="font-display font-semibold text-lg text-gray-900">LeafyAI</span>
        </div>
        <div className="flex items-center gap-2">
          <Link to="/login" className="text-gray-700 font-medium hover:underline whitespace-nowrap">Sign In</Link>
          <Link to="/signup" className="bg-green-900 text-white px-5 py-2 rounded-xl font-semibold shadow hover:bg-green-800 transition whitespace-nowrap ml-2">Get Started</Link>
        </div>
      </header>

      {/* Hero Section */}
      <section className="flex flex-col md:flex-row items-center justify-between px-8 py-16 max-w-6xl mx-auto w-full">
        <div className="max-w-xl">
          <span className="inline-block bg-green-100 text-green-700 font-semibold px-4 py-1 rounded-full mb-4 text-xs tracking-wide">AI-POWERED VEGAN NUTRITION</span>
          <h1 className="text-7xl font-extrabold text-gray-900 mb-4 leading-tight">
            Eat Green,<br />
            Live <span className="text-green-600">Better.</span>
          </h1>
          <p className="text-lg text-gray-500 mb-8">
            LeafyAI helps you discover personalized vegan meals, smart nutrition insights, and AI-powered recipe recommendations based on your lifestyle, ingredients, and health goals.
          </p>
          <div className="flex gap-4">
            <Link to="/signup" className="bg-green-500 text-white px-6 py-3 rounded-xl font-semibold shadow hover:bg-green-600 transition">Start My Journey →</Link>
            <a href="#features" className="bg-white border border-green-200 text-green-700 px-6 py-3 rounded-xl font-semibold shadow hover:bg-green-50 transition">View Features</a>
          </div>
        </div>
        <div className="mt-10 md:mt-0 md:ml-12">
          <img src={veganBowl} alt="Vegan Bowl" className="rounded-3xl shadow-xl w-[400px] h-[400px] object-cover" />
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="bg-white py-16 px-8">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-10 text-gray-900">Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="bg-green-50 rounded-2xl p-6 text-center shadow">
              <div className="mx-auto mb-3 w-12 h-12 bg-green-400 rounded-xl flex items-center justify-center">
                <span role="img" aria-label="chef" className="text-2xl">👨‍🍳</span>
              </div>
              <h3 className="font-semibold text-lg mb-2">Recipe Generator</h3>
              <p className="text-gray-500 text-sm">Custom vegan recipes based on ingredients you already have.</p>
            </div>
            <div className="bg-green-50 rounded-2xl p-6 text-center shadow">
              <div className="mx-auto mb-3 w-12 h-12 bg-green-400 rounded-xl flex items-center justify-center">
                <span role="img" aria-label="calendar" className="text-2xl">📅</span>
              </div>
              <h3 className="font-semibold text-lg mb-2">Meal Planner</h3>
              <p className="text-gray-500 text-sm">Personalized full-day plans mapped to your specific goals.</p>
            </div>
            <div className="bg-green-50 rounded-2xl p-6 text-center shadow">
              <div className="mx-auto mb-3 w-12 h-12 bg-green-400 rounded-xl flex items-center justify-center">
                <span role="img" aria-label="chat" className="text-2xl">💬</span>
              </div>
              <h3 className="font-semibold text-lg mb-2">AI Assistant</h3>
              <p className="text-gray-500 text-sm">Chat with "Leafy" for real-time vegan nutrition advice.</p>
            </div>
            <div className="bg-green-50 rounded-2xl p-6 text-center shadow">
              <div className="mx-auto mb-3 w-12 h-12 bg-green-400 rounded-xl flex items-center justify-center">
                <span role="img" aria-label="camera" className="text-2xl">📷</span>
              </div>
              <h3 className="font-semibold text-lg mb-2">Snap & Cook</h3>
              <p className="text-gray-500 text-sm">Identify ingredients and get recipe ideas using your camera.</p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 px-8">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-10 text-gray-900">Common Questions</h2>
          <div className="space-y-4">
            <details className="bg-white rounded-xl shadow p-5">
              <summary className="font-semibold text-lg cursor-pointer">Is LeafyAI completely vegan?</summary>
              <p className="text-gray-500 mt-2">Yes! Every recipe, meal plan, and piece of advice is 100% plant-based. We never suggest animal products.</p>
            </details>
            <details className="bg-white rounded-xl shadow p-5">
              <summary className="font-semibold text-lg cursor-pointer">Does it support specific health goals?</summary>
              <p className="text-gray-500 mt-2">Absolutely. You can choose objectives like weight loss, muscle gain, diabetic-friendly diets, or high-iron nutrition.</p>
            </details>
            <details className="bg-white rounded-xl shadow p-5">
              <summary className="font-semibold text-lg cursor-pointer">How does Snap & Cook work?</summary>
              <p className="text-gray-500 mt-2">Simply upload or take a photo of ingredients or food, and our AI vision identifies them to suggest creative vegan recipes.</p>
            </details>
            <details className="bg-white rounded-xl shadow p-5">
              <summary className="font-semibold text-lg cursor-pointer">Can I track my daily nutrition?</summary>
              <p className="text-gray-500 mt-2">Yes, every meal you log contributes to your daily targets for calories, protein, carbs, fats, and fiber.</p>
            </details>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-green-900 text-white py-10 px-8 mt-auto">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center md:items-start gap-8">
          <div>
            <div className="flex items-center gap-2.5 mb-2">
              <div className="w-8 h-8 bg-leaf-400 rounded-xl flex items-center justify-center">
                <svg width="16" height="16" fill="none" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12c0 5.52 4.48 10 10 10s10-4.48 10-10C22 6.48 17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8 0-1.85.63-3.55 1.69-4.9C7.1 10.28 9.41 12 12 12c2.59 0 4.9-1.72 6.31-4.9C19.37 8.45 20 10.15 20 12c0 4.41-3.59 8-8 8z" fill="#34C759"/></svg>
              </div>
              <span className="font-display font-semibold text-lg">LeafyAI</span>
            </div>
            <p className="text-sm text-green-100 max-w-xs">Empowering people to thrive on a plant-based diet through intelligent nutrition and community-driven knowledge.</p>
          </div>
          <div className="flex flex-col md:flex-row gap-8">
            <div>
              <h4 className="font-semibold mb-2">Product</h4>
              <ul className="space-y-1 text-green-100 text-sm">
                <li><a href="#features" className="hover:underline">Features</a></li>
                <li><a href="#" className="hover:underline">Pricing</a></li>
                <li><a href="#" className="hover:underline">AI Chat</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Company</h4>
              <ul className="space-y-1 text-green-100 text-sm">
                <li><a href="#" className="hover:underline">About Us</a></li>
                <li><a href="#" className="hover:underline">Privacy Policy</a></li>
                <li><a href="#" className="hover:underline">Terms of Service</a></li>
              </ul>
            </div>
          </div>
        </div>
        <div className="text-center text-green-200 text-xs mt-8">Built with love for the planet. © 2026 LeafyAI.</div>
      </footer>
    </div>
  );
}
