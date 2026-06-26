'use client'

import { DSLayout } from '@/components/ds/ds-layout'
import { DSSection, DSPreview } from '@/components/ds/ds-section'
import { GitBranch, Calendar, ChevronRight } from 'lucide-react'

function Avatar({ initials, color }: { initials: string; color: string }) {
  return (
    <span
      className="w-5 h-5 rounded-full flex items-center justify-center text-[9px] font-semibold text-background shrink-0"
      style={{ background: color }}
    >
      {initials}
    </span>
  )
}

function AvatarStack({ members }: { members: { initials: string; color: string }[] }) {
  const shown = members.slice(0, 4)
  const extra = members.length - shown.length
  return (
    <div className="flex items-center -space-x-1.5">
      {shown.map((m, i) => (
        <span
          key={i}
          className="w-4.5 h-4.5 rounded-full ring-1 ring-background text-[8px] font-semibold text-background flex items-center justify-center shrink-0"
          style={{ background: m.color, width: '18px', height: '18px' }}
        >
          {m.initials}
        </span>
      ))}
      {extra > 0 && (
        <span className="w-[18px] h-[18px] rounded-full ring-1 ring-background bg-surface-3 text-[8px] font-medium text-muted-foreground flex items-center justify-center shrink-0">
          +{extra}
        </span>
      )}
    </div>
  )
}

function ProgressBar({ value, total }: { value: number; total: number }) {
  const pct = total === 0 ? 0 : Math.round((value / total) * 100)
  return (
    <div className="flex items-center gap-2">
      <div className="flex-1 h-1 rounded-full bg-surface-3 overflow-hidden">
        <div
          className={`h-full rounded-full transition-all ${pct === 100 ? 'bg-status-done' : 'bg-status-inprogress'}`}
          style={{ width: `${pct}%` }}
        />
      </div>
      <span className="text-[10px] text-muted-foreground tabular-nums shrink-0">{pct}%</span>
    </div>
  )
}

const cycles = [
  {
    name: 'Sprint 24',
    status: 'active' as const,
    dates: 'Jun 10 – Jun 24',
    daysLeft: 5,
    completed: 18,
    total: 24,
    members: [
      { initials: 'TK', color: '#5E6AD2' },
      { initials: 'AV', color: '#26B5CE' },
      { initials: 'MR', color: '#F2994A' },
      { initials: 'JD', color: '#6FCF97' },
      { initials: 'PW', color: '#EB5757' },
    ],
  },
  {
    name: 'Sprint 23',
    status: 'completed' as const,
    dates: 'May 27 – Jun 9',
    daysLeft: 0,
    completed: 31,
    total: 31,
    members: [
      { initials: 'TK', color: '#5E6AD2' },
      { initials: 'AV', color: '#26B5CE' },
      { initials: 'MR', color: '#F2994A' },
    ],
  },
  {
    name: 'Sprint 25',
    status: 'upcoming' as const,
    dates: 'Jun 25 – Jul 8',
    daysLeft: null,
    completed: 0,
    total: 16,
    members: [
      { initials: 'JD', color: '#6FCF97' },
      { initials: 'PW', color: '#EB5757' },
    ],
  },
]

const statusConfig = {
  active: { label: 'Active', dot: 'bg-status-inprogress' },
  completed: { label: 'Completed', dot: 'bg-status-done' },
  upcoming: { label: 'Upcoming', dot: 'bg-muted-foreground' },
}

function CycleCard({ cycle }: { cycle: typeof cycles[0] }) {
  const config = statusConfig[cycle.status]
  return (
    <div className="p-4 bg-surface-1 rounded-md border border-border hover:border-border/80 hover:bg-surface-2 transition-colors cursor-pointer group">
      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="flex flex-col gap-0.5">
          <div className="flex items-center gap-2">
            <div className={`w-1.5 h-1.5 rounded-full shrink-0 ${config.dot}`} />
            <span className="text-sm font-medium text-foreground">{cycle.name}</span>
          </div>
          <div className="flex items-center gap-1.5 text-[11px] text-muted-foreground pl-3.5">
            <Calendar className="w-3 h-3" />
            {cycle.dates}
          </div>
        </div>
        <div className="flex items-center gap-3">
          <AvatarStack members={cycle.members} />
          <ChevronRight className="w-3.5 h-3.5 text-muted-foreground/40 opacity-0 group-hover:opacity-100 transition-opacity" />
        </div>
      </div>
      <ProgressBar value={cycle.completed} total={cycle.total} />
      <div className="flex items-center justify-between mt-2">
        <span className="text-[11px] text-muted-foreground">{cycle.completed}/{cycle.total} issues</span>
        {cycle.daysLeft !== null && cycle.daysLeft > 0 && (
          <span className={`text-[11px] ${cycle.daysLeft <= 2 ? 'text-priority-urgent' : 'text-muted-foreground'}`}>
            {cycle.daysLeft}d remaining
          </span>
        )}
        {cycle.status === 'completed' && <span className="text-[11px] text-status-done">Complete</span>}
        {cycle.status === 'upcoming' && <span className="text-[11px] text-muted-foreground">Not started</span>}
      </div>
    </div>
  )
}

