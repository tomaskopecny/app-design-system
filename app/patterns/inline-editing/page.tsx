'use client'

import { DSLayout } from '@/components/ds/ds-layout'
import { DSSection, DSPreview } from '@/components/ds/ds-section'
import { useState, useRef, useEffect } from 'react'
import { Check, X, Pencil } from 'lucide-react'

function InlineText({
  value,
  onSave,
  placeholder = 'Click to edit',
  className = '',
}: {
  value: string
  onSave: (v: string) => void
  placeholder?: string
  className?: string
}) {
  const [editing, setEditing] = useState(false)
  const [draft, setDraft] = useState(value)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (editing) inputRef.current?.select()
  }, [editing])

  const commit = () => { onSave(draft); setEditing(false) }
  const cancel = () => { setDraft(value); setEditing(false) }

  if (editing) {
    return (
      <div className="inline-flex items-center gap-1">
        <input
          ref={inputRef}
          value={draft}
          onChange={e => setDraft(e.target.value)}
          onKeyDown={e => { if (e.key === 'Enter') commit(); if (e.key === 'Escape') cancel() }}
          className={`bg-transparent border-b border-foreground/40 focus:border-foreground outline-none text-foreground transition-colors ${className}`}
          autoFocus
        />
        <button onClick={commit} className="w-5 h-5 flex items-center justify-center rounded text-status-done hover:bg-status-done/10 transition-colors cursor-pointer">
          <Check className="w-3 h-3" />
        </button>
        <button onClick={cancel} className="w-5 h-5 flex items-center justify-center rounded text-muted-foreground hover:text-foreground hover:bg-surface-2 transition-colors cursor-pointer">
          <X className="w-3 h-3" />
        </button>
      </div>
    )
  }

  return (
    <span
      onClick={() => setEditing(true)}
      className={`group inline-flex items-center gap-1.5 cursor-text hover:bg-surface-2 rounded px-1 -mx-1 transition-colors ${className}`}
    >
      {value || <span className="text-muted-foreground">{placeholder}</span>}
      <Pencil className="w-2.5 h-2.5 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity shrink-0" />
    </span>
  )
}

function InlineTextarea({
  value,
  onSave,
  placeholder = 'Add a description...',
}: {
  value: string
  onSave: (v: string) => void
  placeholder?: string
}) {
  const [editing, setEditing] = useState(false)
  const [draft, setDraft] = useState(value)
  const ref = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    if (editing && ref.current) {
      ref.current.focus()
      ref.current.setSelectionRange(draft.length, draft.length)
    }
  }, [editing])

  const commit = () => { onSave(draft); setEditing(false) }
  const cancel = () => { setDraft(value); setEditing(false) }

  if (editing) {
    return (
      <div className="flex flex-col gap-1.5">
        <textarea
          ref={ref}
          value={draft}
          onChange={e => setDraft(e.target.value)}
          onKeyDown={e => { if (e.key === 'Escape') cancel(); if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) commit() }}
          rows={3}
          className="w-full bg-surface-2 border border-border rounded-md px-3 py-2 text-xs text-foreground outline-none focus:border-ring/50 resize-none transition-colors"
        />
        <div className="flex items-center gap-1.5">
          <button onClick={commit} className="px-2.5 py-1 text-[11px] font-medium rounded bg-foreground text-background hover:bg-foreground/90 transition-colors cursor-pointer">Save</button>
          <button onClick={cancel} className="px-2.5 py-1 text-[11px] font-medium rounded bg-surface-2 border border-border text-muted-foreground hover:text-foreground transition-colors cursor-pointer">Cancel</button>
          <span className="text-[10px] text-muted-foreground ml-1">⌘↵ to save · Esc to cancel</span>
        </div>
      </div>
    )
  }

  return (
    <div
      onClick={() => setEditing(true)}
      className="group cursor-text hover:bg-surface-2 rounded-md px-3 py-2.5 border border-transparent hover:border-border transition-colors min-h-[60px]"
    >
      {value
        ? <p className="text-xs text-foreground leading-relaxed whitespace-pre-wrap">{value}</p>
        : <p className="text-xs text-muted-foreground">{placeholder}</p>
      }
    </div>
  )
}

