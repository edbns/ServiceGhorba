import type { Metadata } from 'next'
import '@/styles/globals.css'
import '@/i18n'

export const metadata: Metadata = {
  title: 'AI CV Generator',
  description: 'Create professional CVs, resumes, and motivation letters with AI assistance',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}