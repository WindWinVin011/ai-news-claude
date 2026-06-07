---
description: รัน SQL query บน Supabase ผ่าน MCP
---

รัน SQL query ที่ระบุบน Supabase database ของโปรเจ็ค AI News Claude ผ่าน Supabase MCP

$ARGUMENTS — SQL query ที่ต้องการรัน เช่น "SELECT COUNT(*) FROM articles WHERE category = 'research'"

ถ้าไม่ระบุ query จะแสดงสถิติทั่วไป:
- จำนวน articles แต่ละ category
- articles ล่าสุด 5 รายการ
- sources ที่ active
