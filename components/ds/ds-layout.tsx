import { DSSidebar } from './ds-sidebar'

interface DSLayoutProps {
  children: React.ReactNode
  title: string
  description?: string
}

export function DSLayout({ children, title, description }: DSLayoutProps) {
  return (
    <div className="min-h-screen bg-background flex">
      <DSSidebar />
      <main className="ml-56 flex-1 min-w-0">
        {/* Page header */}
        <div className="border-b border-border px-8 py-6">
          <h1 className="text-xl font-semibold text-foreground tracking-tight">{title}</h1>
          {description && (
            <p className="mt-1 text-sm text-muted-foreground leading-relaxed">{description}</p>
          )}
        </div>
        {/* Page content */}
        <div className="px-8 py-8 space-y-12">
          {children}
        </div>
      </main>
    </div>
  )
}
