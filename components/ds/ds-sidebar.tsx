'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import {
  Layers,
  Type,
  Box,
  LayoutDashboard,
  List,
  Command,
  Palette,
  Ruler,
  Circle,
  ChevronRight,
  ToggleLeft,
  CheckSquare,
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
  GanttChartSquare,
} from 'lucide-react'

const sections = [
  {
    title: 'Foundations',
    items: [
      { label: 'Border Radius', href: '/foundations/radius', icon: Circle },
      { label: 'Colors', href: '/foundations/colors', icon: Palette },
      { label: 'Icons', href: '/foundations/icons', icon: Grid2x2 },
      { label: 'Motion', href: '/foundations/motion', icon: Zap },
      { label: 'Shadows', href: '/foundations/shadows', icon: Layers },
      { label: 'Spacing', href: '/foundations/spacing', icon: Ruler },
      { label: 'Typography', href: '/foundations/typography', icon: Type },
    ],
  },
  {
    title: 'Components',
    items: [
      { label: 'Avatars', href: '/components/avatars', icon: Circle },
      { label: 'Badges', href: '/components/badges', icon: Circle },
      { label: 'Breadcrumb', href: '/components/breadcrumb', icon: Navigation },
      { label: 'Buttons', href: '/components/buttons', icon: Box },
      { label: 'Calendar', href: '/components/calendar', icon: Calendar },
      { label: 'Checkboxes & Radio', href: '/components/checkboxes', icon: CheckSquare },
      { label: 'Empty States', href: '/components/empty-states', icon: FileX },
      { label: 'Inputs', href: '/components/inputs', icon: Type },
      { label: 'Keyboard Shortcuts', href: '/components/kbd', icon: Keyboard },
      { label: 'Progress & Skeleton', href: '/components/progress', icon: BarChart2 },
      { label: 'Selects & Dropdowns', href: '/components/selects', icon: ChevronRight },
      { label: 'Tabs', href: '/components/tabs', icon: PanelTop },
      { label: 'Toggles', href: '/components/toggles', icon: ToggleLeft },
      { label: 'Tooltips', href: '/components/tooltips', icon: Box },
    ],
  },
  {
    title: 'Data Display',
    items: [
      { label: 'Cycle Cards', href: '/data/cycles', icon: Columns3 },
      { label: 'Grouping Headers', href: '/data/grouping', icon: List },
      { label: 'Issue Rows', href: '/data/issues', icon: List },
      { label: 'Kanban Cards', href: '/data/kanban', icon: Kanban },
      { label: 'Roadmap / Gantt', href: '/data/roadmap', icon: GanttChartSquare },
      { label: 'Status & Priority', href: '/data/status', icon: Circle },
      { label: 'Tables', href: '/data/tables', icon: LayoutDashboard },
    ],
  },
  {
    title: 'Patterns',
    items: [
      { label: 'Command Palette', href: '/patterns/command', icon: Command },
      { label: 'Context Menus', href: '/patterns/context-menu', icon: MousePointerClick },
      { label: 'Filters', href: '/patterns/filters', icon: Filter },
      { label: 'Inline Editing', href: '/patterns/inline-editing', icon: Pencil },
      { label: 'Modals', href: '/patterns/modals', icon: Box },
      { label: 'Navigation', href: '/patterns/navigation', icon: LayoutDashboard },
      { label: 'Toasts', href: '/patterns/toasts', icon: Bell },
    ],
  },
]

export function DSSidebar() {
  const pathname = usePathname()

  return (
    <aside className="fixed top-0 left-0 h-screen w-56 bg-sidebar border-r border-sidebar-border flex flex-col overflow-hidden z-40">
      {/* Logo / Title */}
      <div className="px-4 py-3.5 border-b border-sidebar-border flex items-center gap-2.5">
        <div className="w-5 h-5 rounded-[4px] bg-foreground flex items-center justify-center">
          <span className="text-[9px] font-black text-background leading-none">L</span>
        </div>
        <span className="text-sm font-medium text-foreground tracking-tight">Design System</span>
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto py-3">
        {sections.map((section) => (
          <div key={section.title} className="mb-4">
            <p className="px-4 py-1 text-[10px] font-semibold uppercase tracking-widest text-muted-foreground/60 select-none">
              {section.title}
            </p>
            {section.items.map((item) => {
              const active = pathname === item.href
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    'flex items-center gap-2.5 px-4 py-1.5 text-sm transition-colors',
                    active
                      ? 'text-foreground bg-sidebar-accent'
                      : 'text-sidebar-foreground hover:text-foreground hover:bg-sidebar-accent/60',
                  )}
                >
                  <item.icon className="w-3.5 h-3.5 shrink-0 opacity-70" />
                  {item.label}
                </Link>
              )
            })}
          </div>
        ))}
      </nav>

      {/* Bottom hint */}
      <div className="px-4 py-3 border-t border-sidebar-border">
        <p className="text-[11px] text-muted-foreground/50 leading-relaxed">
          Inspired by Linear&apos;s UI
        </p>
      </div>
    </aside>
  )
}
