'use client'

import { DSLayout } from '@/components/ds/ds-layout'
import { DSSection, DSPreview } from '@/components/ds/ds-section'
import { Plus, Inbox, GitBranch, Search, CheckCircle2, Filter } from 'lucide-react'

function EmptyState({
  icon: Icon,
  title,
  description,
  action,
  onAction,
  size = 'default',
}: {
  icon: React.ElementType
  title: string
  description?: string
  action?: string
  onAction?: () => void
  size?: 'sm' | 'default'
}) {
  return (
    <div className={`flex flex-col items-center text-center ${size === 'sm' ? 'py-6 gap-2' : 'py-12 gap-3'}`}>
      <div className={`flex items-center justify-center rounded-full bg-surface-2 border border-border ${size === 'sm' ? 'w-8 h-8' : 'w-10 h-10'}`}>
        <Icon className={`text-muted-foreground ${size === 'sm' ? 'w-3.5 h-3.5' : 'w-4 h-4'}`} />
      </div>
      <div className="flex flex-col gap-1">
        <p className={`font-medium text-foreground ${size === 'sm' ? 'text-xs' : 'text-sm'}`}>{title}</p>
        {description && <p className={`text-muted-foreground max-w-xs leading-relaxed ${size === 'sm' ? 'text-[11px]' : 'text-xs'}`}>{description}</p>}
      </div>
      {action && (
        <button
          onClick={onAction}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md bg-foreground text-background hover:bg-foreground/90 transition-colors cursor-pointer"
        >
          <Plus className="w-3.5 h-3.5" />
          {action}
        </button>
      )}
    </div>
  )
}

function EmptyStateInline({
  icon: Icon,
  message,
}: {
  icon: React.ElementType
  message: string
}) {
  return (
    <div className="flex items-center gap-2 py-4 text-muted-foreground">
      <Icon className="w-3.5 h-3.5 shrink-0" />
      <span className="text-xs">{message}</span>
    </div>
  )
}

export default function EmptyStatesPage() {
  return (
    <DSLayout
      title="Empty States"
      description="Empty states guide users when there is no content to show. Always include an icon, a clear title, an optional sentence of context, and a primary action when applicable."
    >
      <DSSection title="Default empty state" description="Full-height empty state for a primary list or board view.">
        <div className="rounded-md border border-border bg-surface-1 overflow-hidden">
          <EmptyState
            icon={GitBranch}
            title="No issues yet"
            description="Create your first issue to start tracking work for this project."
            action="Create issue"
          />
        </div>
      </DSSection>

      <DSSection title="Inbox empty" description="Celebratory variant when the user has cleared all notifications.">
        <div className="rounded-md border border-border bg-surface-1 overflow-hidden">
          <EmptyState
            icon={CheckCircle2}
            title="You're all caught up"
            description="No new notifications. Check back later or adjust your notification settings."
          />
        </div>
      </DSSection>

      <DSSection title="No search results" description="Appears when a search or filter returns zero results. Always give a way to clear the filter.">
        <div className="rounded-md border border-border bg-surface-1 overflow-hidden">
          <EmptyState
            icon={Search}
            title='No results for "auth session"'
            description="Try a different search term, or clear your filters to see all issues."
            action="Clear filters"
          />
        </div>
      </DSSection>

      <DSSection title="Small variant" description="Compact empty state for sidebars, panels, and embedded lists.">
        <div className="rounded-md border border-border bg-surface-1 overflow-hidden flex gap-0 divide-x divide-border">
          <div className="flex-1">
            <EmptyState icon={Inbox} title="No notifications" size="sm" />
          </div>
          <div className="flex-1">
            <EmptyState icon={Filter} title="No active filters" size="sm" />
          </div>
        </div>
      </DSSection>

      <DSSection title="Inline empty state" description="One-line variant for empty sections within a larger page — no CTA, minimal visual footprint.">
        <div className="rounded-md border border-border bg-surface-1 px-4 divide-y divide-border">
          {[
            { icon: GitBranch, message: 'No branches linked to this issue.' },
            { icon: CheckCircle2, message: 'No sub-issues.' },
            { icon: Inbox, message: 'No comments yet.' },
          ].map(({ icon, message }, i) => (
            <EmptyStateInline key={i} icon={icon} message={message} />
          ))}
        </div>
      </DSSection>

      <DSSection title="With illustration area" description="Reserved space for a future illustration or graphic — uses a dashed border placeholder.">
        <div className="rounded-md border border-border bg-surface-1 overflow-hidden">
          <div className="flex flex-col items-center py-10 gap-4">
            <div className="w-24 h-16 rounded-lg border-2 border-dashed border-border flex items-center justify-center">
              <GitBranch className="w-6 h-6 text-muted-foreground/30" />
            </div>
            <div className="flex flex-col items-center gap-1 text-center">
              <p className="text-sm font-medium text-foreground">No projects</p>
              <p className="text-xs text-muted-foreground max-w-xs">Projects help you organise issues and track progress toward larger goals.</p>
            </div>
            <button className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md bg-surface-2 text-foreground border border-border hover:bg-surface-3 transition-colors cursor-pointer">
              <Plus className="w-3.5 h-3.5" />
              Create project
            </button>
          </div>
        </div>
      </DSSection>
    </DSLayout>
  )
}
