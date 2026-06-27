'use client'

import { DSLayout } from '@/components/ds/ds-layout'
import { DSSection, DSPreview } from '@/components/ds/ds-section'
import { useState } from 'react'
import { List, LayoutGrid, GitBranch, AlignLeft, AlignCenter, AlignRight, Moon, Sun, Monitor } from 'lucide-react'

// Base segmented control component
function SegmentedControl<T extends string>({
  options,
  value,
  onChange,
  size = 'md',
}: {
  options: { value: T; label?: string; icon?: React.ElementType; ariaLabel?: string }[]
  value: T
  onChange: (v: T) => void
  size?: 'sm' | 'md'
}) {
  const padding = size === 'sm' ? 'px-2.5 py-1 text-[11px]' : 'px-3 py-1.5 text-xs'
  const iconSize = size === 'sm' ? 'w-3 h-3' : 'w-3.5 h-3.5'

  return (
    <div
      role="group"
      className="inline-flex items-center bg-surface-1 border border-border rounded-md p-0.5 gap-0.5"
    >
      {options.map(opt => {
        const Icon = opt.icon
        const active = opt.value === value
        return (
          <button
            key={opt.value}
            role="radio"
            aria-checked={active}
            aria-label={opt.ariaLabel ?? opt.label}
            onClick={() => onChange(opt.value)}
            className={`inline-flex items-center gap-1.5 rounded-sm font-medium transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring ${padding}
              ${active
                ? 'bg-surface-3 text-foreground shadow-sm'
                : 'text-muted-foreground hover:text-foreground hover:bg-surface-2'
              }`}
          >
            {Icon && <Icon className={iconSize} aria-hidden="true" />}
            {opt.label && <span>{opt.label}</span>}
          </button>
        )
      })}
    </div>
  )
}

export default function SegmentedControlPage() {
  const [view, setView] = useState<'list' | 'board' | 'timeline'>('list')
  const [align, setAlign] = useState<'left' | 'center' | 'right'>('left')
  const [theme, setTheme] = useState<'light' | 'dark' | 'system'>('dark')
  const [period, setPeriod] = useState<'day' | 'week' | 'month' | 'quarter'>('week')

  return (
    <DSLayout
      title="Segmented Control"
      description="A tightly grouped set of 2–5 mutually exclusive options that take immediate effect. Used for view mode switchers, filter toggles, and settings that change the current display."
    >
      <DSSection title="View switcher" description="The primary use case — switching between list, board, and timeline views.">
        <DSPreview>
          <SegmentedControl
            value={view}
            onChange={setView}
            options={[
              { value: 'list', label: 'List', icon: List },
              { value: 'board', label: 'Board', icon: LayoutGrid },
              { value: 'timeline', label: 'Timeline', icon: GitBranch },
            ]}
          />
        </DSPreview>
      </DSSection>

      <DSSection title="Icon only" description="Use icons alone when labels are not necessary and space is constrained. Always include aria-label.">
        <DSPreview>
          <SegmentedControl
            value={align}
            onChange={setAlign}
            options={[
              { value: 'left', icon: AlignLeft, ariaLabel: 'Align left' },
              { value: 'center', icon: AlignCenter, ariaLabel: 'Align center' },
              { value: 'right', icon: AlignRight, ariaLabel: 'Align right' },
            ]}
          />
        </DSPreview>
      </DSSection>

      <DSSection title="Text only" description="When options are short words and no icon is needed.">
        <DSPreview className="[&>div]:gap-4 [&>div]:flex-wrap">
          <SegmentedControl
            value={theme}
            onChange={setTheme}
            options={[
              { value: 'light', label: 'Light', icon: Sun },
              { value: 'dark', label: 'Dark', icon: Moon },
              { value: 'system', label: 'System', icon: Monitor },
            ]}
          />
          <SegmentedControl
            value={period}
            onChange={setPeriod}
            options={[
              { value: 'day', label: 'Day' },
              { value: 'week', label: 'Week' },
              { value: 'month', label: 'Month' },
              { value: 'quarter', label: 'Quarter' },
            ]}
          />
        </DSPreview>
      </DSSection>

      <DSSection title="Small" description="Reduced size for use inside toolbars or compact headers.">
        <DSPreview>
          <SegmentedControl
            size="sm"
            value={view}
            onChange={setView}
            options={[
              { value: 'list', label: 'List', icon: List },
              { value: 'board', label: 'Board', icon: LayoutGrid },
              { value: 'timeline', label: 'Timeline', icon: GitBranch },
            ]}
          />
        </DSPreview>
      </DSSection>

      <DSSection title="vs Tabs" description="How to choose between Segmented Control and Tabs.">
        <div className="rounded-md border border-border overflow-hidden">
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b border-border bg-surface-2">
                <th className="text-left px-4 py-2.5 font-medium text-muted-foreground w-1/3">Attribute</th>
                <th className="text-left px-4 py-2.5 font-medium text-muted-foreground">Segmented Control</th>
                <th className="text-left px-4 py-2.5 font-medium text-muted-foreground">Tabs</th>
              </tr>
            </thead>
            <tbody>
              {[
                ['Effect', 'Immediate — changes current view', 'Navigates to a new panel'],
                ['Options', '2–5', '2–8'],
                ['Layout', 'Inline, compact pill', 'Full-width underline or pill row'],
                ['Content', 'No separate panel', 'Each tab owns a content area'],
                ['Example', 'List / Board / Timeline', 'Issues / Projects / Members'],
              ].map(([attr, seg, tab]) => (
                <tr key={attr} className="border-b border-border last:border-0">
                  <td className="px-4 py-2.5 font-medium text-foreground">{attr}</td>
                  <td className="px-4 py-2.5 text-muted-foreground">{seg}</td>
                  <td className="px-4 py-2.5 text-muted-foreground">{tab}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </DSSection>
    </DSLayout>
  )
}
