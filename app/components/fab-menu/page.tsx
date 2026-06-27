'use client'

import { useState } from 'react'
import {
  Menu, X, Home, Calendar, BarChart2, Users, Settings,
  Bell, FileText, Layers, ChevronRight, Zap,
} from 'lucide-react'
import { DSLayout } from '@/components/ds/ds-layout'
import { DSSection, DSPreview } from '@/components/ds/ds-section'

// ─── Primitives ───────────────────────────────────────────────────────────────

type NavItem = {
  label: string
  icon: React.ElementType
  badge?: number
  children?: NavItem[]
}

function FAB({ open, onClick }: { open: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      aria-label={open ? 'Close menu' : 'Open menu'}
      className="w-14 h-14 rounded-full bg-foreground text-background flex items-center justify-center shadow-lg active:scale-95 transition-all duration-150 touch-manipulation cursor-pointer shrink-0"
      style={{ boxShadow: '0 4px 20px rgba(0,0,0,0.5)' }}
    >
      {open
        ? <X className="w-5 h-5" strokeWidth={2} />
        : <Menu className="w-5 h-5" strokeWidth={2} />
      }
    </button>
  )
}

function BottomSheet({
  open,
  onClose,
  title,
  children,
}: {
  open: boolean
  onClose: () => void
  title?: string
  children: React.ReactNode
}) {
  return (
    <>
      {/* Backdrop */}
      {open && (
        <div
          className="fixed inset-0 z-40 bg-black/20"
          onClick={onClose}
          aria-hidden="true"
        />
      )}
      {/* Sheet */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label={title ?? 'Menu'}
        className={`fixed left-0 right-0 bottom-0 z-50 bg-popover border-t border-border rounded-t-2xl
          transition-transform duration-300 ease-out
          ${open ? 'translate-y-0' : 'translate-y-full'}`}
        style={{ boxShadow: '0 -4px 32px rgba(0,0,0,0.3)', paddingBottom: 'env(safe-area-inset-bottom, 0px)' }}
        onClick={e => e.stopPropagation()}
      >
        {/* Drag handle */}
        <div className="flex justify-center pt-3 pb-1">
          <div className="w-8 h-1 rounded-full bg-border" />
        </div>
        {title && (
          <div className="px-5 pt-3 pb-4">
            <p className="text-base font-semibold text-foreground">{title}</p>
          </div>
        )}
        {children}
      </div>
    </>
  )
}

function NavRow({
  item,
  onClose,
}: {
  item: NavItem
  onClose: () => void
}) {
  const [expanded, setExpanded] = useState(false)
  const Icon = item.icon
  const hasChildren = item.children && item.children.length > 0

  return (
    <div>
      <button
        onClick={() => hasChildren ? setExpanded(v => !v) : onClose()}
        className="w-full flex items-center gap-4 px-5 py-3.5 text-left text-foreground hover:bg-surface-2 active:bg-surface-2 transition-colors touch-manipulation cursor-pointer"
      >
        <Icon className="w-5 h-5 text-muted-foreground shrink-0" strokeWidth={1.5} />
        <span className="flex-1 text-sm font-medium">{item.label}</span>
        {item.badge != null && (
          <span className="text-xs font-medium text-destructive">{item.badge}</span>
        )}
        {hasChildren && (
          <ChevronRight
            className={`w-4 h-4 text-muted-foreground transition-transform duration-150 ${expanded ? 'rotate-90' : ''}`}
            strokeWidth={1.5}
          />
        )}
      </button>
      {hasChildren && expanded && (
        <div className="pl-14 border-l-0">
          {item.children!.map(child => (
            <button
              key={child.label}
              onClick={onClose}
              className="w-full flex items-center gap-3 px-5 py-3 text-left text-muted-foreground hover:text-foreground hover:bg-surface-2 active:bg-surface-2 transition-colors touch-manipulation cursor-pointer"
            >
              <child.icon className="w-4 h-4 shrink-0" strokeWidth={1.5} />
              <span className="text-sm">{child.label}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

// ─── Demo data ────────────────────────────────────────────────────────────────

const demoItems: NavItem[] = [
  { label: 'Dashboard', icon: Home },
  { label: 'Issues', icon: Layers, badge: 3 },
  { label: 'Calendar', icon: Calendar },
  { label: 'Reports', icon: BarChart2, children: [
    { label: 'Weekly summary', icon: FileText },
    { label: 'Velocity', icon: Zap },
  ]},
  { label: 'Members', icon: Users },
  { label: 'Notifications', icon: Bell, badge: 12 },
  { label: 'Settings', icon: Settings },
]

// ─── Demos ────────────────────────────────────────────────────────────────────

function BasicFABDemo() {
  const [open, setOpen] = useState(false)
  return (
    <div className="relative h-72 overflow-hidden rounded-lg bg-surface-1 border border-border flex flex-col">
      {/* Fake page content */}
      <div className="p-5 flex-1 space-y-3">
        <div className="h-4 w-32 rounded bg-surface-3" />
        <div className="h-3 w-full rounded bg-surface-2" />
        <div className="h-3 w-4/5 rounded bg-surface-2" />
        <div className="h-3 w-3/5 rounded bg-surface-2" />
        <div className="mt-4 h-16 rounded-lg bg-surface-2 border border-border" />
      </div>
      {/* FAB + Sheet anchored inside preview */}
      <div className="absolute bottom-4 right-4 z-50">
        <FAB open={open} onClick={() => setOpen(v => !v)} />
      </div>
      {open && (
        <div
          className="absolute inset-0 bg-black/20 z-40"
          onClick={() => setOpen(false)}
        />
      )}
      <div
        className={`absolute left-0 right-0 bottom-0 z-50 bg-popover border-t border-border rounded-t-2xl transition-transform duration-300 ease-out ${open ? 'translate-y-0' : 'translate-y-full'}`}
        style={{ boxShadow: '0 -4px 32px rgba(0,0,0,0.3)' }}
        onClick={e => e.stopPropagation()}
      >
        <div className="flex justify-center pt-3 pb-1">
          <div className="w-8 h-1 rounded-full bg-border" />
        </div>
        <div className="px-5 pt-3 pb-2">
          <p className="text-base font-semibold text-foreground">Menu</p>
        </div>
        <div className="pb-2">
          {demoItems.slice(0, 5).map(item => (
            <NavRow key={item.label} item={item} onClose={() => setOpen(false)} />
          ))}
        </div>
      </div>
    </div>
  )
}

function FABWithBadgeDemo() {
  const [open, setOpen] = useState(false)
  return (
    <div className="relative h-72 overflow-hidden rounded-lg bg-surface-1 border border-border">
      <div className="p-5 space-y-3">
        <div className="h-4 w-28 rounded bg-surface-3" />
        <div className="h-3 w-full rounded bg-surface-2" />
        <div className="h-3 w-2/3 rounded bg-surface-2" />
      </div>
      {/* FAB with notification dot */}
      <div className="absolute bottom-4 right-4 z-50">
        <div className="relative">
          <FAB open={open} onClick={() => setOpen(v => !v)} />
          {!open && (
            <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-destructive border-2 border-background text-[9px] font-bold text-white flex items-center justify-center leading-none">
              3
            </span>
          )}
        </div>
      </div>
      {open && (
        <div
          className="absolute inset-0 bg-black/20 z-40"
          onClick={() => setOpen(false)}
        />
      )}
      <div
        className={`absolute left-0 right-0 bottom-0 z-50 bg-popover border-t border-border rounded-t-2xl transition-transform duration-300 ease-out ${open ? 'translate-y-0' : 'translate-y-full'}`}
        style={{ boxShadow: '0 -4px 32px rgba(0,0,0,0.3)' }}
        onClick={e => e.stopPropagation()}
      >
        <div className="flex justify-center pt-3 pb-1">
          <div className="w-8 h-1 rounded-full bg-border" />
        </div>
        <div className="px-5 pt-3 pb-2">
          <p className="text-base font-semibold text-foreground">Menu</p>
        </div>
        <div className="pb-2">
          {demoItems.map(item => (
            <NavRow key={item.label} item={item} onClose={() => setOpen(false)} />
          ))}
        </div>
      </div>
    </div>
  )
}

function FABTextLabelDemo() {
  const [open, setOpen] = useState(false)
  return (
    <div className="relative h-72 overflow-hidden rounded-lg bg-surface-1 border border-border">
      <div className="p-5 space-y-3">
        <div className="h-4 w-36 rounded bg-surface-3" />
        <div className="h-3 w-full rounded bg-surface-2" />
        <div className="h-3 w-3/4 rounded bg-surface-2" />
      </div>
      {/* FAB with "Menu" text label */}
      <div className="absolute bottom-4 right-4 z-50">
        <button
          onClick={() => setOpen(v => !v)}
          aria-label={open ? 'Close menu' : 'Open menu'}
          className="h-12 px-5 rounded-full bg-foreground text-background flex items-center gap-2 shadow-lg active:scale-95 transition-all duration-150 touch-manipulation cursor-pointer"
          style={{ boxShadow: '0 4px 20px rgba(0,0,0,0.5)' }}
        >
          {open
            ? <X className="w-4 h-4" strokeWidth={2} />
            : <Menu className="w-4 h-4" strokeWidth={2} />
          }
          <span className="text-sm font-medium">{open ? 'Close' : 'Menu'}</span>
        </button>
      </div>
      {open && (
        <div
          className="absolute inset-0 bg-black/20 z-40"
          onClick={() => setOpen(false)}
        />
      )}
      <div
        className={`absolute left-0 right-0 bottom-0 z-50 bg-popover border-t border-border rounded-t-2xl transition-transform duration-300 ease-out ${open ? 'translate-y-0' : 'translate-y-full'}`}
        style={{ boxShadow: '0 -4px 32px rgba(0,0,0,0.3)' }}
        onClick={e => e.stopPropagation()}
      >
        <div className="flex justify-center pt-3 pb-1">
          <div className="w-8 h-1 rounded-full bg-border" />
        </div>
        <div className="px-5 pt-3 pb-2">
          <p className="text-base font-semibold text-foreground">Menu</p>
        </div>
        <div className="pb-2">
          {demoItems.slice(0, 5).map(item => (
            <NavRow key={item.label} item={item} onClose={() => setOpen(false)} />
          ))}
        </div>
      </div>
    </div>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function FABMenuPage() {
  return (
    <DSLayout
      title="FAB Menu"
      description="A floating action button pinned to the bottom-right corner that opens a bottom sheet navigation menu. Designed for mobile-first UIs where a persistent sidebar is impractical."
    >
      <DSSection
        title="Basic FAB"
        description="Dark circular FAB with hamburger icon. Tapping opens a bottom sheet nav; the icon morphs to X to close. Safe-area inset is applied so the FAB and sheet clear the iPhone home indicator."
      >
        <DSPreview>
          <BasicFABDemo />
        </DSPreview>
      </DSSection>

      <DSSection
        title="FAB with notification badge"
        description="An unread-count badge on the FAB signals pending items without opening the sheet. The badge disappears when the sheet is open."
      >
        <DSPreview>
          <FABWithBadgeDemo />
        </DSPreview>
      </DSSection>

      <DSSection
        title="FAB with text label"
        description="An extended FAB combining the hamburger icon with a 'Menu' text label. Useful when the icon alone may not be immediately recognisable, or to match a specific brand voice."
      >
        <DSPreview>
          <FABTextLabelDemo />
        </DSPreview>
      </DSSection>

      <DSSection
        title="Anatomy"
        description="Structure and token reference for the FAB Menu pattern."
      >
        <div className="rounded-lg border border-border overflow-hidden text-sm">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b border-border bg-surface-1">
                <th className="text-left px-4 py-2.5 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Part</th>
                <th className="text-left px-4 py-2.5 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Tokens / Notes</th>
              </tr>
            </thead>
            <tbody className="font-mono text-xs divide-y divide-border">
              {[
                ['FAB button',     'w-14 h-14 · rounded-full · bg-foreground · text-background · fixed bottom-4 right-4 z-50'],
                ['FAB (extended)', 'h-12 px-5 · rounded-full · bg-foreground · text-background · icon + label'],
                ['Notification badge', 'absolute -top-1 -right-1 · w-4 h-4 · bg-destructive · border-background'],
                ['Backdrop',       'fixed inset-0 · bg-black/20 · z-40 · click to close'],
                ['Bottom sheet',   'fixed bottom-0 · rounded-t-2xl · bg-popover · border-t border-border · z-50'],
                ['Drag handle',    'w-8 h-1 · rounded-full · bg-border · centered at top of sheet'],
                ['Nav row',        'px-5 py-3.5 · min-h-[52px] · icon 20px · label text-sm font-medium'],
                ['Safe area',      'paddingBottom: env(safe-area-inset-bottom) on sheet'],
              ].map(([part, notes]) => (
                <tr key={part} className="bg-surface-1 even:bg-transparent">
                  <td className="px-4 py-2.5 text-foreground font-sans font-medium">{part}</td>
                  <td className="px-4 py-2.5 text-muted-foreground">{notes}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </DSSection>
    </DSLayout>
  )
}
