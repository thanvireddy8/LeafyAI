import { useState, useRef, useEffect } from 'react'
import ChatMessage from './ChatMessage'
import ChatInput from './ChatInput'
import { chatWithAI } from '../../api/gemini'
import { Loader2 } from 'lucide-react'

const INITIAL = [
  {
    role: 'assistant',
    content: "Hi! I'm LeafyAI 🌱 Ask me anything about vegan recipes, nutrition, ingredient substitutions, or meal planning!",
    time: 'Now',
  },
]

const now = () => new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })

export default function ChatInterface({ compact = false }) {
  const [messages, setMessages] = useState(INITIAL)
  const [loading, setLoading]   = useState(false)
  const bottomRef = useRef(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const handleSend = async (text) => {
    const userMsg = { role: 'user', content: text, time: now() }
    const updated = [...messages, userMsg]
    setMessages(updated)
    setLoading(true)

    try {
      const reply = await chatWithAI(updated.map(m => ({ role: m.role, content: m.content })))
      setMessages(prev => [...prev, { role: 'assistant', content: reply, time: now() }])
    } catch {
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: 'Sorry, something went wrong. Please try again.',
        time: now(),
      }])
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className={`card flex flex-col ${compact ? 'h-80' : 'h-full'}`}>
      <h2 className="text-sm font-semibold text-gray-800 p-4 border-b border-gray-100 flex-shrink-0">
        AI Assistant
      </h2>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {messages.map((m, i) => <ChatMessage key={i} message={m} />)}
        {loading && (
          <div className="flex gap-2.5">
            <div className="w-7 h-7 rounded-full bg-leaf-400 flex items-center justify-center">
              <Loader2 size={13} className="text-white animate-spin" />
            </div>
            <div className="bg-leaf-50 rounded-2xl rounded-tl-sm px-3.5 py-2.5 text-sm text-leaf-600">
              Thinking…
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      <div className="px-4 pb-4">
        <ChatInput onSend={handleSend} isLoading={loading} />
      </div>
    </div>
  )
}
