import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from '../providers/ThemeProvider'
import ErrorBoundary from '../components/ErrorBoundary'
import HydrationSafeWrapper from '../components/HydrationSafeWrapper'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'ORCA - PREDATOR Dashboard',
  description: 'Advanced AI system for equipment failure prediction and real-time monitoring',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className} suppressHydrationWarning>
        <ThemeProvider>
          <ErrorBoundary>
            <HydrationSafeWrapper>
              {children}
            </HydrationSafeWrapper>
          </ErrorBoundary>
        </ThemeProvider>
      </body>
    </html>
  )
}
