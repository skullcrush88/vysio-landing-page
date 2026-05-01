import type { Metadata } from 'next'
import { Inter, Instrument_Serif } from 'next/font/google'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
})

const instrumentSerif = Instrument_Serif({
  weight: ['400'],
  subsets: ['latin'],
  variable: '--font-instrument',
})

export const metadata: Metadata = {
  title: 'Vysio - Turn Images into Production-Ready UI',
  description: 'Transform images into clean, production-ready code using multi-agent AI intelligence. From pixels to code, instantly.',
  keywords: ['AI', 'UI generation', 'code generation', 'design to code', 'HTML', 'CSS', 'React'],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="lenis">
      <body className={`${inter.variable} ${instrumentSerif.variable} ${inter.className}`}>
        {children}
      </body>
    </html>
  )
}

// Made with Bob
