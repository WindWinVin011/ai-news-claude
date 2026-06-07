import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'
import type { ArticleCategory } from '@/types/database'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(dateStr: string): string {
  const date = new Date(dateStr)
  return date.toLocaleDateString('th-TH', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

export function timeAgo(dateStr: string): string {
  const now = new Date()
  const date = new Date(dateStr)
  const diff = now.getTime() - date.getTime()
  const hours = Math.floor(diff / 3600000)
  const days = Math.floor(hours / 24)

  if (hours < 1) return 'เมื่อกี้'
  if (hours < 24) return `${hours} ชั่วโมงที่แล้ว`
  if (days < 7) return `${days} วันที่แล้ว`
  return formatDate(dateStr)
}

export const CATEGORY_LABELS: Record<ArticleCategory, string> = {
  research: 'วิจัย',
  tools: 'เครื่องมือ',
  business: 'ธุรกิจ',
  regulation: 'กฎหมาย',
  general: 'ทั่วไป',
}

export const CATEGORY_COLORS: Record<ArticleCategory, string> = {
  research: 'bg-violet-100 text-violet-700',
  tools: 'bg-blue-100 text-blue-700',
  business: 'bg-green-100 text-green-700',
  regulation: 'bg-red-100 text-red-700',
  general: 'bg-gray-100 text-gray-700',
}
