'use client'

import { DSLayout } from '@/components/ds/ds-layout'
import { DSSection, DSPreview } from '@/components/ds/ds-section'
import { Circle, GitBranch, MessageSquare, User, Tag, ArrowRight, CheckCircle2, XCircle, Clock } from 'lucide-react'

type EventType = 'status' | 'comment' | 'assign' | 'label' | 'created' | 'closed' | 'branch'

interface TimelineEvent {
  id: string
  type: EventType
  actor: string
  time: string
  content?: string
  meta?: string
}

const EVENTS: TimelineEvent[] = [
  { id: '1', type: 'created', actor: 'Alice Chen', time: '3 days ago', meta: 'ENG-1234' },
  { id: '2', type: 'assign', actor: 'Bob Kim', time: '3 days ago', meta: 'Alice Chen' },
  { id: '3', type: 'label', actor: 'Alice Chen', time: '2 days ago', meta: 'Feature' },
  { id: '4', type: 'status', actor: 'Alice Chen', time: '2 days ago', meta: 'In Progress' },
  { id: '5', type: 'branch', actor: 'Alice Chen', time: '2 days ago', meta: 'feat/keyboard-shortcuts' },
  { id: '6', type: 'comment', actor: 'Carlos Diaz', time: '1 day ago', content: "I've been thinking about the UX here — should we also support ⌘K to open the quick create modal? That way it's consistent with the command palette flow." },
  { id: '7', type: 'comment', actor: 'Alice Chen', time: '1 day ago', content: 'Good call. I\'ll add that as a separate shortcut handler so we don\'t conflict with the search binding.' },
  { id: '8', type: 'status', actor: 'Alice Chen', time: '4 hours ago', meta: 'Done' },
]

const TYPE_CONFIG: Record<EventType, {
  icon: React.ElementType
  iconClass: string
  dotClass: string
  label: (e: TimelineEvent) => string
}> = {
  created: { icon: Circle, iconClass: 'text-muted-foreground', dotClass: 'bg-surface-3 border-border', label: e => `${e.actor} created this issue` },
  assign: { icon: User, iconClass: 'text-muted-foreground', dotClass: 'bg-surface-3 border-border', label: e => `${e.actor} assigned to ${e.meta}` },
  label: { icon: Tag, iconClass: 'text-label-feature', dotClass: 'bg-label-feature/15 border-label-feature/30', label: e => `${e.actor} added label ${e.meta}` },
  status: {
    icon: ArrowRight,
    iconClass: 'text-status-inprogress',
    dotClass: 'bg-status-inprogress/15 border-status-inprogress/30',
    label: e => `${e.actor} moved to ${e.meta}`,
  },
  branch: { icon: GitBranch, iconClass: 'text-muted-foreground', dotClass: 'bg-surface-3 border-border', label: e => `${e.actor} created branch` },
  comment: { icon: MessageSquare, iconClass: 'text-muted-foreground', dotClass: 'bg-surface-3 border-border', label: e => e.actor },
  closed: { icon: XCircle, iconClass: 'text-destructive', dotClass: 'bg-destructive/15 border-destructive/30', label: e => `${e.actor} closed this issue` },
}

function Avatar({ name }: { name: string }) {
  return (
    <div className="w-5 h-5 rounded-full bg-surface-3 flex items-center justify-center text-[9px] font-semibold text-muted-foreground shrink-0">
      {name[0]}
    </div>
  )
}

function ActivityTimeline({ events }: { events: TimelineEvent[] }) {
  return (
    <ol className="space-y-0" aria-label="Issue activity">
      {events.map((event, idx) => {
        const cfg = TYPE_CONFIG[event.type]
        const Icon = cfg.icon
        const isComment = event.type === 'comment'
        const isLast = idx === events.length - 1

        return (
          <li key={event.id} className="relative flex gap-3">
            {/* Vertical connector line */}
            {!isLast && (
              <div className="absolute left-[9px] top-5 bottom-0 w-px bg-border" aria-hidden="true" />
            )}

            {/* Icon dot */}
            <div className={`relative z-10 mt-0.5 w-[18px] h-[18px] rounded-full border flex items-center justify-center shrink-0 ${cfg.dotClass}`}>
              <Icon className={`w-2.5 h-2.5 ${cfg.iconClass}`} aria-hidden="true" />
            </div>

            {/* Content */}
            <div className={`flex-1 min-w-0 ${isLast ? '' : 'pb-4'}`}>
              {isComment ? (
                <div className="rounded-md border border-border bg-surface-1 overflow-hidden">
                  <div className="flex items-center gap-2 px-3 py-2 border-b border-border bg-surface-2">
                    <Avatar name={event.actor} />
                    <span className="text-xs font-medium text-foreground">{event.actor}</span>
                    <span className="text-[11px] text-muted-foreground ml-auto">{event.time}</span>
                  </div>
                  <p className="px-3 py-2.5 text-xs text-foreground leading-relaxed">{event.content}</p>
                </div>
              ) : (
                <div className="flex items-center gap-2 pt-0.5">
                  <Avatar name={event.actor} />
                  <p className="text-xs text-muted-foreground">
                    {cfg.label(event)}
                    {event.type === 'branch' && (
                      <code className="ml-1 px-1 py-0.5 rounded-sm bg-surface-2 border border-border text-[10px] text-foreground font-mono">
                        {event.meta}
                      </code>
                    )}
                  </p>
                  <span className="text-[11px] text-muted-foreground ml-auto shrink-0">{event.time}</span>
                </div>
              )}
            </div>
          </li>
        )
      })}
    </ol>
  )
}

