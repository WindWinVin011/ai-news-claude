import Link from 'next/link'
import { ExternalLink, Clock } from 'lucide-react'
import { Badge } from '@/components/ui/Badge'
import { cn, timeAgo, CATEGORY_LABELS, CATEGORY_COLORS } from '@/lib/utils'
import type { Article, ArticleCategory } from '@/types/database'

interface NewsCardProps {
  article: Article
}

export function NewsCard({ article }: NewsCardProps) {
  const category = article.category as ArticleCategory | null

  return (
    <article className="group rounded-xl border border-gray-200 bg-white p-5 transition-shadow hover:shadow-md">
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 space-y-2">
          {category && (
            <Badge className={cn(CATEGORY_COLORS[category])}>
              {CATEGORY_LABELS[category]}
            </Badge>
          )}

          <h2 className="text-base font-semibold leading-snug text-gray-900 group-hover:text-blue-600">
            <a href={article.url} target="_blank" rel="noopener noreferrer">
              {article.title}
            </a>
          </h2>

          {article.summary_th && (
            <p className="text-sm leading-relaxed text-gray-600 line-clamp-3">
              {article.summary_th}
            </p>
          )}

          <div className="flex flex-wrap items-center gap-2 pt-1">
            <div className="flex items-center gap-1 text-xs text-gray-400">
              <Clock className="h-3 w-3" />
              <span>{timeAgo(article.published_at)}</span>
            </div>
            <span className="text-xs text-gray-400">·</span>
            <span className="text-xs text-gray-500">{article.source}</span>

            {article.tags.slice(0, 3).map((tag) => (
              <span key={tag} className="rounded-full bg-gray-100 px-2 py-0.5 text-xs text-gray-500">
                {tag}
              </span>
            ))}
          </div>
        </div>

        <a
          href={article.url}
          target="_blank"
          rel="noopener noreferrer"
          className="shrink-0 rounded-lg p-2 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600"
          aria-label="เปิดบทความ"
        >
          <ExternalLink className="h-4 w-4" />
        </a>
      </div>
    </article>
  )
}
