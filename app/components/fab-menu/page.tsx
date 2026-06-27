'use client'

import { useState } from 'react'
import {
  Menu, X, Home, Calendar, BarChart2, Users, Settings,
  Bell, FileText, Layers, ChevronRight, Zap,
} from 'lucide-react'
import { DSLayout } from '@/components/ds/ds-layout'
import { DSSection, DSPreview } from '@/components/ds/ds-section'

// ─── Types ────────────────────────────────────────────────────────────────────

type NavItem = {
  label: string
  icon: React.ElementType
  badge?: number
  children?: NavItem[]
}

// ─── iPhone 17 frame wrapper ──────────────────────────────────────────────────
// Logical resolution: 393 × 852 pt
// We render at 393×852 then scale down to fit the preview column.

function PhoneFrame({ children }: { children: React.ReactNode }) {
  return (
    // Outer scaler: keeps aspect ratio, limits max width
    <div className="flex justify-center w-full">
      <div
        className="relative"
        style={{
          // scale 393×852 frame to max 320px wide in preview
          width: 'min(320px, 100%)',
          aspectRatio: '393 / 852',
        }}
      >
        {/* The phone shell */}
        <div
          className="absolute inset-0 rounded-[13%] border-[3px] border-border bg-surface-1 shadow-2xl overflow-hidden"
          style={{ boxShadow: '0 24px 60px rgba(0,0,0,0.6)' }}
        >
          {/* Status bar notch area */}
          <div className="flex items-center justify-between px-5 pt-3 pb-1 shrink-0">
            <span className="text-[10px] font-semibold text-foreground">9:41</span>
            <div className="w-20 h-5 rounded-full bg-background/10 border border-border/30 mx-auto absolute left-1/2 -translate-x-1/2 top-2" />
            <div className="flex items-center gap-1">
              <div className="w-3 h-2 rounded-sm border border-foreground/50 relative"><div className="absolute inset-[1px] right-[-2px] w-[3px] h-[4px] rounded-sm bg-foreground/50 -right-[3px] top-[2px]" /></div>
              <div className="w-2.5 h-2.5 rounded-sm bg-foreground/50" />
            </div>
          </div>
          {/* Screen content fills remaining space */}
          <div className="absolute inset-0 top-8 overflow-hidden">
            {children}
          </div>
          {/* Home indicator */}
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-24 h-1 rounded-full bg-foreground/20" />
        </div>
      </div>
    </div>
  )
}

// ─── Primitives ───────────────────────────────────────────────────────────────

function FAB({ open, onClick }: { open: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      aria-label={open ? 'Close menu' : 'Open menu'}
      className="w-14 h-14 rounded-full bg-foreground text-background flex items-center justify-center active:scale-95 transition-all duration-150 touch-manipulation cursor-pointer shrink-0"
      style={{ boxShadow: '0 4px 20px rgba(0,0,0,0.5)' }}
    >
      {open
        ? <X className="w-5 h-5" strokeWidth={2} />
        : <Menu className="w-5 h-5" strokeWidth={2} />
      }
    </button>
  )
}

function NavRow({ item, onClose }: { item: NavItem; onClose: () => void }) {
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
        <div className="pl-14">
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
  { label: 'Dashboard',     icon: Home },
  { label: 'Issues',        icon: Layers,    badge: 3 },
  { label: 'Calendar',      icon: Calendar },
  { label: 'Reports',       icon: BarChart2, children: [
    { label: 'Weekly summary', icon: FileText },
    { label: 'Velocity',       icon: Zap },
  ]},
  { label: 'Members',       icon: Users },
  { label: 'Notifications', icon: Bell,      badge: 12 },
  { label: 'Settings',      icon: Settings },
]

// ─── Fake page content ────────────────────────────────────────────────────────

function FakePageContent() {
  return (
    <div className="p-5 space-y-3">
      <div className="h-3 w-20 rounded bg-muted-foreground/20" />
      <div className="h-5 w-48 rounded bg-foreground/10" />
      <div className="h-px bg-border my-2" />
      <div className="h-3 w-full rounded bg-muted-foreground/15" />
      <div className="h-3 w-5/6 rounded bg-muted-foreground/15" />
      <div className="h-3 w-4/6 rounded bg-muted-foreground/15" />
      <div className="mt-4 rounded-lg border border-border bg-surface-2 p-3 space-y-2">
        <div className="h-3 w-28 rounded bg-muted-foreground/20" />
        <div className="h-8 w-16 rounded bg-foreground/10" />
        <div className="h-3 w-32 rounded bg-muted-foreground/15" />
        <div className="h-8 w-10 rounded bg-foreground/10" />
      </div>
      <div className="rounded-lg border border-border bg-surface-2 p-3 space-y-2">
        <div className="h-3 w-24 rounded bg-muted-foreground/20" />
        <div className="h-3 w-full rounded bg-muted-foreground/15" />
        <div className="h-3 w-3/4 rounded bg-muted-foreground/15" />
      </div>
    </div>
  )
}

