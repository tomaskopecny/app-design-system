'use client'

import { DSLayout } from '@/components/ds/ds-layout'
import { DSSection } from '@/components/ds/ds-section'
import { AlertCircle, ArrowUp, ArrowRight, ArrowDown, Minus, Plus, MoreHorizontal } from 'lucide-react'

function Avatar({ initials, color, size = 'sm' }: { initials: string; color: string; size?: 'xs' | 'sm' }) {
  const dim = size === 'xs' ? 'w-4 h-4 text-[8px]' : 'w-5 h-5 text-[9px]'
  return (
    <span className={`${dim} rounded-full flex items-center justify-center font-semibold text-background shrink-0`} style={{ background: color }}>
      {initials}
    </span>
  )
}

const priorityConfig: Record<string, { icon: React.ElementType; color: string }> = {
  urgent: { icon: AlertCircle, color: 'text-priority-urgent' },
  high: { icon: ArrowUp, color: 'text-priority-high' },
  medium: { icon: ArrowRight, color: 'text-priority-medium' },
  low: { icon: ArrowDown, color: 'text-muted-foreground' },
  none: { icon: Minus, color: 'text-muted-foreground/40' },
}

const labelColors: Record<string, string> = {
  Bug: 'bg-label-bug/15 text-label-bug border-label-bug/30',
  Feature: 'bg-label-feature/15 text-label-feature border-label-feature/30',
  Improvement: 'bg-label-improvement/15 text-label-improvement border-label-improvement/30',
}

interface KanbanCard {
  id: string
  title: string
  priority: string
  labels?: string[]
  assignee?: { initials: string; color: string }
  subIssues?: number
  comments?: number
}

const columns: { title: string; color: string; cards: KanbanCard[] }[] = [
  {
    title: 'Todo',
    color: 'bg-status-todo',
    cards: [
      { id: 'ENG-430', title: 'Improve onboarding email sequence', priority: 'medium', labels: ['Improvement'] },
      { id: 'ENG-431', title: 'Add CSV export to reports', priority: 'low', labels: ['Feature'], assignee: { initials: 'AV', color: '#26B5CE' } },
      { id: 'ENG-432', title: 'Fix margin on mobile nav', priority: 'high', labels: ['Bug'], comments: 2 },
    ],
  },
  {
    title: 'In Progress',
    color: 'bg-status-inprogress',
    cards: [
      { id: 'ENG-421', title: 'Fix auth session timeout on mobile', priority: 'urgent', labels: ['Bug'], assignee: { initials: 'TK', color: '#5E6AD2' }, comments: 4, subIssues: 2 },
      { id: 'ENG-422', title: 'Add dark mode toggle to settings', priority: 'high', labels: ['Feature'], assignee: { initials: 'MR', color: '#F2994A' } },
    ],
  },
  {
    title: 'In Review',
    color: 'bg-priority-medium',
    cards: [
      { id: 'ENG-418', title: 'Migrate database to Neon', priority: 'high', assignee: { initials: 'JD', color: '#6FCF97' }, comments: 6 },
    ],
  },
  {
    title: 'Done',
    color: 'bg-status-done',
    cards: [
      { id: 'ENG-415', title: 'Update design tokens documentation', priority: 'medium', labels: ['Improvement'], assignee: { initials: 'PW', color: '#EB5757' } },
      { id: 'ENG-416', title: 'Write unit tests for auth flow', priority: 'medium', assignee: { initials: 'TK', color: '#5E6AD2' }, subIssues: 5 },
    ],
  },
]

