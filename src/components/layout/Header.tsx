import Link from 'next/link'
import { Newspaper, Zap } from 'lucide-react'

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-gray-200 bg-white/80 backdrop-blur-sm">
      <div className="mx-auto flex h-14 max-w-5xl items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2 font-bold text-gray-900">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-blue-600">
            <Newspaper className="h-4 w-4 text-white" />
          </div>
          <span>AI News Claude</span>
        </Link>

        <nav className="flex items-center gap-6 text-sm text-gray-600">
          <Link href="/" className="hover:text-gray-900 transition-colors">
            ข่าวล่าสุด
          </Link>
          <Link href="/trends" className="hover:text-gray-900 transition-colors">
            เทรนด์
          </Link>
          <Link href="/research" className="hover:text-gray-900 transition-colors">
            งานวิจัย
          </Link>
          <Link href="/tools" className="hover:text-gray-900 transition-colors">
            AI Tools
          </Link>
        </nav>

        <div className="flex items-center gap-2 rounded-full bg-blue-50 px-3 py-1 text-xs text-blue-700">
          <Zap className="h-3 w-3" />
          <span>Powered by Claude</span>
        </div>
      </div>
    </header>
  )
}
