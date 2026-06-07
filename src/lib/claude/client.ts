import Anthropic from '@anthropic-ai/sdk'

const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })

const MODEL = 'claude-sonnet-4-6'

export async function summarizeArticle(
  content: string,
  title: string
): Promise<{ th: string; en: string }> {
  const message = await anthropic.messages.create({
    model: MODEL,
    max_tokens: 1024,
    messages: [{
      role: 'user',
      content: `สรุปบทความข่าว AI นี้เป็น 2 ภาษา ใช้ 2-3 ประโยค กระชับและเข้าใจง่าย

หัวข้อ: ${title}

เนื้อหา:
${content.slice(0, 4000)}

ตอบในรูปแบบ JSON เท่านั้น (ไม่มีข้อความอื่น):
{"th": "สรุปภาษาไทย", "en": "English summary"}`
    }]
  })

  const text = message.content[0].type === 'text' ? message.content[0].text : ''
  try {
    const jsonMatch = text.match(/\{[\s\S]*\}/)
    if (jsonMatch) return JSON.parse(jsonMatch[0])
  } catch {}
  return { th: text, en: '' }
}

export async function analyzeTrends(articles: Array<{ title: string; summary_th: string; category: string }>): Promise<string> {
  const articleList = articles
    .map((a, i) => `${i + 1}. [${a.category}] ${a.title}: ${a.summary_th}`)
    .join('\n')

  const message = await anthropic.messages.create({
    model: MODEL,
    max_tokens: 2048,
    messages: [{
      role: 'user',
      content: `วิเคราะห์เทรนด์จากข่าว AI ต่อไปนี้ในสัปดาห์นี้ สรุปเป็นภาษาไทย

ข่าว:
${articleList}

วิเคราะห์:
1. เทรนด์หลักที่เห็น (3 เทรนด์)
2. บริษัทหรือ model ที่โดดเด่น
3. สิ่งที่น่าจับตามองต่อไป
4. ผลกระทบต่อ ecosystem`
    }]
  })

  return message.content[0].type === 'text' ? message.content[0].text : ''
}

export async function categorizeArticle(title: string, content: string): Promise<{
  category: string
  tags: string[]
}> {
  const message = await anthropic.messages.create({
    model: MODEL,
    max_tokens: 256,
    messages: [{
      role: 'user',
      content: `จัดหมวดหมู่บทความข่าว AI นี้

หัวข้อ: ${title}
เนื้อหา: ${content.slice(0, 500)}

หมวดหมู่ที่เป็นไปได้: research, tools, business, regulation, general
Tags: ชื่อ model, บริษัท, เทคโนโลยี ที่เกี่ยวข้อง (สูงสุด 5 tags)

ตอบในรูปแบบ JSON เท่านั้น:
{"category": "research", "tags": ["GPT-5", "OpenAI"]}`
    }]
  })

  const text = message.content[0].type === 'text' ? message.content[0].text : ''
  try {
    const jsonMatch = text.match(/\{[\s\S]*\}/)
    if (jsonMatch) return JSON.parse(jsonMatch[0])
  } catch {}
  return { category: 'general', tags: [] }
}
