'use client'

import { DSLayout } from '@/components/ds/ds-layout'
import { DSSection } from '@/components/ds/ds-section'
import { useState } from 'react'
import { Plus, Trash2, Settings } from 'lucide-react'

function Tooltip({ label, shortcut, children }: { label: string; shortcut?: string; children: React.ReactNode }) {
  const [visible, setVisible] = useState(false)

  return (
    <div className="relative inline-flex" onMouseEnter={() => setVisible(true)} onMouseLeave={() => setVisible(false)}>
      {children}
      {visible && (
        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 z-50 pointer-events-none">
          <div className="flex items-center gap-1.5 px-2 py-1 rounded bg-foreground text-background text-[11px] font-medium whitespace-nowrap shadow-[0_2px_6px_rgba(0,0,0,0.45)]">
            {label}
            {shortcut && (
              <kbd className="px-1 py-0.5 rounded text-[10px] font-mono bg-background/20 text-background/80">{shortcut}</kbd>
            )}
          </div>
          {/* Arrow */}
          <div className="flex justify-center">
            <div className="w-2 h-1 overflow-hidden">
              <div className="w-2 h-2 bg-foreground rotate-45 -translate-y-1 mx-auto" />
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default function TooltipsPage() {
  return (
    <DSLayout
      title="Tooltips"
      description="Tooltips are small, high-contrast overlays that appear on hover. Linear uses dark (--foreground) fills so they stand out on the near-black UI."
    >
      <DSSection title="Default tooltip" description="Hover any element below to see the tooltip.">
        <div className="p-6 bg-surface-1 flex flex-wrap gap-4 items-center rounded-md border border-border">
          <Tooltip label="Create new issue" shortcut="C">
            <button className="w-7 h-7 flex items-center justify-center rounded-md bg-surface-2 border border-border text-muted-foreground hover:text-foreground hover:bg-surface-3 cursor-pointer transition-colors">
              <Plus className="w-4 h-4" />
            </button>
          </Tooltip>

          <Tooltip label="Delete">
            <button className="w-7 h-7 flex items-center justify-center rounded-md text-muted-foreground hover:text-destructive hover:bg-destructive/10 cursor-pointer transition-colors border border-border">
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          </Tooltip>

          <Tooltip label="Settings" shortcut="⌘,">
            <button className="w-7 h-7 flex items-center justify-center rounded-md text-muted-foreground hover:text-foreground hover:bg-accent cursor-pointer transition-colors">
              <Settings className="w-3.5 h-3.5" />
            </button>
          </Tooltip>
        </div>
      </DSSection>

      <DSSection title="Anatomy" description="Structure of a tooltip with optional keyboard shortcut badge.">
        <div className="p-6 bg-surface-1 rounded-md border border-border flex items-center justify-center gap-16">
          {/* Tooltip only */}
          <div className="flex flex-col items-center gap-2">
            <div className="flex items-center gap-1.5 px-2 py-1 rounded bg-foreground text-background text-[11px] font-medium shadow-[0_2px_6px_rgba(0,0,0,0.45)]">
              Create new issue
            </div>
            <p className="text-[10px] text-muted-foreground">Label only</p>
          </div>

          {/* Tooltip + shortcut */}
          <div className="flex flex-col items-center gap-2">
            <div className="flex items-center gap-1.5 px-2 py-1 rounded bg-foreground text-background text-[11px] font-medium shadow-[0_2px_6px_rgba(0,0,0,0.45)]">
              Create new issue
              <kbd className="px-1 py-0.5 rounded text-[10px] font-mono bg-background/20 text-background/80">C</kbd>
            </div>
            <p className="text-[10px] text-muted-foreground">Label + shortcut</p>
          </div>
        </div>
      </DSSection>

      <DSSection title="Code">
        <div className="p-4 rounded-md bg-surface-1 border border-border">
          <pre className="font-mono text-[11px] text-muted-foreground leading-relaxed overflow-x-auto">{`// Tooltip with label + optional shortcut
<div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 z-50 pointer-events-none">
  <div className="flex items-center gap-1.5 px-2 py-1 rounded
    bg-foreground text-background text-[11px] font-medium whitespace-nowrap
    shadow-[0_2px_6px_rgba(0,0,0,0.45)]">
    {label}
    {shortcut && (
      <kbd className="px-1 py-0.5 rounded text-[10px] font-mono bg-background/20 text-background/80">
        {shortcut}
      </kbd>
    )}
  </div>
</div>`}</pre>
        </div>
      </DSSection>
    </DSLayout>
  )
}
