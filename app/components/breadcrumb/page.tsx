'use client'

import { DSLayout } from '@/components/ds/ds-layout'
import { DSSection, DSPreview } from '@/components/ds/ds-section'
import { ChevronRight, Home, Hash, GitBranch, Layers, Circle } from 'lucide-react'

function Crumb({ label, icon: Icon, href, active = false }: { label: string; icon?: React.ElementType; href?: string; active?: boolean }) {
  const Tag = href ? 'a' : 'span'
  return (
    <Tag
      href={href}
      className={`inline-flex items-center gap-1.5 text-xs leading-none transition-colors
        ${active
          ? 'text-foreground font-medium'
          : href
            ? 'text-muted-foreground hover:text-foreground cursor-pointer'
            : 'text-muted-foreground'
        }`}
    >
      {Icon && <Icon className="w-3 h-3 shrink-0" />}
      {label}
    </Tag>
  )
}

function Breadcrumbs({ items }: { items: { label: string; icon?: React.ElementType; href?: string }[] }) {
  return (
    <nav aria-label="Breadcrumb" className="flex items-center gap-1">
      {items.map((item, i) => (
        <span key={i} className="inline-flex items-center gap-1">
          {i > 0 && <ChevronRight className="w-3 h-3 text-muted-foreground/40 shrink-0" />}
          <Crumb {...item} active={i === items.length - 1} />
        </span>
      ))}
    </nav>
  )
}

function TeamDot({ color }: { color: string }) {
  return <span className="w-2 h-2 rounded-full shrink-0" style={{ background: color }} />
}

export default function BreadcrumbPage() {
  return (
    <DSLayout
      title="Breadcrumb"
      description="Breadcrumbs map the hierarchy: workspace → team → project → cycle → issue. Separators use a 12px ChevronRight at reduced opacity. The final crumb is always the current page in full foreground weight."
    >
      <DSSection title="Basic breadcrumb" description="Simple text trail with chevron separators.">
        <DSPreview code={`<nav className="flex items-center gap-1">
  {items.map((item, i) => (
    <>
      {i > 0 && <ChevronRight className="w-3 h-3 text-muted-foreground/40" />}
      <a className="text-xs text-muted-foreground hover:text-foreground">{item}</a>
    </>
  ))}
</nav>`}>
          <Breadcrumbs items={[
            { label: 'Workspace' },
            { label: 'Engineering' },
            { label: 'All Issues' },
          ]} />
        </DSPreview>
      </DSSection>

      <DSSection title="With icons" description="Icons help identify context type (team, project, cycle) at a glance.">
        <DSPreview>
          <div className="flex flex-col gap-3">
            <Breadcrumbs items={[
              { label: 'Workspace', icon: Home },
              { label: 'Engineering', icon: Hash },
              { label: 'Sprint 24', icon: GitBranch },
              { label: 'ENG-421' },
            ]} />
            <Breadcrumbs items={[
              { label: 'Vercel', icon: Layers },
              { label: 'Design', icon: Hash },
              { label: 'Backlog' },
            ]} />
          </div>
        </DSPreview>
      </DSSection>

      <DSSection title="With team color" description="Team dot replaces the team icon to carry brand color through navigation.">
        <DSPreview>
          <div className="flex flex-col gap-3">
            {[
              { team: 'Engineering', color: '#5E6AD2', sub: 'Sprint 24', issue: 'ENG-421 — Fix auth timeout' },
              { team: 'Design', color: '#26B5CE', sub: 'Active', issue: 'DES-089 — Update icon set' },
              { team: 'Product', color: '#F2994A', sub: 'Q2 Roadmap', issue: 'PRD-034 — Pricing redesign' },
            ].map(({ team, color, sub, issue }) => (
              <nav key={team} aria-label="Breadcrumb" className="flex items-center gap-1">
                <span className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground cursor-pointer transition-colors">
                  <TeamDot color={color} />
                  {team}
                </span>
                <ChevronRight className="w-3 h-3 text-muted-foreground/40" />
                <span className="text-xs text-muted-foreground hover:text-foreground cursor-pointer transition-colors">{sub}</span>
                <ChevronRight className="w-3 h-3 text-muted-foreground/40" />
                <span className="text-xs text-foreground font-medium">{issue}</span>
              </nav>
            ))}
          </div>
        </DSPreview>
      </DSSection>

      <DSSection title="In a page header" description="The typical position for breadcrumbs — above the page title in the header bar.">
        <div className="rounded-md border border-border overflow-hidden">
          <div className="px-5 py-4 border-b border-border bg-surface-1 flex flex-col gap-1">
            <Breadcrumbs items={[
              { label: 'Engineering', icon: Hash },
              { label: 'Sprint 24', icon: GitBranch },
            ]} />
            <div className="flex items-center gap-2 mt-1">
              <Circle className="w-3.5 h-3.5 text-status-inprogress" />
              <h1 className="text-sm font-semibold text-foreground">ENG-421 — Fix auth session timeout on mobile</h1>
            </div>
          </div>
          <div className="px-5 py-4 bg-surface-1">
            <p className="text-xs text-muted-foreground">Issue content appears here...</p>
          </div>
        </div>
      </DSSection>
    </DSLayout>
  )
}
