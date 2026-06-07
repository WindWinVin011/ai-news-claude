import { createClient } from '@/lib/supabase/server'
import { NewsCard } from '@/components/news/NewsCard'
import { NewsCardSkeleton } from '@/components/ui/Skeleton'
import { Suspense } from 'react'
import type { Article, ArticleCategory } from '@/types/database'
import { cn, CATEGORY_LABELS, CATEGORY_COLORS } from '@/lib/utils'

const CATEGORIES: Array<ArticleCategory | 'all'> = ['all', 'research', 'tools', 'business', 'regulation', 'general']

async function NewsFeed({ category }: { category: string }) {
  const supabase = await createClient()

  let query = supabase
    .from('articles')
    .select('*')
    .order('published_at', { ascending: false })
    .limit(24)

  if (category !== 'all') {
    query = query.eq('category', category)
  }

  const { data, error } = await query
  const articles = data as Article[] | null

  if (error || !articles || articles.length === 0) {
    return (
      <div className="col-span-full flex flex-col items-center justify-center py-24 text-center">
        <div className="text-5xl mb-4">📰</div>
        <h3 className="text-lg font-semibold text-gray-700">ยังไม่มีข่าว</h3>
        <p className="mt-1 text-sm text-gray-500">
          เชื่อมต่อ Supabase และรัน <code className="rounded bg-gray-100 px-1">/fetch-news</code> เพื่อดึงข่าวล่าสุด
        </p>
      </div>
    )
  }

  return (
    <>
      {articles.map((article) => (
        <NewsCard key={article.id} article={article as Article} />
      ))}
    </>
  )
}

export default async function HomePage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>
}) {
  const { category = 'all' } = await searchParams

  return (
    <div className="mx-auto max-w-5xl px-4 py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">ข่าว AI ล่าสุด</h1>
        <p className="mt-1 text-sm text-gray-500">สรุปโดย Claude · อัปเดตทุก 6 ชั่วโมง</p>
      </div>

      <div className="mb-6 flex flex-wrap gap-2">
        {CATEGORIES.map((cat) => (
          <a
            key={cat}
            href={cat === 'all' ? '/' : `/?category=${cat}`}
            className={cn(
              'rounded-full px-3 py-1 text-sm font-medium transition-colors',
              category === cat
                ? 'bg-blue-600 text-white'
                : 'bg-white text-gray-600 border border-gray-200 hover:border-gray-300'
            )}
          >
            {cat === 'all' ? 'ทั้งหมด' : CATEGORY_LABELS[cat as ArticleCategory]}
          </a>
        ))}
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <Suspense
          fallback={Array.from({ length: 6 }).map((_, i) => (
            <NewsCardSkeleton key={i} />
          ))}
        >
          <NewsFeed category={category} />
        </Suspense>
      </div>
    </div>
  )
}
