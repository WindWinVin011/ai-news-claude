---
description: สร้างหรืออัปเดต Supabase schema ผ่าน MCP
---

ใช้ db-manager agent เพื่อ:
1. ตรวจสอบ schema ปัจจุบันด้วย Supabase MCP (list_tables)
2. เปรียบเทียบกับ schema ที่ต้องการ
3. สร้าง migration SQL (idempotent)
4. Apply ผ่าน Supabase MCP (apply_migration)
5. อัปเดต TypeScript types ใน src/types/database.ts

$ARGUMENTS — ระบุ migration ที่ต้องการ เช่น "add view_count to articles"
