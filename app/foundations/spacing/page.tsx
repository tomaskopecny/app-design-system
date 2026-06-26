import { DSLayout } from '@/components/ds/ds-layout'
import { DSSection } from '@/components/ds/ds-section'

const scale = [
  { token: '0', px: '0px', rem: '0' },
  { token: '0.5', px: '2px', rem: '0.125rem' },
  { token: '1', px: '4px', rem: '0.25rem' },
  { token: '1.5', px: '6px', rem: '0.375rem' },
  { token: '2', px: '8px', rem: '0.5rem' },
  { token: '2.5', px: '10px', rem: '0.625rem' },
  { token: '3', px: '12px', rem: '0.75rem' },
  { token: '3.5', px: '14px', rem: '0.875rem' },
  { token: '4', px: '16px', rem: '1rem' },
  { token: '5', px: '20px', rem: '1.25rem' },
  { token: '6', px: '24px', rem: '1.5rem' },
  { token: '7', px: '28px', rem: '1.75rem' },
  { token: '8', px: '32px', rem: '2rem' },
  { token: '10', px: '40px', rem: '2.5rem' },
  { token: '12', px: '48px', rem: '3rem' },
  { token: '14', px: '56px', rem: '3.5rem' },
  { token: '16', px: '64px', rem: '4rem' },
  { token: '20', px: '80px', rem: '5rem' },
  { token: '24', px: '96px', rem: '6rem' },
]

const usageExamples = [
  { context: 'Icon gap in button', value: 'gap-1.5 (6px)', note: 'Tight coupling between icon and label' },
  { context: 'List item padding', value: 'px-3 py-1.5 (12×6px)', note: 'Dense row height in issue lists' },
  { context: 'Card padding', value: 'p-4 (16px)', note: 'Standard card interior spacing' },
  { context: 'Section gap', value: 'space-y-8 (32px)', note: 'Between DSSection blocks' },
  { context: 'Page padding', value: 'px-8 py-6 (32×24px)', note: 'Main content container insets' },
  { context: 'Sidebar width', value: 'w-56 (224px)', note: 'Fixed sidebar — not spacing but scale-derived' },
]

export default function SpacingPage() {
  return (
    <DSLayout
      title="Spacing"
      description="All spacing uses the Tailwind 4px-base scale. Linear's UI is dense — prefer smaller steps (1–6) for component internals and larger ones (8–16) for layout sections."
    >
      <DSSection
        title="Visual scale"
        description="Each row shows the physical width of a spacing step."
      >
        <div className="rounded-md border border-border overflow-hidden">
          <div className="grid grid-cols-[80px_80px_120px_1fr] gap-4 px-4 py-2.5 bg-surface-2 border-b border-border">
            {['Token', 'px', 'rem', 'Visual'].map((h) => (
              <p key={h} className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">{h}</p>
            ))}
          </div>
          <div className="bg-surface-1">
            {scale.map((row) => (
              <div key={row.token} className="grid grid-cols-[80px_80px_120px_1fr] gap-4 px-4 py-2 border-b border-border last:border-0 items-center">
                <code className="text-xs font-mono text-foreground">{row.token}</code>
                <code className="text-xs font-mono text-muted-foreground">{row.px}</code>
                <code className="text-xs font-mono text-muted-foreground">{row.rem}</code>
                <div className="flex items-center">
                  <div
                    className="h-2.5 rounded-sm bg-foreground/20"
                    style={{ width: row.px === '0px' ? '2px' : row.px }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </DSSection>

      <DSSection
        title="Usage guide"
        description="Recommended spacing values for common UI contexts in Linear-style products."
      >
        <div className="rounded-md border border-border overflow-hidden">
          <div className="grid grid-cols-[220px_200px_1fr] gap-4 px-4 py-2.5 bg-surface-2 border-b border-border">
            {['Context', 'Value', 'Note'].map((h) => (
              <p key={h} className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">{h}</p>
            ))}
          </div>
          <div className="bg-surface-1">
            {usageExamples.map((row) => (
              <div key={row.context} className="grid grid-cols-[220px_200px_1fr] gap-4 px-4 py-3 border-b border-border last:border-0 items-start">
                <p className="text-xs text-foreground">{row.context}</p>
                <code className="text-xs font-mono text-muted-foreground">{row.value}</code>
                <p className="text-xs text-muted-foreground">{row.note}</p>
              </div>
            ))}
          </div>
        </div>
      </DSSection>

      <DSSection title="Principles">
        <div className="grid grid-cols-3 gap-3">
          {[
            ['Dense by default', 'Linear is a tool app, not a marketing site. Use compact spacing (py-1.5 for rows, p-4 for cards) as your baseline.'],
            ['Consistent scale only', 'Never use arbitrary pixel values. Every spacing value must come from the 4px scale (p-[13px] is banned).'],
            ['Hierarchy through gaps', 'Increase gap to signal separation of concern. Items in the same group: gap-1 or gap-2. Separate sections: gap-6+.'],
          ].map(([title, body]) => (
            <div key={title} className="p-4 rounded-md border border-border bg-surface-1 space-y-1">
              <p className="text-xs font-semibold text-foreground">{title}</p>
              <p className="text-xs text-muted-foreground leading-relaxed">{body}</p>
            </div>
          ))}
        </div>
      </DSSection>
    </DSLayout>
  )
}
