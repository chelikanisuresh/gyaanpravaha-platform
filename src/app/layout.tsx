import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Gyaanpravaha — Learn it. Know it. Flow with it.',
  description: 'Gyaanpravaha is a digital learning platform built specifically for Grade 6 students of Singhania School, Thane.',
  keywords: 'Gyaanpravaha, Singhania School, Grade 6, English, learning, edtech',
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
