import EditChatbot from '@/components/admin/EditChatbot'
import { getSession } from '@/lib/auth'
import { redirect } from 'next/navigation'

export const metadata = { title: 'Content Editor — Admin' }

export default async function EditPage() {
  const session = await getSession()
  if (!session) {
    redirect('/admin/login')
  }
  return <EditChatbot />
}
