import Layout from '../components/layout/Layout'
import ChatInterface from '../components/chat/ChatInterface'

export default function ChatPage() {
  return (
    <Layout title="AI Assistant">
      <div className="h-[calc(100vh-8rem)]">
        <ChatInterface />
      </div>
    </Layout>
  )
}
