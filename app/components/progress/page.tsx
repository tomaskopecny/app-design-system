'use client'

import { DSLayout } from '@/components/ds/ds-layout'
import { DSSection, DSPreview } from '@/components/ds/ds-section'
import { useState, useEffect } from 'react'

function ProgressBar({ value, size = 'default', showLabel = false }: { value: number; size?: 'sm' | 'default'; showLabel?: boolean }) {
  const pct = Math.min(100, Math.max(0, value))
  const color =
    pct === 100 ? 'bg-status-done' :
    pct >= 66   ? 'bg-status-inprogress' :
    pct >= 33   ? 'bg-priority-medium' :
                  'bg-surface-3'

  return (
    <div className="flex items-center gap-2 w-full">
      <div className={`flex-1 rounded-full bg-surface-3 overflow-hidden ${size === 'sm' ? 'h-1' : 'h-1.5'}`}>
        <div
          className={`h-full rounded-full transition-all duration-500 ${color}`}
          style={{ width: `${pct}%` }}
        />
      </div>
      {showLabel && <span className="text-[11px] text-muted-foreground tabular-nums shrink-0 w-7 text-right">{pct}%</span>}
    </div>
  )
}

function Skeleton({ className = '' }: { className?: string }) {
  return <div className={`animate-pulse bg-surface-3 rounded-md ${className}`} />
}

function IssueRowSkeleton() {
  return (
    <div className="flex items-center gap-3 px-4 py-2.5 border-b border-border last:border-0">
      <Skeleton className="w-3.5 h-3.5 rounded-full shrink-0" />
      <Skeleton className="w-12 h-3 rounded" />
      <Skeleton className="flex-1 h-3 rounded" />
      <Skeleton className="w-16 h-3 rounded" />
      <Skeleton className="w-5 h-5 rounded-full shrink-0" />
    </div>
  )
}

export default function ProgressPage() {
  const [live, setLive] = useState(34)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 2400)
    return () => clearTimeout(t)
  }, [])

  return (
    <DSLayout
      title="Progress & Skeleton"
      description="Progress bars track cycle completion, issue counts, and loading. Skeletons are placeholder shapes that prevent layout shift during data fetches."
    >
      <DSSection title="Progress bar" description="Height is 6px (default) or 4px (sm). Color shifts green at 100%, blue above 66%, yellow above 33%.">
        <DSPreview code={`<div className="h-1.5 rounded-full bg-surface-3 overflow-hidden">
  <div className="h-full rounded-full bg-status-inprogress transition-all"
       style={{ width: \`\${pct}%\` }} />
</div>`}>
          <div className="flex flex-col gap-3 w-full max-w-sm">
            <div className="flex items-center gap-3">
              <span className="text-[11px] text-muted-foreground w-16 shrink-0">0%</span>
              <ProgressBar value={0} showLabel />
            </div>
            <div className="flex items-center gap-3">
              <span className="text-[11px] text-muted-foreground w-16 shrink-0">25%</span>
              <ProgressBar value={25} showLabel />
            </div>
            <div className="flex items-center gap-3">
              <span className="text-[11px] text-muted-foreground w-16 shrink-0">60%</span>
              <ProgressBar value={60} showLabel />
            </div>
            <div className="flex items-center gap-3">
              <span className="text-[11px] text-muted-foreground w-16 shrink-0">80%</span>
              <ProgressBar value={80} showLabel />
            </div>
            <div className="flex items-center gap-3">
              <span className="text-[11px] text-muted-foreground w-16 shrink-0">100%</span>
              <ProgressBar value={100} showLabel />
            </div>
          </div>
        </DSPreview>
      </DSSection>

      <DSSection title="Thin variant (sm)" description="4px variant used inside issue rows and cycle cards inline with text.">
        <DSPreview>
          <div className="flex flex-col gap-2.5 w-full max-w-xs">
            <ProgressBar value={40} size="sm" showLabel />
            <ProgressBar value={70} size="sm" showLabel />
            <ProgressBar value={100} size="sm" showLabel />
          </div>
        </DSPreview>
      </DSSection>

      <DSSection title="Live scrubber" description="Interactive example — drag the slider to update the bar.">
        <DSPreview>
          <div className="flex flex-col gap-3 w-full max-w-xs">
            <ProgressBar value={live} showLabel />
            <input
              type="range" min={0} max={100} value={live}
              onChange={e => setLive(Number(e.target.value))}
              className="w-full accent-foreground cursor-pointer"
            />
          </div>
        </DSPreview>
      </DSSection>

      <DSSection title="Skeleton loading" description="Pulse animation on surface-3 background. Match shape to the content it replaces.">
        <DSPreview code={`<div className="animate-pulse bg-surface-3 rounded-md h-3 w-48" />`}>
          <div className="flex flex-col gap-2 w-full max-w-xs">
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-3 w-full" />
            <Skeleton className="h-3 w-4/5" />
            <Skeleton className="h-3 w-3/5" />
          </div>
        </DSPreview>
      </DSSection>

      <DSSection title="Issue list skeleton" description="Full list loading state — matches the shape of real issue rows to prevent layout shift.">
        <div className="rounded-md border border-border bg-surface-1 overflow-hidden">
          <div className="px-4 py-2 border-b border-border bg-surface-2 flex items-center gap-2">
            <Skeleton className="w-3 h-3 rounded-full" />
            <Skeleton className="w-20 h-2.5 rounded" />
          </div>
          {loading
            ? Array.from({ length: 5 }).map((_, i) => <IssueRowSkeleton key={i} />)
            : ['ENG-421 — Fix auth timeout', 'ENG-422 — Add dark mode', 'ENG-423 — Update onboarding', 'ENG-424 — Refactor API', 'ENG-425 — Write unit tests'].map((label, i) => (
              <div key={i} className="flex items-center gap-3 px-4 py-2.5 border-b border-border last:border-0">
                <div className="w-3.5 h-3.5 rounded-full border-2 border-status-inprogress shrink-0" />
                <span className="text-[11px] text-muted-foreground font-mono">ENG-{421 + i}</span>
                <span className="flex-1 text-xs text-foreground">{label.split(' — ')[1]}</span>
              </div>
            ))
          }
        </div>
        {loading && <p className="text-[11px] text-muted-foreground mt-2">Loading issues... (skeleton disappears after 2.4s)</p>}
      </DSSection>
    </DSLayout>
  )
}
