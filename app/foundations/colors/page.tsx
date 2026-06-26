import { DSLayout } from '@/components/ds/ds-layout'
import { DSSection } from '@/components/ds/ds-section'

function Swatch({ name, variable, hex, textDark = false }: { name: string; variable: string; hex: string; textDark?: boolean }) {
  return (
    <div className="flex flex-col gap-1.5 min-w-0">
      <div
        className="h-12 w-full rounded-md border border-border/40"
        style={{ background: hex }}
      />
      <div>
        <p className={`text-xs font-medium text-foreground`}>{name}</p>
        <p className="text-[10px] text-muted-foreground font-mono">{variable}</p>
        <p className="text-[10px] text-muted-foreground/60 font-mono">{hex}</p>
      </div>
    </div>
  )
}

function TokenRow({ token, value, description }: { token: string; value: string; description: string }) {
  return (
    <div className="flex items-center gap-4 py-2.5 border-b border-border last:border-0">
      <div className="w-5 h-5 rounded shrink-0 border border-border/40" style={{ background: value }} />
      <code className="text-xs font-mono text-foreground w-44 shrink-0">{token}</code>
      <code className="text-xs font-mono text-muted-foreground w-28 shrink-0">{value}</code>
      <p className="text-xs text-muted-foreground">{description}</p>
    </div>
  )
}

export default function ColorsPage() {
  return (
    <DSLayout
      title="Colors"
      description="The Linear color system is built on a near-black base with carefully calibrated neutrals and precise semantic tokens for status, priority, and labels."
    >
      {/* Core palette */}
      <DSSection
        title="Core palette"
        description="The 5-stop neutral palette forms the backbone of every surface."
      >
        <div className="grid grid-cols-5 gap-3">
          <Swatch name="Background" variable="--background" hex="#0F0F11" />
          <Swatch name="Surface 1" variable="--surface-1" hex="#161618" />
          <Swatch name="Surface 2" variable="--surface-2" hex="#1C1C1E" />
          <Swatch name="Surface 3" variable="--surface-3" hex="#242426" />
          <Swatch name="Foreground" variable="--foreground" hex="#F5F5F5" textDark />
        </div>
      </DSSection>

      {/* Semantic tokens */}
      <DSSection
        title="Semantic tokens"
        description="Use these tokens — never raw hex values — so your UI can adapt across contexts."
      >
        <div className="rounded-md border border-border overflow-hidden">
          <div className="flex items-center gap-4 px-4 py-2 bg-surface-2 border-b border-border">
            <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground w-44">Token</p>
            <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground w-28">Value</p>
            <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">Usage</p>
          </div>
          <div className="px-4 bg-surface-1">
            <TokenRow token="--background" value="#0F0F11" description="Page background — the darkest layer" />
            <TokenRow token="--foreground" value="#F5F5F5" description="Primary text on dark backgrounds" />
            <TokenRow token="--muted-foreground" value="#6B6B6B" description="Secondary & placeholder text" />
            <TokenRow token="--border" value="rgba(255,255,255,0.08)" description="Dividers, card borders, separators" />
            <TokenRow token="--card" value="#161618" description="Card and panel backgrounds" />
            <TokenRow token="--popover" value="#1A1A1C" description="Dropdowns, popovers, tooltips" />
            <TokenRow token="--primary" value="#F0F0F0" description="Primary action buttons" />
            <TokenRow token="--accent" value="#1C1C1E" description="Hover / selected state highlight" />
            <TokenRow token="--destructive" value="#E5534B" description="Delete, error and danger states" />
            <TokenRow token="--ring" value="rgba(255,255,255,0.20)" description="Focus ring for keyboard nav" />
          </div>
        </div>
      </DSSection>

      {/* Priority colors */}
      <DSSection
        title="Priority"
        description="Used exclusively to communicate issue priority — never for decorative purposes."
      >
        <div className="grid grid-cols-4 gap-3">
          <Swatch name="Urgent" variable="--priority-urgent" hex="#E5534B" />
          <Swatch name="High" variable="--priority-high" hex="#E07B39" />
          <Swatch name="Medium" variable="--priority-medium" hex="#D4A72C" />
          <Swatch name="Low" variable="--priority-low" hex="#6B6B6B" />
        </div>
      </DSSection>

      {/* Status colors */}
      <DSSection
        title="Status"
        description="Workflow state indicators for issues, PRs, and cycles."
      >
        <div className="grid grid-cols-4 gap-3">
          <Swatch name="Todo" variable="--status-todo" hex="#6B6B6B" />
          <Swatch name="In Progress" variable="--status-inprogress" hex="#4D8EE8" />
          <Swatch name="Done" variable="--status-done" hex="#4CAF7D" />
          <Swatch name="Cancelled" variable="--status-cancelled" hex="#404040" />
        </div>
      </DSSection>

      {/* Label colors */}
      <DSSection
        title="Labels"
        description="Issue label colors. Consistent with priority hues to maintain semantic coherence."
      >
        <div className="grid grid-cols-3 gap-3">
          <Swatch name="Bug" variable="--label-bug" hex="#E5534B" />
          <Swatch name="Feature" variable="--label-feature" hex="#4D8EE8" />
          <Swatch name="Improvement" variable="--label-improvement" hex="#4CAF7D" />
        </div>
      </DSSection>

      {/* Usage rules */}
      <DSSection
        title="Usage rules"
      >
        <div className="grid grid-cols-2 gap-3">
          {[
            ['Always use tokens', 'Never hard-code hex values in components. Reference CSS variables so theming and overrides work automatically.'],
            ['Opacity for layering', 'Use opacity variants (border is white/8%) for borders and overlays instead of a separate gray color.'],
            ['Priority ≠ decoration', 'Urgent red and high orange should only appear on priority badges — not as brand accents or hover colors.'],
            ['Surface layers', 'Stack surfaces by incrementing the level: background → surface-1 → surface-2 → surface-3. Never skip layers.'],
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
