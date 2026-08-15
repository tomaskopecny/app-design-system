'use client'

import { DSLayout } from '@/components/ds/ds-layout'
import { DSSection, DSPreview } from '@/components/ds/ds-section'
import { useState } from 'react'
import { GitBranch, Clock, Settings, Users, Zap } from 'lucide-react'

function TabBar({
  tabs,
  active,
  onSelect,
  variant = 'underline',
}: {
  tabs: { label: string; count?: number; icon?: React.ElementType }[]
  active: number
  onSelect: (i: number) => void
  variant?: 'underline' | 'pill' | 'border' | 'ghost'
}) {
  if (variant === 'ghost') {
    return (
      <div className="inline-flex items-center gap-1">
        {tabs.map((tab, i) => {
          const Icon = tab.icon
          return (
            <button
              key={i}
              onClick={() => onSelect(i)}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md transition-colors cursor-pointer
                ${active === i
                  ? 'bg-surface-3 text-foreground'
                  : 'text-muted-foreground hover:text-foreground hover:bg-surface-2'}`}
            >
              {Icon && <Icon className="w-3 h-3" />}
              {tab.label}
              {tab.count !== undefined && (
                <span className={`text-[10px] rounded px-1 py-0.5 leading-none ${active === i ? 'bg-foreground/10 text-foreground' : 'bg-surface-3 text-muted-foreground'}`}>
                  {tab.count}
                </span>
              )}
            </button>
          )
        })}
      </div>
    )
  }

  if (variant === 'pill') {
    return (
      <div className="inline-flex items-center gap-0.5 bg-surface-2 rounded-md p-0.5 border border-border">
        {tabs.map((tab, i) => {
          const Icon = tab.icon
          return (
            <button
              key={i}
              onClick={() => onSelect(i)}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded transition-colors cursor-pointer
                ${active === i
                  ? 'bg-surface-3 text-foreground shadow-sm'
                  : 'text-muted-foreground hover:text-foreground'}`}
            >
              {Icon && <Icon className="w-3 h-3" />}
              {tab.label}
              {tab.count !== undefined && (
                <span className={`text-[10px] rounded px-1 py-0.5 leading-none ${active === i ? 'bg-foreground/10 text-foreground' : 'bg-surface-3 text-muted-foreground'}`}>
                  {tab.count}
                </span>
              )}
            </button>
          )
        })}
      </div>
    )
  }

  if (variant === 'border') {
    return (
      <div className="inline-flex items-center rounded-md overflow-hidden border border-border">
        {tabs.map((tab, i) => (
          <button
            key={i}
            onClick={() => onSelect(i)}
            className={`px-4 py-1.5 text-xs font-medium border-r border-border last:border-r-0 transition-colors cursor-pointer
              ${active === i
                ? 'bg-surface-3 text-foreground'
                : 'bg-surface-1 text-muted-foreground hover:bg-surface-2 hover:text-foreground'}`}
          >
            {tab.label}
          </button>
        ))}
      </div>
    )
  }

  // Underline (default)
  return (
    <div className="flex items-center border-b border-border gap-0">
      {tabs.map((tab, i) => {
        const Icon = tab.icon
        return (
          <button
            key={i}
            onClick={() => onSelect(i)}
            className={`inline-flex items-center gap-1.5 px-3 py-2.5 text-xs font-medium relative transition-colors cursor-pointer -mb-px
              ${active === i
                ? 'text-foreground border-b-2 border-foreground'
                : 'text-muted-foreground hover:text-foreground'}`}
          >
            {Icon && <Icon className="w-3 h-3" />}
            {tab.label}
            {tab.count !== undefined && (
              <span className={`text-[10px] rounded-full px-1.5 py-0.5 leading-none ${active === i ? 'bg-foreground text-background' : 'bg-surface-3 text-muted-foreground'}`}>
                {tab.count}
              </span>
            )}
          </button>
        )
      })}
    </div>
  )
}

