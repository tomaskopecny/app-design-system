'use client'

import { DSLayout } from '@/components/ds/ds-layout'
import { DSSection } from '@/components/ds/ds-section'
import { AlertCircle, ArrowUp, Minus, Circle, CheckCircle2, X, MoreHorizontal, MessageSquare, GitBranch } from 'lucide-react'
import { useState } from 'react'

const priorityConfig = {
  urgent:  { icon: AlertCircle, color: '#E5534B', label: 'Urgent' },
  high:    { icon: ArrowUp,     color: '#E07B39', label: 'High' },
  medium:  { icon: Minus,       color: '#D4A72C', label: 'Medium' },
  low:     { icon: Minus,       color: '#6B6B6B', label: 'Low' },
} as const

const statusConfig = {
  todo:       { color: '#6B6B6B', label: 'Todo', icon: Circle },
  inprogress: { color: '#4D8EE8', label: 'In Progress', icon: Circle },
  done:       { color: '#4CAF7D', label: 'Done', icon: CheckCircle2 },
  cancelled:  { color: '#404040', label: 'Cancelled', icon: X },
} as const

type Priority = keyof typeof priorityConfig
type Status = keyof typeof statusConfig

interface Issue {
  id: string
  title: string
  priority: Priority
  status: Status
  assignee: { initials: string; color: string }
  comments?: number
  branch?: boolean
  label?: string
  labelColor?: string
}

const issues: Issue[] = [
  { id: 'ENG-2451', title: 'Implement command palette with keyboard shortcuts', priority: 'urgent', status: 'inprogress', assignee: { initials: 'AF', color: '#4D8EE8' }, comments: 4, branch: true, label: 'Feature', labelColor: '#4D8EE8' },
  { id: 'ENG-2449', title: 'Fix sidebar scroll position not persisting on navigation', priority: 'high', status: 'todo', assignee: { initials: 'LF', color: '#E07B39' }, comments: 1, label: 'Bug', labelColor: '#E5534B' },
  { id: 'ENG-2448', title: 'Add real-time presence indicators for collaborators', priority: 'medium', status: 'todo', assignee: { initials: 'YB', color: '#4CAF7D' }, branch: true },
  { id: 'ENG-2445', title: 'Migrate issue list to virtual scroll for performance', priority: 'high', status: 'inprogress', assignee: { initials: 'OD', color: '#9B6DFF' }, comments: 8, label: 'Improvement', labelColor: '#4CAF7D' },
  { id: 'ENG-2440', title: 'Design token audit — consolidate border opacity variants', priority: 'low', status: 'done', assignee: { initials: 'MK', color: '#E5534B' }, comments: 2 },
  { id: 'ENG-2438', title: 'Remove deprecated useLayoutEffect calls', priority: 'medium', status: 'cancelled', assignee: { initials: 'AF', color: '#4D8EE8' } },
]

function IssueRow({ issue, selected, onSelect }: { issue: Issue; selected: boolean; onSelect: () => void }) {
  const priority = priorityConfig[issue.priority]
  const status = statusConfig[issue.status]
  const PriorityIcon = priority.icon
  const StatusIcon = status.icon

  return (
    <div
      onClick={onSelect}
      className={`group flex items-center gap-3 px-4 py-2 border-b border-border last:border-0 cursor-pointer transition-colors ${
        selected ? 'bg-accent' : 'hover:bg-accent/60'
      }`}
    >
      {/* Checkbox */}
      <div className={`w-3.5 h-3.5 rounded border flex items-center justify-center shrink-0 transition-colors ${
        selected ? 'bg-foreground border-foreground' : 'border-border opacity-0 group-hover:opacity-100'
      }`}>
        {selected && <span className="w-2 h-2 bg-background rounded-sm" />}
      </div>

      {/* Priority */}
      <PriorityIcon className="w-3.5 h-3.5 shrink-0" style={{ color: priority.color }} />

      {/* Status */}
      <StatusIcon className="w-3.5 h-3.5 shrink-0" style={{ color: status.color }} />

      {/* ID */}
      <span className="text-[11px] font-mono text-muted-foreground/60 shrink-0 w-16">{issue.id}</span>

      {/* Title */}
      <span className={`text-sm flex-1 min-w-0 truncate ${
        issue.status === 'done' || issue.status === 'cancelled'
          ? 'text-muted-foreground line-through'
          : 'text-foreground'
      }`}>
        {issue.title}
      </span>

      {/* Metadata */}
      <div className="flex items-center gap-2 shrink-0 ml-2">
        {issue.label && (
          <span
            className="px-1.5 py-0.5 rounded text-[10px] font-medium hidden sm:inline-flex"
            style={{ background: `${issue.labelColor}18`, color: issue.labelColor, border: `1px solid ${issue.labelColor}25` }}
          >
            {issue.label}
          </span>
        )}
        {issue.branch && (
          <GitBranch className="w-3 h-3 text-muted-foreground/50 hidden md:block" />
        )}
        {issue.comments && issue.comments > 0 && (
          <div className="flex items-center gap-0.5 text-muted-foreground/50">
            <MessageSquare className="w-3 h-3" />
            <span className="text-[10px] font-mono">{issue.comments}</span>
          </div>
        )}
        {/* Assignee */}
        <div
          className="w-5 h-5 rounded-full flex items-center justify-center text-[9px] font-semibold text-white shrink-0"
          style={{ background: issue.assignee.color }}
        >
          {issue.assignee.initials}
        </div>
        {/* Actions — visible on hover */}
        <button className="w-5 h-5 flex items-center justify-center rounded text-muted-foreground opacity-0 group-hover:opacity-100 hover:bg-surface-3 transition-all">
          <MoreHorizontal className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  )
}

