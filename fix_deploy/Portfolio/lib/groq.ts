import Groq from 'groq-sdk'

let _groq: Groq | null = null
export function getGroq(): Groq {
  if (!_groq) {
    _groq = new Groq({ apiKey: process.env.GROQ_API_KEY || 'placeholder' })
  }
  return _groq
}
export const groq = { get chat() { return getGroq().chat } }

export const GROQ_MODEL = process.env.GROQ_MODEL || 'llama-3.3-70b-versatile'

export const VISITOR_SYSTEM_PROMPT = (context: string) =>
  `You answer questions about Mayank Hete based ONLY on the context below. If asked something not in the context, say you don't know and suggest emailing him at mayankrajeshhete@gmail.com. Keep answers under 4 sentences. Do not invent credentials, dates, or paper titles. Politely decline off-topic questions and redirect to Mayank's work.

Context:
${context}`
