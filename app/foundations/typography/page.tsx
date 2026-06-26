import { DSLayout } from '@/components/ds/ds-layout'
import { DSSection } from '@/components/ds/ds-section'

const typeScale = [
  { name: 'Display', size: '2.25rem', weight: '600', lineHeight: '1.2', tracking: '-0.025em', class: 'text-4xl font-semibold tracking-tight', sample: 'Make product operations self-driving' },
  { name: 'Heading 1', size: '1.5rem', weight: '600', lineHeight: '1.25', tracking: '-0.02em', class: 'text-2xl font-semibold tracking-tight', sample: 'Build faster with AI workflows' },
  { name: 'Heading 2', size: '1.25rem', weight: '600', lineHeight: '1.3', tracking: '-0.015em', class: 'text-xl font-semibold tracking-tight', sample: 'Cycles & project planning' },
  { name: 'Heading 3', size: '1.125rem', weight: '600', lineHeight: '1.4', tracking: '-0.01em', class: 'text-lg font-semibold', sample: 'Issue tracking at scale' },
  { name: 'Body Large', size: '0.9375rem', weight: '400', lineHeight: '1.6', tracking: '0', class: 'text-[15px] leading-relaxed', sample: 'Linear is purpose-built for modern product teams with AI at its core.' },
  { name: 'Body', size: '0.875rem', weight: '400', lineHeight: '1.6', tracking: '0', class: 'text-sm leading-relaxed', sample: 'Assign, comment, and ship. Keyboard shortcuts for everything.' },
  { name: 'Body Small', size: '0.8125rem', weight: '400', lineHeight: '1.5', tracking: '0', class: 'text-[13px]', sample: 'Updated 3 minutes ago · ENG-2451' },
  { name: 'Caption', size: '0.75rem', weight: '400', lineHeight: '1.4', tracking: '0', class: 'text-xs text-muted-foreground', sample: 'In Progress · High Priority · Assigned to you' },
  { name: 'Label', size: '0.6875rem', weight: '600', lineHeight: '1', tracking: '0.08em', class: 'text-[11px] font-semibold uppercase tracking-wider text-muted-foreground', sample: 'Components · Foundations · Patterns' },
]

const weights = [
  { name: 'Regular', weight: '400', class: 'font-normal', sample: 'The quick brown fox jumps over the lazy dog.' },
  { name: 'Medium', weight: '500', class: 'font-medium', sample: 'The quick brown fox jumps over the lazy dog.' },
  { name: 'Semibold', weight: '600', class: 'font-semibold', sample: 'The quick brown fox jumps over the lazy dog.' },
  { name: 'Bold', weight: '700', class: 'font-bold', sample: 'The quick brown fox jumps over the lazy dog.' },
]

export default function TypographyPage() {
  return (
    <DSLayout
      title="Typography"
      description="Linear uses Geist Sans for UI and Geist Mono for code. The scale is compact and purposeful — no decorative typefaces, no visual noise."
    >
      {/* Fonts */}
      <DSSection
        title="Typefaces"
        description="Two fonts — zero exceptions."
      >
        <div className="grid grid-cols-2 gap-3">
          <div className="p-5 rounded-md border border-border bg-surface-1">
            <p className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground mb-3">Sans — UI text</p>
            <p className="font-sans text-2xl font-semibold text-foreground tracking-tight">Geist Sans</p>
            <p className="font-sans text-sm text-muted-foreground mt-1 leading-relaxed">
              AaBbCcDdEeFfGgHhIiJjKkLlMmNnOoPpQqRrSsTtUuVvWwXxYyZz
            </p>
            <p className="font-sans text-xs text-muted-foreground/60 mt-2">0123456789 !@#$%^&*()</p>
          </div>
          <div className="p-5 rounded-md border border-border bg-surface-1">
            <p className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground mb-3">Mono — code & IDs</p>
            <p className="font-mono text-2xl font-semibold text-foreground tracking-tight">Geist Mono</p>
            <p className="font-mono text-sm text-muted-foreground mt-1 leading-relaxed">
              AaBbCcDdEeFfGgHhIiJj 0123456789
            </p>
            <p className="font-mono text-xs text-muted-foreground/60 mt-2">ENG-2451 · const x = () =&gt; {}</p>
          </div>
        </div>
      </DSSection>

      {/* Type scale */}
      <DSSection
        title="Type scale"
        description="All sizes in rem, relative to the 16px browser default."
      >
        <div className="rounded-md border border-border overflow-hidden">
          <div className="grid grid-cols-[120px_60px_70px_80px_1fr] gap-4 px-4 py-2.5 bg-surface-2 border-b border-border">
            {['Name', 'Size', 'Weight', 'Leading', 'Preview'].map((h) => (
              <p key={h} className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">{h}</p>
            ))}
          </div>
          {typeScale.map((row) => (
            <div key={row.name} className="grid grid-cols-[120px_60px_70px_80px_1fr] gap-4 px-4 py-3.5 border-b border-border last:border-0 bg-surface-1 items-center">
              <p className="text-xs text-muted-foreground">{row.name}</p>
              <p className="text-xs font-mono text-muted-foreground">{row.size}</p>
              <p className="text-xs font-mono text-muted-foreground">{row.weight}</p>
              <p className="text-xs font-mono text-muted-foreground">{row.lineHeight}</p>
              <p className={row.class + ' text-foreground truncate'}>{row.sample}</p>
            </div>
          ))}
        </div>
      </DSSection>

      {/* Weights */}
      <DSSection
        title="Font weights"
        description="Only 4 weights — any more creates visual hierarchy confusion."
      >
        <div className="space-y-1">
          {weights.map((w) => (
            <div key={w.name} className="flex items-center gap-6 py-3 border-b border-border last:border-0">
              <div className="w-20 shrink-0">
                <p className="text-xs text-muted-foreground">{w.name}</p>
                <p className="text-[10px] font-mono text-muted-foreground/60">{w.weight}</p>
              </div>
              <p className={`text-sm text-foreground ${w.class}`}>{w.sample}</p>
            </div>
          ))}
        </div>
      </DSSection>

      {/* Usage */}
      <DSSection
        title="Rendering"
        description="Always enable antialiasing and optical ligatures."
      >
        <div className="p-4 rounded-md bg-surface-1 border border-border">
          <pre className="font-mono text-[11px] text-muted-foreground leading-relaxed">{`body {
  font-family: 'Geist Sans', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  font-feature-settings: "rlig" 1, "calt" 1;
}

code, pre, .id-label {
  font-family: 'Geist Mono', monospace;
}`}</pre>
        </div>
      </DSSection>
    </DSLayout>
  )
}
