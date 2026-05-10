import { useState } from 'react'
import { Send, Mic } from 'lucide-react'

const QUICK_PROMPTS = [
  'No almond milk, what to use?',
  'High protein snack under 200 kcal',
  'Best iron-rich vegan foods',
  'Post-gym dinner ideas',
]

export default function ChatInput({ onSend, isLoading }) {
  const [text, setText] = useState('')

  const handleSend = () => {
    if (!text.trim() || isLoading) return
    onSend(text.trim())
    setText('')
  }

  return (
    <div className="border-t border-gray-100 pt-3">
      {/* Quick prompts */}
      <div className="flex gap-2 mb-3 flex-wrap">
        {QUICK_PROMPTS.map(p => (
          <button
            key={p}
            onClick={() => onSend(p)}
            disabled={isLoading}
            className="text-xs border border-gray-200 rounded-full px-3 py-1 text-gray-500 hover:bg-leaf-50 hover:border-leaf-200 hover:text-leaf-700 transition-all disabled:opacity-50"
          >
            {p}
          </button>
        ))}
      </div>

      {/* Input row */}
      <div className="flex items-center gap-2">
        <input
          value={text}
          onChange={e => setText(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && handleSend()}
          placeholder="Ask about recipes, nutrition, substitutions…"
          disabled={isLoading}
          className="input-field flex-1 text-sm"
        />
        <button
          onClick={handleSend}
          disabled={!text.trim() || isLoading}
          className="w-9 h-9 bg-leaf-400 hover:bg-leaf-600 disabled:bg-gray-200 rounded-xl flex items-center justify-center transition-all active:scale-95"
          aria-label="Send"
        >
          <Send size={15} className={isLoading ? 'text-gray-400' : 'text-white'} />
        </button>
      </div>
    </div>
  )
}
