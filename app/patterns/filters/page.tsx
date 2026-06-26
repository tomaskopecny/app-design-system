'use client'

import { DSLayout } from '@/components/ds/ds-layout'
import { DSSection, DSPreview } from '@/components/ds/ds-section'
import { useState } from 'react'
import { Filter, X, ChevronDown, Search, AlertCircle, ArrowUp, ArrowRight, ArrowDown, Minus, Circle, CircleDot, CheckCircle2 } from 'lucide-react'

type FilterChip = {
  id: string
  label: string
  value: string
  color?: string
}

function Chip({ chip, onRemove }: { chip: FilterChip; onRemove: (id: string) => void }) {
  return (
    <div className="inline-flex items-center gap-1 h-6 pl-2 pr-1 rounded-md bg-surface-2 border border-border text-xs text-foreground">
      {chip.color && <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: chip.color }} />}
      <span className="text-muted-foreground">{chip.label}:</span>
      <span>{chip.value}</span>
      <button
        onClick={() => onRemove(chip.id)}
        className="ml-0.5 w-4 h-4 flex items-center justify-center rounded text-muted-foreground hover:text-foreground hover:bg-surface-3 transition-colors cursor-pointer"
        aria-label={`Remove ${chip.label} filter`}
      >
        <X className="w-2.5 h-2.5" />
      </button>
    </div>
  )
}

