'use client'

import { DSLayout } from '@/components/ds/ds-layout'
import { DSSection, DSPreview } from '@/components/ds/ds-section'
import { useState } from 'react'

// The canonical spinner — a plain CSS arc.
function Spinner({
  size = 'md',
  color = 'default',
  label,
}: {
  size?: 'xs' | 'sm' | 'md' | 'lg'
  color?: 'default' | 'muted' | 'primary' | 'destructive'
  label?: string
}) {
  const sizes: Record<string, string> = {
    xs: 'w-3 h-3 border-[1.5px]',
    sm: 'w-4 h-4 border-[1.5px]',
    md: 'w-5 h-5 border-2',
    lg: 'w-7 h-7 border-2',
  }
  const colors: Record<string, string> = {
    default: 'border-foreground/20 border-t-foreground',
    muted: 'border-muted-foreground/20 border-t-muted-foreground',
    primary: 'border-status-inprogress/20 border-t-status-inprogress',
    destructive: 'border-destructive/20 border-t-destructive',
  }
  return (
    <span role="status" aria-label={label ?? 'Loading'} className="inline-flex items-center justify-center">
      <span
        className={`rounded-full animate-spin ${sizes[size]} ${colors[color]}`}
        aria-hidden="true"
      />
    </span>
  )
}

// Spinner paired with a label
function SpinnerLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-2 text-xs text-muted-foreground">
      <Spinner size="sm" />
      <span>{children}</span>
    </div>
  )
}

export default function SpinnerPage() {
  const [loading, setLoading] = useState(false)
  const [done, setDone] = useState(false)

  const simulate = () => {
    setLoading(true)
    setDone(false)
    setTimeout(() => { setLoading(false); setDone(true) }, 1800)
  }

  return (
    <DSLayout
      title="Spinner"
      description="An indeterminate loading indicator for async operations of unknown duration. Use Skeleton instead when the content shape is known."
    >
      <DSSection title="Sizes" description="Four sizes: xs (12px) for inline use, sm (16px) in buttons, md (20px) standalone, lg (28px) for full-page loading.">
        <DSPreview>
          <Spinner size="xs" label="Loading (xs)" />
          <Spinner size="sm" label="Loading (sm)" />
          <Spinner size="md" label="Loading (md)" />
          <Spinner size="lg" label="Loading (lg)" />
        </DSPreview>
      </DSSection>

      <DSSection title="Colors" description="Match the spinner color to the surrounding surface context.">
        <DSPreview>
          <div className="flex items-center gap-6">
            <div className="flex flex-col items-center gap-2">
              <Spinner size="md" color="default" />
              <span className="text-[10px] text-muted-foreground">default</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <Spinner size="md" color="muted" />
              <span className="text-[10px] text-muted-foreground">muted</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <Spinner size="md" color="primary" />
              <span className="text-[10px] text-muted-foreground">primary</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <Spinner size="md" color="destructive" />
              <span className="text-[10px] text-muted-foreground">destructive</span>
            </div>
          </div>
        </DSPreview>
      </DSSection>

      <DSSection title="In-button" description="Replace the button label with a spinner during async operations. Keep the button width stable.">
        <DSPreview>
          <div className="flex gap-3 flex-wrap">
            <button
              onClick={simulate}
              className="inline-flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-md bg-foreground text-background text-xs font-medium min-w-[100px] transition-colors hover:bg-foreground/90 cursor-pointer"
            >
              {loading ? (
                <><Spinner size="xs" color="muted" label="Saving" /> Saving...</>
              ) : done ? (
                'Saved'
              ) : (
                'Save changes'
              )}
            </button>
            <button className="inline-flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-md bg-surface-2 border border-border text-foreground text-xs font-medium min-w-[90px] cursor-not-allowed opacity-70">
              <Spinner size="xs" /> Loading...
            </button>
          </div>
        </DSPreview>
      </DSSection>

      <DSSection title="With label" description="Pair with a short message when the wait exceeds 1–2 seconds.">
        <DSPreview className="[&>div]:flex-col [&>div]:items-start [&>div]:gap-3">
          <SpinnerLabel>Syncing with GitHub...</SpinnerLabel>
          <SpinnerLabel>Loading issues...</SpinnerLabel>
          <SpinnerLabel>Applying changes...</SpinnerLabel>
        </DSPreview>
      </DSSection>

      <DSSection title="Full-page overlay" description="For heavy async navigations. Centers the spinner on the viewport using a semi-transparent backdrop.">
        <div className="rounded-md border border-border overflow-hidden">
          <div className="relative h-40 bg-surface-1 flex items-center justify-center">
            <div className="absolute inset-0 bg-background/60 flex items-center justify-center rounded-md">
              <div className="flex flex-col items-center gap-3">
                <Spinner size="lg" label="Loading workspace" />
                <p className="text-xs text-muted-foreground">Loading workspace...</p>
              </div>
            </div>
            <p className="text-xs text-muted-foreground/30 select-none">Page content behind overlay</p>
          </div>
        </div>
      </DSSection>

      <DSSection title="Inline" description="xs spinner inline with text for row-level async states.">
        <DSPreview className="[&>div]:flex-col [&>div]:items-start [&>div]:gap-2">
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <Spinner size="xs" />
            <span className="text-foreground">ENG-1234</span>
            <span className="text-muted-foreground">— syncing</span>
          </div>
          <div className="flex items-center gap-2 text-xs">
            <Spinner size="xs" color="primary" />
            <span className="text-muted-foreground">Fetching diff...</span>
          </div>
        </DSPreview>
      </DSSection>
    </DSLayout>
  )
}
