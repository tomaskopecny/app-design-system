'use client'

import { DSLayout } from '@/components/ds/ds-layout'
import { DSSection } from '@/components/ds/ds-section'
import { useState } from 'react'
import {
  Hash, Layers, GitBranch, FileText, Settings, Bell, ChevronDown,
  ChevronRight, Plus, Circle, Inbox, BarChart2, Users, Zap,
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
          <span className="text-sm font-medium text-foreground truncate flex-1 text-left">Linear Corp</span>
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
            <span>Linear Corp</span>
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
  const crumbs = ['Linear Corp', 'Engineering', 'Issues', 'ENG-2451']
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

export default function NavigationPage() {
  return (
    <DSLayout
      title="Navigation"
      description="Linear uses a fixed left sidebar for primary navigation, a top breadcrumb bar for location context, and a tab bar for secondary navigation within a section."
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
