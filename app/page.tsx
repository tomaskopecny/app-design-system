import Link from 'next/link'
import { DSSidebar } from '@/components/ds/ds-sidebar'
import {
  Palette,
  Type,
  Box,
  List,
  Command,
  ArrowRight,
  Circle,
  Ruler,
  Layers,
  LayoutDashboard,
  CheckSquare,
  ToggleLeft,
  BarChart2,
  Keyboard,
  PanelTop,
  Navigation,
  FileX,
  Columns3,
  Kanban,
  MousePointerClick,
  Bell,
  Pencil,
  Filter,
  Calendar,
  Zap,
  Grid2x2,
  ChevronRight,
} from 'lucide-react'

const cards = [
  {
    category: 'Foundations',
    items: [
      { label: 'Colors', href: '/foundations/colors', icon: Palette, desc: 'Core palette, semantic tokens & opacity scales' },
      { label: 'Typography', href: '/foundations/typography', icon: Type, desc: 'Typeface, scale, weights & line heights' },
      { label: 'Spacing', href: '/foundations/spacing', icon: Ruler, desc: 'Spacing scale from 0 to 96' },
      { label: 'Border Radius', href: '/foundations/radius', icon: Circle, desc: 'Radius tokens from sm to full' },
      { label: 'Shadows', href: '/foundations/shadows', icon: Layers, desc: 'Elevation levels for layering UI' },
      { label: 'Icons', href: '/foundations/icons', icon: Grid2x2, desc: 'Lucide icon subset with sizes and stroke weights' },
      { label: 'Motion', href: '/foundations/motion', icon: Zap, desc: 'Duration, easing and animation token reference' },
    ],
  },
  {
    category: 'Components',
    items: [
      { label: 'Buttons', href: '/components/buttons', icon: Box, desc: 'Primary, secondary, ghost and icon variants' },
      { label: 'Badges', href: '/components/badges', icon: Circle, desc: 'Status, priority and label badges' },
      { label: 'Inputs', href: '/components/inputs', icon: Type, desc: 'Text fields, search and keyboard shortcuts' },
      { label: 'Selects & Dropdowns', href: '/components/selects', icon: ChevronRight, desc: 'Dropdowns, filters and multi-select' },
      { label: 'Checkboxes & Radio', href: '/components/checkboxes', icon: CheckSquare, desc: 'Form selection controls and groups' },
      { label: 'Toggles', href: '/components/toggles', icon: ToggleLeft, desc: 'Switch and toggle for boolean settings' },
      { label: 'Tabs', href: '/components/tabs', icon: PanelTop, desc: 'View switcher tabs in underline and pill styles' },
      { label: 'Avatars', href: '/components/avatars', icon: Circle, desc: 'User avatars, stacks and team icons' },
      { label: 'Tooltips', href: '/components/tooltips', icon: Box, desc: 'Contextual label with optional shortcut hint' },
      { label: 'Progress & Skeleton', href: '/components/progress', icon: BarChart2, desc: 'Loading bars, rings and skeleton placeholders' },
      { label: 'Keyboard Shortcuts', href: '/components/kbd', icon: Keyboard, desc: 'Kbd tags, shortcut hints and combo display' },
      { label: 'Breadcrumb', href: '/components/breadcrumb', icon: Navigation, desc: 'Hierarchical path navigation' },
      { label: 'Calendar', href: '/components/calendar', icon: Calendar, desc: 'Date picker, range selection and due dates' },
      { label: 'Empty States', href: '/components/empty-states', icon: FileX, desc: 'Blank slate patterns with CTA guidance' },
    ],
  },
  {
    category: 'Data Display',
    items: [
      { label: 'Issue Rows', href: '/data/issues', icon: List, desc: 'Linear-style issue list items with states' },
      { label: 'Tables', href: '/data/tables', icon: LayoutDashboard, desc: 'Data tables with sorting and actions' },
      { label: 'Status & Priority', href: '/data/status', icon: Circle, desc: 'Status icons and priority indicators' },
      { label: 'Cycle Cards', href: '/data/cycles', icon: Columns3, desc: 'Sprint progress cards with assignee avatars' },
      { label: 'Grouping Headers', href: '/data/grouping', icon: List, desc: 'Sticky section headers for issue lists' },
      { label: 'Kanban Cards', href: '/data/kanban', icon: Kanban, desc: 'Board view cards across status columns' },
    ],
  },
  {
    category: 'Patterns',
    items: [
      { label: 'Command Palette', href: '/patterns/command', icon: Command, desc: '⌘K command menu with search and shortcuts' },
      { label: 'Navigation', href: '/patterns/navigation', icon: LayoutDashboard, desc: 'Sidebar, header and breadcrumb patterns' },
      { label: 'Modals', href: '/patterns/modals', icon: Box, desc: 'Dialog, confirm and sheet patterns' },
      { label: 'Context Menus', href: '/patterns/context-menu', icon: MousePointerClick, desc: 'Right-click and dropdown action menus' },
      { label: 'Toasts', href: '/patterns/toasts', icon: Bell, desc: 'Ephemeral feedback and notification toasts' },
      { label: 'Inline Editing', href: '/patterns/inline-editing', icon: Pencil, desc: 'Click-to-edit fields directly in issue rows' },
      { label: 'Filters', href: '/patterns/filters', icon: Filter, desc: 'Filter bar with chips and view controls' },
    ],
  },
]

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background flex">
      <DSSidebar />
      <main className="ml-56 flex-1 min-w-0">
        {/* Hero */}
        <div className="px-8 pt-12 pb-8 border-b border-border">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-6 h-6 rounded-[5px] bg-foreground flex items-center justify-center">
              <span className="text-[11px] font-black text-background leading-none">L</span>
            </div>
            <span className="text-xs text-muted-foreground font-medium uppercase tracking-widest">Linear Design System</span>
          </div>
          <h1 className="text-3xl font-semibold text-foreground tracking-tight text-balance">
            Build with Linear&apos;s design language
          </h1>
          <p className="mt-3 text-sm text-muted-foreground leading-relaxed max-w-xl">
            A complete design system inspired by Linear&apos;s dark, minimal, keyboard-first UI.
            Every token, component, and pattern you need to build consistent product UIs.
          </p>
          <div className="mt-6 flex items-center gap-3">
            <Link
              href="/foundations/colors"
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-md bg-foreground text-background text-xs font-medium hover:bg-foreground/90 transition-colors"
            >
              Get started <ArrowRight className="w-3 h-3" />
            </Link>
            <Link
              href="/patterns/command"
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-md border border-border text-foreground text-xs font-medium hover:bg-accent transition-colors"
            >
              <Command className="w-3 h-3" /> Command Palette
            </Link>
          </div>
        </div>

        {/* Grid of cards */}
        <div className="px-8 py-8 space-y-10">
          {cards.map((section) => (
            <div key={section.category}>
              <p className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground/60 mb-3">
                {section.category}
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
                {section.items.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="group flex items-start gap-3 p-4 rounded-md border border-border bg-card hover:bg-surface-2 hover:border-border/80 transition-all"
                  >
                    <div className="mt-0.5 w-7 h-7 rounded-md bg-surface-2 border border-border flex items-center justify-center shrink-0 group-hover:bg-surface-3 transition-colors">
                      <item.icon className="w-3.5 h-3.5 text-muted-foreground" />
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-1.5">
                        <span className="text-sm font-medium text-foreground">{item.label}</span>
                        <ArrowRight className="w-3 h-3 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                      </div>
                      <p className="mt-0.5 text-xs text-muted-foreground leading-relaxed">{item.desc}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="px-8 py-6 border-t border-border mt-4">
          <p className="text-xs text-muted-foreground/50">
            Inspired by <span className="text-muted-foreground">Linear</span> — the system for modern product development.
          </p>
        </div>
      </main>
    </div>
  )
}
