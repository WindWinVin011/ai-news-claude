---
description: ตรวจสอบ TypeScript types และ build ของโปรเจ็ค
---

ใช้ deploy-checker agent เพื่อ:
1. รัน `npx tsc --noEmit` ตรวจ TypeScript errors
2. รัน `npm run lint` ตรวจ ESLint
3. รัน `npm run build` ตรวจ build errors
4. รายงานผล พร้อม fix suggestions ถ้ามี error
