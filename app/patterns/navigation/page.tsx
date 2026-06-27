'use client'

import { DSLayout } from '@/components/ds/ds-layout'
import { DSSection } from '@/components/ds/ds-section'
import { useState } from 'react'
import {
  Hash, Layers, GitBranch, FileText, Settings, Bell, ChevronDown,
  ChevronRight, Plus, Circle, Inbox, BarChart2, Users, Zap, Menu, X,
  ArrowRight, Cpu, GitPullRequest, BarChart, Puzzle, Lightbulb, Target,
} from 'lucide-react'
import { cn } from '@/lib/utils'

const teams = [
  { name: 'Engineering', color: '#4D8EE8', items: ['ENG-2451', 'ENG-2449'] },
  { name: 'Design',      color: '#9B6DFF', items: [] },
]

function SidebarDemo() {
  const [activeItem, setActiveItem] = useState('my-issues')
  const [expandedTeam, setExpandedTeam] = useState('Engineering')

  const navItems = [
    { id: 'inbox',     label: 'Inbox',      icon: Inbox,    count: 3 },
    { id: 'my-issues', label: 'My Issues',  icon: Hash },
    { id: 'projects',  label: 'Projects',   icon: Layers },
    { id: 'cycles',    label: 'Cycles',     icon: GitBranch },
    { id: 'views',     label: 'Views',      icon: BarChart2 },
    { id: 'docs',      label: 'Docs',       icon: FileText },
  ]

  return (
    <div className="flex h-[400px] rounded-lg border border-border overflow-hidden">
      {/* Sidebar */}
      <aside className="w-52 bg-sidebar border-r border-sidebar-border flex flex-col shrink-0">
        {/* Workspace header */}
        <button className="flex items-center gap-2.5 px-3 py-3 hover:bg-sidebar-accent/50 transition-colors border-b border-sidebar-border">
          <div className="w-5 h-5 rounded-[4px] bg-foreground flex items-center justify-center shrink-0">
            <span className="text-[9px] font-black text-background leading-none">L</span>
          </div>
          <span className="text-sm font-medium text-foreground truncate flex-1 text-left">App Corp</span>
          <ChevronDown className="w-3.5 h-3.5 text-muted-foreground shrink-0" />
        </button>

        <nav className="flex-1 overflow-y-auto py-2">
          {/* Main nav */}
          {navItems.map((item) => {
            const Icon = item.icon
            const active = activeItem === item.id
            return (
              <button
                key={item.id}
                onClick={() => setActiveItem(item.id)}
                className={cn(
                  'w-full flex items-center gap-2 px-3 py-1.5 text-sm transition-colors cursor-pointer',
                  active
                    ? 'bg-sidebar-accent text-foreground'
                    : 'text-sidebar-foreground hover:bg-sidebar-accent/50 hover:text-foreground'
                )}
              >
                <Icon className="w-3.5 h-3.5 shrink-0 opacity-70" />
                <span className="flex-1 text-left text-[13px]">{item.label}</span>
                {item.count && (
                  <span className="text-[10px] font-mono font-medium text-muted-foreground bg-surface-3 px-1.5 py-0.5 rounded">
                    {item.count}
                  </span>
                )}
              </button>
            )
          })}

          {/* Teams */}
          <div className="mt-3">
            <div className="flex items-center justify-between px-3 py-1 mb-0.5">
              <p className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground/50 select-none">
                Teams
              </p>
              <button className="text-muted-foreground/50 hover:text-muted-foreground transition-colors cursor-pointer">
                <Plus className="w-3 h-3" />
              </button>
            </div>

            {teams.map((team) => {
              const expanded = expandedTeam === team.name
              return (
                <div key={team.name}>
                  <button
                    onClick={() => setExpandedTeam(expanded ? '' : team.name)}
                    className="w-full flex items-center gap-2 px-3 py-1.5 text-sm text-sidebar-foreground hover:bg-sidebar-accent/50 hover:text-foreground transition-colors cursor-pointer"
                  >
                    <ChevronRight className={cn('w-3 h-3 text-muted-foreground/50 transition-transform shrink-0', expanded && 'rotate-90')} />
                    <div className="w-4 h-4 rounded flex items-center justify-center shrink-0" style={{ background: team.color }}>
                      <span className="text-[8px] font-bold text-white">{team.name[0]}</span>
                    </div>
                    <span className="text-[13px] flex-1 text-left">{team.name}</span>
                  </button>

                  {expanded && (
                    <div className="ml-3 border-l border-sidebar-border pl-2 py-0.5">
                      {[
                        { id: `${team.name}-issues`, label: 'Issues', icon: Hash },
                        { id: `${team.name}-cycles`, label: 'Cycles', icon: GitBranch },
                        { id: `${team.name}-members`, label: 'Members', icon: Users },
                      ].map((sub) => {
                        const SubIcon = sub.icon
                        const active = activeItem === sub.id
                        return (
                          <button
                            key={sub.id}
                            onClick={() => setActiveItem(sub.id)}
                            className={cn(
                              'w-full flex items-center gap-2 px-2 py-1 text-[13px] rounded transition-colors cursor-pointer',
                              active
                                ? 'bg-sidebar-accent text-foreground'
                                : 'text-sidebar-foreground/70 hover:text-foreground hover:bg-sidebar-accent/40'
                            )}
                          >
                            <SubIcon className="w-3 h-3 shrink-0 opacity-60" />
                            {sub.label}
                          </button>
                        )
                      })}
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </nav>

        {/* Bottom */}
        <div className="flex items-center gap-1 px-3 py-2.5 border-t border-sidebar-border">
          <button className="flex-1 flex items-center gap-2 py-1 text-muted-foreground hover:text-foreground transition-colors cursor-pointer">
            <Settings className="w-3.5 h-3.5" />
            <span className="text-[12px]">Settings</span>
          </button>
          <button className="relative text-muted-foreground hover:text-foreground transition-colors cursor-pointer p-1">
            <Bell className="w-3.5 h-3.5" />
            <span className="absolute top-0.5 right-0.5 w-1.5 h-1.5 rounded-full bg-[#E5534B]" />
          </button>
        </div>
      </aside>

      {/* Main content placeholder */}
      <div className="flex-1 bg-background flex flex-col">
        {/* Top bar */}
        <div className="flex items-center gap-3 px-4 py-2.5 border-b border-border">
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <span>App Corp</span>
            <ChevronRight className="w-3 h-3" />
            <span className="text-foreground font-medium capitalize">{activeItem.replace('-', ' ')}</span>
          </div>
          <div className="ml-auto flex items-center gap-2">
            <button className="inline-flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium rounded-md bg-foreground text-background hover:bg-foreground/90 transition-colors cursor-pointer">
              <Plus className="w-3 h-3" />
              New issue
            </button>
          </div>
        </div>

        {/* Body */}
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center space-y-2">
            <Circle className="w-8 h-8 text-muted-foreground/20 mx-auto" />
            <p className="text-sm font-medium text-foreground capitalize">{activeItem.replace('-', ' ')}</p>
            <p className="text-xs text-muted-foreground">Select a page from the sidebar</p>
          </div>
        </div>
      </div>
    </div>
  )
}

function BreadcrumbDemo() {
  const crumbs = ['App Corp', 'Engineering', 'Issues', 'ENG-2451']
  return (
    <div className="flex items-center gap-1 px-4 py-2.5 border border-border rounded-md bg-surface-1">
      {crumbs.map((crumb, i) => (
        <div key={crumb} className="flex items-center gap-1">
          {i > 0 && <ChevronRight className="w-3 h-3 text-muted-foreground/40" />}
          <button className={cn(
            'text-xs transition-colors cursor-pointer',
            i === crumbs.length - 1
              ? 'text-foreground font-medium'
              : 'text-muted-foreground hover:text-foreground'
          )}>
            {crumb}
          </button>
        </div>
      ))}
    </div>
  )
}

function TabBarDemo() {
  const [active, setActive] = useState('issues')
  const tabs = [
    { id: 'issues',   label: 'Issues',   count: 24 },
    { id: 'projects', label: 'Projects', count: 4 },
    { id: 'cycles',   label: 'Cycles',   count: 2 },
    { id: 'members',  label: 'Members',  count: 8 },
    { id: 'settings', label: 'Settings', count: null },
  ]

  return (
    <div className="border border-border rounded-md overflow-hidden">
      <div className="flex items-center border-b border-border bg-surface-1">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActive(tab.id)}
            className={cn(
              'flex items-center gap-1.5 px-4 py-2.5 text-sm transition-colors cursor-pointer border-b-2 -mb-px',
              active === tab.id
                ? 'border-foreground text-foreground font-medium'
                : 'border-transparent text-muted-foreground hover:text-foreground'
            )}
          >
            {tab.label}
            {tab.count !== null && (
              <span className={cn(
                'text-[10px] font-mono px-1.5 py-0.5 rounded',
                active === tab.id
                  ? 'bg-surface-3 text-foreground'
                  : 'bg-surface-2 text-muted-foreground'
              )}>
                {tab.count}
              </span>
            )}
          </button>
        ))}
      </div>
      <div className="px-4 py-6 bg-background text-center">
        <p className="text-xs text-muted-foreground capitalize">{active} content area</p>
      </div>
    </div>
  )
}

// ---------------------------------------------------------------------------
// Marketing top nav
// ---------------------------------------------------------------------------

const MEGA_ITEMS = [
  { label: 'Intake',        desc: 'Make your product operations self-driving',     icon: Lightbulb },
  { label: 'Plan',          desc: 'Plan and navigate from idea to launch',          icon: Target },
  { label: 'Build',         desc: 'Move work forward across teams and agents',      icon: Cpu },
  { label: 'Diffs',         desc: 'Make code review effortless',                    icon: GitPullRequest },
  { label: 'Monitor',       desc: 'Understand progress at scale',                   icon: BarChart },
  { label: 'Integrations',  desc: 'Collaborate across tools',                       icon: Puzzle },
]

const TOP_NAV_LINKS = ['Product', 'Resources', 'Customers', 'Pricing', 'Now', 'Contact']

function MarketingNav({ align = 'right' }: { align?: 'left' | 'center' | 'right' }) {
  const [activeMenu, setActiveMenu] = useState<string | null>(null)
  const [mobileOpen, setMobileOpen] = useState(false)

  const Logo = () => (
    <div className="flex items-center gap-2 shrink-0 select-none">
      <div className="w-5 h-5 rounded-[4px] bg-foreground flex items-center justify-center">
        <span className="text-[9px] font-black text-background leading-none">A</span>
      </div>
      <span className="text-sm font-semibold text-foreground">App System</span>
    </div>
  )

  const NavLinks = ({ className = '' }: { className?: string }) => (
    <div className={cn('flex items-center gap-0.5', className)}>
      {TOP_NAV_LINKS.map((link) => {
        const hasMega = link === 'Product'
        const isActive = link === 'Product'
        return (
          <button
            key={link}
            onMouseEnter={() => hasMega ? setActiveMenu(link) : setActiveMenu(null)}
            onMouseLeave={() => setActiveMenu(null)}
            className={cn(
              'relative flex items-center gap-0.5 px-3 py-1.5 text-[13px] rounded-full transition-colors cursor-pointer',
              isActive
                ? 'bg-surface-3 text-foreground font-medium'
                : 'text-muted-foreground hover:text-foreground'
            )}
          >
            {link}
            {hasMega && <ChevronDown className="w-3 h-3 opacity-60" />}

            {/* Mega menu */}
            {hasMega && activeMenu === link && (
              <div
                className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-[560px] bg-popover border border-border rounded-xl shadow-xl overflow-hidden z-50"
                onMouseEnter={() => setActiveMenu(link)}
                onMouseLeave={() => setActiveMenu(null)}
              >
                <div className="grid grid-cols-3 gap-px bg-border/30 p-1">
                  {MEGA_ITEMS.map(({ label, desc, icon: Icon }) => (
                    <button
                      key={label}
                      className="flex flex-col gap-1 px-4 py-3.5 rounded-lg bg-popover hover:bg-accent/60 text-left transition-colors cursor-pointer"
                    >
                      <span className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider flex items-center gap-1.5">
                        <Icon className="w-3 h-3" />
                        {label}
                      </span>
                      <span className="text-[13px] font-medium text-foreground leading-snug">{desc}</span>
                    </button>
                  ))}
                </div>
                {/* Footer strip */}
                <div className="flex items-center justify-between px-5 py-3 border-t border-border bg-surface-1">
                  <span className="text-[12px] text-muted-foreground">
                    <span className="text-foreground font-medium">New:</span> Agent assisted project updates
                  </span>
                  <button className="text-[12px] font-medium text-[var(--blue-400)] hover:text-[var(--blue-300)] flex items-center gap-1 cursor-pointer">
                    Changelog <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            )}
          </button>
        )
      })}
    </div>
  )

  const AuthButtons = ({ className = '' }: { className?: string }) => (
    <div className={cn('flex items-center gap-2', className)}>
      <button className="text-[13px] text-muted-foreground hover:text-foreground transition-colors cursor-pointer px-2">
        Log in
      </button>
      <button className="px-3.5 py-1.5 text-[13px] font-medium rounded-full bg-foreground text-background hover:bg-foreground/90 transition-colors cursor-pointer whitespace-nowrap">
        Sign up
      </button>
    </div>
  )

  return (
    <div className="rounded-xl border border-border overflow-hidden bg-background">
      {/* Desktop nav */}
      <div className="hidden sm:flex items-center gap-4 px-5 py-3 relative">
        {/* Left-aligned */}
        {align === 'left' && (
          <>
            <Logo />
            <NavLinks className="ml-2" />
            <div className="flex-1" />
            <AuthButtons />
          </>
        )}

        {/* Center-aligned */}
        {align === 'center' && (
          <>
            <Logo />
            <div className="flex-1" />
            <NavLinks />
            <div className="flex-1" />
            <AuthButtons />
          </>
        )}

        {/* Right-aligned — logo left, links + buttons pushed right */}
        {align === 'right' && (
          <>
            <Logo />
            <div className="flex-1" />
            <NavLinks />
            <AuthButtons className="ml-4" />
          </>
        )}
      </div>

      {/* Mobile nav */}
      <div className="flex sm:hidden items-center justify-between px-4 py-3">
        <Logo />
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
          className="w-8 h-8 flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
        >
          {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="sm:hidden border-t border-border bg-background divide-y divide-border">
          {TOP_NAV_LINKS.map(link => (
            <button
              key={link}
              className="w-full flex items-center justify-between px-4 py-3 text-[14px] text-foreground hover:bg-accent transition-colors cursor-pointer"
            >
              {link}
              <ChevronRight className="w-4 h-4 text-muted-foreground/50" />
            </button>
          ))}
          <div className="flex gap-3 px-4 py-4">
            <button className="flex-1 py-2 text-sm text-center text-foreground border border-border rounded-md hover:bg-accent transition-colors cursor-pointer">
              Log in
            </button>
            <button className="flex-1 py-2 text-sm text-center bg-foreground text-background rounded-md hover:bg-foreground/90 transition-colors cursor-pointer font-medium">
              Sign up
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

// Hamburger-only demo (forced narrow)
function HamburgerDemo() {
  const [open, setOpen] = useState(false)
  return (
    <div className="rounded-xl border border-border overflow-hidden bg-background max-w-xs">
      <div className="flex items-center justify-between px-4 py-3">
        <div className="flex items-center gap-2 select-none">
          <div className="w-5 h-5 rounded-[4px] bg-foreground flex items-center justify-center">
            <span className="text-[9px] font-black text-background leading-none">A</span>
          </div>
          <span className="text-sm font-semibold text-foreground">App System</span>
        </div>
        <button
          onClick={() => setOpen(!open)}
          aria-label={open ? 'Close menu' : 'Open menu'}
          className="w-8 h-8 flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
        >
          {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {open && (
        <div className="border-t border-border divide-y divide-border">
          {TOP_NAV_LINKS.map(link => (
            <button
              key={link}
              className="w-full flex items-center justify-between px-4 py-3 text-[14px] text-foreground hover:bg-accent transition-colors cursor-pointer"
            >
              {link}
              <ChevronRight className="w-4 h-4 text-muted-foreground/50" />
            </button>
          ))}
          <div className="flex gap-3 px-4 py-4">
            <button className="flex-1 py-2 text-sm text-center text-foreground border border-border rounded-md hover:bg-accent transition-colors cursor-pointer">
              Log in
            </button>
            <button className="flex-1 py-2 text-sm text-center bg-foreground text-background rounded-md hover:bg-foreground/90 transition-colors cursor-pointer font-medium">
              Sign up
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

// ─── Collapsible Side Nav ─────────────────────────────────────────────────────
const sideNavItems = [
  { id: 'faults',   label: 'Faults & Outages',  icon: Bell,        badge: false },
  { id: 'clients',  label: 'Clients',            icon: Users,       badge: false },
  {
    id: 'apps', label: 'Applications', icon: Puzzle, badge: true,
    children: [
      { id: 'app-cats',  label: 'App Categories' },
      { id: 'subapps',   label: 'Sub-applications' },
      { id: 'subitem',   label: 'Sub-item' },
    ],
  },
  { id: 'infra',    label: 'Infrastructure',     icon: Cpu,         badge: false },
  { id: 'changes',  label: 'IT Changes',         icon: GitPullRequest, badge: false },
  { id: 'contacts', label: 'Contacts',           icon: Users,       badge: false },
  { id: 'docs',     label: 'Documents',          icon: FileText,    badge: false },
]

function CollapsibleSideNav() {
  const [collapsed, setCollapsed] = useState(false)
  const [activeItem, setActiveItem] = useState('subapps')
  const [expanded, setExpanded]   = useState<string | null>('apps')
  const [tooltip, setTooltip]     = useState<string | null>(null)

  return (
    <div className="flex gap-6 items-start">
      {/* The nav itself */}
      <nav
        className={cn(
          'relative flex flex-col bg-sidebar border border-sidebar-border rounded-lg transition-all duration-200',
          collapsed ? 'w-14' : 'w-56',
        )}
        style={{ minHeight: 420 }}
      >
        {/* Logo */}
        <div className="flex items-center justify-center h-14 border-b border-sidebar-border shrink-0">
          <div className="w-8 h-8 rounded-md bg-foreground flex items-center justify-center shrink-0">
            <span className="text-[11px] font-black text-background leading-none">A</span>
          </div>
        </div>

        {/* Nav items */}
        <div className="flex-1 overflow-y-auto overflow-x-visible py-2">
          {sideNavItems.map((item) => {
            const Icon = item.icon
            const isActive   = activeItem === item.id || item.children?.some(c => c.id === activeItem)
            const isExpanded = expanded === item.id
            const hasChildren = !!item.children

            return (
              <div key={item.id}>
                <div className="relative">
                  <button
                    onClick={() => {
                      if (hasChildren) {
                        setExpanded(isExpanded ? null : item.id)
                      } else {
                        setActiveItem(item.id)
                        setExpanded(null)
                      }
                    }}
                    onMouseEnter={() => collapsed && setTooltip(item.id)}
                    onMouseLeave={() => setTooltip(null)}
                    className={cn(
                      'w-full flex items-center gap-3 transition-colors touch-manipulation active:opacity-70',
                      collapsed ? 'justify-center px-0 py-3' : 'px-3 py-2.5',
                      isActive
                        ? 'text-foreground'
                        : 'text-muted-foreground hover:text-foreground',
                    )}
                  >
                    {/* Icon with optional active circle */}
                    <span className={cn(
                      'relative flex items-center justify-center w-8 h-8 rounded-full shrink-0 transition-colors',
                      isActive ? 'bg-muted' : '',
                    )}>
                      <Icon className="w-4 h-4" strokeWidth={1.5} />
                      {item.badge && (
                        <span className="absolute top-1 right-1 w-1.5 h-1.5 rounded-full bg-destructive" />
                      )}
                    </span>

                    {/* Label + chevron */}
                    {!collapsed && (
                      <>
                        <span className="flex-1 text-sm text-left">{item.label}</span>
                        {hasChildren && (
                          <ChevronDown
                            className={cn(
                              'w-3.5 h-3.5 shrink-0 transition-transform duration-150',
                              isExpanded ? 'rotate-180' : '',
                            )}
                          />
                        )}
                      </>
                    )}
                  </button>

                  {/* Tooltip when collapsed */}
                  {collapsed && tooltip === item.id && (
                    <div className="absolute left-[calc(100%+8px)] top-1/2 -translate-y-1/2 z-50 pointer-events-none">
                      <div className="bg-foreground text-background text-xs font-medium px-2.5 py-1 rounded-full whitespace-nowrap">
                        {item.label}
                      </div>
                    </div>
                  )}
                </div>

                {/* Sub-items accordion */}
                {!collapsed && hasChildren && isExpanded && (
                  <div className="pl-11 pb-1">
                    {item.children!.map((child) => (
                      <button
                        key={child.id}
                        onClick={() => setActiveItem(child.id)}
                        className={cn(
                          'w-full text-left px-3 py-2.5 text-sm rounded-md transition-colors touch-manipulation active:opacity-70',
                          activeItem === child.id
                            ? 'bg-muted text-foreground font-medium'
                            : 'text-muted-foreground hover:text-foreground hover:bg-sidebar-accent/50',
                        )}
                      >
                        {child.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )
          })}
        </div>

        {/* Collapse toggle */}
        <div className="border-t border-sidebar-border">
          <button
            onClick={() => { setCollapsed(c => !c); setTooltip(null) }}
            className={cn(
              'w-full flex items-center py-3 text-muted-foreground hover:text-foreground transition-colors touch-manipulation active:opacity-70',
              collapsed ? 'justify-center' : 'px-4 gap-2',
            )}
          >
            <ChevronRight
              className={cn(
                'w-4 h-4 transition-transform duration-200',
                !collapsed ? 'rotate-180' : '',
              )}
            />
            {!collapsed && <span className="text-xs">Collapse</span>}
          </button>
        </div>
      </nav>

      {/* Interaction hint */}
      <div className="text-xs text-muted-foreground mt-4 space-y-1 leading-relaxed">
        <p className="font-medium text-foreground">Try it:</p>
        <p>Click items to set active state.</p>
        <p>Click &quot;Applications&quot; to expand sub-nav.</p>
        <p>Use the bottom arrow to collapse.</p>
        <p>Hover icons in collapsed mode to see tooltips.</p>
      </div>
    </div>
  )
}

export default function NavigationPage() {
  return (
    <DSLayout
      title="Navigation"
      description="Fixed left sidebar for primary navigation, a top breadcrumb bar for location context, and a tab bar for secondary navigation within a section."
    >
      <DSSection
        title="Sidebar"
        description="Interactive sidebar with workspace switcher, main nav, team sub-nav, and bottom utility bar. Click items and team names to interact."
      >
        <SidebarDemo />
      </DSSection>

      <DSSection
        title="Breadcrumb"
        description="Hierarchical path shown in the top bar. Clickable for each level except the current page."
      >
        <BreadcrumbDemo />
      </DSSection>

      <DSSection
        title="Tab bar"
        description="Secondary navigation within a section. Active tab has a 2px bottom border in --foreground. Click tabs to switch."
      >
        <TabBarDemo />
      </DSSection>

      <DSSection
        title="Marketing top nav — links left"
        description="Logo and nav links left-aligned, auth CTAs pushed to the right. Hover 'Product' to reveal the mega-menu with a 3-column grid of sub-items and a changelog footer strip. On mobile, the nav collapses to a hamburger."
      >
        <MarketingNav align="left" />
      </DSSection>

      <DSSection
        title="Marketing top nav — links center"
        description="Logo anchored left, nav links centered in the remaining space, auth CTAs right. The most balanced layout for marketing sites with 5–7 top-level links."
      >
        <MarketingNav align="center" />
      </DSSection>

      <DSSection
        title="Marketing top nav — links right"
        description="Logo anchored left, nav links and auth CTAs pushed to the right side of the bar. Same element order as the other variants — logo → links → buttons — just with the weight shifted right."
      >
        <MarketingNav align="right" />
      </DSSection>

      <DSSection
        title="Hamburger / mobile nav"
        description="Collapsed to a single icon button at narrow viewports. Clicking opens a full-width stacked link list with Log in and Sign up CTAs at the bottom."
      >
        <HamburgerDemo />
      </DSSection>

      <DSSection
        title="Collapsible side nav"
        description="Icon-only collapsed mode with pill tooltips on hover, expand/collapse toggle at the bottom, and inline accordion sub-navigation. Active items get a circular background on the icon. Click items and the bottom arrow to interact."
      >
        <CollapsibleSideNav />
      </DSSection>

      <DSSection title="Sidebar spec">
        <div className="rounded-md border border-border overflow-hidden">
          <div className="grid grid-cols-[160px_1fr] px-4 py-2.5 bg-surface-2 border-b border-border gap-4">
            <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">Property</p>
            <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">Value</p>
          </div>
          {[
            ['Width',         'w-52 (208px) · fixed · never resizable in base pattern'],
            ['Background',    'bg-sidebar (#0E0E10) · slightly darker than bg-background'],
            ['Active item',   'bg-sidebar-accent · text-foreground · no left border accent (unlike VS Code)'],
            ['Icon size',     'w-3.5 h-3.5 (14px) · opacity-70 on idle · full opacity when active'],
            ['Nav item height','py-1.5 (28–32px total) · compact and dense'],
            ['Section label', '10px uppercase tracking-widest · text-muted-foreground/50 · select-none'],
            ['Team expand',   'ChevronRight rotates 90° on expand · border-l indent for sub-items'],
            ['Bottom bar',    'border-t border-sidebar-border · Settings + Notifications'],
          ].map(([prop, val]) => (
            <div key={prop} className="grid grid-cols-[160px_1fr] px-4 py-2.5 border-b border-border last:border-0 bg-surface-1 gap-4 items-start">
              <code className="text-xs font-mono text-foreground">{prop}</code>
              <p className="text-xs text-muted-foreground">{val}</p>
            </div>
          ))}
        </div>
      </DSSection>
    </DSLayout>
  )
}
