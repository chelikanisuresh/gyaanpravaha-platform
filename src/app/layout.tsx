import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Gyaanpravaha — Learn it. Know it. Flow with it.',
  description: 'A digital learning platform that brings your syllabus to life.',
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
