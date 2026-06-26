'use client'

import { DSLayout } from '@/components/ds/ds-layout'
import { DSSection, DSPreview } from '@/components/ds/ds-section'
import { useState } from 'react'
import { Check, Minus } from 'lucide-react'

function Checkbox({
  checked,
  indeterminate = false,
  disabled = false,
  label,
  description,
  onChange,
}: {
  checked: boolean
  indeterminate?: boolean
  disabled?: boolean
  label?: string
  description?: string
  onChange?: () => void
}) {
  return (
    <label className={`flex items-start gap-2.5 cursor-pointer group ${disabled ? 'opacity-40 pointer-events-none' : ''}`}>
      <div
        role="checkbox"
        aria-checked={indeterminate ? 'mixed' : checked}
        tabIndex={0}
        onClick={onChange}
        onKeyDown={(e) => { if (e.key === ' ' || e.key === 'Enter') { e.preventDefault(); onChange?.() } }}
        className={`mt-0.5 w-3.5 h-3.5 rounded-[3px] border flex items-center justify-center shrink-0 transition-colors cursor-pointer
          ${checked || indeterminate
            ? 'bg-foreground border-foreground'
            : 'bg-transparent border-border group-hover:border-muted-foreground'
          }`}
      >
        {indeterminate
          ? <Minus className="w-2.5 h-2.5 text-background stroke-[3]" />
          : checked
            ? <Check className="w-2.5 h-2.5 text-background stroke-[3]" />
            : null
        }
      </div>
      {label && (
        <div className="flex flex-col">
          <span className="text-xs text-foreground leading-relaxed">{label}</span>
          {description && <span className="text-[11px] text-muted-foreground">{description}</span>}
        </div>
      )}
    </label>
  )
}

function Radio({
  checked,
  disabled = false,
  label,
  description,
  onChange,
}: {
  checked: boolean
  disabled?: boolean
  label?: string
  description?: string
  onChange?: () => void
}) {
  return (
    <label className={`flex items-start gap-2.5 cursor-pointer group ${disabled ? 'opacity-40 pointer-events-none' : ''}`}>
      <div
        role="radio"
        aria-checked={checked}
        tabIndex={0}
        onClick={onChange}
        onKeyDown={(e) => { if (e.key === ' ' || e.key === 'Enter') { e.preventDefault(); onChange?.() } }}
        className={`mt-0.5 w-3.5 h-3.5 rounded-full border flex items-center justify-center shrink-0 transition-colors cursor-pointer
          ${checked
            ? 'border-foreground'
            : 'border-border group-hover:border-muted-foreground'
          }`}
      >
        {checked && <div className="w-1.5 h-1.5 rounded-full bg-foreground" />}
      </div>
      {label && (
        <div className="flex flex-col">
          <span className="text-xs text-foreground leading-relaxed">{label}</span>
          {description && <span className="text-[11px] text-muted-foreground">{description}</span>}
        </div>
      )}
    </label>
  )
}

export default function CheckboxesPage() {
  const [items, setItems] = useState([false, true, false, false])
  const [radio, setRadio] = useState(0)
  const [notifications, setNotifications] = useState({ email: true, slack: false, mobile: true })

  const allChecked = items.every(Boolean)
  const someChecked = items.some(Boolean) && !allChecked
  const toggleAll = () => setItems(items.map(() => !allChecked))

  return (
    <DSLayout
      title="Checkboxes & Radio"
      description="Custom-styled checkboxes and radios that match Linear's compact form aesthetic. All 14×14px, 3px radius for checkboxes, fully circular for radios."
    >
      <DSSection title="Checkbox states" description="Default, checked, indeterminate, and disabled.">
        <DSPreview code={`<div role="checkbox" aria-checked={checked}
  className="w-3.5 h-3.5 rounded-[3px] border flex items-center justify-center
             bg-foreground border-foreground">
  <Check className="w-2.5 h-2.5 text-background stroke-[3]" />
</div>`}>
          <Checkbox checked={false} label="Unchecked" />
          <Checkbox checked={true} label="Checked" />
          <Checkbox checked={false} indeterminate label="Indeterminate" />
          <Checkbox checked={false} disabled label="Disabled" />
          <Checkbox checked={true} disabled label="Disabled checked" />
        </DSPreview>
      </DSSection>

      <DSSection title="Select all pattern" description="Parent checkbox controls child items with indeterminate state.">
        <DSPreview>
          <div className="flex flex-col gap-2 w-full max-w-xs">
            <div className="pb-2 border-b border-border">
              <Checkbox
                checked={allChecked}
                indeterminate={someChecked}
                label="Select all issues"
                onChange={toggleAll}
              />
            </div>
            {['ENG-421 — Fix auth timeout bug', 'ENG-422 — Add dark mode toggle', 'ENG-423 — Update onboarding flow', 'ENG-424 — Refactor API layer'].map((label, i) => (
              <Checkbox
                key={i}
                checked={items[i]}
                label={label}
                onChange={() => setItems(items.map((v, idx) => idx === i ? !v : v))}
              />
            ))}
          </div>
        </DSPreview>
      </DSSection>

      <DSSection title="Checkbox with description" description="Used in settings panels with extra context beneath the label.">
        <DSPreview>
          <div className="flex flex-col gap-4 w-full max-w-sm">
            {[
              { key: 'email', label: 'Email notifications', desc: 'Receive updates in your inbox when issues are assigned to you.' },
              { key: 'slack', label: 'Slack notifications', desc: 'Get messages in Slack for mentions and status changes.' },
              { key: 'mobile', label: 'Push notifications', desc: 'Send alerts to your mobile device for urgent issues.' },
            ].map(({ key, label, desc }) => (
              <Checkbox
                key={key}
                checked={notifications[key as keyof typeof notifications]}
                label={label}
                description={desc}
                onChange={() => setNotifications(n => ({ ...n, [key]: !n[key as keyof typeof n] }))}
              />
            ))}
          </div>
        </DSPreview>
      </DSSection>

      <DSSection title="Radio group" description="Single-select options. Used for issue type, priority presets, or view settings.">
        <DSPreview code={`<div role="radio" aria-checked={checked}
  className="w-3.5 h-3.5 rounded-full border flex items-center justify-center">
  {checked && <div className="w-1.5 h-1.5 rounded-full bg-foreground" />}
</div>`}>
          <div className="flex flex-col gap-2.5 w-full max-w-xs">
            {[
              { label: 'No priority', desc: 'Issue has no assigned priority' },
              { label: 'Urgent', desc: 'Needs immediate attention' },
              { label: 'High', desc: 'Important, do soon' },
              { label: 'Medium', desc: 'Normal priority level' },
              { label: 'Low', desc: 'Can wait, nice to have' },
            ].map((opt, i) => (
              <Radio
                key={i}
                checked={radio === i}
                label={opt.label}
                description={opt.desc}
                onChange={() => setRadio(i)}
              />
            ))}
          </div>
        </DSPreview>
      </DSSection>

      <DSSection title="Radio disabled" description="Disabled states for locked options.">
        <DSPreview>
          <div className="flex flex-col gap-2.5">
            <Radio checked={true} label="Current plan (Pro)" disabled />
            <Radio checked={false} label="Enterprise (contact us)" disabled />
          </div>
        </DSPreview>
      </DSSection>
    </DSLayout>
  )
}
