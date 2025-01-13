import './globals.css'
import { Metadata } from 'next'
import Navbar from './components/Navbar'
import Footer from './components/Footer'

export const metadata: Metadata = {
  title: 'LittleFish - Personal Website & AI Chat',
  description: 'LittleFish的个人网站和AI聊天助手',
  icons: {
    icon: [
      {
        url: '/icons/favicon.ico',
        sizes: '16x16',
      },
      {
        url: '/icons/icon-192x192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        url: '/icons/icon-512x512.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
    apple: [
      {
        url: '/icons/apple-touch-icon.png',
        sizes: '180x180',
        type: 'image/png',
      },
    ],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh">
      <body>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  )
}
