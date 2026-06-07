---
description: ดึงข่าว AI ล่าสุดแล้วเตรียม SQL สำหรับบันทึกลง Supabase
---

ใช้ news-fetcher agent เพื่อ:
1. ค้นหาข่าว AI ล่าสุด (48 ชั่วโมงที่ผ่านมา) จาก TechCrunch, VentureBeat, The Decoder, HuggingFace Papers
2. Fetch รายละเอียดและสรุปแต่ละข่าวเป็นภาษาไทย
3. จัดหมวดหมู่และ tags
4. เตรียม INSERT SQL สำหรับ Supabase

$ARGUMENTS — ระบุ topic หรือ source เฉพาะ เช่น "OpenAI" หรือ "research papers"
