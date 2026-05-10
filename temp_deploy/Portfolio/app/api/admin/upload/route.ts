import { NextRequest, NextResponse } from 'next/server'
import { getSessionFromRequest } from '@/lib/auth'
import { uploadImage } from '@/lib/github'

const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/gif']
const MAX_SIZE_BYTES = 4 * 1024 * 1024 // 4MB

export async function POST(req: NextRequest) {
  const session = await getSessionFromRequest(req)
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const formData = await req.formData()
  const file = formData.get('file') as File | null
  const dest = formData.get('dest') as string | null

  if (!file) return NextResponse.json({ error: 'No file provided' }, { status: 400 })
  if (!dest) return NextResponse.json({ error: 'No destination provided' }, { status: 400 })
  if (!ALLOWED_TYPES.includes(file.type)) {
    return NextResponse.json({ error: 'Invalid file type' }, { status: 400 })
  }
  if (file.size > MAX_SIZE_BYTES) {
    return NextResponse.json({ error: 'File too large (max 4MB)' }, { status: 400 })
  }

  const sanitizedDest = dest.replace(/\.\./g, '').replace(/^\//, '')
  const filePath = `public/images/${sanitizedDest}`

  const buffer = await file.arrayBuffer()
  const base64 = Buffer.from(buffer).toString('base64')

  try {
    await uploadImage(filePath, base64, `images: upload ${sanitizedDest}`)
  } catch (err) {
    return NextResponse.json(
      { error: `Upload failed: ${(err as Error).message}` },
      { status: 500 },
    )
  }

  return NextResponse.json({ ok: true, path: `/images/${sanitizedDest}` })
}
