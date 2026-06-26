import { cn } from '@/lib/utils'

interface DSSectionProps {
  title: string
  description?: string
  children: React.ReactNode
  className?: string
}

export function DSSection({ title, description, children, className }: DSSectionProps) {
  return (
    <section className={cn('space-y-4', className)}>
      <div>
        <h2 className="text-sm font-semibold text-foreground">{title}</h2>
        {description && (
          <p className="mt-0.5 text-xs text-muted-foreground leading-relaxed">{description}</p>
        )}
      </div>
      <div>{children}</div>
    </section>
  )
}

interface DSPreviewProps {
  children: React.ReactNode
  className?: string
  code?: string
}

export function DSPreview({ children, className, code }: DSPreviewProps) {
  return (
    <div className={cn('rounded-md border border-border overflow-hidden', className)}>
      <div className="p-6 bg-surface-1 flex flex-wrap gap-4 items-center">
        {children}
      </div>
      {code && (
        <div className="border-t border-border bg-background px-4 py-3">
          <pre className="font-mono text-[11px] text-muted-foreground overflow-x-auto">{code}</pre>
        </div>
      )}
    </div>
  )
}
