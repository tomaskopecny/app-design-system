'use client'

import { DSLayout } from '@/components/ds/ds-layout'
import { DSSection, DSPreview } from '@/components/ds/ds-section'
import { useState } from 'react'

// Fixed: thumb uses oklch white so it's visible on both on/off tracks.
// Off-track: single bg-surface-3 only (no redundant border that shifts thumb offsets).
// On-track: bg-foreground (near-white). Thumb always oklch(1 0 0) so it pops.
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

  // Default: track 36×20, thumb 14×14, gap 3px each side, travel = 36-14-3-3 = 16px
  // Small:   track 28×16, thumb 10×10, gap 3px each side, travel = 28-10-3-3 = 12px
  return (
    <button
      role="switch"
      aria-checked={checked}
      disabled={disabled}
      onClick={onChange}
      className={[
        'relative inline-flex shrink-0 rounded-full transition-colors duration-150',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1 focus-visible:ring-offset-background',
        'cursor-pointer disabled:opacity-35 disabled:pointer-events-none',
        isSmall ? 'w-7 h-4' : 'w-9 h-5',
        checked ? 'bg-foreground' : 'bg-surface-3',
      ].join(' ')}
    >
      <span
        className={[
          'absolute top-1/2 -translate-y-1/2 rounded-full shadow-sm transition-transform duration-150',
          // Thumb is always solid white so it's visible on both dark and light tracks
          isSmall ? 'w-2.5 h-2.5' : 'w-3.5 h-3.5',
          checked
            ? isSmall ? 'translate-x-[14px]' : 'translate-x-[18px]'
            : 'translate-x-[3px]',
        ].join(' ')}
        style={{ backgroundColor: checked ? 'oklch(0.12 0 0)' : 'oklch(0.72 0 0)' }}
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
    // Linear design refresh: separators should be "felt not seen" — use lower-contrast line token
    <div className="flex items-center justify-between gap-6 py-3 border-b border-line last:border-b-0">
      <div className="flex flex-col gap-0.5">
        <span className="text-xs font-medium text-foreground">{label}</span>
        {description && (
          <span className="text-[11px] leading-relaxed text-muted-foreground/70">
            {description}
          </span>
        )}
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
      description="Toggles replace checkboxes for binary on/off settings. Two sizes: default (36×20px) and small (28×16px). The on-state uses bg-foreground; the thumb inverts to stay visible on both tracks."
    >
      <DSSection
        title="States"
        description="Off, on, small variants, and disabled. The thumb color inverts between tracks so it always has sufficient contrast."
      >
        <DSPreview code={`<button
  role="switch"
  aria-checked={checked}
  className={\`relative inline-flex shrink-0 w-9 h-5 rounded-full
    transition-colors duration-150 cursor-pointer
    \${checked ? 'bg-foreground' : 'bg-surface-3'}\`}
>
  <span
    className={\`absolute top-1/2 -translate-y-1/2 w-3.5 h-3.5
      rounded-full shadow-sm transition-transform duration-150
      \${checked ? 'translate-x-[18px]' : 'translate-x-[3px]'}\`}
    style={{ backgroundColor: checked
      ? 'oklch(0.12 0 0)'   // dark thumb on light track
      : 'oklch(0.72 0 0)' }} // mid-gray thumb on dark track
  />
</button>`}>
          <div className="flex items-center gap-8 flex-wrap">
            <div className="flex flex-col items-center gap-2">
              <Toggle checked={false} onChange={() => {}} />
              <span className="text-[10px] text-muted-foreground">Off</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <Toggle checked={true} onChange={() => {}} />
              <span className="text-[10px] text-muted-foreground">On</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <Toggle checked={false} size="sm" onChange={() => {}} />
              <span className="text-[10px] text-muted-foreground">Small off</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <Toggle checked={true} size="sm" onChange={() => {}} />
              <span className="text-[10px] text-muted-foreground">Small on</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <Toggle checked={false} disabled onChange={() => {}} />
              <span className="text-[10px] text-muted-foreground">Disabled</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <Toggle checked={true} disabled onChange={() => {}} />
              <span className="text-[10px] text-muted-foreground">Disabled on</span>
            </div>
          </div>
        </DSPreview>
      </DSSection>

      <DSSection
        title="Settings list"
        description="Toggles paired with labels in a settings list — the primary usage in Linear's preferences panels. Row separators use the lower-contrast line token so structure is felt, not seen."
      >
        <div className="rounded-md border border-border bg-surface-1 px-4 py-1 max-w-md">
          <ToggleRow
            label="Dark mode"
            description="Use the interface in dark mode"
            checked={states.darkMode}
            onChange={() => toggle('darkMode')}
          />
          <ToggleRow
            label="Compact mode"
            description="Reduce spacing in issue lists for higher density"
            checked={states.compactMode}
            onChange={() => toggle('compactMode')}
          />
          <ToggleRow
            label="Show sub-issues"
            description="Display sub-issues nested under parent issues"
            checked={states.showSubIssues}
            onChange={() => toggle('showSubIssues')}
          />
          <ToggleRow
            label="Auto-assign to me"
            description="Automatically assign issues I create to myself"
            checked={states.autoAssign}
            onChange={() => toggle('autoAssign')}
          />
        </div>
      </DSSection>

      <DSSection
        title="Grouped with section heading"
        description="Section headings should recede visually — they orient without competing for attention. Use small uppercase muted text, not a full heading weight."
      >
        <div className="rounded-md border border-border bg-surface-1 overflow-hidden max-w-md">
          {/* Linear refresh: section heading dims further — navigation elements recede */}
          <div className="px-4 py-2 border-b border-line">
            <span className="text-[10px] font-medium uppercase tracking-[0.1em] text-muted-foreground/50">
              Notifications
            </span>
          </div>
          <div className="px-4 py-1">
            <ToggleRow
              label="Push notifications"
              description="Alerts for mentions and assignments"
              checked={states.notifications}
              onChange={() => toggle('notifications')}
            />
            <ToggleRow
              label="Weekly digest"
              description="Summary email every Monday morning"
              checked={states.weeklyDigest}
              onChange={() => toggle('weeklyDigest')}
            />
            <ToggleRow
              label="Two-factor authentication"
              description="Require 2FA on every sign-in"
              checked={states.twoFactor}
              onChange={() => toggle('twoFactor')}
            />
          </div>
        </div>
      </DSSection>

      <DSSection
        title="Inline"
        description="Small toggle used directly inside toolbars, filter bars, or property rows without a container."
      >
        <DSPreview>
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-2">
              <Toggle
                checked={states.showSubIssues}
                size="sm"
                onChange={() => toggle('showSubIssues')}
              />
              <span className="text-xs text-foreground/80">Show sub-issues</span>
            </div>
            <div className="flex items-center gap-2">
              <Toggle
                checked={states.compactMode}
                size="sm"
                onChange={() => toggle('compactMode')}
              />
              <span className="text-xs text-foreground/80">Compact mode</span>
            </div>
          </div>
        </DSPreview>
      </DSSection>
    </DSLayout>
  )
}
