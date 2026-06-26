'use client'

import { DSLayout } from '@/components/ds/ds-layout'
import { DSSection, DSPreview } from '@/components/ds/ds-section'
import { useState } from 'react'

function Toggle({
  checked,
  disabled = false,
  size = 'default',
  onChange,
}: {
  checked: boolean
  disabled?: boolean
  size?: 'sm' | 'default'
  onChange?: () => void
}) {
  const isSmall = size === 'sm'
  return (
    <button
      role="switch"
      aria-checked={checked}
      disabled={disabled}
      onClick={onChange}
      className={`relative rounded-full transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring cursor-pointer disabled:opacity-40 disabled:pointer-events-none
        ${isSmall ? 'w-7 h-4' : 'w-9 h-5'}
        ${checked ? 'bg-foreground' : 'bg-surface-3 border border-border'}`}
    >
      <span className={`absolute top-1/2 -translate-y-1/2 rounded-full bg-background shadow-sm transition-transform
        ${isSmall ? 'w-2.5 h-2.5' : 'w-3.5 h-3.5'}
        ${checked
          ? isSmall ? 'translate-x-[14px]' : 'translate-x-[18px]'
          : 'translate-x-[3px]'
        }`}
      />
    </button>
  )
}

function ToggleRow({
  label,
  description,
  checked,
  disabled = false,
  onChange,
}: {
  label: string
  description?: string
  checked: boolean
  disabled?: boolean
  onChange: () => void
}) {
  return (
    <div className="flex items-center justify-between gap-6 py-3 border-b border-border last:border-b-0">
      <div className="flex flex-col">
        <span className="text-xs font-medium text-foreground">{label}</span>
        {description && <span className="text-[11px] text-muted-foreground mt-0.5">{description}</span>}
      </div>
      <Toggle checked={checked} disabled={disabled} onChange={onChange} />
    </div>
  )
}

export default function TogglesPage() {
  const [states, setStates] = useState({
    darkMode: true,
    compactMode: false,
    showSubIssues: true,
    autoAssign: false,
    notifications: true,
    weeklyDigest: false,
    twoFactor: false,
  })

  const toggle = (key: keyof typeof states) =>
    setStates(s => ({ ...s, [key]: !s[key] }))

  return (
    <DSLayout
      title="Toggle / Switch"
      description="Toggles replace checkboxes for on/off settings. Two sizes: default (36×20px) and small (28×16px). Active state uses the primary foreground color."
    >
      <DSSection title="States" description="Default, checked, small, and disabled.">
        <DSPreview code={`<button role="switch" aria-checked={checked}
  className={\`w-9 h-5 rounded-full transition-colors
    \${checked ? 'bg-foreground' : 'bg-surface-3 border border-border'}\`}>
  <span className={\`absolute ... transition-transform
    \${checked ? 'translate-x-[18px]' : 'translate-x-[3px]'}\`} />
</button>`}>
          <div className="flex items-center gap-6 flex-wrap">
            <div className="flex flex-col items-center gap-1.5">
              <Toggle checked={false} onChange={() => {}} />
              <span className="text-[10px] text-muted-foreground">Off</span>
            </div>
            <div className="flex flex-col items-center gap-1.5">
              <Toggle checked={true} onChange={() => {}} />
              <span className="text-[10px] text-muted-foreground">On</span>
            </div>
            <div className="flex flex-col items-center gap-1.5">
              <Toggle checked={false} size="sm" onChange={() => {}} />
              <span className="text-[10px] text-muted-foreground">Small off</span>
            </div>
            <div className="flex flex-col items-center gap-1.5">
              <Toggle checked={true} size="sm" onChange={() => {}} />
              <span className="text-[10px] text-muted-foreground">Small on</span>
            </div>
            <div className="flex flex-col items-center gap-1.5">
              <Toggle checked={false} disabled onChange={() => {}} />
              <span className="text-[10px] text-muted-foreground">Disabled</span>
            </div>
            <div className="flex flex-col items-center gap-1.5">
              <Toggle checked={true} disabled onChange={() => {}} />
              <span className="text-[10px] text-muted-foreground">Disabled on</span>
            </div>
          </div>
        </DSPreview>
      </DSSection>

      <DSSection title="Settings list pattern" description="Toggles paired with labels in a list — the most common usage in Linear's preferences panels.">
        <div className="rounded-md border border-border bg-surface-1 px-4 py-1">
          <ToggleRow label="Dark mode" description="Use Linear in dark mode" checked={states.darkMode} onChange={() => toggle('darkMode')} />
          <ToggleRow label="Compact mode" description="Reduce spacing in issue lists for higher density" checked={states.compactMode} onChange={() => toggle('compactMode')} />
          <ToggleRow label="Show sub-issues" description="Display sub-issues nested under parent issues" checked={states.showSubIssues} onChange={() => toggle('showSubIssues')} />
          <ToggleRow label="Auto-assign to me" description="Automatically assign issues I create to myself" checked={states.autoAssign} onChange={() => toggle('autoAssign')} />
        </div>
      </DSSection>

      <DSSection title="Notification settings" description="Grouped toggles with section heading, a common pattern in settings pages.">
        <div className="rounded-md border border-border bg-surface-1 overflow-hidden">
          <div className="px-4 py-2.5 border-b border-border bg-surface-2">
            <span className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground/60">Notifications</span>
          </div>
          <div className="px-4 py-1">
            <ToggleRow label="Push notifications" description="Alerts for mentions and assignments" checked={states.notifications} onChange={() => toggle('notifications')} />
            <ToggleRow label="Weekly digest" description="Summary email every Monday morning" checked={states.weeklyDigest} onChange={() => toggle('weeklyDigest')} />
            <ToggleRow label="Two-factor auth" description="Require 2FA on every sign-in" checked={states.twoFactor} onChange={() => toggle('twoFactor')} />
          </div>
        </div>
      </DSSection>

      <DSSection title="Inline toggle" description="Small toggle used directly in toolbars or issue property rows.">
        <DSPreview>
          <div className="flex items-center gap-2">
            <Toggle checked={states.showSubIssues} size="sm" onChange={() => toggle('showSubIssues')} />
            <span className="text-xs text-muted-foreground">Show sub-issues</span>
          </div>
        </DSPreview>
      </DSSection>
    </DSLayout>
  )
}