function KanbanCardComponent({ card }: { card: KanbanCard }) {
  const P = priorityConfig[card.priority] || priorityConfig.none
  return (
    <div className="bg-surface-1 border border-border rounded-md p-3 hover:border-border/60 hover:bg-surface-2 transition-colors cursor-pointer group">
      {/* Labels */}
      {card.labels && card.labels.length > 0 && (
        <div className="flex flex-wrap gap-1 mb-2">
          {card.labels.map(label => (
            <span key={label} className={`inline-flex items-center px-1.5 py-0.5 text-[10px] font-medium rounded border ${labelColors[label] || 'bg-surface-3 text-muted-foreground border-border'}`}>
              {label}
            </span>
          ))}
        </div>
      )}
      {/* Title */}
      <p className="text-xs text-foreground leading-relaxed mb-2.5">{card.title}</p>
      {/* Footer */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          <P.icon className={`w-3 h-3 shrink-0 ${P.color}`} />
          <span className="text-[10px] text-muted-foreground font-mono">{card.id}</span>
          {card.subIssues && (
            <span className="text-[10px] text-muted-foreground ml-1">{card.subIssues} sub</span>
          )}
          {card.comments && (
            <span className="text-[10px] text-muted-foreground">{card.comments} comments</span>
          )}
        </div>
        <div className="flex items-center gap-1">
          <button className="opacity-0 group-hover:opacity-100 w-7 h-7 flex items-center justify-center rounded text-muted-foreground hover:text-foreground hover:bg-surface-3 active:opacity-70 transition-all cursor-pointer touch-manipulation">
            <MoreHorizontal className="w-3 h-3" />
          </button>
          {card.assignee && <Avatar initials={card.assignee.initials} color={card.assignee.color} size="xs" />}
        </div>
      </div>
    </div>
  )
}

function KanbanColumn({ column }: { column: typeof columns[0] }) {
  return (
    <div className="flex flex-col w-56 shrink-0">
      {/* Column header */}
      <div className="flex items-center gap-2 mb-2.5 px-0.5">
        <div className={`w-1.5 h-1.5 rounded-full shrink-0 ${column.color}`} />
        <span className="text-xs font-medium text-foreground flex-1">{column.title}</span>
        <span className="text-[11px] text-muted-foreground">{column.cards.length}</span>
        <button className="w-5 h-5 flex items-center justify-center rounded text-muted-foreground hover:text-foreground hover:bg-surface-2 transition-colors cursor-pointer">
          <Plus className="w-3 h-3" />
        </button>
      </div>
      {/* Cards */}
      <div className="flex flex-col gap-2">
        {column.cards.map(card => (
          <KanbanCardComponent key={card.id} card={card} />
        ))}
        {/* Drop zone hint */}
        <button className="w-full py-2 text-[11px] text-muted-foreground/50 hover:text-muted-foreground border border-dashed border-border/50 hover:border-border rounded-md transition-colors cursor-pointer">
          + Add issue
        </button>
      </div>
    </div>
  )
}

export default function KanbanPage() {
  return (
    <DSLayout
      title="Kanban Cards"
      description="Board view cards show issue title, priority icon, ID, labels, assignee avatar, and optional sub-issue/comment counts. Hover reveals the action button."
    >
      <DSSection title="Board view" description="4-column layout for the board view. Each column has a header with status dot, name, count, and add button.">
        <div className="flex gap-3 overflow-x-auto pb-2 -mb-2">
          {columns.map(col => (
            <KanbanColumn key={col.title} column={col} />
          ))}
        </div>
      </DSSection>

      <DSSection title="Card anatomy" description="A single card at rest and on hover, with all elements labelled.">
        <div className="flex gap-6 flex-wrap items-start">
          {/* At rest */}
          <div className="flex flex-col gap-1.5 w-56">
            <span className="text-[11px] text-muted-foreground mb-1">At rest</span>
            <KanbanCardComponent card={columns[1].cards[0]} />
          </div>
          {/* Anatomy labels */}
          <div className="flex flex-col gap-1.5 pt-7">
            {[
              'Label chip (optional)',
              'Issue title — 2 line max',
              'Priority icon',
              'Issue ID (monospace)',
              'Sub-issues / comment counts',
              'Assignee avatar (right-aligned)',
            ].map((label, i) => (
              <div key={i} className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-muted-foreground/40 shrink-0" />
                <span className="text-[11px] text-muted-foreground">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </DSSection>
    </DSLayout>
  )
}
