'use client'

import { DSLayout } from '@/components/ds/ds-layout'
import { DSSection } from '@/components/ds/ds-section'
import { ChevronDown, Check, AlertCircle, ArrowUp, Minus, ArrowDown, X, Circle } from 'lucide-react'
import { useState } from 'react'

function CodeSnippet({ code }: { code: string }) {
  return (
    <div className="border-t border-border bg-background px-4 py-3 rounded-b-md">
      <pre className="font-mono text-[11px] text-muted-foreground overflow-x-auto">{code}</pre>
    </div>
  )
}

function PreviewBox({ children }: { children: React.ReactNode }) {
  return (
    <div className="p-6 bg-surface-1 flex flex-wrap gap-4 items-start rounded-t-md border border-border">
      {children}
    </div>
  )
}

const priorities = [
  { value: 'urgent', label: 'Urgent', icon: AlertCircle, color: '#E5534B' },
  { value: 'high', label: 'High', icon: ArrowUp, color: '#E07B39' },
  { value: 'medium', label: 'Medium', icon: Minus, color: '#D4A72C' },
  { value: 'low', label: 'Low', icon: ArrowDown, color: '#6B6B6B' },
]

const statuses = [
  { value: 'todo', label: 'Todo', color: '#6B6B6B' },
  { value: 'inprogress', label: 'In Progress', color: '#4D8EE8' },
  { value: 'done', label: 'Done', color: '#4CAF7D' },
  { value: 'cancelled', label: 'Cancelled', color: '#404040' },
]

const labelOptions = ['Bug', 'Feature', 'Improvement', 'Design', 'Documentation', 'Infrastructure']

