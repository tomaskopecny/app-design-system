'use client'

import { DSLayout } from '@/components/ds/ds-layout'
import { DSSection, DSPreview } from '@/components/ds/ds-section'
import { useState } from 'react'
import { X, SlidersHorizontal, Settings, Bell, CheckCircle2, Circle, AlertCircle, ChevronRight, Filter, Pencil } from 'lucide-react'

// ---------------------------------------------------------------------------
// Base Drawer primitive
// ---------------------------------------------------------------------------

type DrawerSide = 'right' | 'left' | 'bottom'

function Drawer({
  open,
  onClose,
  title,
  side = 'right',
  width = 'w-80',
  children,
}: {
  open: boolean
  onClose: () => void
  title?: string
  side?: DrawerSide
  width?: string
  children: React.ReactNode
}) {
  if (!open) return null

  const panelBase = 'fixed z-50 bg-popover flex flex-col overflow-hidden'
  const shadows: Record<DrawerSide, string> = {
    right:  'top-0 right-0 h-full border-l border-border',
    left:   'top-0 left-0 h-full border-r border-border',
    bottom: 'bottom-0 left-0 right-0 border-t border-border rounded-t-xl',
  }
  const panelClass = [panelBase, shadows[side], side !== 'bottom' ? width : 'h-auto max-h-[85vh]'].join(' ')

  return (
    <div className="fixed inset-0 z-50 flex" onClick={onClose} aria-modal="true" role="dialog">
      <div className="absolute inset-0 bg-black/20" />
      <div
        className={panelClass}
        style={{ boxShadow: side === 'right' ? '-4px 0 24px rgba(0,0,0,0.25)' : side === 'left' ? '4px 0 24px rgba(0,0,0,0.25)' : '0 -4px 24px rgba(0,0,0,0.25)' }}
        onClick={e => e.stopPropagation()}
      >
        {title && (
          <div className="flex items-center justify-between px-5 py-4 border-b border-border shrink-0">
            <h2 className="text-sm font-semibold text-foreground">{title}</h2>
            <button
              onClick={onClose}
              aria-label="Close drawer"
              className="w-6 h-6 flex items-center justify-center rounded-sm text-muted-foreground hover:text-foreground hover:bg-surface-3 transition-colors cursor-pointer"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        )}
        <div className="flex-1 overflow-y-auto">{children}</div>
      </div>
    </div>
  )
}

// ---------------------------------------------------------------------------
// Drawer footer variants — mirrors ModalFooter / ModalFooterFull
// ---------------------------------------------------------------------------

// Standard footer: buttons right-aligned (matches ModalFooter)
function DrawerFooter({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center justify-end gap-2 px-5 py-3.5 border-t border-border bg-surface-1 shrink-0">
      {children}
    </div>
  )
}

// Full-width split footer: two equal buttons flush to the drawer's bottom edge
function DrawerFooterFull({
  cancelLabel = 'Cancel',
  confirmLabel = 'Save',
  onCancel,
  onConfirm,
  variant = 'default',
}: {
  cancelLabel?: string
  confirmLabel?: string
  onCancel: () => void
  onConfirm: () => void
  variant?: 'default' | 'destructive'
}) {
  const confirmCls = variant === 'destructive'
    ? 'bg-destructive text-white hover:bg-destructive/90'
    : 'bg-foreground text-background hover:bg-foreground/90'
  return (
    <div className="flex border-t border-border shrink-0">
      <button
        onClick={onCancel}
        className="flex-1 py-3.5 text-sm font-medium text-foreground bg-surface-2 hover:bg-surface-3 transition-colors cursor-pointer"
      >
        {cancelLabel}
      </button>
      <div className="w-px bg-border shrink-0" />
      <button
        onClick={onConfirm}
        className={`flex-1 py-3.5 text-sm font-medium transition-colors cursor-pointer ${confirmCls}`}
      >
        {confirmLabel}
      </button>
    </div>
  )
}

// ---------------------------------------------------------------------------
// Toggle primitive (fixed: avoids transform conflict with -translate-y-1/2)
// ---------------------------------------------------------------------------

