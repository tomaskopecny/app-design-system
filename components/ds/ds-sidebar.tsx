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
} from 'lucide-react'

const sections = [
  {
    title: 'Foundations',
    items: [
      { label: 'Colors', href: '/foundations/colors', icon: Palette },
      { label: 'Typography', href: '/foundations/typography', icon: Type },
      { label: 'Spacing', href: '/foundations/spacing', icon: Ruler },
      { label: 'Border Radius', href: '/foundations/radius', icon: Circle },
      { label: 'Shadows', href: '/foundations/shadows', icon: Layers },
    ],
  },
  {
    title: 'Components',
    items: [
      { label: 'Buttons', href: '/components/buttons', icon: Box },
      { label: 'Badges', href: '/components/badges', icon: Circle },
      { label: 'Inputs', href: '/components/inputs', icon: Type },
      { label: 'Selects & Dropdowns', href: '/components/selects', icon: ChevronRight },
      { label: 'Avatars', href: '/components/avatars', icon: Circle },
      { label: 'Tooltips', href: '/components/tooltips', icon: Box },
    ],
  },
  {
    title: 'Data Display',
    items: [
      { label: 'Issue Rows', href: '/data/issues', icon: List },
      { label: 'Tables', href: '/data/tables', icon: LayoutDashboard },
      { label: 'Status & Priority', href: '/data/status', icon: Circle },
    ],
  },
  {
    title: 'Patterns',
    items: [
      { label: 'Command Palette', href: '/patterns/command', icon: Command },
      { label: 'Navigation', href: '/patterns/navigation', icon: LayoutDashboard },
      { label: 'Modals', href: '/patterns/modals', icon: Box },
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
