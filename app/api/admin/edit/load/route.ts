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

export async function GET(req: NextRequest) {
  const session = await getSessionFromRequest(req)
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const file = req.nextUrl.searchParams.get('file')
  if (!file || !VALID_FILES.includes(file)) {
    return NextResponse.json({ error: 'Invalid file' }, { status: 400 })
  }

  const filePath = path.join(CONTENT_DIR, file)
  if (!filePath.startsWith(CONTENT_DIR)) {
    return NextResponse.json({ error: 'Invalid path' }, { status: 400 })
  }

  try {
    const content = fs.readFileSync(filePath, 'utf-8')
    return NextResponse.json({ content })
  } catch {
    return NextResponse.json({ error: 'Failed to read file' }, { status: 500 })
  }
}
