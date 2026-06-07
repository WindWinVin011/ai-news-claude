# CLAUDE.md — AI News Claude (Next.js Project)

> Next.js 15 + Supabase + Claude API — AI News aggregation platform
> Language: ภาษาไทย (default) + English technical terms

---

## Project Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 15, App Router, TypeScript |
| Styling | Tailwind CSS v4 |
| Database | Supabase (PostgreSQL) via MCP |
| AI | Claude API — claude-sonnet-4-6 |
| Deployment | Vercel |

**Key files:**
- [project.md](project.md) — vision, architecture, decisions
- [task.md](task.md) — current sprint tasks
- [src/lib/supabase/](src/lib/supabase/) — Supabase client
- [src/lib/claude/](src/lib/claude/) — Claude API client
- [src/app/api/](src/app/api/) — API routes

---

## Sub-Agents

| Agent | When to Use |
|-------|------------|
| `news-fetcher` | ดึงและสรุปข่าว AI ใหม่ |
| `db-manager` | จัดการ Supabase schema, migration, queries |
| `ui-builder` | สร้าง Next.js components + pages |
| `api-builder` | สร้าง Next.js API routes |
| `deploy-checker` | ตรวจสอบ Vercel build + environment |

---

## Slash Commands

| Command | Description |
|---------|-------------|
| `/fetch-news [topic]` | ดึงข่าว AI ล่าสุดแล้วบันทึกลง Supabase |
| `/summarize <url>` | Claude สรุป URL และบันทึก |
| `/db-migrate` | สร้างหรืออัปเดต Supabase schema |
| `/db-query <sql>` | รัน SQL query ผ่าน Supabase MCP |
| `/build-check` | ตรวจสอบ TypeScript + build |
| `/deploy-check` | ตรวจสอบ Vercel deployment status |

---

## Supabase MCP Usage

ใช้ Supabase MCP tools สำหรับ DB operations ทั้งหมด:
- `mcp__claude_ai_Supabase__list_tables` — ดูโครงสร้าง
- `mcp__claude_ai_Supabase__execute_sql` — รัน query
- `mcp__claude_ai_Supabase__apply_migration` — apply migration SQL
- `mcp__claude_ai_Supabase__get_logs` — debug errors

**Project ID**: (ตั้งค่าหลัง Supabase เชื่อมต่อ)

---

## Coding Conventions

1. **TypeScript strict** — ไม่ใช้ `any` โดยไม่จำเป็น
2. **Server Components** — ใช้ Server Components เป็น default, Client Components เมื่อจำเป็น
3. **API Routes** — อยู่ใน `src/app/api/` ทุกอย่าง
4. **Supabase** — ใช้ `createServerClient` ใน Server Components, `createBrowserClient` ใน Client Components
5. **Claude API** — ทุก Claude call ผ่าน `src/lib/claude/client.ts`
6. **Error Handling** — ทุก API route มี try/catch + proper HTTP status codes
7. **Thai-first** — field `summary_th` และ `analysis_th` เสมอ, `_en` เป็น optional

### Component Structure
```
src/components/
├── ui/          # Reusable: Button, Card, Badge, Input, Skeleton
├── news/        # NewsCard, NewsList, CategoryFilter, SearchBar
└── layout/      # Header, Sidebar, Footer, Navigation
```

### API Route Pattern
```typescript
// src/app/api/[resource]/route.ts
export async function GET(request: Request) {
  try {
    // validate
    // fetch/process
    // return NextResponse.json(data)
  } catch (error) {
    return NextResponse.json({ error: 'message' }, { status: 500 })
  }
}
```

---

## Environment Variables

```bash
NEXT_PUBLIC_SUPABASE_URL=       # จาก Supabase project settings
NEXT_PUBLIC_SUPABASE_ANON_KEY=  # จาก Supabase project settings
SUPABASE_SERVICE_ROLE_KEY=      # สำหรับ server-side only
ANTHROPIC_API_KEY=              # จาก console.anthropic.com
NEXT_PUBLIC_APP_URL=            # production URL
```

ดูตัวอย่างที่ [.env.example](.env.example)

---

## Active Hooks

### Pre-Tool Guard
- Log ทุก tool call + guard คำสั่งอันตราย
- ระวัง: `DROP TABLE`, `DELETE FROM` โดยไม่มี WHERE, `rm -rf`

### Session Complete
- แจ้ง macOS notification เมื่อ Claude เสร็จงาน

---

## Working Conventions

1. **ภาษา**: ตอบภาษาไทย, เก็บชื่อ technical term ภาษาอังกฤษ
2. **Supabase first**: schema changes ทำผ่าน MCP เสมอ — ไม่แก้ DB ตรง
3. **Test before ship**: รัน `npm run build` ก่อน commit เสมอ
4. **task.md**: อัปเดต task.md เมื่อเริ่มหรือเสร็จงาน
5. **No mock data**: ใช้ข้อมูลจาก Supabase จริงเสมอ — ไม่ hardcode