function FilterDropdown({ label, options, onSelect }: {
  label: string
  options: { label: string; color?: string }[]
  onSelect: (opt: { label: string; color?: string }) => void
}) {
  const [open, setOpen] = useState(false)
  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="inline-flex items-center gap-1 h-6 px-2 rounded-md bg-surface-2 border border-border text-xs text-muted-foreground hover:text-foreground hover:bg-surface-3 transition-colors cursor-pointer"
      >
        {label}
        <ChevronDown className="w-2.5 h-2.5" />
      </button>
      {open && (
        <div className="absolute top-full left-0 mt-1 w-40 bg-popover border border-border rounded-md shadow-xl py-1 z-50">
          {options.map(opt => (
            <button
              key={opt.label}
              onClick={() => { onSelect(opt); setOpen(false) }}
              className="w-full flex items-center gap-2 px-2.5 py-1.5 text-xs text-left text-foreground hover:bg-accent transition-colors cursor-pointer"
            >
              {opt.color && <span className="w-2 h-2 rounded-full shrink-0" style={{ background: opt.color }} />}
              {opt.label}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

const priorityOpts = [
  { label: 'Urgent', color: 'var(--color-priority-urgent)' },
  { label: 'High', color: 'var(--color-priority-high)' },
  { label: 'Medium', color: 'var(--color-priority-medium)' },
  { label: 'Low' },
]
const statusOpts = [
  { label: 'Todo' },
  { label: 'In Progress', color: 'var(--color-status-inprogress)' },
  { label: 'Done', color: 'var(--color-status-done)' },
  { label: 'Cancelled' },
]
const assigneeOpts = [
  { label: 'Tom Kopecny' },
  { label: 'Anna Vidal' },
  { label: 'Marcus Reed' },
]
const labelOpts = [
  { label: 'Bug', color: 'var(--color-label-bug)' },
  { label: 'Feature', color: 'var(--color-label-feature)' },
  { label: 'Improvement', color: 'var(--color-label-improvement)' },
]

const priorityIcon: Record<string, React.ElementType> = {
  Urgent: AlertCircle, High: ArrowUp, Medium: ArrowRight, Low: ArrowDown,
}
const priorityColor: Record<string, string> = {
  Urgent: 'text-priority-urgent', High: 'text-priority-high', Medium: 'text-priority-medium', Low: 'text-muted-foreground',
}

function FilteredIssueList({ chips }: { chips: FilterChip[] }) {
  const issues = [
    { id: 'ENG-421', title: 'Fix auth session timeout', priority: 'Urgent', status: 'In Progress', assignee: 'Tom Kopecny', label: 'Bug' },
    { id: 'ENG-422', title: 'Add dark mode toggle', priority: 'High', status: 'In Progress', assignee: 'Marcus Reed', label: 'Feature' },
    { id: 'ENG-423', title: 'Update onboarding flow', priority: 'Medium', status: 'Todo', assignee: 'Anna Vidal', label: 'Improvement' },
    { id: 'ENG-424', title: 'Refactor API layer', priority: 'Low', status: 'Todo', assignee: 'Tom Kopecny', label: 'Improvement' },
    { id: 'ENG-425', title: 'Write unit tests', priority: 'Medium', status: 'Done', assignee: 'Marcus Reed', label: 'Feature' },
  ]

  const filtered = issues.filter(issue => {
    return chips.every(chip => {
      if (chip.label === 'Priority') return issue.priority === chip.value
      if (chip.label === 'Status') return issue.status === chip.value
      if (chip.label === 'Assignee') return issue.assignee === chip.value
      if (chip.label === 'Label') return issue.label === chip.value
      return true
    })
  })

  return (
    <div className="rounded-md border border-border bg-surface-1 overflow-hidden">
      {filtered.length === 0 ? (
        <div className="flex items-center gap-2 px-4 py-4 text-xs text-muted-foreground">
          <Search className="w-3.5 h-3.5" />
          No issues match the current filters.
        </div>
      ) : filtered.map(issue => {
        const PIcon = priorityIcon[issue.priority] || Minus
        const pColor = priorityColor[issue.priority] || 'text-muted-foreground'
        return (
          <div key={issue.id} className="flex items-center gap-3 px-4 py-2.5 border-b border-border last:border-0 hover:bg-surface-2 transition-colors">
            <PIcon className={`w-3 h-3 shrink-0 ${pColor}`} />
            <span className="text-[11px] text-muted-foreground font-mono w-14 shrink-0">{issue.id}</span>
            <span className="flex-1 text-xs text-foreground truncate">{issue.title}</span>
            <span className="text-[11px] text-muted-foreground w-20 shrink-0">{issue.status}</span>
            <span className="text-[11px] text-muted-foreground w-24 truncate shrink-0">{issue.assignee}</span>
          </div>
        )
      })}
    </div>
  )
}

let chipId = 0
function makeChip(label: string, value: string, color?: string): FilterChip {
  return { id: `chip-${++chipId}`, label, value, color }
}

export default function FiltersPage() {
  const [chips, setChips] = useState<FilterChip[]>([
    makeChip('Priority', 'High', 'var(--color-priority-high)'),
  ])

  const addChip = (label: string, opt: { label: string; color?: string }) => {
    if (!chips.find(c => c.label === label && c.value === opt.label)) {
      setChips(prev => [...prev, makeChip(label, opt.label, opt.color)])
    }
  }
  const removeChip = (id: string) => setChips(prev => prev.filter(c => c.id !== id))

  return (
    <DSLayout
      title="Filters & View Controls"
      description="Filter bars use small chip components for active filters. Each chip shows the filter key and value; clicking × removes it. Add filters via dropdown buttons."
    >
      <DSSection title="Filter bar" description="The full filter bar with add-filter dropdowns and active chip list. Changes the issue list below in real time.">
        <div className="flex flex-col gap-3">
          {/* Filter bar */}
          <div className="flex items-center gap-1.5 flex-wrap p-2.5 rounded-md bg-surface-1 border border-border">
            <Filter className="w-3 h-3 text-muted-foreground shrink-0 mr-0.5" />
            <FilterDropdown label="Priority" options={priorityOpts} onSelect={opt => addChip('Priority', opt)} />
            <FilterDropdown label="Status" options={statusOpts} onSelect={opt => addChip('Status', opt)} />
            <FilterDropdown label="Assignee" options={assigneeOpts} onSelect={opt => addChip('Assignee', opt)} />
            <FilterDropdown label="Label" options={labelOpts} onSelect={opt => addChip('Label', opt)} />
            {chips.length > 0 && <div className="w-px h-4 bg-border mx-0.5 shrink-0" />}
            {chips.map(chip => <Chip key={chip.id} chip={chip} onRemove={removeChip} />)}
            {chips.length > 0 && (
              <button
                onClick={() => setChips([])}
                className="text-[11px] text-muted-foreground hover:text-foreground transition-colors cursor-pointer ml-0.5"
              >
                Clear all
              </button>
            )}
          </div>
          {/* Filtered list */}
          <FilteredIssueList chips={chips} />
        </div>
      </DSSection>

      <DSSection title="Filter chip anatomy" description="A chip consists of a label (muted), a colon separator, the value (foreground), an optional color dot, and a dismiss button.">
        <DSPreview>
          <div className="flex flex-wrap gap-2">
            <Chip chip={{ id: '1', label: 'Priority', value: 'High', color: 'var(--color-priority-high)' }} onRemove={() => {}} />
            <Chip chip={{ id: '2', label: 'Status', value: 'In Progress', color: 'var(--color-status-inprogress)' }} onRemove={() => {}} />
            <Chip chip={{ id: '3', label: 'Assignee', value: 'Tom Kopecny' }} onRemove={() => {}} />
            <Chip chip={{ id: '4', label: 'Label', value: 'Bug', color: 'var(--color-label-bug)' }} onRemove={() => {}} />
          </div>
        </DSPreview>
      </DSSection>

      <DSSection title="View controls" description="Paired with filter bar — segment control for view mode and a sort button.">
        <DSPreview>
          <div className="flex items-center gap-2 flex-wrap">
            {/* View toggle */}
            <div className="inline-flex items-center rounded-md overflow-hidden border border-border">
              {['List', 'Board', 'Timeline'].map((v, i) => (
                <button key={v} className={`px-3 py-1.5 text-xs font-medium border-r border-border last:border-r-0 transition-colors cursor-pointer
                  ${i === 0 ? 'bg-surface-3 text-foreground' : 'bg-surface-1 text-muted-foreground hover:bg-surface-2 hover:text-foreground'}`}>
                  {v}
                </button>
              ))}
            </div>
            <div className="w-px h-4 bg-border" />
            {/* Group by */}
            <button className="inline-flex items-center gap-1.5 h-7 px-2.5 text-xs text-muted-foreground hover:text-foreground bg-surface-1 border border-border rounded-md hover:bg-surface-2 transition-colors cursor-pointer">
              Group: Status
              <ChevronDown className="w-2.5 h-2.5" />
            </button>
            {/* Sort */}
            <button className="inline-flex items-center gap-1.5 h-7 px-2.5 text-xs text-muted-foreground hover:text-foreground bg-surface-1 border border-border rounded-md hover:bg-surface-2 transition-colors cursor-pointer">
              Sort: Priority
              <ChevronDown className="w-2.5 h-2.5" />
            </button>
          </div>
        </DSPreview>
      </DSSection>
    </DSLayout>
  )
}
