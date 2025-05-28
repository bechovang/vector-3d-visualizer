import type { Metadata } from 'next'
import './globals.css'
import { ThemeProvider } from "next-themes"
import { ThemeToggleButton } from "@/components/theme-toggle-button"

export const metadata: Metadata = {
  title: 'Vector 3D Visualizer',
  description: 'Interactive 3D vector operations visualizer',
  generator: 'v0.dev',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="absolute top-4 right-4 z-50">
            <ThemeToggleButton />
          </div>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
