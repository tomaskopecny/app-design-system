'use client'

import { DSLayout } from '@/components/ds/ds-layout'
import { DSSection, DSPreview } from '@/components/ds/ds-section'
import { useState, useRef, useEffect } from 'react'
import { ChevronDown, User, Calendar, Tag, Circle, Check, X, GitBranch, Hash } from 'lucide-react'

// Tiny hook — close on outside click
function useClickOutside(ref: React.RefObject<HTMLElement | null>, handler: () => void) {
  useEffect(() => {
    const listener = (e: MouseEvent) => {
      if (!ref.current || ref.current.contains(e.target as Node)) return
      handler()
    }
    document.addEventListener('mousedown', listener)
    return () => document.removeEventListener('mousedown', listener)
  }, [ref, handler])
}

// Base popover container
function PopoverBox({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`absolute z-50 mt-1 bg-popover border border-border rounded-md shadow-xl py-1 ${className}`}>
      {children}
    </div>
  )
}

// ─── Assignee popover ─────────────────────────────────────────────────────────
const MEMBERS = ['Alice Chen', 'Bob Kim', 'Carlos Diaz', 'Diana Park', 'Eli Zhang']

function AssigneePopover() {
  const [open, setOpen] = useState(false)
  const [selected, setSelected] = useState('Alice Chen')
  const ref = useRef<HTMLDivElement>(null)
  useClickOutside(ref, () => setOpen(false))

  return (
    <div className="relative inline-block" ref={ref}>
      <button
        onClick={() => setOpen(o => !o)}
        aria-expanded={open}
        aria-haspopup="listbox"
        className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-md bg-surface-2 border border-border text-xs text-foreground hover:bg-surface-3 transition-colors cursor-pointer"
      >
        <div className="w-4 h-4 rounded-full bg-status-inprogress/30 flex items-center justify-center text-[9px] font-semibold text-status-inprogress">
          {selected[0]}
        </div>
        {selected}
        <ChevronDown className="w-3 h-3 text-muted-foreground" aria-hidden="true" />
      </button>
      {open && (
        <PopoverBox className="w-48 left-0">
          <p className="px-3 py-1.5 text-[10px] font-semibold uppercase tracking-widest text-muted-foreground/60">Assignee</p>
          <div role="listbox" aria-label="Select assignee">
            {MEMBERS.map(m => (
              <button
                key={m}
                role="option"
                aria-selected={m === selected}
                onClick={() => { setSelected(m); setOpen(false) }}
                className="w-full flex items-center gap-2 px-3 py-1.5 text-xs text-foreground hover:bg-accent transition-colors cursor-pointer"
              >
                <div className="w-5 h-5 rounded-full bg-surface-3 flex items-center justify-center text-[9px] font-semibold text-muted-foreground shrink-0">
                  {m[0]}
                </div>
                <span className="flex-1 text-left">{m}</span>
                {m === selected && <Check className="w-3 h-3 text-status-done shrink-0" aria-hidden="true" />}
              </button>
            ))}
          </div>
        </PopoverBox>
      )}
    </div>
  )
}

// ─── Label popover ────────────────────────────────────────────────────────────
const LABELS = [
  { label: 'Bug', color: 'bg-label-bug', text: 'text-label-bug' },
  { label: 'Feature', color: 'bg-label-feature', text: 'text-label-feature' },
  { label: 'Improvement', color: 'bg-label-improvement', text: 'text-label-improvement' },
]

function LabelPopover() {
  const [open, setOpen] = useState(false)
  const [selected, setSelected] = useState<string[]>(['Bug'])
  const ref = useRef<HTMLDivElement>(null)
  useClickOutside(ref, () => setOpen(false))

  const toggle = (l: string) => setSelected(s => s.includes(l) ? s.filter(x => x !== l) : [...s, l])

  return (
    <div className="relative inline-block" ref={ref}>
      <button
        onClick={() => setOpen(o => !o)}
        aria-expanded={open}
        aria-haspopup="listbox"
        className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-md bg-surface-2 border border-border text-xs text-foreground hover:bg-surface-3 transition-colors cursor-pointer"
      >
        <Tag className="w-3 h-3 text-muted-foreground" aria-hidden="true" />
        {selected.length === 0 ? 'Add label' : selected.join(', ')}
        <ChevronDown className="w-3 h-3 text-muted-foreground" aria-hidden="true" />
      </button>
      {open && (
        <PopoverBox className="w-44 left-0">
          <p className="px-3 py-1.5 text-[10px] font-semibold uppercase tracking-widest text-muted-foreground/60">Labels</p>
          <div role="listbox" aria-multiselectable="true" aria-label="Select labels">
            {LABELS.map(({ label, color, text }) => (
              <button
                key={label}
                role="option"
                aria-selected={selected.includes(label)}
                onClick={() => toggle(label)}
                className="w-full flex items-center gap-2 px-3 py-1.5 text-xs text-foreground hover:bg-accent transition-colors cursor-pointer"
              >
                <span className={`w-2 h-2 rounded-full ${color} shrink-0`} aria-hidden="true" />
                <span className="flex-1 text-left">{label}</span>
                {selected.includes(label) && <Check className="w-3 h-3 text-status-done shrink-0" aria-hidden="true" />}
              </button>
            ))}
          </div>
        </PopoverBox>
      )}
    </div>
  )
}