function PriorityDropdown() {
  const [open, setOpen] = useState(false)
  const [selected, setSelected] = useState(priorities[2])

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="inline-flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium rounded-md bg-surface-2 border border-border text-foreground hover:bg-surface-3 transition-colors cursor-pointer"
      >
        <selected.icon className="w-3.5 h-3.5" style={{ color: selected.color }} />
        {selected.label}
        <ChevronDown className="w-3 h-3 text-muted-foreground ml-0.5" />
      </button>
      {open && (
        <div className="absolute top-full mt-1 left-0 z-50 w-40 rounded-md border border-border bg-popover shadow-[0_4px_16px_rgba(0,0,0,0.5)] overflow-hidden">
          {priorities.map((p) => (
            <button
              key={p.value}
              onClick={() => { setSelected(p); setOpen(false) }}
              className="w-full flex items-center gap-2 px-2.5 py-2 text-xs text-foreground hover:bg-accent transition-colors cursor-pointer"
            >
              <p.icon className="w-3.5 h-3.5 shrink-0" style={{ color: p.color }} />
              {p.label}
              {selected.value === p.value && <Check className="w-3 h-3 ml-auto text-muted-foreground" />}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

function StatusDropdown() {
  const [open, setOpen] = useState(false)
  const [selected, setSelected] = useState(statuses[0])

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="inline-flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium rounded-md bg-surface-2 border border-border text-foreground hover:bg-surface-3 transition-colors cursor-pointer"
      >
        <Circle className="w-3 h-3" style={{ color: selected.color }} />
        {selected.label}
        <ChevronDown className="w-3 h-3 text-muted-foreground ml-0.5" />
      </button>
      {open && (
        <div className="absolute top-full mt-1 left-0 z-50 w-44 rounded-md border border-border bg-popover shadow-[0_4px_16px_rgba(0,0,0,0.5)] overflow-hidden">
          {statuses.map((s) => (
            <button
              key={s.value}
              onClick={() => { setSelected(s); setOpen(false) }}
              className="w-full flex items-center gap-2 px-2.5 py-2 text-xs text-foreground hover:bg-accent transition-colors cursor-pointer"
            >
              <span className="w-2 h-2 rounded-full shrink-0" style={{ background: s.color }} />
              {s.label}
              {selected.value === s.value && <Check className="w-3 h-3 ml-auto text-muted-foreground" />}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

function MultiSelect() {
  const [selected, setSelected] = useState<string[]>(['Bug', 'Feature'])
  const [open, setOpen] = useState(false)

  const toggle = (label: string) => {
    setSelected(prev => prev.includes(label) ? prev.filter(l => l !== label) : [...prev, label])
  }

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="inline-flex items-center gap-1.5 px-2.5 py-1.5 text-xs rounded-md bg-surface-2 border border-border text-foreground hover:bg-surface-3 transition-colors cursor-pointer"
      >
        {selected.length === 0 ? (
          <span className="text-muted-foreground">Select labels...</span>
        ) : (
          <div className="flex items-center gap-1 flex-wrap max-w-48">
            {selected.map(l => (
              <span key={l} className="flex items-center gap-0.5 px-1.5 py-0.5 bg-surface-3 rounded text-[10px] border border-border">
                {l}
                <button onClick={(e) => { e.stopPropagation(); toggle(l) }} className="hover:text-foreground">
                  <X className="w-2.5 h-2.5" />
                </button>
              </span>
            ))}
          </div>
        )}
        <ChevronDown className="w-3 h-3 text-muted-foreground ml-auto shrink-0" />
      </button>

      {open && (
        <div className="absolute top-full mt-1 left-0 z-50 w-52 rounded-md border border-border bg-popover shadow-[0_4px_16px_rgba(0,0,0,0.5)] overflow-hidden">
          <div className="px-2 py-1.5 border-b border-border">
            <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">Labels</p>
          </div>
          {labelOptions.map((label) => (
            <button
              key={label}
              onClick={() => toggle(label)}
              className="w-full flex items-center gap-2 px-2.5 py-2 text-xs text-foreground hover:bg-accent transition-colors cursor-pointer"
            >
              <div className={`w-3.5 h-3.5 rounded border flex items-center justify-center transition-colors ${
                selected.includes(label) ? 'bg-foreground border-foreground' : 'border-border'
              }`}>
                {selected.includes(label) && <Check className="w-2.5 h-2.5 text-background" />}
              </div>
              {label}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

export default function SelectsPage() {
  return (
    <DSLayout
      title="Selects & Dropdowns"
      description="Linear uses fully custom dropdowns — no native <select>. They are compact, keyboard-navigable, and always positioned with a 4px gap below the trigger."
    >
      <DSSection title="Single select" description="Click to open. Icon and check-mark reinforce current selection.">
        <div className="rounded-md border border-border overflow-hidden">
          <PreviewBox>
            <PriorityDropdown />
            <StatusDropdown />

            {/* Native-style */}
            <div className="relative">
              <select className="appearance-none pl-3 pr-8 py-1.5 text-xs rounded-md bg-surface-2 border border-border text-foreground focus:outline-none focus:ring-1 focus:ring-ring cursor-pointer">
                <option>Assign to...</option>
                <option>Anya Forger</option>
                <option>Loid Forger</option>
                <option>Yuri Briar</option>
              </select>
              <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-3 h-3 text-muted-foreground pointer-events-none" />
            </div>
          </PreviewBox>
          <CodeSnippet code={`// Custom dropdown trigger
<button className="inline-flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium
  rounded-md bg-surface-2 border border-border text-foreground hover:bg-surface-3">
  <Icon style={{ color }} />
  {selected.label}
  <ChevronDown className="w-3 h-3 text-muted-foreground" />
</button>

// Dropdown panel
<div className="absolute top-full mt-1 w-40 rounded-md border border-border bg-popover
  shadow-[0_4px_16px_rgba(0,0,0,0.5)]">
  ...items
</div>`} />
        </div>
      </DSSection>

      <DSSection title="Multi-select" description="Checkbox items, selected tags visible inline on the trigger.">
        <div className="rounded-md border border-border overflow-hidden">
          <PreviewBox>
            <MultiSelect />
          </PreviewBox>
          <CodeSnippet code={`// Selected items as chips on trigger
{selected.map(l => (
  <span className="flex items-center gap-0.5 px-1.5 py-0.5 bg-surface-3 rounded text-[10px] border border-border">
    {l}
    <X className="w-2.5 h-2.5" />
  </span>
))}

// Checkbox item
<div className={selected ? 'bg-foreground border-foreground' : 'border-border'}>
  {selected && <Check className="w-2.5 h-2.5 text-background" />}
</div>`} />
        </div>
      </DSSection>

      <DSSection title="Filter bar" description="Compact inline filter chips that open dropdown menus.">
        <div className="rounded-md border border-border overflow-hidden">
          <PreviewBox>
            <div className="flex items-center gap-1.5 flex-wrap">
              {[
                { label: 'Status', value: 'In Progress', color: '#4D8EE8' },
                { label: 'Priority', value: 'High', color: '#E07B39' },
                { label: 'Assignee', value: 'Me', color: null },
              ].map((filter) => (
                <button
                  key={filter.label}
                  className="inline-flex items-center gap-1 px-2 py-1 rounded-md bg-surface-2 border border-border text-xs text-foreground hover:bg-surface-3 transition-colors cursor-pointer"
                >
                  <span className="text-muted-foreground">{filter.label}:</span>
                  {filter.color && <span className="w-1.5 h-1.5 rounded-full" style={{ background: filter.color }} />}
                  <span className="font-medium">{filter.value}</span>
                  <X className="w-3 h-3 text-muted-foreground ml-0.5 hover:text-foreground" />
                </button>
              ))}
              <button className="inline-flex items-center gap-1 px-2 py-1 rounded-md border border-dashed border-border text-xs text-muted-foreground hover:text-foreground hover:border-border/80 transition-colors cursor-pointer">
                + Add filter
              </button>
            </div>
          </PreviewBox>
        </div>
      </DSSection>
    </DSLayout>
  )
}