function InlineSelect({
  value,
  options,
  onSave,
}: {
  value: string
  options: { label: string; color?: string }[]
  onSave: (v: string) => void
}) {
  const [open, setOpen] = useState(false)
  const current = options.find(o => o.label === value)

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="inline-flex items-center gap-1.5 px-2 py-1 text-xs rounded-md bg-surface-2 border border-border text-foreground hover:bg-surface-3 transition-colors cursor-pointer"
      >
        {current?.color && <span className="w-2 h-2 rounded-full shrink-0" style={{ background: current.color }} />}
        {value}
      </button>
      {open && (
        <div className="absolute top-full left-0 mt-1 w-40 bg-popover border border-border rounded-md shadow-xl py-1 z-50">
          {options.map(opt => (
            <button
              key={opt.label}
              onClick={() => { onSave(opt.label); setOpen(false) }}
              className={`w-full flex items-center gap-2 px-2.5 py-1.5 text-xs text-left hover:bg-accent transition-colors cursor-pointer
                ${opt.label === value ? 'text-foreground' : 'text-muted-foreground'}`}
            >
              {opt.color && <span className="w-2 h-2 rounded-full shrink-0" style={{ background: opt.color }} />}
              {opt.label}
              {opt.label === value && <Check className="w-3 h-3 ml-auto text-foreground" />}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

const priorities = [
  { label: 'Urgent', color: 'var(--color-priority-urgent)' },
  { label: 'High', color: 'var(--color-priority-high)' },
  { label: 'Medium', color: 'var(--color-priority-medium)' },
  { label: 'Low', color: 'oklch(0.60 0 0)' },
]

export default function InlineEditingPage() {
  const [title, setTitle] = useState('Fix auth session timeout on mobile')
  const [desc, setDesc] = useState('When a user remains idle for more than 30 minutes, the session expires without showing a clear error message. The user is silently redirected to the login page.')
  const [priority, setPriority] = useState('High')
  const [assignee, setAssignee] = useState('Tom Kopecny')

  return (
    <DSLayout
      title="Inline Editing"
      description="Click-to-edit fields replace form modals for quick updates. The field activates on click, shows an underline or border, and confirms on Enter or ⌘↵. Esc always cancels."
    >
      <DSSection title="Inline text field" description="Click the text to edit it inline. Press Enter to save, Esc to cancel.">
        <DSPreview code={`// Shows pencil icon on hover, becomes input on click
<span onClick={() => setEditing(true)} className="group cursor-text ...">
  {value}
  <Pencil className="opacity-0 group-hover:opacity-100" />
</span>`}>
          <div className="flex flex-col gap-2">
            <label className="text-[10px] text-muted-foreground uppercase tracking-widest font-semibold">Title</label>
            <InlineText value={title} onSave={setTitle} className="text-sm font-medium" />
          </div>
        </DSPreview>
      </DSSection>

      <DSSection title="Inline textarea" description="Click the description area to edit multi-line text. ⌘↵ saves, Esc cancels.">
        <DSPreview>
          <div className="flex flex-col gap-1.5 w-full max-w-md">
            <label className="text-[10px] text-muted-foreground uppercase tracking-widest font-semibold">Description</label>
            <InlineTextarea value={desc} onSave={setDesc} />
          </div>
        </DSPreview>
      </DSSection>

      <DSSection title="Inline select" description="Property chips that open a dropdown on click — used for priority, status, labels, and assignee.">
        <DSPreview>
          <div className="flex flex-wrap gap-6">
            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] text-muted-foreground uppercase tracking-widest font-semibold">Priority</label>
              <InlineSelect value={priority} options={priorities} onSave={setPriority} />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] text-muted-foreground uppercase tracking-widest font-semibold">Assignee</label>
              <InlineSelect
                value={assignee}
                options={[
                  { label: 'Tom Kopecny' },
                  { label: 'Anna Vidal' },
                  { label: 'Marcus Reed' },
                  { label: 'Unassigned' },
                ]}
                onSave={setAssignee}
              />
            </div>
          </div>
        </DSPreview>
      </DSSection>

      <DSSection title="Full issue detail row" description="All inline fields composed into an issue detail panel — the real-world pattern.">
        <div className="rounded-md border border-border bg-surface-1 overflow-hidden">
          <div className="px-5 py-4 border-b border-border">
            <p className="text-[10px] text-muted-foreground mb-1.5">ENG-421</p>
            <InlineText value={title} onSave={setTitle} className="text-sm font-semibold" />
          </div>
          <div className="px-5 py-4 border-b border-border">
            <InlineTextarea value={desc} onSave={setDesc} placeholder="Add a description..." />
          </div>
          <div className="px-5 py-4 grid grid-cols-2 gap-4">
            {[
              { label: 'Priority', node: <InlineSelect value={priority} options={priorities} onSave={setPriority} /> },
              { label: 'Assignee', node: <InlineSelect value={assignee} options={[{ label: 'Tom Kopecny' }, { label: 'Anna Vidal' }, { label: 'Marcus Reed' }]} onSave={setAssignee} /> },
            ].map(({ label, node }) => (
              <div key={label} className="flex flex-col gap-1">
                <span className="text-[10px] text-muted-foreground uppercase tracking-widest font-semibold">{label}</span>
                {node}
              </div>
            ))}
          </div>
        </div>
      </DSSection>
    </DSLayout>
  )
}
