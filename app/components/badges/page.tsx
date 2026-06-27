'use client'

import { DSLayout } from '@/components/ds/ds-layout'
import { DSSection } from '@/components/ds/ds-section'
import { AlertCircle, ArrowUp, Minus, ArrowDown, Circle, CheckCircle2, X, Bug, Zap, TrendingUp } from 'lucide-react'
import { useState } from 'react'

function Badge({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <span className={`inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full text-[11px] font-medium leading-none ${className}`}>
      {children}
    </span>
  )
}

function Dot({ color }: { color: string }) {
  return <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: color }} />
}

function CodeSnippet({ code }: { code: string }) {
  return (
    <div className="border-t border-border bg-background px-4 py-3 rounded-b-md">
      <pre className="font-mono text-[11px] text-muted-foreground overflow-x-auto">{code}</pre>
    </div>
  )
}

function PreviewBox({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`p-6 bg-surface-1 flex flex-wrap gap-3 items-center rounded-t-md border border-border ${className}`}>
      {children}
    </div>
  )
}

const INITIAL_TAGS = [
  { id: 1, label: 'Bug',           color: '#E5534B' },
  { id: 2, label: 'Feature',       color: '#4D8EE8' },
  { id: 3, label: 'High priority', color: '#E07B39' },
  { id: 4, label: 'Design',        color: '#9B6DFF' },
]

function RemovableTagDemo() {
  const [tags, setTags] = useState(INITIAL_TAGS)
  return (
    <div className="flex flex-wrap gap-2 items-center">
      {tags.map(tag => (
        <span
          key={tag.id}
          className="inline-flex items-center gap-1 pl-2 pr-1 py-0.5 rounded-full text-[11px] font-medium border"
          style={{ background: tag.color + '18', color: tag.color, borderColor: tag.color + '35' }}
        >
          {tag.label}
          <button
            onClick={() => setTags(t => t.filter(x => x.id !== tag.id))}
            aria-label={`Remove ${tag.label}`}
            className="w-3.5 h-3.5 flex items-center justify-center rounded-sm opacity-60 hover:opacity-100 transition-opacity cursor-pointer"
          >
            <X className="w-2.5 h-2.5" />
          </button>
        </span>
      ))}
      {tags.length < INITIAL_TAGS.length && (
        <button
          onClick={() => setTags(INITIAL_TAGS)}
          className="text-[11px] text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
        >
          Reset
        </button>
      )}
    </div>
  )
}

