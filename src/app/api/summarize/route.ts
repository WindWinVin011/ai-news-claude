import { NextRequest, NextResponse } from 'next/server'
import { summarizeArticle } from '@/lib/claude/client'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { content, title } = body

    if (!content || !title) {
      return NextResponse.json({ error: 'content and title are required' }, { status: 400 })
    }

    if (!process.env.ANTHROPIC_API_KEY) {
      return NextResponse.json({ error: 'ANTHROPIC_API_KEY not configured' }, { status: 500 })
    }

    const summary = await summarizeArticle(content, title)
    return NextResponse.json({ summary })
  } catch (error) {
    console.error('[POST /api/summarize]', error)
    return NextResponse.json({ error: 'Failed to summarize' }, { status: 500 })
  }
}
