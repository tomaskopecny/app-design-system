'use client'

import { useState } from 'react'
import { Menu } from 'lucide-react'
import { DSSidebar } from './ds-sidebar'

interface DSLayoutProps {
  children: React.ReactNode
  title: string
  description?: string
}

export function DSLayout({ children, title, description }: DSLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="min-h-screen bg-background flex">
      <DSSidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Main content — offset by sidebar width on md+ */}
      <main className="flex-1 min-w-0 md:ml-56">
        {/* Page header */}
        <div className="border-b border-border px-4 py-4 md:px-8 md:py-6 flex items-start gap-3">
          {/* Hamburger — mobile only */}
          <button
            onClick={() => setSidebarOpen(true)}
            className="md:hidden mt-0.5 p-2 -ml-1 rounded-md text-muted-foreground hover:text-foreground hover:bg-surface-2 active:opacity-70 transition-colors shrink-0 touch-manipulation"
            aria-label="Open navigation"
          >
            <Menu className="w-4 h-4" />
          </button>
          <div className="min-w-0">
            <h1 className="text-xl font-semibold text-foreground tracking-tight">{title}</h1>
            {description && (
              <p className="mt-1 text-sm text-muted-foreground leading-relaxed">{description}</p>
            )}
          </div>
        </div>
        {/* Page content */}
        <div className="px-4 py-6 md:px-8 md:py-8 space-y-12">
          {children}
        </div>
      </main>
    </div>
  )
}