export default function BadgesPage() {
  return (
    <DSLayout
      title="Badges"
      description="Badges encode status, priority, and label metadata at a glance. They are always compact (11px text, 3px radius) and rely on color + icon pairs for maximum clarity."
    >
      {/* Priority */}
      <DSSection title="Priority badges" description="Maps directly to --priority-* tokens. Icon reinforces the color signal.">
        <div className="rounded-md border border-border overflow-hidden">
          <PreviewBox>
            <Badge className="bg-[#E5534B]/15 text-[#E5534B]">
              <AlertCircle className="w-3 h-3" /> Urgent
            </Badge>
            <Badge className="bg-[#E07B39]/15 text-[#E07B39]">
              <ArrowUp className="w-3 h-3" /> High
            </Badge>
            <Badge className="bg-[#D4A72C]/15 text-[#D4A72C]">
              <Minus className="w-3 h-3" /> Medium
            </Badge>
            <Badge className="bg-surface-3 text-muted-foreground border border-border">
              <ArrowDown className="w-3 h-3" /> Low
            </Badge>
            <Badge className="bg-surface-2 text-muted-foreground/60 border border-border">
              <Minus className="w-3 h-3" /> No priority
            </Badge>
          </PreviewBox>
          <CodeSnippet code={`<span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[11px] font-medium bg-[#E5534B]/15 text-[#E5534B]">
  <AlertCircle className="w-3 h-3" /> Urgent
</span>`} />
        </div>
      </DSSection>

      {/* Status */}
      <DSSection title="Status badges" description="Use the dot + label pattern for workflow states.">
        <div className="rounded-md border border-border overflow-hidden">
          <PreviewBox>
            <Badge className="bg-surface-2 text-muted-foreground border border-border">
              <Dot color="#6B6B6B" /> Backlog
            </Badge>
            <Badge className="bg-surface-2 text-muted-foreground border border-border">
              <Circle className="w-3 h-3" /> Todo
            </Badge>
            <Badge className="bg-[#4D8EE8]/15 text-[#4D8EE8]">
              <Dot color="#4D8EE8" /> In Progress
            </Badge>
            <Badge className="bg-[#4CAF7D]/15 text-[#4CAF7D]">
              <CheckCircle2 className="w-3 h-3" /> Done
            </Badge>
            <Badge className="bg-surface-2 text-muted-foreground/50 border border-border">
              <X className="w-3 h-3" /> Cancelled
            </Badge>
          </PreviewBox>
          <CodeSnippet code={`// In Progress
<span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[11px] font-medium bg-[#4D8EE8]/15 text-[#4D8EE8]">
  <span className="w-1.5 h-1.5 rounded-full bg-[#4D8EE8]" />
  In Progress
</span>`} />
        </div>
      </DSSection>

      {/* Labels */}
      <DSSection title="Label badges" description="Issue labels use a dot-and-name pattern with subtle background tints.">
        <div className="rounded-md border border-border overflow-hidden">
          <PreviewBox>
            <Badge className="bg-[#E5534B]/10 text-[#E5534B] border border-[#E5534B]/20">
              <Bug className="w-3 h-3" /> Bug
            </Badge>
            <Badge className="bg-[#4D8EE8]/10 text-[#4D8EE8] border border-[#4D8EE8]/20">
              <Zap className="w-3 h-3" /> Feature
            </Badge>
            <Badge className="bg-[#4CAF7D]/10 text-[#4CAF7D] border border-[#4CAF7D]/20">
              <TrendingUp className="w-3 h-3" /> Improvement
            </Badge>
            <Badge className="bg-surface-2 text-muted-foreground border border-border">
              <Dot color="#6B6B6B" /> Design
            </Badge>
            <Badge className="bg-surface-2 text-muted-foreground border border-border">
              <Dot color="#6B6B6B" /> Documentation
            </Badge>
          </PreviewBox>
          <CodeSnippet code={`<span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[11px] font-medium
  bg-[#4D8EE8]/10 text-[#4D8EE8] border border-[#4D8EE8]/20">
  <Zap className="w-3 h-3" /> Feature
</span>`} />
        </div>
      </DSSection>

      {/* Count badges */}
      <DSSection title="Count & notification badges" description="Numeric indicators for unread counts, comments, and notifications.">
        <div className="rounded-md border border-border overflow-hidden">
          <PreviewBox>
            {/* Notification dot */}
            <div className="relative">
              <button className="w-7 h-7 flex items-center justify-center rounded-md bg-surface-2 border border-border text-muted-foreground">
                <Circle className="w-4 h-4" />
              </button>
              <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-[#E5534B]" />
            </div>

            {/* Count badge */}
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <span>Issues</span>
              <span className="px-1.5 py-0.5 rounded bg-surface-3 border border-border text-[10px] font-mono font-medium text-foreground">24</span>
            </div>

            {/* Inline count chips */}
            <span className="px-2 py-0.5 rounded-full bg-surface-3 text-[11px] font-medium text-muted-foreground border border-border">+12</span>

            {/* User count */}
            <div className="flex items-center gap-1 px-2 py-1 rounded-md bg-surface-2 border border-border">
              <div className="flex -space-x-1.5">
                {['#4D8EE8', '#E07B39', '#4CAF7D'].map((c, i) => (
                  <div key={i} className="w-4 h-4 rounded-full border border-background" style={{ background: c }} />
                ))}
              </div>
              <span className="text-[11px] text-muted-foreground ml-0.5">3</span>
            </div>
          </PreviewBox>
          <CodeSnippet code={`// Notification dot
<div className="relative">
  <button>...</button>
  <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-[#E5534B]" />
</div>

// Count chip
<span className="px-1.5 py-0.5 rounded bg-surface-3 border border-border text-[10px] font-mono">24</span>`} />
        </div>
      </DSSection>

      {/* Removable tags */}
      <DSSection title="Removable tags" description="Applied filters and selected labels with an inline remove button. Used in filter bars and label editors.">
        <div className="rounded-md border border-border overflow-hidden">
          <PreviewBox>
            <RemovableTagDemo />
          </PreviewBox>
        </div>
      </DSSection>

      {/* Dot-only badge */}
      <DSSection title="Dot-only badge" description="A bare colored dot with no label — used when the color itself is the signal and space is very constrained.">
        <div className="rounded-md border border-border overflow-hidden">
          <PreviewBox>
            <div className="flex items-center gap-4">
              {[
                { label: 'Urgent', bg: 'bg-priority-urgent' },
                { label: 'High', bg: 'bg-priority-high' },
                { label: 'Medium', bg: 'bg-priority-medium' },
                { label: 'In Progress', bg: 'bg-status-inprogress' },
                { label: 'Done', bg: 'bg-status-done' },
              ].map(({ label, bg }) => (
                <div key={label} className="flex flex-col items-center gap-1.5">
                  <span className={`w-2.5 h-2.5 rounded-full ${bg}`} aria-label={label} />
                  <span className="text-[9px] text-muted-foreground">{label}</span>
                </div>
              ))}
            </div>
          </PreviewBox>
        </div>
      </DSSection>

      {/* Cycle / milestone */}
      <DSSection title="Cycle & milestone" description="Compound badges for sprints and roadmap milestones.">
        <div className="rounded-md border border-border overflow-hidden">
          <PreviewBox>
            <div className="flex items-center gap-1.5 px-2 py-1 rounded-md bg-surface-2 border border-border text-xs text-muted-foreground">
              <span className="w-2 h-2 rounded-full bg-[#4D8EE8]" />
              Cycle 12
              <span className="text-[10px] text-muted-foreground/60">· 14 issues</span>
            </div>
            <div className="flex items-center gap-1.5 px-2 py-1 rounded-md bg-[#4CAF7D]/10 border border-[#4CAF7D]/20 text-xs text-[#4CAF7D]">
              <CheckCircle2 className="w-3 h-3" />
              v2.4.0 Released
            </div>
            <div className="flex items-center gap-1.5 px-2 py-1 rounded-md bg-[#D4A72C]/10 border border-[#D4A72C]/20 text-xs text-[#D4A72C]">
              <span className="w-2 h-2 rounded-full bg-[#D4A72C]" />
              Q3 Milestone
            </div>
          </PreviewBox>
        </div>
      </DSSection>
    </DSLayout>
  )
}
