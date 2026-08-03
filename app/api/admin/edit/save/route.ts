import { NextRequest, NextResponse } from 'next/server'
import { getSessionFromRequest } from '@/lib/auth'
import * as fs from 'fs'
import * as path from 'path'

const CONTENT_DIR = path.join(process.cwd(), 'content')
const VALID_FILES = [
  'projects.json',
  'publications.json',
  'experience.json',
  'achievements.json',
  'profile.json',
  'hero.json',
]

export async function POST(req: NextRequest) {
  const session = await getSessionFromRequest(req)
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { file, content } = await req.json()

  if (!file || !VALID_FILES.includes(file)) {
    return NextResponse.json({ error: 'Invalid file' }, { status: 400 })
  }

  const filePath = path.join(CONTENT_DIR, file)
  if (!filePath.startsWith(CONTENT_DIR)) {
    return NextResponse.json({ error: 'Invalid path' }, { status: 400 })
  }

  if (typeof content !== 'string') {
    return NextResponse.json({ error: 'Content must be a string' }, { status: 400 })
  }

  try {
    JSON.parse(content)
  } catch (err) {
    return NextResponse.json({ error: `Invalid JSON: ${(err as Error).message}` }, { status: 422 })
  }

  try {
    fs.writeFileSync(filePath, content, 'utf-8')
    return NextResponse.json({ ok: true })
  } catch (err) {
    return NextResponse.json({ error: `Failed to write file: ${(err as Error).message}` }, { status: 500 })
  }
}
