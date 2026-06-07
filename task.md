# Task Board — AI News Claude

> Sprint: Initial Setup & MVP  
> Updated: 2026-06-07

---

## 🔥 In Progress

- [ ] เชื่อมต่อ Supabase project และ run initial migration
- [ ] เชื่อมต่อ Vercel deployment

---

## ✅ Done

- [x] สร้าง Next.js 15 project (TypeScript + Tailwind + App Router)
- [x] สร้าง CLAUDE.md, project.md, task.md
- [x] Setup .claude/ agents, commands, hooks สำหรับโปรเจ็ค
- [x] สร้าง core page structure (layout, home, news feed)
- [x] สร้าง Supabase migration SQL (articles, sources, saved_articles, trends)
- [x] สร้าง Supabase client utility (lib/supabase/)
- [x] สร้าง Claude API client utility (lib/claude/)
- [x] Setup environment variables template (.env.example)
- [x] Push ขึ้น GitHub
- [x] ตั้งค่า Vercel configuration (vercel.json)
- [x] Setup .gitignore และ README

---

## 📋 Backlog

### Phase 1 — Core MVP
- [ ] **API: News Fetch** (`/api/news/fetch`) — ดึงข่าวจาก RSS/web scrape
- [ ] **API: Summarize** (`/api/news/summarize`) — Claude สรุปข่าว
- [ ] **Page: News Feed** — แสดงข่าวทั้งหมด + pagination
- [ ] **Component: NewsCard** — card แสดงข่าว + summary
- [ ] **Component: CategoryFilter** — filter ตาม category
- [ ] **Component: SearchBar** — ค้นหาข่าว
- [ ] **API: Saved Articles** — save/unsave article (ต้อง auth)
- [ ] **Auth: Supabase Auth** — login/signup flow
- [ ] **Cron: Daily Fetch** — Vercel Cron ดึงข่าวทุกวัน

### Phase 2 — Intelligence
- [ ] **API: Trends** (`/api/trends`) — Claude วิเคราะห์เทรนด์จากข่าว 7 วัน
- [ ] **API: Research** (`/api/research`) — ค้น arxiv papers ที่เกี่ยวข้อง
- [ ] **API: Tools** (`/api/tools`) — ค้นหา AI tools จากข่าว
- [ ] **Page: Trends** — แสดง trend analysis
- [ ] **Page: Research** — deep-dive papers
- [ ] **Page: Tools** — AI tools discovery

### Phase 3 — Personalization
- [ ] **User Profile** — preferences settings
- [ ] **Reading History** — track อ่านอะไรแล้วบ้าง
- [ ] **Daily Digest** — ส่ง email สรุปประจำวัน (Gmail MCP)
- [ ] **Thai/EN Toggle** — language switcher

---

## 🐛 Bugs

_(ยังไม่มี)_

---

## 📝 Notes

- ใช้ Supabase MCP (`mcp__claude_ai_Supabase__*`) สำหรับ DB operations ทุกอย่าง
- Claude API: default model = `claude-sonnet-4-6`, max_tokens = 2048 สำหรับ summary
- Vercel Cron อยู่ใน `vercel.json` — ดึงข่าวทุก 6 ชั่วโมง
- RSS sources เริ่มต้น: TechCrunch AI, VentureBeat AI, The Decoder, HuggingFace Papers