// Compact horizontal timeline for progress steps
function StageTimeline() {
  const stages = [
    { label: 'Created', done: true },
    { label: 'In Progress', done: true },
    { label: 'In Review', done: true },
    { label: 'Done', done: false },
  ]
  return (
    <div className="flex items-center gap-0 w-full">
      {stages.map((stage, i) => (
        <div key={stage.label} className="flex items-center flex-1 last:flex-none">
          <div className="flex flex-col items-center gap-1.5">
            <div className={`w-5 h-5 rounded-full flex items-center justify-center border ${stage.done ? 'bg-status-done/20 border-status-done/40' : 'bg-surface-2 border-border'}`}>
              {stage.done
                ? <CheckCircle2 className="w-3 h-3 text-status-done" aria-hidden="true" />
                : <Clock className="w-3 h-3 text-muted-foreground" aria-hidden="true" />}
            </div>
            <span className={`text-[10px] whitespace-nowrap ${stage.done ? 'text-foreground' : 'text-muted-foreground'}`}>{stage.label}</span>
          </div>
          {i < stages.length - 1 && (
            <div className={`flex-1 h-px mx-2 mb-5 ${stage.done && stages[i + 1].done ? 'bg-status-done/40' : 'bg-border'}`} aria-hidden="true" />
          )}
        </div>
      ))}
    </div>
  )
}

export default function TimelinePage() {
  return (
    <DSLayout
      title="Timeline / Activity Feed"
      description="A vertical chronological list of events — status changes, comments, assignments, and integrations. Used in issue detail panels and project history."
    >
      <DSSection title="Activity feed" description="Full activity feed as seen in a Linear issue detail panel. Comments get a card; metadata events are compact rows.">
        <div className="max-w-lg">
          <ActivityTimeline events={EVENTS} />
        </div>
      </DSSection>

      <DSSection title="Compact events only" description="Metadata-only timeline for project history where comments are excluded.">
        <div className="max-w-lg">
          <ActivityTimeline events={EVENTS.filter(e => e.type !== 'comment')} />
        </div>
      </DSSection>

      <DSSection title="Horizontal stage progress" description="Linear pipeline of named stages with completed / pending states.">
        <DSPreview>
          <div className="w-full max-w-lg">
            <StageTimeline />
          </div>
        </DSPreview>
      </DSSection>

      <DSSection title="Event types" description="Reference for all supported event types and their visual treatment.">
        <div className="rounded-md border border-border overflow-hidden">
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b border-border bg-surface-2">
                <th className="text-left px-4 py-2.5 font-medium text-muted-foreground">Type</th>
                <th className="text-left px-4 py-2.5 font-medium text-muted-foreground">Icon</th>
                <th className="text-left px-4 py-2.5 font-medium text-muted-foreground">Rendering</th>
              </tr>
            </thead>
            <tbody>
              {[
                ['comment', 'MessageSquare', 'Full card with header, author, timestamp, body'],
                ['status', 'ArrowRight', 'Inline row with blue dot, actor, new status'],
                ['assign', 'User', 'Inline row, actor, assignee name'],
                ['label', 'Tag', 'Inline row, actor, label badge'],
                ['branch', 'GitBranch', 'Inline row, actor, monospace branch name'],
                ['created', 'Circle', 'Inline row, actor, issue id'],
                ['closed', 'XCircle', 'Inline row with red dot, actor'],
              ].map(([type, icon, desc]) => (
                <tr key={type} className="border-b border-border last:border-0">
                  <td className="px-4 py-2.5 font-mono text-foreground">{type}</td>
                  <td className="px-4 py-2.5 text-muted-foreground">{icon}</td>
                  <td className="px-4 py-2.5 text-muted-foreground">{desc}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </DSSection>
    </DSLayout>
  )
}
