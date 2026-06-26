'use client'

import { DSLayout } from '@/components/ds/ds-layout'
import { DSSection, DSPreview } from '@/components/ds/ds-section'
import { useState } from 'react'
import { ChevronRight, Bell, Globe, Key, Palette, User, CreditCard } from 'lucide-react'

function AccordionItem({
  title,
  children,
  defaultOpen = false,
  icon,
  badge,
}: {
  title: string
  children: React.ReactNode
  defaultOpen?: boolean
  icon?: React.ElementType
  badge?: string
}) {
  const [open, setOpen] = useState(defaultOpen)
  const Icon = icon

  return (
    <div className="border-b border-border last:border-0">
      <button
        onClick={() => setOpen(o => !o)}
        aria-expanded={open}
        className="w-full flex items-center gap-2.5 px-4 py-3 text-left hover:bg-accent/40 transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-inset focus-visible:ring-1 focus-visible:ring-ring"
      >
        {Icon && <Icon className="w-3.5 h-3.5 text-muted-foreground shrink-0" aria-hidden="true" />}
        <span className="flex-1 text-sm font-medium text-foreground">{title}</span>
        {badge && (
          <span className="px-1.5 py-0.5 rounded-sm bg-status-inprogress/15 text-status-inprogress text-[10px] font-medium border border-status-inprogress/20">
            {badge}
          </span>
        )}
        <ChevronRight
          className={`w-3.5 h-3.5 text-muted-foreground shrink-0 transition-transform duration-150 ${open ? 'rotate-90' : ''}`}
          aria-hidden="true"
        />
      </button>
      {open && (
        <div className="px-4 pb-4 pt-1">
          {children}
        </div>
      )}
    </div>
  )
}

function Accordion({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`rounded-md border border-border bg-surface-1 overflow-hidden ${className}`}>
      {children}
    </div>
  )
}

export default function AccordionPage() {
  return (
    <DSLayout
      title="Accordion"
      description="Collapsible sections for revealing content progressively. Used in settings panels, FAQ pages, and sidebar navigation groups."
    >
      <DSSection title="Default" description="Single-column accordion with chevron indicator. Each item can be opened independently.">
        <Accordion>
          <AccordionItem title="General settings" icon={User} defaultOpen>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs text-muted-foreground">Display name</span>
                <input className="px-2 py-1 rounded-sm bg-surface-2 border border-border text-xs text-foreground w-40 focus:outline-none focus:ring-1 focus:ring-ring" defaultValue="Alice Chen" />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-muted-foreground">Handle</span>
                <input className="px-2 py-1 rounded-sm bg-surface-2 border border-border text-xs text-foreground w-40 focus:outline-none focus:ring-1 focus:ring-ring" defaultValue="@alice" />
              </div>
            </div>
          </AccordionItem>
          <AccordionItem title="Notifications" icon={Bell} badge="3 active">
            <div className="space-y-2">
              {['Issue assigned', 'Mentioned in comment', 'Cycle updates', 'Project status'].map(n => (
                <div key={n} className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">{n}</span>
                  <div className="w-8 h-4 rounded-full bg-status-inprogress/30 flex items-center px-0.5 cursor-pointer">
                    <div className="w-3 h-3 rounded-full bg-status-inprogress" />
                  </div>
                </div>
              ))}
            </div>
          </AccordionItem>
          <AccordionItem title="Appearance" icon={Palette}>
            <div className="flex gap-2">
              {['Dark', 'Light', 'System'].map(t => (
                <button key={t} className="px-2.5 py-1 rounded-sm bg-surface-2 border border-border text-xs text-muted-foreground hover:text-foreground hover:bg-surface-3 transition-colors cursor-pointer">
                  {t}
                </button>
              ))}
            </div>
          </AccordionItem>
          <AccordionItem title="Security" icon={Key}>
            <p className="text-xs text-muted-foreground leading-relaxed">Two-factor authentication is enabled. Your last sign-in was 2 hours ago from San Francisco, US.</p>
          </AccordionItem>
        </Accordion>
      </DSSection>

      <DSSection title="Settings panel" description="Larger accordion used for page-level settings sections with richer content.">
        <Accordion>
          <AccordionItem title="Billing" icon={CreditCard} defaultOpen>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 rounded-sm bg-surface-2 border border-border">
                <div>
                  <p className="text-xs font-medium text-foreground">Pro plan</p>
                  <p className="text-[11px] text-muted-foreground mt-0.5">$16 / member / month</p>
                </div>
                <button className="px-2.5 py-1 rounded-sm bg-surface-3 border border-border text-xs text-foreground hover:bg-accent transition-colors cursor-pointer">
                  Manage
                </button>
              </div>
            </div>
          </AccordionItem>
          <AccordionItem title="Integrations" icon={Globe} badge="2 connected">
            <div className="space-y-2">
              {[
                { name: 'GitHub', status: 'Connected', color: 'text-status-done' },
                { name: 'Slack', status: 'Connected', color: 'text-status-done' },
                { name: 'Figma', status: 'Not connected', color: 'text-muted-foreground' },
                { name: 'Jira', status: 'Not connected', color: 'text-muted-foreground' },
              ].map(({ name, status, color }) => (
                <div key={name} className="flex items-center justify-between">
                  <span className="text-xs text-foreground">{name}</span>
                  <span className={`text-[11px] ${color}`}>{status}</span>
                </div>
              ))}
            </div>
          </AccordionItem>
        </Accordion>
      </DSSection>

      <DSSection title="FAQ variant" description="Borderless accordion for documentation and help pages.">
        <div className="space-y-0 divide-y divide-border">
          {[
            { q: 'What is a cycle?', a: 'A cycle is a fixed time-box for your team\'s work, similar to a sprint. Teams use cycles to focus on a set of issues and track progress over time.' },
            { q: 'How do I invite team members?', a: 'Go to Settings → Members and click Invite members. Enter their email address and they\'ll receive an invitation to join your workspace.' },
            { q: 'Can I export my data?', a: 'Yes. Go to Settings → Export and choose CSV or JSON. All issues, projects, and cycles are included.' },
          ].map(({ q, a }) => {
            const [open, setOpen] = useState(false)
            return (
              <div key={q} className="py-1">
                <button
                  onClick={() => setOpen(o => !o)}
                  aria-expanded={open}
                  className="w-full flex items-center justify-between py-3 text-left cursor-pointer focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring rounded-sm"
                >
                  <span className="text-sm font-medium text-foreground">{q}</span>
                  <ChevronRight className={`w-3.5 h-3.5 text-muted-foreground shrink-0 transition-transform duration-150 ${open ? 'rotate-90' : ''}`} aria-hidden="true" />
                </button>
                {open && (
                  <p className="pb-3 text-xs text-muted-foreground leading-relaxed">{a}</p>
                )}
              </div>
            )
          })}
        </div>
      </DSSection>
    </DSLayout>
  )
}
