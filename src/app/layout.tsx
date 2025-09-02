import type { Metadata, Viewport } from 'next'
import '@/styles/globals.css'

export const metadata: Metadata = {
  title: 'SmartCV – AI CV Builder for Immigrants, Workers & Career Starters',
  description:
    'Create a professional CV in minutes with SmartCV. Tailored for immigrants, workers, and first-time job seekers. No experience? No problem. Use AI to build, translate, and export your CV instantly.',
  metadataBase: new URL('https://serviceghorba.com'),
  openGraph: {
    title: 'SmartCV – AI CV Builder for Immigrants, Workers & Career Starters',
    description:
      'Build a professional CV with AI – perfect for service jobs, first-timers, or anyone who needs a resume fast. Translate, export, and customize for any country.',
    url: 'https://serviceghorba.com',
    type: 'website',
    images: [
      {
        url: 'https://serviceghorba.com/Logo.png',
        width: 1200,
        height: 630,
        alt: 'SmartCV – AI CV Builder',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SmartCV – AI CV Builder for Immigrants & Workers',
    description:
      'No experience? No problem. Use AI to build a CV for any country or job. Fast, translated, and free to use.',
    images: ['https://serviceghorba.com/Logo.png'],
  },
  icons: {
    icon: '/Favicon.png',
    apple: '/Favicon.png',
  },
}

export const viewport: Viewport = {
  themeColor: '#043fff',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" dir="ltr">
      <body>{children}</body>
    </html>
  )
}