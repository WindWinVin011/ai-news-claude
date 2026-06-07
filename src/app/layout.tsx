import type { Metadata } from 'next'
import { Geist } from 'next/font/google'
import './globals.css'
import { Header } from '@/components/layout/Header'

const geist = Geist({ variable: '--font-geist', subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'AI News Claude — ข่าว AI ล่าสุด',
  description: 'แพลตฟอร์มรวมข่าว AI ที่ขับเคลื่อนด้วย Claude — วิเคราะห์ สรุป และติดตามเทรนด์ AI ล่าสุด',
  keywords: ['AI', 'artificial intelligence', 'ข่าว AI', 'machine learning', 'LLM'],
  openGraph: {
    title: 'AI News Claude',
    description: 'ข่าว AI ล่าสุด สรุปโดย Claude',
    type: 'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="th" className={`${geist.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col bg-gray-50 text-gray-900">
        <Header />
        <main className="flex-1">
          {children}
        </main>
        <footer className="border-t border-gray-200 bg-white py-6 text-center text-xs text-gray-400">
          AI News Claude — ขับเคลื่อนด้วย Claude AI และ Supabase
        </footer>
      </body>
    </html>
  )
}
