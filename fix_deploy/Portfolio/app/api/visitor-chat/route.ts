import { NextRequest, NextResponse } from 'next/server'
import { getProfile, getProjects, getPublications } from '@/lib/content'
import { groq, GROQ_MODEL, VISITOR_SYSTEM_PROMPT } from '@/lib/groq'
import { VisitorChatRequestSchema } from '@/lib/schemas'

const RATE_LIMIT_WINDOW_MS = 3600_000
const RATE_LIMIT_MAX = 10

const ipCounts = new Map<string, { count: number; ts: number }>()

function checkRateLimit(ip: string): boolean {
  const now = Date.now()
  const entry = ipCounts.get(ip)
  if (!entry || now - entry.ts > RATE_LIMIT_WINDOW_MS) {
    ipCounts.set(ip, { count: 1, ts: now })
    return true
  }
  if (entry.count >= RATE_LIMIT_MAX) return false
  entry.count++
  return true
}

async function buildContext(): Promise<string> {
  const [profile, projects, publications] = await Promise.all([
    getProfile(),
    getProjects(),
    getPublications(),
  ])

  return `Name: ${profile.name}
Role: ${profile.role}
Location: ${profile.location}
Email: ${profile.email}
GitHub: ${profile.github}
Bio: ${profile.bio_short}
Education: ${profile.education.degree} in ${profile.education.field} at ${profile.education.institution} (CGPA: ${profile.education.cgpa}/10, graduating ${profile.education.graduation_year})

Projects:
${projects.map(p => `- ${p.title}: ${p.tagline}`).join('\n')}

Publications (${publications.length} papers at SCI 2026, Swinburne University, Hanoi Vietnam, April 2026):
${publications.map(p => `- ${p.title}`).join('\n')}

Skills: ${Object.entries(profile.skills).map(([k, v]) => `${k}: ${v.join(', ')}`).join(' | ')}

Seeking: ${profile.seeking.join(', ')}`
}

export async function POST(req: NextRequest) {
  const ip = req.headers.get('x-forwarded-for')?.split(',')[0] ?? 'unknown'

  if (!checkRateLimit(ip)) {
    return NextResponse.json({ error: 'Rate limit exceeded. Try again in an hour.' }, { status: 429 })
  }

  const body = await req.json()
  const result = VisitorChatRequestSchema.safeParse(body)

  if (!result.success) {
    return NextResponse.json({ error: 'Invalid request.' }, { status: 400 })
  }

  const { messages } = result.data
  const context = await buildContext()

  try {
    const completion = await groq.chat.completions.create({
      model: GROQ_MODEL,
      messages: [
        { role: 'system', content: VISITOR_SYSTEM_PROMPT(context) },
        ...messages,
      ],
      max_tokens: 400,
      temperature: 0.3,
    })

    const reply = completion.choices[0].message.content ?? "I'm not sure about that. Email Mayank at mayankrajeshhete@gmail.com."
    return NextResponse.json({ reply })
  } catch {
    return NextResponse.json({ error: 'AI service temporarily unavailable.' }, { status: 500 })
  }
}
