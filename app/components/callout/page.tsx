'use client'

import { DSLayout } from '@/components/ds/ds-layout'
import { DSSection, DSPreview } from '@/components/ds/ds-section'
import { Info, CheckCircle2, AlertTriangle, XCircle, X } from 'lucide-react'
import { useState } from 'react'

type CalloutVariant = 'info' | 'success' | 'warning' | 'error'

const VARIANTS: Record<CalloutVariant, {
  bg: string
  border: string
  icon: string
  text: string
  Icon: React.ElementType
  label: string
}> = {
  info: {
    bg: 'bg-status-inprogress/8',
    border: 'border-status-inprogress/20',
    icon: 'text-status-inprogress',
    text: 'text-foreground',
    Icon: Info,
    label: 'Info',
  },
  success: {
    bg: 'bg-status-done/8',
    border: 'border-status-done/20',
    icon: 'text-status-done',
    text: 'text-foreground',
    Icon: CheckCircle2,
    label: 'Success',
  },
  warning: {
    bg: 'bg-priority-medium/8',
    border: 'border-priority-medium/20',
    icon: 'text-priority-medium',
    text: 'text-foreground',
    Icon: AlertTriangle,
    label: 'Warning',
  },
  error: {
    bg: 'bg-destructive/8',
    border: 'border-destructive/20',
    icon: 'text-destructive',
    text: 'text-foreground',
    Icon: XCircle,
    label: 'Error',
  },
}

function Callout({
  variant = 'info',
  title,
  children,
  dismissible = false,
}: {
  variant?: CalloutVariant
  title?: string
  children: React.ReactNode
  dismissible?: boolean
}) {
  const [dismissed, setDismissed] = useState(false)
  if (dismissed) return null
  const v = VARIANTS[variant]
  return (
    <div className={`flex gap-3 px-4 py-3 rounded-md border ${v.bg} ${v.border}`} role="alert">
      <v.Icon className={`w-4 h-4 shrink-0 ${v.icon}`} aria-hidden="true" />
      <div className="flex-1 min-w-0">
        {title && <p className="text-xs font-semibold text-foreground">{title}</p>}
        <p className={`text-xs leading-relaxed ${title ? 'text-muted-foreground mt-0.5' : v.text}`}>{children}</p>
      </div>
      {dismissible && (
        <button
          onClick={() => setDismissed(true)}
          aria-label="Dismiss"
          className="shrink-0 w-5 h-5 flex items-center justify-center rounded-sm text-muted-foreground hover:text-foreground hover:bg-accent/60 transition-colors"
        >
          <X className="w-3 h-3" aria-hidden="true" />
        </button>
      )}
    </div>
  )
}

export default function CalloutPage() {
  return (
    <DSLayout
      title="Callout"
      description="Inline contextual messages that surface important information without blocking the UI. Four semantic variants: info, success, warning, error."
    >
      <DSSection title="Variants" description="Each variant uses a tinted background and matching border to signal semantic meaning.">
        <div className="flex flex-col gap-3">
          {(Object.keys(VARIANTS) as CalloutVariant[]).map((v) => (
            <Callout key={v} variant={v} title={VARIANTS[v].label}>
              {v === 'info' && 'This cycle ends on Friday. Make sure your issues are up to date.'}
              {v === 'success' && 'Your changes have been saved and synced across all team members.'}
              {v === 'warning' && 'You are approaching the member limit for your current plan.'}
              {v === 'error' && 'Failed to load project data. Check your connection and try again.'}
            </Callout>
          ))}
        </div>
      </DSSection>

      <DSSection title="Without title" description="When the message is short enough, omit the title for a more compact feel.">
        <div className="flex flex-col gap-3">
          <Callout variant="info">This feature is in beta and may change without notice.</Callout>
          <Callout variant="warning">Deleting a project cannot be undone.</Callout>
        </div>
      </DSSection>

      <DSSection title="Dismissible" description="Add a close button when the callout is informational and can be safely hidden.">
        <div className="flex flex-col gap-3">
          <Callout variant="info" title="What's new in cycles" dismissible>
            Cycles now support custom date ranges. You can set start and end dates independently per team.
          </Callout>
          <Callout variant="success" title="Integration connected" dismissible>
            GitHub is now syncing pull requests with your issues automatically.
          </Callout>
        </div>
      </DSSection>

      <DSSection title="Banner variant" description="Full-width top-of-page banners for system-wide notices. No icon, higher contrast.">
        <div className="flex flex-col gap-3">
          <div className="flex items-center justify-between px-4 py-2.5 rounded-md bg-priority-medium/12 border border-priority-medium/25">
            <p className="text-xs font-medium text-foreground">Scheduled maintenance on Sunday, Jul 6 from 02:00–04:00 UTC.</p>
            <button aria-label="Dismiss" className="ml-4 shrink-0 w-5 h-5 flex items-center justify-center rounded-sm text-muted-foreground hover:text-foreground hover:bg-accent/60 transition-colors">
              <X className="w-3 h-3" aria-hidden="true" />
            </button>
          </div>
          <div className="flex items-center justify-between px-4 py-2.5 rounded-md bg-destructive/8 border border-destructive/20">
            <p className="text-xs font-medium text-foreground">Your subscription has expired. <span className="underline cursor-pointer hover:text-foreground/80">Renew now</span> to restore access.</p>
            <button aria-label="Dismiss" className="ml-4 shrink-0 w-5 h-5 flex items-center justify-center rounded-sm text-muted-foreground hover:text-foreground hover:bg-accent/60 transition-colors">
              <X className="w-3 h-3" aria-hidden="true" />
            </button>
          </div>
        </div>
      </DSSection>

      <DSSection
        title="Usage"
        description="When to use each variant."
      >
        <div className="rounded-md border border-border overflow-hidden">
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b border-border bg-surface-2">
                <th className="text-left px-4 py-2.5 font-medium text-muted-foreground">Variant</th>
                <th className="text-left px-4 py-2.5 font-medium text-muted-foreground">Use when</th>
              </tr>
            </thead>
            <tbody>
              {[
                ['Info', 'Neutral context, tips, feature announcements, beta notices'],
                ['Success', 'Confirming a completed action, integration connected, data saved'],
                ['Warning', 'Destructive action ahead, plan limits, approaching thresholds'],
                ['Error', 'Action failed, validation errors, broken integrations'],
              ].map(([v, u]) => (
                <tr key={v} className="border-b border-border last:border-0">
                  <td className="px-4 py-2.5 font-medium text-foreground">{v}</td>
                  <td className="px-4 py-2.5 text-muted-foreground">{u}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </DSSection>
    </DSLayout>
  )
}
