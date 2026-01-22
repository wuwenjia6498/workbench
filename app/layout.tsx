import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: '老约翰工作台 | Lao John Workbench',
  description: '老约翰内部运营工具导航门户',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh-CN">
      <body>{children}</body>
    </html>
  )
}
