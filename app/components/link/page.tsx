'use client'

import { DSLayout } from '@/components/ds/ds-layout'
import { DSSection, DSPreview } from '@/components/ds/ds-section'
import { ExternalLink, ArrowRight, Hash } from 'lucide-react'

// Typed link variants to keep usage explicit
type LinkVariant = 'default' | 'subtle' | 'danger' | 'mono'

function DSLink({
  children,
  href = '#',
  variant = 'default',
  external = false,
  icon,
}: {
  children: React.ReactNode
  href?: string
  variant?: LinkVariant
  external?: boolean
  icon?: React.ElementType
}) {
  const Icon = icon
  const variantClass: Record<LinkVariant, string> = {
    default: 'text-status-inprogress hover:text-status-inprogress/80 underline underline-offset-2 decoration-status-inprogress/40 hover:decoration-status-inprogress',
    subtle: 'text-muted-foreground hover:text-foreground underline underline-offset-2 decoration-transparent hover:decoration-muted-foreground/50',
    danger: 'text-destructive hover:text-destructive/80 underline underline-offset-2 decoration-destructive/40 hover:decoration-destructive',
    mono: 'text-foreground hover:text-foreground/80 font-mono underline underline-offset-2 decoration-border hover:decoration-muted-foreground',
  }

  return (
    <a
      href={href}
      target={external ? '_blank' : undefined}
      rel={external ? 'noopener noreferrer' : undefined}
      className={`inline-flex items-center gap-1 transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring rounded-sm text-xs ${variantClass[variant]}`}
    >
      {Icon && <Icon className="w-3 h-3 shrink-0" aria-hidden="true" />}
      {children}
      {external && <ExternalLink className="w-2.5 h-2.5 shrink-0 opacity-60" aria-label="(opens in new tab)" />}
    </a>
  )
}

export default function LinkPage() {
  return (
    <DSLayout
      title="Link"
      description="Interactive text that navigates to another page or resource. Separate from Button — links navigate, buttons perform actions."
    >
      <DSSection title="Variants" description="Four variants for different contexts: default (in-content), subtle (secondary references), danger (destructive navigation), mono (code references).">
        <DSPreview className="[&>div]:flex-col [&>div]:items-start [&>div]:gap-4">
          <div className="flex flex-col gap-2">
            <p className="text-[10px] uppercase tracking-wider text-muted-foreground/60 font-semibold">Default</p>
            <p className="text-xs text-muted-foreground leading-relaxed">
              You can learn more about cycles in the{' '}
              <DSLink href="#">Documentation</DSLink>.
              {' '}See also <DSLink href="#">keyboard shortcuts</DSLink> for quick navigation.
            </p>
          </div>
          <div className="flex flex-col gap-2">
            <p className="text-[10px] uppercase tracking-wider text-muted-foreground/60 font-semibold">Subtle</p>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Last updated by{' '}
              <DSLink href="#" variant="subtle">Alice Chen</DSLink>{' '}
              · <DSLink href="#" variant="subtle">3 days ago</DSLink>
            </p>
          </div>
          <div className="flex flex-col gap-2">
            <p className="text-[10px] uppercase tracking-wider text-muted-foreground/60 font-semibold">Danger</p>
            <p className="text-xs text-muted-foreground leading-relaxed">
              This action cannot be undone.{' '}
              <DSLink href="#" variant="danger">Delete workspace</DSLink> will remove all data permanently.
            </p>
          </div>
          <div className="flex flex-col gap-2">
            <p className="text-[10px] uppercase tracking-wider text-muted-foreground/60 font-semibold">Mono (code reference)</p>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Set the{' '}
              <DSLink href="#" variant="mono">teamId</DSLink>{' '}
              field to your team's slug — e.g. <DSLink href="#" variant="mono">ENG</DSLink>.
            </p>
          </div>
        </DSPreview>
      </DSSection>

      <DSSection title="External links" description="Automatically appends an external icon and sets target=_blank + rel=noopener.">
        <DSPreview className="[&>div]:flex-col [&>div]:items-start [&>div]:gap-3">
          <DSLink href="https://vercel.com" external>Vercel.com</DSLink>
          <DSLink href="https://github.com" external>GitHub repository</DSLink>
          <DSLink href="#" variant="subtle" external>View on GitHub</DSLink>
        </DSPreview>
      </DSSection>

      <DSSection title="With icon" description="Prefix an icon to clarify the link type or destination.">
        <DSPreview className="[&>div]:flex-col [&>div]:items-start [&>div]:gap-3">
          <DSLink href="#" icon={Hash}>ENG-1234</DSLink>
          <DSLink href="#" icon={ArrowRight}>View all issues</DSLink>
        </DSPreview>
      </DSSection>

      <DSSection title="In-context usage" description="How links sit within prose, metadata rows, and issue properties.">
        <div className="space-y-4 max-w-lg">
          {/* Metadata row */}
          <div className="rounded-md border border-border p-4 bg-surface-1 space-y-2">
            <p className="text-[10px] uppercase tracking-wider text-muted-foreground/60 font-semibold mb-3">Issue metadata</p>
            {[
              { label: 'Created by', value: <DSLink href="#" variant="subtle">Alice Chen</DSLink> },
              { label: 'Parent', value: <DSLink href="#" icon={Hash}>ENG-1200</DSLink> },
              { label: 'Branch', value: <DSLink href="#" variant="mono">feat/keyboard-shortcuts</DSLink> },
              { label: 'Docs', value: <DSLink href="#" external>Design spec</DSLink> },
            ].map(({ label, value }) => (
              <div key={label} className="flex items-center justify-between">
                <span className="text-xs text-muted-foreground">{label}</span>
                {value}
              </div>
            ))}
          </div>
        </div>
      </DSSection>

      <DSSection title="Rules" description="When to use a link vs. a button.">
        <div className="rounded-md border border-border overflow-hidden">
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b border-border bg-surface-2">
                <th className="text-left px-4 py-2.5 font-medium text-muted-foreground">Use Link when</th>
                <th className="text-left px-4 py-2.5 font-medium text-muted-foreground">Use Button when</th>
              </tr>
            </thead>
            <tbody>
              {[
                ['Navigating to another page or URL', 'Triggering a mutation or action'],
                ['Opening an external resource', 'Submitting a form'],
                ['Cross-referencing related content', 'Opening a modal or dialog'],
                ['Deep-linking within prose', 'Any non-navigation interaction'],
              ].map(([link, btn], i) => (
                <tr key={i} className="border-b border-border last:border-0">
                  <td className="px-4 py-2.5 text-foreground">{link}</td>
                  <td className="px-4 py-2.5 text-muted-foreground">{btn}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </DSSection>
    </DSLayout>
  )
}
