import { NextRequest, NextResponse } from 'next/server'
import { getSessionFromRequest } from '@/lib/auth'
import * as fs from 'fs'
import * as path from 'path'
import * as jsonpatch from 'fast-json-patch'

const CONTENT_DIR = path.join(process.cwd(), 'content')
const VALID_FILES = ['projects.json', 'publications.json', 'experience.json', 'achievements.json', 'news.json', 'profile.json', 'hero.json']

export async function POST(req: NextRequest) {
  const session = await getSessionFromRequest(req)
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { messages, file } = await req.json()

  if (!file || !VALID_FILES.includes(file)) {
    return NextResponse.json({ error: 'Invalid file' }, { status: 400 })
  }

  const filePath = path.join(CONTENT_DIR, file)
  if (!filePath.startsWith(CONTENT_DIR)) {
    return NextResponse.json({ error: 'Invalid path' }, { status: 400 })
  }

  let currentContent: string
  try {
    currentContent = fs.readFileSync(filePath, 'utf-8')
  } catch {
    return NextResponse.json({ error: 'Failed to read file' }, { status: 500 })
  }

  const parsedCurrent = JSON.parse(currentContent)
  const lastUserMessage = [...messages].reverse().find(m => m.role === 'user')?.content || ''

  // Dev-friendly: Generate simple patches from user intent
  const patches: jsonpatch.Operation[] = []
  let summary = 'No changes detected'

  // Handle "change [field] to [value]" pattern
  const changeMatch = lastUserMessage.match(/change\s+(\w+)\s+to\s+['"]([^'"]+)['"]/i)
  if (changeMatch) {
    const [, field, value] = changeMatch
    if (field in parsedCurrent) {
      patches.push({
        op: 'replace',
        path: `/${field}`,
        value: isNaN(Number(value)) ? value : Number(value),
      } as jsonpatch.Operation)
      summary = `Update ${field} to "${value}"`
    } else {
      summary = `Field "${field}" not found. Available: ${Object.keys(parsedCurrent).join(', ')}`
    }
  }

  // Handle array operations
  if (lastUserMessage.toLowerCase().includes('add') && lastUserMessage.toLowerCase().includes('to')) {
    const arrayMatch = lastUserMessage.match(/add\s+['"]([^'"]+)['"]\s+to\s+(\w+)/i)
    if (arrayMatch) {
      const [, item, arrayName] = arrayMatch
      if (arrayName in parsedCurrent && Array.isArray(parsedCurrent[arrayName])) {
        patches.push({
          op: 'add',
          path: `/${arrayName}/-`,
          value: { title: item, description: 'Edit me in admin panel' },
        } as jsonpatch.Operation)
        summary = `Add "${item}" to ${arrayName}`
      }
    }
  }

  // Validate patches
  const testDoc = JSON.parse(JSON.stringify(parsedCurrent))
  try {
    if (patches.length > 0) {
      const result = jsonpatch.applyPatch(testDoc, patches, true, false)
      // Ensure valid JSON structure
      JSON.stringify(result.newDocument ?? testDoc)
    }
  } catch (err) {
    return NextResponse.json(
      { error: `Validation failed: ${(err as Error).message}` },
      { status: 422 },
    )
  }

  return NextResponse.json({
    patches,
    summary: summary || 'Ready to apply',
    file,
    sha: 'local',
    currentContent,
  })
}
