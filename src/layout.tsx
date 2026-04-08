import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Gyaanpravaha — Learn it. Know it. Flow with it.',
  description: 'Gyaanpravaha is a digital learning platform that brings your syllabus to life — explained simply, practised smartly, and tracked closely.',
  keywords: 'Gyaanpravaha, learning, education, digital platform, students',
  icons: {
    icon: [
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon.svg',       type: 'image/svg+xml' },
    ],
    apple: [
      { url: '/favicon-180x180.png', sizes: '180x180', type: 'image/png' },
    ],
    other: [
      { rel: 'icon', url: '/favicon-192x192.png', sizes: '192x192' },
      { rel: 'icon', url: '/favicon-512x512.png', sizes: '512x512' },
    ],
  },
  openGraph: {
    title: 'Gyaanpravaha',
    description: 'Learn it. Know it. Flow with it.',
    url: 'https://gyaanpravaha.in',
    siteName: 'Gyaanpravaha',
    locale: 'en_IN',
    type: 'website',
  },
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