function Toggle({ checked, onChange }: { checked: boolean; onChange: (v: boolean) => void }) {
  return (
    <button
      role="switch"
      aria-checked={checked}
      onClick={() => onChange(!checked)}
      className={`relative w-9 h-5 rounded-full transition-colors shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring ${checked ? 'bg-[var(--green-700)]' : 'bg-surface-3'}`}
    >
      <span
        className={`absolute top-[3px] w-3.5 h-3.5 rounded-full shadow-sm transition-all duration-150 ${
          checked
            ? 'left-[18px] bg-white'
            : 'left-[3px] bg-muted-foreground/60'
        }`}
      />
    </button>
  )
}

// ---------------------------------------------------------------------------
// Demo: Issue detail drawer (right)
// ---------------------------------------------------------------------------

const ISSUE_PROPS = [
  { label: 'Status',   value: 'In Progress', dot: '#4D8EE8' },
  { label: 'Priority', value: 'Urgent',       dot: '#E5534B' },
  { label: 'Assignee', value: 'Alex F.',       dot: undefined },
  { label: 'Due date', value: 'Jul 15, 2026',  dot: undefined },
  { label: 'Cycle',    value: 'Cycle 12',      dot: '#4D8EE8' },
]

function IssueDrawerDemo() {
  const [open, setOpen] = useState(false)
  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md bg-surface-2 border border-border text-foreground hover:bg-surface-3 transition-colors cursor-pointer"
      >
        <SlidersHorizontal className="w-3.5 h-3.5" />
        Open issue detail
      </button>
      <Drawer open={open} onClose={() => setOpen(false)} title="ENG-2451" side="right">
        <div className="px-5 py-4 space-y-5">
          <div>
            <p className="text-sm font-medium text-foreground">Implement command palette</p>
            <p className="mt-1 text-xs text-muted-foreground leading-relaxed">
              Users should be able to open a command palette with ⌘K and search across issues, projects, and commands.
            </p>
          </div>
          {ISSUE_PROPS.map(({ label, value, dot }) => (
            <div key={label} className="flex items-center justify-between">
              <span className="text-xs text-muted-foreground">{label}</span>
              <div className="flex items-center gap-1.5">
                {dot && <span className="w-2 h-2 rounded-full" style={{ background: dot }} />}
                <span className="text-xs text-foreground">{value}</span>
              </div>
            </div>
          ))}
          <div className="border-t border-border pt-4">
            <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground mb-3">Activity</p>
            {[
              { user: 'AF', color: '#4D8EE8', text: 'Moved to In Progress', time: '2m ago' },
              { user: 'LF', color: '#E07B39', text: 'Left a comment',       time: '1h ago' },
              { user: 'AF', color: '#4D8EE8', text: 'Created this issue',   time: '2d ago' },
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2.5 mb-3">
                <div className="w-5 h-5 rounded-full flex items-center justify-center text-[9px] font-semibold text-white shrink-0 mt-0.5" style={{ background: item.color }}>
                  {item.user}
                </div>
                <div>
                  <p className="text-xs text-foreground">{item.text}</p>
                  <p className="text-[10px] text-muted-foreground">{item.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Drawer>
    </>
  )
}

// ---------------------------------------------------------------------------
// Demo: Settings drawer (left) — fixed toggle
// ---------------------------------------------------------------------------

function SettingsDrawerDemo() {
  const [open, setOpen] = useState(false)
  const [notif, setNotif] = useState(true)
  const [compact, setCompact] = useState(false)

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md bg-surface-2 border border-border text-foreground hover:bg-surface-3 transition-colors cursor-pointer"
      >
        <Settings className="w-3.5 h-3.5" />
        Open settings
      </button>
      <Drawer open={open} onClose={() => setOpen(false)} title="Preferences" side="left">
        <div className="px-5 py-4 space-y-1">
          {[
            { label: 'Email notifications', desc: 'Receive updates for assigned issues', value: notif,   set: setNotif },
            { label: 'Compact mode',        desc: 'Reduce row height in issue lists',   value: compact, set: setCompact },
          ].map(({ label, desc, value, set }) => (
            <div key={label} className="flex items-center justify-between py-3 border-b border-border last:border-0">
              <div>
                <p className="text-sm text-foreground">{label}</p>
                <p className="text-[11px] text-muted-foreground mt-0.5">{desc}</p>
              </div>
              <Toggle checked={value} onChange={set} />
            </div>
          ))}
          <div className="pt-4">
            <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground mb-2">Theme</p>
            {['System', 'Dark', 'Light'].map(t => (
              <button key={t} className="w-full flex items-center gap-2.5 px-3 py-2 rounded-md text-sm text-muted-foreground hover:bg-accent hover:text-foreground transition-colors cursor-pointer">
                <span className={`w-2 h-2 rounded-full ${t === 'Dark' ? 'bg-foreground' : 'bg-surface-3 border border-border'}`} />
                {t}
              </button>
            ))}
          </div>
        </div>
      </Drawer>
    </>
  )
}

// ---------------------------------------------------------------------------
// Demo: Filter drawer (bottom)
// ---------------------------------------------------------------------------

const FILTER_STATUSES = [
  { label: 'Todo',        icon: Circle,       color: 'text-muted-foreground' },
  { label: 'In Progress', icon: AlertCircle,  color: 'text-[#4D8EE8]' },
  { label: 'Done',        icon: CheckCircle2, color: 'text-[var(--status-done)]' },
]

function FilterDrawerDemo() {
  const [open, setOpen] = useState(false)
  const [selected, setSelected] = useState<string[]>(['In Progress'])

  const toggle = (label: string) =>
    setSelected(s => s.includes(label) ? s.filter(x => x !== label) : [...s, label])

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md bg-surface-2 border border-border text-foreground hover:bg-surface-3 transition-colors cursor-pointer"
      >
        <Filter className="w-3.5 h-3.5" />
        Filters
        {selected.length > 0 && (
          <span className="ml-0.5 px-1.5 py-0.5 text-[10px] font-semibold rounded-sm bg-foreground text-background">
            {selected.length}
          </span>
        )}
      </button>
      <Drawer open={open} onClose={() => setOpen(false)} title="Filter issues" side="bottom">
        <div className="px-5 py-4 space-y-5">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground mb-2">Status</p>
            <div className="flex flex-wrap gap-2">
              {FILTER_STATUSES.map(({ label, icon: Icon, color }) => {
                const active = selected.includes(label)
                return (
                  <button
                    key={label}
                    onClick={() => toggle(label)}
                    className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md border text-xs font-medium transition-colors cursor-pointer ${
                      active
                        ? 'bg-surface-3 border-foreground/30 text-foreground'
                        : 'bg-surface-2 border-border text-muted-foreground hover:text-foreground hover:border-border/80'
                    }`}
                  >
                    <Icon className={`w-3 h-3 ${color}`} />
                    {label}
                  </button>
                )
              })}
            </div>
          </div>
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground mb-2">Priority</p>
            <div className="flex flex-wrap gap-2">
              {['No priority', 'Urgent', 'High', 'Medium', 'Low'].map(p => (
                <button
                  key={p}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md border border-border bg-surface-2 text-xs text-muted-foreground hover:text-foreground hover:border-border/80 transition-colors cursor-pointer"
                >
                  {p}
                </button>
              ))}
            </div>
          </div>
        </div>
        <DrawerFooter>
          <button
            onClick={() => { setSelected([]); setOpen(false) }}
            className="px-3 py-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
          >
            Clear all
          </button>
          <button
            onClick={() => setOpen(false)}
            className="px-4 py-1.5 text-xs font-medium rounded-md bg-foreground text-background hover:bg-foreground/90 transition-colors cursor-pointer"
          >
            Apply filters
          </button>
        </DrawerFooter>
      </Drawer>
    </>
  )
}

// ---------------------------------------------------------------------------
// Demo: Edit drawer — standard footer (right)
// ---------------------------------------------------------------------------

function EditDrawerDemo() {
  const [open, setOpen] = useState(false)
  const [name, setName] = useState('Implement command palette')
  const [priority, setPriority] = useState('Urgent')
  const [status, setStatus] = useState('In Progress')

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md bg-surface-2 border border-border text-foreground hover:bg-surface-3 transition-colors cursor-pointer"
      >
        <Pencil className="w-3.5 h-3.5" />
        Edit issue
      </button>
      <Drawer open={open} onClose={() => setOpen(false)} title="Edit ENG-2451" side="right">
        <div className="px-5 py-4 space-y-4 flex-1">
          <div className="space-y-1.5">
            <label className="text-[11px] font-medium text-muted-foreground uppercase tracking-wider">Title</label>
            <input
              value={name}
              onChange={e => setName(e.target.value)}
              className="w-full px-3 py-2 text-sm rounded-md bg-surface-2 border border-border text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-1 focus:ring-ring"
            />
          </div>
          <div className="space-y-1.5">
            <label className="text-[11px] font-medium text-muted-foreground uppercase tracking-wider">Status</label>
            <select
              value={status}
              onChange={e => setStatus(e.target.value)}
              className="w-full px-3 py-2 text-sm rounded-md bg-surface-2 border border-border text-foreground focus:outline-none focus:ring-1 focus:ring-ring cursor-pointer"
            >
              {['Todo', 'In Progress', 'Done', 'Cancelled'].map(s => <option key={s}>{s}</option>)}
            </select>
          </div>
          <div className="space-y-1.5">
            <label className="text-[11px] font-medium text-muted-foreground uppercase tracking-wider">Priority</label>
            <select
              value={priority}
              onChange={e => setPriority(e.target.value)}
              className="w-full px-3 py-2 text-sm rounded-md bg-surface-2 border border-border text-foreground focus:outline-none focus:ring-1 focus:ring-ring cursor-pointer"
            >
              {['No priority', 'Urgent', 'High', 'Medium', 'Low'].map(p => <option key={p}>{p}</option>)}
            </select>
          </div>
          <div className="space-y-1.5">
            <label className="text-[11px] font-medium text-muted-foreground uppercase tracking-wider">Description</label>
            <textarea
              rows={4}
              placeholder="Add description..."
              className="w-full px-3 py-2 text-sm rounded-md bg-surface-2 border border-border text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-1 focus:ring-ring resize-none"
            />
          </div>
        </div>
        <DrawerFooter>
          <button
            onClick={() => setOpen(false)}
            className="px-3 py-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
          >
            Cancel
          </button>
          <button
            onClick={() => setOpen(false)}
            className="px-4 py-1.5 text-xs font-medium rounded-md bg-foreground text-background hover:bg-foreground/90 transition-colors cursor-pointer"
          >
            Save changes
          </button>
        </DrawerFooter>
      </Drawer>
    </>
  )
}

// ---------------------------------------------------------------------------
// Demo: Edit drawer — full-width split footer (right)
// ---------------------------------------------------------------------------

function EditDrawerFullFooterDemo() {
  const [open, setOpen] = useState(false)
  const [name, setName] = useState('Redesign onboarding flow')
  const [priority, setPriority] = useState('High')

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md bg-surface-2 border border-border text-foreground hover:bg-surface-3 transition-colors cursor-pointer"
      >
        <Pencil className="w-3.5 h-3.5" />
        Edit with split footer
      </button>
      <Drawer open={open} onClose={() => setOpen(false)} title="Edit ENG-1188" side="right">
        <div className="px-5 py-4 space-y-4">
          <div className="space-y-1.5">
            <label className="text-[11px] font-medium text-muted-foreground uppercase tracking-wider">Title</label>
            <input
              value={name}
              onChange={e => setName(e.target.value)}
              className="w-full px-3 py-2 text-sm rounded-md bg-surface-2 border border-border text-foreground focus:outline-none focus:ring-1 focus:ring-ring"
            />
          </div>
          <div className="space-y-1.5">
            <label className="text-[11px] font-medium text-muted-foreground uppercase tracking-wider">Priority</label>
            <select
              value={priority}
              onChange={e => setPriority(e.target.value)}
              className="w-full px-3 py-2 text-sm rounded-md bg-surface-2 border border-border text-foreground focus:outline-none focus:ring-1 focus:ring-ring cursor-pointer"
            >
              {['No priority', 'Urgent', 'High', 'Medium', 'Low'].map(p => <option key={p}>{p}</option>)}
            </select>
          </div>
          <div className="space-y-1.5">
            <label className="text-[11px] font-medium text-muted-foreground uppercase tracking-wider">Assignee</label>
            <input
              defaultValue="Alex F."
              className="w-full px-3 py-2 text-sm rounded-md bg-surface-2 border border-border text-foreground focus:outline-none focus:ring-1 focus:ring-ring"
            />
          </div>
        </div>
        <DrawerFooterFull
          cancelLabel="Cancel"
          confirmLabel="Save changes"
          onCancel={() => setOpen(false)}
          onConfirm={() => setOpen(false)}
        />
      </Drawer>
    </>
  )
}

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------

export default function DrawerPage() {
  return (
    <DSLayout title="Drawer" description="A panel that slides in from the edge of the screen. Use for contextual detail views, settings, and filter controls. Unlike a modal, a drawer preserves spatial context — the underlying content remains partially visible.">

      <DSSection
        title="Right drawer — issue detail"
        description="Slides in from the right. The most common use case: selecting an issue row opens its detail panel without navigating away, keeping list context visible on the left."
      >
        <DSPreview code={`<Drawer open={open} onClose={() => setOpen(false)} title="ENG-2451" side="right">
  {/* content */}
</Drawer>`}>
          <IssueDrawerDemo />
        </DSPreview>
      </DSSection>

      <DSSection
        title="Left drawer — settings"
        description="Slides in from the left. Used for persistent navigation panels, workspace settings, or secondary navigation. Toggles use top/left positioning to avoid CSS transform conflicts."
      >
        <DSPreview code={`<Drawer open={open} onClose={() => setOpen(false)} title="Preferences" side="left">
  {/* content */}
</Drawer>`}>
          <SettingsDrawerDemo />
        </DSPreview>
      </DSSection>

      <DSSection
        title="Bottom drawer — filters"
        description="Rises from the bottom edge. Preferred on mobile for filter sheets and action sheets. Uses DrawerFooter for the Apply/Clear actions."
      >
        <DSPreview code={`<Drawer open={open} onClose={() => setOpen(false)} title="Filter issues" side="bottom">
  {/* content */}
  <DrawerFooter>
    <button>Clear all</button>
    <button>Apply filters</button>
  </DrawerFooter>
</Drawer>`}>
          <FilterDrawerDemo />
        </DSPreview>
      </DSSection>

      <DSSection
        title="Edit drawer — standard footer"
        description="A right drawer for editing a record. DrawerFooter places Cancel and Save buttons right-aligned above the drawer's bottom edge, matching the ModalFooter pattern."
      >
        <DSPreview code={`<Drawer open={open} onClose={() => setOpen(false)} title="Edit ENG-2451" side="right">
  {/* form fields */}
  <DrawerFooter>
    <button>Cancel</button>
    <button>Save changes</button>
  </DrawerFooter>
</Drawer>`}>
          <EditDrawerDemo />
        </DSPreview>
      </DSSection>

      <DSSection
        title="Edit drawer — full-width split footer"
        description="Same edit pattern but with DrawerFooterFull: two equal-width buttons flush to the drawer's bottom edge, separated by a vertical divider. Mirrors the ModalFooterFull pattern for visual consistency."
      >
        <DSPreview code={`<Drawer open={open} onClose={() => setOpen(false)} title="Edit ENG-1188" side="right">
  {/* form fields */}
  <DrawerFooterFull
    cancelLabel="Cancel"
    confirmLabel="Save changes"
    onCancel={onClose}
    onConfirm={handleSave}
  />
</Drawer>`}>
          <EditDrawerFullFooterDemo />
        </DSPreview>
      </DSSection>

      <DSSection title="Drawer anatomy">
        <DSPreview code={`// side: 'right' | 'left' | 'bottom'
// DrawerFooter   — right-aligned buttons, matches ModalFooter
// DrawerFooterFull — full-width split, matches ModalFooterFull

<Drawer
  open={open}
  onClose={() => setOpen(false)}
  title="Panel title"
  side="right"
  width="w-80"
>
  <div className="px-5 py-4 flex-1">
    {/* body */}
  </div>
  <DrawerFooterFull
    cancelLabel="Cancel"
    confirmLabel="Save"
    onCancel={onClose}
    onConfirm={handleSave}
  />
</Drawer>`}>
          <span className="text-xs text-muted-foreground">See code snippet above</span>
        </DSPreview>
      </DSSection>

    </DSLayout>
  )
}