const issueTabs = [
  { label: 'All Issues', count: 48 },
  { label: 'Active', count: 12 },
  { label: 'Backlog', count: 24 },
  { label: 'Done', count: 12 },
]

const viewTabs = [
  { label: 'Board', icon: GitBranch },
  { label: 'List', icon: Settings },
  { label: 'Timeline', icon: Clock },
]

const settingsTabs = [
  { label: 'General', icon: Settings },
  { label: 'Members', icon: Users },
  { label: 'Integrations', icon: Zap },
]

const categoryTabs = [
  { label: 'All' },
  { label: 'Layout' },
  { label: 'Forms' },
  { label: 'Navigation' },
  { label: 'Feedback' },
  { label: 'Data' },
]

export default function TabsPage() {
  const [tab1, setTab1] = useState(0)
  const [tab2, setTab2] = useState(0)
  const [tab3, setTab3] = useState(1)
  const [tab4, setTab4] = useState(0)
  const [tab5, setTab5] = useState(0)

  return (
    <DSLayout
      title="Tabs"
      description="Four tab variants for different contexts: underline (primary navigation), pill (compact toggles), border (segmented control), ghost (loose filter lists). All share 12px text and consistent active states."
    >
      <DSSection title="Underline tabs" description="Primary variant for page-level navigation. Active tab gets a 2px bottom border matching the foreground color.">
        <div className="rounded-md border border-border bg-surface-1 overflow-hidden">
          <TabBar tabs={issueTabs} active={tab1} onSelect={setTab1} variant="underline" />
          <div className="px-4 py-6">
            <p className="text-xs text-muted-foreground">{issueTabs[tab1].label} content — {issueTabs[tab1].count} issues</p>
          </div>
        </div>
      </DSSection>

      <DSSection title="Pill tabs" description="Compact pill variant for toolbar-level switches. Sits inside a rounded container with a highlighted active segment.">
        <DSPreview code={`<div className="inline-flex gap-0.5 bg-surface-2 rounded-md p-0.5 border border-border">
  <button className={\`px-3 py-1.5 text-xs rounded \${active ? 'bg-surface-3 text-foreground' : 'text-muted-foreground'}\`}>
    Board
  </button>
</div>`}>
          <div className="flex flex-col gap-3">
            <TabBar tabs={viewTabs} active={tab2} onSelect={setTab2} variant="pill" />
            <TabBar tabs={issueTabs} active={tab4} onSelect={setTab4} variant="pill" />
          </div>
        </DSPreview>
      </DSSection>

      <DSSection title="Border segmented" description="Joined segments with dividers. Used for binary or small-set options like view modes.">
        <DSPreview>
          <TabBar tabs={settingsTabs} active={tab3} onSelect={setTab3} variant="border" />
        </DSPreview>
      </DSSection>

      <DSSection title="Ghost tabs" description="Borderless filter list with generous spacing. Active tab gets a filled rounded background; inactive tabs pick up a lighter background on hover.">
        <DSPreview code={`<div className="inline-flex items-center gap-1">
  <button className={\`px-3 py-1.5 text-xs rounded-md \${active ? 'bg-surface-3 text-foreground' : 'text-muted-foreground hover:bg-surface-2 hover:text-foreground'}\`}>
    All
  </button>
</div>`}>
          <TabBar tabs={categoryTabs} active={tab5} onSelect={setTab5} variant="ghost" />
        </DSPreview>
      </DSSection>

      <DSSection title="Tabs with icons" description="Icons paired with labels for settings and feature navigation.">
        <div className="rounded-md border border-border bg-surface-1 overflow-hidden">
          <TabBar tabs={settingsTabs} active={tab3} onSelect={setTab3} variant="underline" />
          <div className="px-4 py-6">
            <p className="text-xs text-muted-foreground">{settingsTabs[tab3].label} settings panel</p>
          </div>
        </div>
      </DSSection>
    </DSLayout>
  )
}
