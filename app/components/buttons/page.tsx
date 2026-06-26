'use client'

import { DSLayout } from '@/components/ds/ds-layout'
import { DSSection, DSPreview } from '@/components/ds/ds-section'
import { Plus, Trash2, ArrowRight, GitBranch, Loader2, Check, ExternalLink, MoreHorizontal } from 'lucide-react'
import { useState } from 'react'

function Btn({ children, className = '', disabled = false, ...props }: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      disabled={disabled}
      className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md transition-colors cursor-pointer disabled:opacity-40 disabled:pointer-events-none ${className}`}
      {...props}
    >
      {children}
    </button>
  )
}

function CodeSnippet({ code }: { code: string }) {
  return (
    <div className="border-t border-border bg-background px-4 py-3">
      <pre className="font-mono text-[11px] text-muted-foreground overflow-x-auto">{code}</pre>
    </div>
  )
}

function PreviewBox({ children }: { children: React.ReactNode }) {
  return (
    <div className="p-6 bg-surface-1 flex flex-wrap gap-3 items-center rounded-t-md border border-border">
      {children}
    </div>
  )
}

export default function ButtonsPage() {
  const [loading, setLoading] = useState(false)
  const [saved, setSaved] = useState(false)

  const handleSave = () => {
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      setSaved(true)
      setTimeout(() => setSaved(false), 2000)
    }, 1200)
  }

  return (
    <DSLayout
      title="Buttons"
      description="Linear buttons are compact and purposeful. All variants share a 6px radius, 12px font, and a fixed height of ~28px. Size up to sm when needed for modals or empty states."
    >
      {/* Variants */}
      <DSSection title="Variants" description="Four variants covering the full range of button hierarchy.">
        <div className="rounded-md border border-border overflow-hidden">
          <PreviewBox>
            <Btn className="bg-foreground text-background hover:bg-foreground/90" style={{ boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.06)' }}>
              Primary
            </Btn>
            <Btn className="bg-surface-2 text-foreground border border-border hover:bg-surface-3">
              Secondary
            </Btn>
            <Btn className="text-foreground hover:bg-accent">
              Ghost
            </Btn>
            <Btn className="text-destructive hover:bg-destructive/10 border border-destructive/30">
              Danger
            </Btn>
          </PreviewBox>
          <CodeSnippet code={`// Primary
<button className="px-3 py-1.5 text-xs font-medium rounded-md bg-foreground text-background hover:bg-foreground/90">

// Secondary
<button className="px-3 py-1.5 text-xs font-medium rounded-md bg-surface-2 text-foreground border border-border hover:bg-surface-3">

// Ghost
<button className="px-3 py-1.5 text-xs font-medium rounded-md text-foreground hover:bg-accent">

// Danger
<button className="px-3 py-1.5 text-xs font-medium rounded-md text-destructive border border-destructive/30 hover:bg-destructive/10">`} />
        </div>
      </DSSection>

      {/* With icons */}
      <DSSection title="With icons" description="Icons go left of the label at 14px (w-3.5 h-3.5). Gap is gap-1.5.">
        <div className="rounded-md border border-border overflow-hidden">
          <PreviewBox>
            <Btn className="bg-foreground text-background hover:bg-foreground/90">
              <Plus className="w-3.5 h-3.5" /> New issue
            </Btn>
            <Btn className="bg-surface-2 text-foreground border border-border hover:bg-surface-3">
              <GitBranch className="w-3.5 h-3.5" /> Create branch
            </Btn>
            <Btn className="text-foreground hover:bg-accent">
              Open in app <ExternalLink className="w-3.5 h-3.5" />
            </Btn>
            <Btn className="text-destructive hover:bg-destructive/10 border border-destructive/30">
              <Trash2 className="w-3.5 h-3.5" /> Delete
            </Btn>
          </PreviewBox>
          <CodeSnippet code={`<button className="...flex items-center gap-1.5...">
  <Plus className="w-3.5 h-3.5" />
  New issue
</button>`} />
        </div>
      </DSSection>

      {/* Icon-only */}
      <DSSection title="Icon only" description="Square icon buttons. Use aria-label for accessibility.">
        <div className="rounded-md border border-border overflow-hidden">
          <PreviewBox>
            <button aria-label="Add" className="w-7 h-7 flex items-center justify-center rounded-md text-muted-foreground hover:text-foreground hover:bg-accent transition-colors cursor-pointer">
              <Plus className="w-4 h-4" />
            </button>
            <button aria-label="More options" className="w-7 h-7 flex items-center justify-center rounded-md bg-surface-2 border border-border text-muted-foreground hover:text-foreground hover:bg-surface-3 transition-colors cursor-pointer">
              <MoreHorizontal className="w-4 h-4" />
            </button>
            <button aria-label="Delete" className="w-7 h-7 flex items-center justify-center rounded-md text-destructive/70 hover:text-destructive hover:bg-destructive/10 transition-colors cursor-pointer">
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          </PreviewBox>
          <CodeSnippet code={`<button aria-label="Add"
  className="w-7 h-7 flex items-center justify-center rounded-md
             text-muted-foreground hover:text-foreground hover:bg-accent">`} />
        </div>
      </DSSection>

      {/* States */}
      <DSSection title="States" description="Loading uses a spinner; success shows a check. Disabled reduces opacity.">
        <div className="rounded-md border border-border overflow-hidden">
          <PreviewBox>
            <Btn disabled className="bg-foreground text-background">
              Disabled
            </Btn>
            <button
              onClick={handleSave}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md bg-foreground text-background hover:bg-foreground/90 transition-colors cursor-pointer min-w-[80px] justify-center"
            >
              {loading ? (
                <><Loader2 className="w-3.5 h-3.5 animate-spin" /> Saving...</>
              ) : saved ? (
                <><Check className="w-3.5 h-3.5" /> Saved</>
              ) : (
                <>Save changes</>
              )}
            </button>
          </PreviewBox>
          <CodeSnippet code={`// Disabled
<button disabled className="... opacity-40 pointer-events-none">

// Loading state
<button>
  {loading ? <><Loader2 className="w-3.5 h-3.5 animate-spin" /> Saving...</> : 'Save changes'}
</button>`} />
        </div>
      </DSSection>

      {/* Button group */}
      <DSSection title="Button group" description="Joined buttons for segmented controls and toolbar clusters.">
        <div className="rounded-md border border-border overflow-hidden">
          <PreviewBox>
            <div className="inline-flex rounded-md overflow-hidden border border-border">
              {['Board', 'List', 'Timeline'].map((label, i) => (
                <button
                  key={label}
                  className={`px-3 py-1.5 text-xs font-medium transition-colors cursor-pointer border-r border-border last:border-r-0 ${
                    i === 1
                      ? 'bg-surface-3 text-foreground'
                      : 'bg-surface-1 text-muted-foreground hover:bg-surface-2 hover:text-foreground'
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>

            <div className="inline-flex items-center gap-1 bg-surface-1 border border-border rounded-md p-1">
              {[
                { icon: Plus, label: 'Add' },
                { icon: ArrowRight, label: 'Forward' },
                { icon: Trash2, label: 'Delete' },
              ].map(({ icon: Icon, label }) => (
                <button key={label} aria-label={label} className="w-6 h-6 flex items-center justify-center rounded text-muted-foreground hover:text-foreground hover:bg-surface-3 transition-colors cursor-pointer">
                  <Icon className="w-3.5 h-3.5" />
                </button>
              ))}
            </div>
          </PreviewBox>
          <CodeSnippet code={`// Segmented control
<div className="inline-flex rounded-md overflow-hidden border border-border">
  <button className="px-3 py-1.5 text-xs bg-surface-1 ...">Board</button>
  <button className="px-3 py-1.5 text-xs bg-surface-3 ...">List</button>
</div>`} />
        </div>
      </DSSection>
    </DSLayout>
  )
}
