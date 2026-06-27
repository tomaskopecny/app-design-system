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
  GanttChartSquare,
  AlertCircle,
  Loader2,
  SlidersHorizontal,
  ArrowUpDown,
  Code2,
  Milestone,
  Link2,
  GripVertical,
  FormInput,
  Sparkles,
  Layers2,
  BookOpen,
} from 'lucide-react'

const cards = [
  {
    category: 'Foundations',
    items: [
      { label: 'Border Radius', href: '/foundations/radius',    icon: Circle,   desc: 'Radius tokens from sm to full' },
      { label: 'Colors',        href: '/foundations/colors',    icon: Palette,  desc: 'Core palette, semantic tokens & opacity scales' },
      { label: 'Elevation',     href: '/foundations/elevation', icon: Layers2,  desc: 'Z-index stack, layer model and stacking contexts' },
      { label: 'Grid',          href: '/foundations/grid',      icon: Grid2x2,  desc: '12-column layout grid with gutters and breakpoints' },
      { label: 'Icons',         href: '/foundations/icons',     icon: Grid2x2,  desc: 'Lucide icon subset with sizes and stroke weights' },
      { label: 'Motion',        href: '/foundations/motion',    icon: Zap,      desc: 'Duration, easing and animation token reference' },
      { label: 'Shadows',       href: '/foundations/shadows',   icon: Layers,   desc: 'Elevation levels for layering UI' },
      { label: 'Spacing',       href: '/foundations/spacing',   icon: Ruler,    desc: 'Spacing scale from 0 to 96' },
      { label: 'Typography',    href: '/foundations/typography',icon: Type,     desc: 'Typeface, scale, weights & line heights' },
      { label: 'Writing Style', href: '/foundations/writing',   icon: BookOpen, desc: 'Copy rules, capitalization and empty state formulas' },
    ],
  },
  {
    category: 'Components',
    items: [
      { label: 'Accordion',           href: '/components/accordion',         icon: ChevronRight,      desc: 'Collapsible sections for settings and grouped content' },
      { label: 'Avatars',             href: '/components/avatars',           icon: Circle,            desc: 'User avatars, stacks and team icons' },
      { label: 'Badges',              href: '/components/badges',            icon: Circle,            desc: 'Status, priority, label, dot and removable tag variants' },
      { label: 'Breadcrumb',          href: '/components/breadcrumb',        icon: Navigation,        desc: 'Hierarchical path navigation' },
      { label: 'Buttons',             href: '/components/buttons',           icon: Box,               desc: 'Primary, secondary, ghost, split and destructive variants' },
      { label: 'Calendar',            href: '/components/calendar',          icon: Calendar,          desc: 'Date picker, week strip, time grid and range selection' },
      { label: 'Callout',             href: '/components/callout',           icon: AlertCircle,       desc: 'Info, success, warning and error inline banners' },
      { label: 'Checkboxes & Radio',  href: '/components/checkboxes',        icon: CheckSquare,       desc: 'Form selection controls and groups' },
      { label: 'Code Block',          href: '/components/code-block',        icon: Code2,             desc: 'Syntax-styled code display with copy button' },
      { label: 'Drawer',              href: '/components/drawer',            icon: SlidersHorizontal, desc: 'Right, left and bottom sliding panels for detail views and filters' },
      { label: 'Empty States',        href: '/components/empty-states',      icon: FileX,             desc: 'Blank slate patterns with CTA guidance' },
      { label: 'Inputs',              href: '/components/inputs',            icon: FormInput,         desc: 'Text, search, char count, inline action and validation' },
      { label: 'Keyboard Shortcuts',  href: '/components/kbd',               icon: Keyboard,          desc: 'Kbd tags, shortcut hints and combo display' },
      { label: 'Link',                href: '/components/link',              icon: Link2,             desc: 'Text links, external variants and link button' },
      { label: 'Pagination',          href: '/components/pagination',        icon: ArrowUpDown,       desc: 'Page controls with ellipsis and size variants' },
      { label: 'Popover',             href: '/components/popover',           icon: SlidersHorizontal, desc: 'Anchored non-modal overlays for rich previews' },
      { label: 'Progress & Skeleton', href: '/components/progress',          icon: BarChart2,         desc: 'Loading bars, rings and skeleton placeholders' },
      { label: 'Segmented Control',   href: '/components/segmented-control', icon: ToggleLeft,        desc: 'Mutually exclusive option selector for 2–4 choices' },
      { label: 'Selects & Dropdowns', href: '/components/selects',           icon: ChevronRight,      desc: 'Dropdowns, filters and multi-select' },
      { label: 'Slider',              href: '/components/slider',            icon: SlidersHorizontal, desc: 'Range input for numeric values and settings' },
      { label: 'Spinner',             href: '/components/spinner',           icon: Loader2,           desc: 'Indeterminate loading indicator for async operations' },
      { label: 'Stepper',             href: '/components/stepper',           icon: Milestone,         desc: 'Multi-step progress indicator for flows and wizards' },
      { label: 'Tabs',                href: '/components/tabs',              icon: PanelTop,          desc: 'View switcher tabs in underline and pill styles' },
      { label: 'Timeline',            href: '/components/timeline',          icon: List,              desc: 'Vertical activity feed with event type variants' },
      { label: 'Toggles',             href: '/components/toggles',           icon: ToggleLeft,        desc: 'Switch and toggle for boolean settings' },
      { label: 'Tooltips',            href: '/components/tooltips',          icon: Box,               desc: 'Contextual label with optional shortcut hint' },
    ],
  },
  {
    category: 'Data Display',
    items: [
      { label: 'Cycle Cards',       href: '/data/cycles',   icon: Columns3,        desc: 'Sprint progress cards with assignee avatars' },
      { label: 'Grouping Headers',  href: '/data/grouping', icon: List,            desc: 'Sticky section headers for issue lists' },
      { label: 'Issue Rows',        href: '/data/issues',   icon: List,            desc: 'Linear-style issue list items with states' },
      { label: 'Kanban Cards',      href: '/data/kanban',   icon: Kanban,          desc: 'Board view cards across status columns' },
      { label: 'Roadmap / Gantt',   href: '/data/roadmap',  icon: GanttChartSquare,desc: 'Timeline bars, milestones and today marker' },
      { label: 'Status & Priority', href: '/data/status',   icon: Circle,          desc: 'Status icons and priority indicators' },
      { label: 'Tables',            href: '/data/tables',   icon: LayoutDashboard, desc: 'Sortable data tables with row expansion' },
    ],
  },
  {
    category: 'Patterns',
    items: [
      { label: 'Command Palette', href: '/patterns/command',       icon: Command,          desc: '⌘K command menu with search and shortcuts' },
      { label: 'Context Menus',   href: '/patterns/context-menu',  icon: MousePointerClick,desc: 'Right-click and dropdown action menus' },
      { label: 'Drag & Drop',     href: '/patterns/drag-drop',     icon: GripVertical,     desc: 'Drag handles, drop zones and reorder patterns' },
      { label: 'Filters',         href: '/patterns/filters',       icon: Filter,           desc: 'Filter bar with chips and view controls' },
      { label: 'Form Layout',     href: '/patterns/form-layout',   icon: FormInput,        desc: 'Label placement, validation and field composition' },
      { label: 'Inline Editing',  href: '/patterns/inline-editing',icon: Pencil,           desc: 'Click-to-edit fields directly in issue rows' },
      { label: 'Modals',          href: '/patterns/modals',        icon: Box,              desc: 'Dialog, confirm, alert and drawer patterns' },
      { label: 'Navigation',      href: '/patterns/navigation',    icon: LayoutDashboard,  desc: 'Sidebar, header and breadcrumb patterns' },
      { label: 'Onboarding',      href: '/patterns/onboarding',    icon: Sparkles,         desc: 'Coachmarks, progress steps and feature highlights' },
      { label: 'Toasts',          href: '/patterns/toasts',        icon: Bell,             desc: 'Ephemeral feedback and notification toasts' },
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
