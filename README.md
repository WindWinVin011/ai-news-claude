# AI News Claude

แพลตฟอร์ม AI News aggregation ที่ขับเคลื่อนด้วย Claude — รวบรวม วิเคราะห์ และนำเสนอข่าว AI ล่าสุด

## Stack

- **Next.js 15** (App Router + TypeScript)
- **Tailwind CSS v4**
- **Supabase** (PostgreSQL + Auth)
- **Claude API** (claude-sonnet-4-6)
- **Vercel** (Deploy + Cron)

## Getting Started

```bash
# 1. Clone และ install
npm install

# 2. Setup environment
cp .env.example .env.local
# แก้ไข .env.local ด้วย Supabase URL, keys, และ Anthropic API key

# 3. Run database migration
# ใช้ SQL จาก supabase/migrations/20260607000001_initial_schema.sql
# รันผ่าน Supabase Dashboard > SQL Editor

# 4. Run dev server
npm run dev
```

เปิด [http://localhost:3000](http://localhost:3000)

## Claude Code Commands

```
/fetch-news          — ดึงข่าว AI ล่าสุด
/fetch-news OpenAI   — ดึงข่าวเฉพาะ topic
/db-migrate          — อัปเดต Supabase schema
/db-query            — รัน SQL query
/build-check         — ตรวจสอบ TypeScript + build
```

## Deploy to Vercel

1. Push ขึ้น GitHub
2. Import project ใน Vercel
3. ตั้งค่า Environment Variables ใน Vercel dashboard
4. Deploy — Vercel Cron จะดึงข่าวทุก 6 ชั่วโมงอัตโนมัติ

## Environment Variables

```bash
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
ANTHROPIC_API_KEY=
NEXT_PUBLIC_APP_URL=
```

## Project Structure

```
src/
├── app/              # Next.js App Router pages + API routes
├── components/       # React components
│   ├── ui/          # Badge, Skeleton
│   ├── news/        # NewsCard
│   └── layout/      # Header
├── lib/
│   ├── supabase/    # Supabase clients (server + browser)
│   ├── claude/      # Claude API client
│   └── utils.ts
└── types/           # TypeScript interfaces
supabase/migrations/ # Database migrations
.claude/             # Claude Code agents + commands + hooks
```

---

Powered by [Claude](https://anthropic.com) · [Supabase](https://supabase.com) · [Vercel](https://vercel.com)
