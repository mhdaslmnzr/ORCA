import type { Metadata } from 'next'
import { ThemeProvider } from '../providers/ThemeProvider'
import ErrorBoundary from '../components/ErrorBoundary'
import HydrationSafeWrapper from '../components/HydrationSafeWrapper'

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
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap" rel="stylesheet" />
      </head>
      <body 
        className="font-sans" 
        suppressHydrationWarning
        style={{
          fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif",
          backgroundColor: '#0a0a0a',
          color: '#ffffff',
          margin: 0,
          padding: 0,
          boxSizing: 'border-box'
        }}
      >
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