// ─── Issue property preview popover ──────────────────────────────────────────
function IssuePreviewPopover() {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  useClickOutside(ref, () => setOpen(false))

  return (
    <div className="relative inline-block" ref={ref}>
      <button
        onClick={() => setOpen(o => !o)}
        aria-expanded={open}
        aria-haspopup="dialog"
        className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-md bg-surface-2 border border-border text-xs text-muted-foreground hover:text-foreground hover:bg-surface-3 transition-colors cursor-pointer"
      >
        <Hash className="w-3 h-3" aria-hidden="true" /> ENG-1234
      </button>
      {open && (
        <div className="absolute z-50 mt-1 left-0 w-72 bg-popover border border-border rounded-md shadow-xl overflow-hidden" role="dialog" aria-label="Issue preview">
          <div className="p-4 border-b border-border">
            <div className="flex items-center gap-2 mb-2">
              <Circle className="w-3.5 h-3.5 text-status-inprogress shrink-0" aria-hidden="true" />
              <span className="text-[10px] text-muted-foreground font-mono">ENG-1234</span>
            </div>
            <p className="text-sm font-medium text-foreground leading-snug">Implement keyboard shortcut for quick issue creation</p>
          </div>
          <div className="p-3 grid grid-cols-2 gap-2">
            {[
              { icon: User, label: 'Assignee', val: 'Alice Chen' },
              { icon: Tag, label: 'Label', val: 'Feature' },
              { icon: Calendar, label: 'Due', val: 'Jul 15' },
              { icon: GitBranch, label: 'Branch', val: 'feat/quick-create' },
            ].map(({ icon: Icon, label, val }) => (
              <div key={label} className="flex flex-col gap-0.5">
                <span className="text-[10px] text-muted-foreground">{label}</span>
                <div className="flex items-center gap-1">
                  <Icon className="w-3 h-3 text-muted-foreground" aria-hidden="true" />
                  <span className="text-xs text-foreground">{val}</span>
                </div>
              </div>
            ))}
          </div>
          <div className="px-3 pb-3">
            <p className="text-[11px] text-muted-foreground leading-relaxed line-clamp-2">
              Allow users to press C anywhere in the app to open the new issue modal pre-filled with the current context.
            </p>
          </div>
        </div>
      )}
    </div>
  )
}

export default function PopoverPage() {
  return (
    <DSLayout
      title="Popover"
      description="An anchored non-modal overlay triggered by click. Used for property pickers, rich previews, and contextual editors. Distinct from Tooltip (hover-only, text-only) and Modal (blocking overlay)."
    >
      <DSSection title="Property pickers" description="Assign or change a single issue property. Closes on selection or outside click.">
        <DSPreview className="[&>div]:gap-3 [&>div]:flex-wrap">
          <AssigneePopover />
          <LabelPopover />
        </DSPreview>
      </DSSection>

      <DSSection title="Rich preview" description="Shows a summary card when hovering or clicking a reference chip. Common for issue cross-references.">
        <DSPreview>
          <IssuePreviewPopover />
        </DSPreview>
      </DSSection>

      <DSSection title="Anatomy" description="Popover structure and positioning rules.">
        <div className="rounded-md border border-border overflow-hidden">
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b border-border bg-surface-2">
                <th className="text-left px-4 py-2.5 font-medium text-muted-foreground">Element</th>
                <th className="text-left px-4 py-2.5 font-medium text-muted-foreground">Spec</th>
              </tr>
            </thead>
            <tbody>
              {[
                ['Container', 'bg-popover, border border-border, rounded-md, shadow-xl'],
                ['Offset', '4px (mt-1) from trigger'],
                ['Min width', 'Matches trigger or 160px, whichever is larger'],
                ['Max width', '320px before scrolling content'],
                ['Close', 'Outside click, Escape key, or selection'],
                ['z-index', 'z-50 — above most UI, below Modal (z-60)'],
              ].map(([el, spec]) => (
                <tr key={el} className="border-b border-border last:border-0">
                  <td className="px-4 py-2.5 font-medium text-foreground">{el}</td>
                  <td className="px-4 py-2.5 text-muted-foreground font-mono">{spec}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </DSSection>
    </DSLayout>
  )
}
