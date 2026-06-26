'use client'

import { DSLayout } from '@/components/ds/ds-layout'
import { DSSection, DSPreview } from '@/components/ds/ds-section'
import { useState } from 'react'
import { ChevronRight, AlertCircle, ArrowUp, ArrowRight, ArrowDown, Minus, Circle, CircleDot, CheckCircle2, XCircle } from 'lucide-react'

function GroupHeader({
  label,
  count,
  icon,
  color,
  collapsed,
  onToggle,
}: {
  label: string
  count: number
  icon?: React.ReactNode
  color?: string
  collapsed?: boolean
  onToggle?: () => void
}) {
  return (
    <div
      className="flex items-center gap-2 px-3 py-1.5 sticky top-0 bg-background/90 backdrop-blur-sm z-10 border-b border-border group cursor-pointer hover:bg-surface-1 transition-colors"
      onClick={onToggle}
    >
      <ChevronRight
        className={`w-3 h-3 text-muted-foreground/60 shrink-0 transition-transform ${collapsed ? '' : 'rotate-90'}`}
      />
      {icon && <span className="shrink-0">{icon}</span>}
      <span className="text-xs font-medium text-foreground">{label}</span>
      <span className="text-[11px] text-muted-foreground ml-0.5">{count}</span>
      <div className="flex-1" />
    </div>
  )
}

const issues = {
  todo: [
    { id: 'ENG-430', title: 'Improve onboarding email sequence', priority: 'medium' },
    { id: 'ENG-431', title: 'Add CSV export to reports', priority: 'low' },
    { id: 'ENG-432', title: 'Fix margin on mobile nav', priority: 'low' },
  ],
  inprogress: [
    { id: 'ENG-421', title: 'Fix auth session timeout on mobile', priority: 'urgent' },
    { id: 'ENG-422', title: 'Add dark mode toggle to settings', priority: 'high' },
  ],
  done: [
    { id: 'ENG-418', title: 'Migrate database to Neon', priority: 'high' },
    { id: 'ENG-419', title: 'Update design tokens documentation', priority: 'medium' },
    { id: 'ENG-420', title: 'Write unit tests for auth flow', priority: 'medium' },
  ],
  cancelled: [
    { id: 'ENG-415', title: 'Experiment with Bun runtime', priority: 'low' },
  ],
}

const priorityConfig: Record<string, { icon: React.ElementType; color: string }> = {
  urgent: { icon: AlertCircle, color: 'text-priority-urgent' },
  high: { icon: ArrowUp, color: 'text-priority-high' },
  medium: { icon: ArrowRight, color: 'text-priority-medium' },
  low: { icon: ArrowDown, color: 'text-muted-foreground' },
  none: { icon: Minus, color: 'text-muted-foreground/40' },
}

const statusGroups = [
  { key: 'todo', label: 'Todo', icon: <Circle className="w-3 h-3 text-status-todo" />, issues: issues.todo },
  { key: 'inprogress', label: 'In Progress', icon: <CircleDot className="w-3 h-3 text-status-inprogress" />, issues: issues.inprogress },
  { key: 'done', label: 'Done', icon: <CheckCircle2 className="w-3 h-3 text-status-done" />, issues: issues.done },
  { key: 'cancelled', label: 'Cancelled', icon: <XCircle className="w-3 h-3 text-status-cancelled" />, issues: issues.cancelled },
]

function IssueRow({ id, title, priority }: { id: string; title: string; priority: string }) {
  const P = priorityConfig[priority] || priorityConfig.none
  return (
    <div className="flex items-center gap-3 px-3 py-2 border-b border-border last:border-0 hover:bg-surface-1 transition-colors cursor-pointer">
      <P.icon className={`w-3 h-3 shrink-0 ${P.color}`} />
      <span className="text-[11px] text-muted-foreground font-mono shrink-0">{id}</span>
      <span className="flex-1 text-xs text-foreground truncate">{title}</span>
    </div>
  )
}

export default function GroupingPage() {
  const [collapsed, setCollapsed] = useState<Record<string, boolean>>({ cancelled: true })

  const toggle = (key: string) =>
    setCollapsed(c => ({ ...c, [key]: !c[key] }))

  return (
    <DSLayout
      title="Grouping Headers"
      description="Sticky section headers separate issues by status, assignee, priority, or label. Each header shows the group name, issue count, and a collapse chevron."
    >
      <DSSection title="Group by status" description="The default grouping — sticky headers remain visible while scrolling through long lists.">
        <div className="rounded-md border border-border bg-background overflow-hidden">
          {statusGroups.map(group => (
            <div key={group.key}>
              <GroupHeader
                label={group.label}
                count={group.issues.length}
                icon={group.icon}
                collapsed={collapsed[group.key]}
                onToggle={() => toggle(group.key)}
              />
              {!collapsed[group.key] && group.issues.map(issue => (
                <IssueRow key={issue.id} {...issue} />
              ))}
            </div>
          ))}
        </div>
      </DSSection>

      <DSSection title="Group by priority" description="Priority groups use the priority icon and color as the group indicator.">
        <div className="rounded-md border border-border bg-background overflow-hidden">
          {(Object.entries(priorityConfig) as [string, { icon: React.ElementType; color: string }][]).map(([key, { icon: Icon, color }]) => {
            const groupIssues = Object.values(issues).flat().filter(i => i.priority === key).slice(0, 2)
            if (groupIssues.length === 0) return null
            return (
              <div key={key}>
                <GroupHeader
                  label={key.charAt(0).toUpperCase() + key.slice(1)}
                  count={groupIssues.length}
                  icon={<Icon className={`w-3 h-3 ${color}`} />}
                  collapsed={collapsed[`priority-${key}`]}
                  onToggle={() => toggle(`priority-${key}`)}
                />
                {!collapsed[`priority-${key}`] && groupIssues.map(issue => (
                  <IssueRow key={issue.id} {...issue} />
                ))}
              </div>
            )
          })}
        </div>
      </DSSection>

      <DSSection title="Header anatomy" description="Breakdown of the group header structure.">
        <DSPreview>
          <div className="w-full">
            <div className="flex items-center gap-2 px-3 py-2 bg-surface-1 rounded-md border border-border">
              <ChevronRight className="w-3 h-3 text-muted-foreground/60 rotate-90" />
              <CircleDot className="w-3 h-3 text-status-inprogress" />
              <span className="text-xs font-medium text-foreground">In Progress</span>
              <span className="text-[11px] text-muted-foreground">4</span>
              <div className="flex-1" />
              <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100">
                <button className="text-[11px] text-muted-foreground hover:text-foreground px-1.5 py-0.5 rounded hover:bg-surface-2 transition-colors cursor-pointer">+ Add issue</button>
              </div>
            </div>
            <div className="mt-2 flex flex-col gap-1 text-[11px] text-muted-foreground pl-2">
              <div className="flex items-center gap-2"><span className="text-foreground">→</span> Collapse chevron (rotates when closed)</div>
              <div className="flex items-center gap-2"><span className="text-foreground">→</span> Status / priority / label icon</div>
              <div className="flex items-center gap-2"><span className="text-foreground">→</span> Group name (font-medium)</div>
              <div className="flex items-center gap-2"><span className="text-foreground">→</span> Issue count (muted)</div>
            </div>
          </div>
        </DSPreview>
      </DSSection>
    </DSLayout>
  )
}
