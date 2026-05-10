import { Leaf, User } from 'lucide-react'

export default function ChatMessage({ message }) {
  const isAI = message.role === 'assistant'

  return (
    <div className={`flex gap-2.5 ${isAI ? '' : 'flex-row-reverse'}`}>
      {/* Avatar */}
      <div className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${
        isAI ? 'bg-leaf-400' : 'bg-gray-200'
      }`}>
        {isAI
          ? <Leaf size={13} className="text-white" />
          : <User size={13} className="text-gray-600" />
        }
      </div>

      {/* Bubble */}
      <div
        className={`max-w-[80%] px-3.5 py-2.5 rounded-2xl text-sm leading-relaxed ${
          isAI
            ? 'bg-leaf-50 text-leaf-900 rounded-tl-sm'
            : 'bg-gray-100 text-gray-800 rounded-tr-sm'
        }`}
      >
        {message.content}
        <p className="text-xs text-gray-400 mt-1">{message.time}</p>
      </div>
    </div>
  )
}
