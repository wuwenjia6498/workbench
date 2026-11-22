import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: '我的工作台',
  description: '工作与个人工具导航',
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