export default function IssuesPage() {
  const [selected, setSelected] = useState<string[]>([])

  const toggle = (id: string) =>
    setSelected(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id])

  return (
    <DSLayout
      title="Issue Rows"
      description="The issue row is Linear's most fundamental data component. It packs ID, priority, status, title, labels, comments, branch, and assignee into a single scannable row."
    >
      <DSSection
        title="Interactive issue list"
        description="Click rows to select. Hover to reveal actions. Completed/cancelled issues use strikethrough."
      >
        <div className="rounded-md border border-border overflow-hidden">
          {/* List header */}
          <div className="flex items-center gap-3 px-4 py-2 bg-surface-2 border-b border-border">
            <div className="w-3.5" />
            <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground/60 flex-1">
              Issues · {issues.length}
            </p>
            {selected.length > 0 && (
              <span className="text-[11px] text-muted-foreground">{selected.length} selected</span>
            )}
          </div>
          {/* Issue rows */}
          <div className="bg-surface-1">
            {issues.map((issue) => (
              <IssueRow
                key={issue.id}
                issue={issue}
                selected={selected.includes(issue.id)}
                onSelect={() => toggle(issue.id)}
              />
            ))}
          </div>
        </div>
      </DSSection>

      <DSSection title="Row anatomy" description="Each slot in the row and when to populate it.">
        <div className="rounded-md border border-border overflow-hidden">
          <div className="grid grid-cols-[120px_1fr] gap-4 px-4 py-2.5 bg-surface-2 border-b border-border">
            <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">Slot</p>
            <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">Notes</p>
          </div>
          {[
            ['Checkbox', 'Hidden by default; revealed on hover. Supports bulk selection.'],
            ['Priority icon', 'Always present. 14px, colored with priority token.'],
            ['Status icon', 'Always present. Circle for open states, CheckCircle2 for done.'],
            ['Issue ID', 'Monospace, 11px, muted. Format: TEAM-0000.'],
            ['Title', 'Flex-1, truncated. Strikethrough for done/cancelled.'],
            ['Label badge', 'Optional. Max 1 label visible inline; more on hover.'],
            ['Branch indicator', 'GitBranch icon when a branch exists for the issue.'],
            ['Comment count', 'MessageSquare + count. Hidden when 0.'],
            ['Assignee avatar', 'Always rightmost. 20px circle with initials.'],
            ['Action menu', 'MoreHorizontal, opacity-0 → 100 on row hover.'],
          ].map(([slot, note]) => (
            <div key={slot} className="grid grid-cols-[120px_1fr] gap-4 px-4 py-2.5 border-b border-border last:border-0 bg-surface-1">
              <code className="text-xs font-mono text-foreground">{slot}</code>
              <p className="text-xs text-muted-foreground">{note}</p>
            </div>
          ))}
        </div>
      </DSSection>
    </DSLayout>
  )
}
