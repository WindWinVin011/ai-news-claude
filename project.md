# AI News Claude — Project Document

## Project Overview

**Name**: AI News Claude  
**Framework**: Next.js 15 (App Router) + TypeScript  
**Database**: Supabase (PostgreSQL)  
**Deployment**: Vercel  
**AI**: Claude API (claude-sonnet-4-6) via Anthropic SDK  
**Created**: 2026-06-07  

---

## Vision

แพลตฟอร์ม AI News aggregation ที่ขับเคลื่อนด้วย Claude — รวบรวม วิเคราะห์ และนำเสนอข่าว AI ล่าสุดอย่างชาญฉลาด พร้อม sub-agents สำหรับ research, trend analysis, และ tool discovery ทั้งหมดในที่เดียว

---

## Core Features

### Phase 1 — MVP
- [ ] **News Feed** — ดึงและแสดงข่าว AI ล่าสุดจากหลายแหล่ง
- [ ] **AI Summarization** — Claude สรุปข่าวแต่ละชิ้นอัตโนมัติ
- [ ] **Category Tags** — จัดหมวดหมู่: Research / Tools / Business / Regulation
- [ ] **Search** — ค้นหาข่าวด้วย keyword หรือ topic
- [ ] **Saved Articles** — บันทึกบทความที่สนใจ (Supabase)

### Phase 2 — Intelligence Layer
- [ ] **Trend Analysis** — วิเคราะห์ pattern จากข่าวสะสม
- [ ] **Paper Research** — deep-dive ลง arxiv papers ที่เกี่ยวข้อง
- [ ] **Tool Discovery** — ค้นหา AI tools ใหม่จากข่าว
- [ ] **Daily Digest Email** — ส่ง briefing ประจำวันทาง Gmail

### Phase 3 — Personalization
- [ ] **User Preferences** — ตั้งค่าหัวข้อที่สนใจ
- [ ] **Reading History** — ประวัติการอ่าน
- [ ] **Newsletter** — subscribe/unsubscribe
- [ ] **Multi-language** — TH/EN toggle

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | Next.js 15, React 19, TypeScript |
| Styling | Tailwind CSS v4 |
| Database | Supabase (PostgreSQL) |
| Auth | Supabase Auth |
| AI | Claude API (Anthropic SDK) |
| Deployment | Vercel |
| Storage | Supabase Storage (images) |
| Email | Gmail MCP / Resend |

---

## Architecture

```
ai-news-claude/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── (auth)/            # Auth routes
│   │   ├── (dashboard)/       # Protected routes
│   │   ├── api/               # API routes
│   │   │   ├── news/          # News fetch + AI summarize
│   │   │   ├── research/      # Paper research
│   │   │   ├── trends/        # Trend analysis
│   │   │   └── tools/         # Tool discovery
│   │   ├── layout.tsx
│   │   └── page.tsx           # Landing / News Feed
│   ├── components/
│   │   ├── ui/                # Base UI components
│   │   ├── news/              # News-specific components
│   │   └── layout/            # Header, Sidebar, Footer
│   ├── lib/
│   │   ├── supabase/          # Supabase client + types
│   │   ├── claude/            # Claude API client
│   │   └── utils.ts
│   └── types/                 # TypeScript interfaces
├── .claude/                   # Claude Code configuration
│   ├── agents/                # Sub-agents
│   ├── commands/              # Slash commands
│   └── hooks/                 # Automation hooks
├── CLAUDE.md                  # Claude workspace instructions
├── project.md                 # ← คุณอยู่ที่นี่
└── task.md                    # Current sprint tasks
```

---

## Database Schema (Supabase)

```sql
-- articles: ข่าว AI ที่รวบรวมได้
articles (id, title, url, source, published_at, summary_th, summary_en, 
          category, tags[], image_url, created_at)

-- sources: แหล่งข่าวที่ติดตาม
sources (id, name, url, feed_url, category, active, last_fetched_at)

-- saved_articles: บทความที่ผู้ใช้บันทึก
saved_articles (id, user_id, article_id, note, created_at)

-- trends: ผลวิเคราะห์เทรนด์
trends (id, topic, analysis_th, analysis_en, period, created_at)

-- research_notes: งานวิจัยที่ค้นพบ
research_notes (id, paper_title, arxiv_id, summary, key_points[], created_at)
```

---

## Environment Variables

```bash
# Supabase
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=

# Anthropic
ANTHROPIC_API_KEY=

# App
NEXT_PUBLIC_APP_URL=
```

---

## Key Decisions

1. **App Router** — ใช้ Next.js 15 App Router เพื่อ Server Components + streaming
2. **Supabase MCP** — ใช้ Supabase MCP สำหรับ schema management ใน Claude Code
3. **Claude API** — ทุก AI feature ใช้ claude-sonnet-4-6 เป็น default
4. **Thai-first** — UI และ summary เป็นภาษาไทย, เก็บ EN version ใน DB ด้วย
5. **Edge-ready** — API routes ออกแบบให้ทำงานบน Vercel Edge Functions ได้

---

## Links

- **Repo**: https://github.com/[username]/ai-news-claude
- **Production**: https://ai-news-claude.vercel.app (รอ deploy)
- **Supabase Project**: (รอเชื่อมต่อ)
- **Vercel Project**: (รอ deploy)
