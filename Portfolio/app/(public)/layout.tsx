import Nav from '@/components/public/Nav'
import Footer from '@/components/public/Footer'
import VisitorChatWidget from '@/components/chatbot/VisitorChatWidget'

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col">
      <Nav />
      <main className="flex-1">
        {children}
      </main>
      <Footer />
      <VisitorChatWidget />
    </div>
  )
}