function CycleRow({ cycle }: { cycle: typeof cycles[0] }) {
  const config = statusConfig[cycle.status]
  const pct = cycle.total === 0 ? 0 : Math.round((cycle.completed / cycle.total) * 100)
  return (
    <div className="flex items-center gap-4 px-4 py-3 border-b border-border last:border-0 hover:bg-surface-2 transition-colors cursor-pointer">
      <div className={`w-1.5 h-1.5 rounded-full shrink-0 ${config.dot}`} />
      <div className="flex-1 min-w-0">
        <span className="text-xs font-medium text-foreground">{cycle.name}</span>
      </div>
      <span className="text-[11px] text-muted-foreground w-28 shrink-0">{cycle.dates}</span>
      <div className="w-24 shrink-0">
        <div className="flex items-center gap-1.5">
          <div className="flex-1 h-1 rounded-full bg-surface-3 overflow-hidden">
            <div className={`h-full rounded-full ${pct === 100 ? 'bg-status-done' : 'bg-status-inprogress'}`} style={{ width: `${pct}%` }} />
          </div>
          <span className="text-[10px] text-muted-foreground tabular-nums w-7 text-right">{pct}%</span>
        </div>
      </div>
      <AvatarStack members={cycle.members} />
      <span className="text-[11px] text-muted-foreground w-16 text-right shrink-0">{cycle.completed}/{cycle.total}</span>
    </div>
  )
}

export default function CyclesPage() {
  return (
    <DSLayout
      title="Cycle Cards"
      description="Cycle cards summarise sprint progress with a progress bar, member avatars, date range, and issue count. Available as a card grid or compact table row."
    >
      <DSSection title="Card grid" description="3-column card layout for the Cycles overview page.">
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {cycles.map(c => <CycleCard key={c.name} cycle={c} />)}
        </div>
      </DSSection>

      <DSSection title="Compact list row" description="Denser table layout when many cycles need to be listed together.">
        <div className="rounded-md border border-border bg-surface-1 overflow-hidden">
          <div className="flex items-center gap-4 px-4 py-2 border-b border-border bg-surface-2">
            <span className="w-3 shrink-0" />
            <span className="flex-1 text-[10px] font-semibold uppercase tracking-widest text-muted-foreground/60">Name</span>
            <span className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground/60 w-28 shrink-0">Dates</span>
            <span className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground/60 w-24 shrink-0">Progress</span>
            <span className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground/60">Team</span>
            <span className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground/60 w-16 text-right shrink-0">Issues</span>
          </div>
          {cycles.map(c => <CycleRow key={c.name} cycle={c} />)}
        </div>
      </DSSection>

      <DSSection title="Active cycle banner" description="Highlighted banner shown at the top of the issues view when a sprint is in progress.">
        <div className="rounded-md border border-status-inprogress/30 bg-status-inprogress/5 p-3 flex items-center gap-4">
          <GitBranch className="w-4 h-4 text-status-inprogress shrink-0" />
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1.5">
              <span className="text-xs font-medium text-foreground">Sprint 24</span>
              <span className="text-[11px] text-muted-foreground">Jun 10 – Jun 24 · 5 days left</span>
            </div>
            <ProgressBar value={18} total={24} />
          </div>
          <AvatarStack members={cycles[0].members} />
          <button className="text-[11px] text-muted-foreground hover:text-foreground transition-colors cursor-pointer shrink-0">View cycle</button>
        </div>
      </DSSection>
    </DSLayout>
  )
}
