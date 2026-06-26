'use client'

import { DSLayout } from '@/components/ds/ds-layout'
import { DSSection } from '@/components/ds/ds-section'

const BREAKPOINTS = [
  { name: 'sm', px: 640, cols: 4, gutter: 16, margin: 16, label: 'Mobile landscape' },
  { name: 'md', px: 768, cols: 8, gutter: 16, margin: 24, label: 'Tablet' },
  { name: 'lg', px: 1024, cols: 12, gutter: 24, margin: 32, label: 'Laptop' },
  { name: 'xl', px: 1280, cols: 12, gutter: 24, margin: 40, label: 'Desktop' },
  { name: '2xl', px: 1536, cols: 12, gutter: 32, margin: 64, label: 'Wide' },
]

function GridVisualizer({ cols, label }: { cols: number; label: string }) {
  return (
    <div className="rounded-md border border-border overflow-hidden bg-surface-1">
      <div className="px-4 py-2 border-b border-border bg-surface-2 flex items-center justify-between">
        <span className="text-[11px] font-medium text-foreground">{label}</span>
        <span className="text-[11px] text-muted-foreground">{cols} columns</span>
      </div>
      <div className="p-4">
        <div className="grid gap-2" style={{ gridTemplateColumns: `repeat(${cols}, 1fr)` }}>
          {Array.from({ length: cols }).map((_, i) => (
            <div key={i} className="h-8 rounded-sm bg-status-inprogress/12 border border-status-inprogress/20" aria-hidden="true" />
          ))}
        </div>
      </div>
    </div>
  )
}

function CommonLayouts() {
  return (
    <div className="space-y-3">
      {[
        { label: '12 col full — hero, full-width tables', cols: [12] },
        { label: '8 + 4 col — main content + sidebar', cols: [8, 4] },
        { label: '6 + 6 col — two equal panels', cols: [6, 6] },
        { label: '4 + 4 + 4 col — three-up cards', cols: [4, 4, 4] },
        { label: '3 + 3 + 3 + 3 col — four-up feature grid', cols: [3, 3, 3, 3] },
        { label: '2 + 8 + 2 col — centered reading layout', cols: [2, 8, 2] },
      ].map(({ label, cols }) => (
        <div key={label} className="rounded-md border border-border overflow-hidden bg-surface-1">
          <div className="px-4 py-2 border-b border-border bg-surface-2">
            <span className="text-[11px] text-muted-foreground">{label}</span>
          </div>
          <div className="p-4">
            <div className="grid grid-cols-12 gap-2">
              {cols.map((span, i) => (
                <div
                  key={i}
                  className="h-8 rounded-sm flex items-center justify-center text-[10px] font-medium text-status-inprogress bg-status-inprogress/12 border border-status-inprogress/20"
                  style={{ gridColumn: `span ${span}` }}
                  aria-label={`${span} columns`}
                >
                  {span}
                </div>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default function GridPage() {
  return (
    <DSLayout
      title="Grid System"
      description="A 12-column grid with responsive gutters and page margins. Column counts change at breakpoints; the 12-column base is kept for desktop."
    >
      <DSSection title="Breakpoints" description="Column count, gutter, and margin at each responsive breakpoint.">
        <div className="rounded-md border border-border overflow-hidden">
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b border-border bg-surface-2">
                {['Breakpoint', 'Min width', 'Columns', 'Gutter', 'Margin', 'Label'].map(h => (
                  <th key={h} className="text-left px-4 py-2.5 font-medium text-muted-foreground">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {BREAKPOINTS.map(bp => (
                <tr key={bp.name} className="border-b border-border last:border-0">
                  <td className="px-4 py-2.5 font-mono text-foreground">{bp.name}</td>
                  <td className="px-4 py-2.5 text-muted-foreground">{bp.px}px</td>
                  <td className="px-4 py-2.5 text-foreground font-medium">{bp.cols}</td>
                  <td className="px-4 py-2.5 text-muted-foreground">{bp.gutter}px</td>
                  <td className="px-4 py-2.5 text-muted-foreground">{bp.margin}px</td>
                  <td className="px-4 py-2.5 text-muted-foreground">{bp.label}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </DSSection>

      <DSSection title="Column visualizer" description="Each colored cell represents one grid column. Gutters are shown as gaps between cells.">
        <div className="space-y-3">
          {[
            { cols: 4, label: 'Mobile (sm) — 4 columns' },
            { cols: 8, label: 'Tablet (md) — 8 columns' },
            { cols: 12, label: 'Desktop (lg+) — 12 columns' },
          ].map(({ cols, label }) => (
            <GridVisualizer key={cols} cols={cols} label={label} />
          ))}
        </div>
      </DSSection>

      <DSSection title="Common layouts" description="Standard column compositions used across the design system.">
        <CommonLayouts />
      </DSSection>

      <DSSection title="Usage with Tailwind" description="Tailwind CSS grid classes for the standard 12-column breakpoint-responsive layout.">
        <div className="rounded-md border border-border overflow-hidden bg-surface-1 font-mono text-[12px]">
          <div className="p-4 border-b border-border bg-surface-2">
            <span className="text-[11px] text-muted-foreground">page-layout.tsx</span>
          </div>
          <pre className="p-4 text-foreground leading-relaxed overflow-x-auto">{`// 12-column page grid
<div className="grid grid-cols-4 md:grid-cols-8 lg:grid-cols-12 gap-4 md:gap-6 px-4 md:px-6 lg:px-8">
  {/* 8 + 4 layout */}
  <main className="col-span-4 md:col-span-5 lg:col-span-8">
    ...
  </main>
  <aside className="col-span-4 md:col-span-3 lg:col-span-4">
    ...
  </aside>
</div>

// Centered reading column
<div className="grid grid-cols-12 gap-6 px-8">
  <article className="col-span-12 lg:col-start-3 lg:col-span-8">
    ...
  </article>
</div>`}</pre>
        </div>
      </DSSection>
    </DSLayout>
  )
}