// ─── Shared inline sheet (contained within PhoneFrame) ────────────────────────

function InlineSheet({
  open,
  onClose,
  items,
}: {
  open: boolean
  onClose: () => void
  items: NavItem[]
}) {
  return (
    <>
      {open && (
        <div
          className="absolute inset-0 bg-black/20 z-40"
          onClick={onClose}
        />
      )}
      <div
        className={`absolute left-0 right-0 bottom-0 z-50 bg-popover border-t border-border rounded-t-2xl
          transition-transform duration-300 ease-out
          ${open ? 'translate-y-0' : 'translate-y-full'}`}
        style={{ boxShadow: '0 -4px 32px rgba(0,0,0,0.3)' }}
        onClick={e => e.stopPropagation()}
      >
        <div className="flex justify-center pt-3 pb-1">
          <div className="w-8 h-1 rounded-full bg-border" />
        </div>
        <div className="px-5 pt-3 pb-2">
          <p className="text-base font-semibold text-foreground">Menu</p>
        </div>
        <div className="pb-6 overflow-y-auto max-h-[60vh]">
          {items.map(item => (
            <NavRow key={item.label} item={item} onClose={onClose} />
          ))}
        </div>
      </div>
    </>
  )
}

// ─── Demos ────────────────────────────────────────────────────────────────────

function BasicFABDemo() {
  const [open, setOpen] = useState(false)
  return (
    <PhoneFrame>
      <div className="relative w-full h-full overflow-hidden bg-background">
        <FakePageContent />
        <div className="absolute bottom-6 right-4 z-50">
          <FAB open={open} onClick={() => setOpen(v => !v)} />
        </div>
        <InlineSheet open={open} onClose={() => setOpen(false)} items={demoItems.slice(0, 5)} />
      </div>
    </PhoneFrame>
  )
}

function FABWithBadgeDemo() {
  const [open, setOpen] = useState(false)
  return (
    <PhoneFrame>
      <div className="relative w-full h-full overflow-hidden bg-background">
        <FakePageContent />
        <div className="absolute bottom-6 right-4 z-50">
          <div className="relative">
            <FAB open={open} onClick={() => setOpen(v => !v)} />
            {!open && (
              <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-destructive border-2 border-background text-[9px] font-bold text-white flex items-center justify-center leading-none">
                3
              </span>
            )}
          </div>
        </div>
        <InlineSheet open={open} onClose={() => setOpen(false)} items={demoItems} />
      </div>
    </PhoneFrame>
  )
}

function FABTextLabelDemo() {
  const [open, setOpen] = useState(false)
  return (
    <PhoneFrame>
      <div className="relative w-full h-full overflow-hidden bg-background">
        <FakePageContent />
        <div className="absolute bottom-6 right-4 z-50">
          <button
            onClick={() => setOpen(v => !v)}
            aria-label={open ? 'Close menu' : 'Open menu'}
            className="h-12 px-5 rounded-full bg-foreground text-background flex items-center gap-2 active:scale-95 transition-all duration-150 touch-manipulation cursor-pointer"
            style={{ boxShadow: '0 4px 20px rgba(0,0,0,0.5)' }}
          >
            {open
              ? <X className="w-4 h-4" strokeWidth={2} />
              : <Menu className="w-4 h-4" strokeWidth={2} />
            }
            <span className="text-sm font-medium">{open ? 'Close' : 'Menu'}</span>
          </button>
        </div>
        <InlineSheet open={open} onClose={() => setOpen(false)} items={demoItems.slice(0, 5)} />
      </div>
    </PhoneFrame>
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
        description="Dark circular FAB with hamburger icon. Tapping opens a bottom sheet nav; the icon morphs to X to close."
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
        description="Extended FAB combining the hamburger icon with a 'Menu' text label. Useful when the icon alone may not be immediately recognisable."
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
                ['FAB button',        'w-14 h-14 · rounded-full · bg-foreground · text-background · fixed bottom-4 right-4 z-50'],
                ['FAB (extended)',    'h-12 px-5 · rounded-full · bg-foreground · text-background · icon + label'],
                ['Notification badge','absolute -top-1 -right-1 · w-4 h-4 · bg-destructive · border-background'],
                ['Backdrop',         'absolute inset-0 · bg-black/20 · z-40 · click to close'],
                ['Bottom sheet',     'absolute bottom-0 · rounded-t-2xl · bg-popover · border-t border-border · z-50'],
                ['Drag handle',      'w-8 h-1 · rounded-full · bg-border · centered at top of sheet'],
                ['Nav row',          'px-5 py-3.5 · min-h-[52px] · icon 20px · label text-sm font-medium'],
                ['Safe area',        'paddingBottom: env(safe-area-inset-bottom) on real device'],
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
