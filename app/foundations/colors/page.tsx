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

const SCALES: { name: string; prefix: string; hue: number; chroma: number }[] = [
  { name: 'Gray',   prefix: '--gray',   hue: 0,   chroma: 0    },
  { name: 'Blue',   prefix: '--blue',   hue: 255, chroma: 0.18 },
  { name: 'Green',  prefix: '--green',  hue: 145, chroma: 0.16 },
  { name: 'Red',    prefix: '--red',    hue: 25,  chroma: 0.22 },
  { name: 'Orange', prefix: '--orange', hue: 50,  chroma: 0.19 },
  { name: 'Yellow', prefix: '--yellow', hue: 95,  chroma: 0.17 },
  { name: 'Purple', prefix: '--purple', hue: 295, chroma: 0.20 },
]

// Lightness values for steps 100–900 (mirrors globals.css)
const LIGHTNESS: Record<number, number> = {
  100: 0.97, 200: 0.88, 300: 0.75, 400: 0.62, 500: 0.50,
  600: 0.38, 700: 0.27, 800: 0.18, 900: 0.11,
}
// For colored scales the mid-stop lightness matches globals.css per-hue
const LIGHTNESS_COLORED: Record<string, Record<number, number>> = {
  Blue:   { 100: 0.92, 200: 0.83, 300: 0.74, 400: 0.65, 500: 0.57, 600: 0.48, 700: 0.38, 800: 0.28, 900: 0.18 },
  Green:  { 100: 0.93, 200: 0.84, 300: 0.75, 400: 0.65, 500: 0.56, 600: 0.47, 700: 0.37, 800: 0.27, 900: 0.17 },
  Red:    { 100: 0.93, 200: 0.84, 300: 0.76, 400: 0.68, 500: 0.60, 600: 0.50, 700: 0.40, 800: 0.29, 900: 0.18 },
  Orange: { 100: 0.94, 200: 0.86, 300: 0.78, 400: 0.70, 500: 0.62, 600: 0.52, 700: 0.41, 800: 0.30, 900: 0.19 },
  Yellow: { 100: 0.97, 200: 0.92, 300: 0.87, 400: 0.82, 500: 0.75, 600: 0.64, 700: 0.50, 800: 0.36, 900: 0.22 },
  Purple: { 100: 0.93, 200: 0.84, 300: 0.75, 400: 0.66, 500: 0.57, 600: 0.47, 700: 0.37, 800: 0.27, 900: 0.17 },
}
const STEPS = [100, 200, 300, 400, 500, 600, 700, 800, 900]

function ScaleRow({ scale }: { scale: (typeof SCALES)[0] }) {
  const lightnessMap = scale.name === 'Gray' ? LIGHTNESS : LIGHTNESS_COLORED[scale.name]
  return (
    <div className="space-y-1.5">
      <p className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">{scale.name}</p>
      <div className="flex gap-px overflow-hidden rounded-md border border-border/40">
        {STEPS.map(step => {
          const l = lightnessMap[step]
          const c = scale.name === 'Gray' ? 0 : (step <= 200 ? scale.chroma * 0.33 : step <= 300 ? scale.chroma * 0.66 : step <= 800 ? scale.chroma : scale.chroma * 0.5)
          const bg = `oklch(${l} ${c} ${scale.hue})`
          const labelL = l > 0.55 ? 'oklch(0.10 0 0)' : 'oklch(0.97 0 0)'
          return (
            <div
              key={step}
              className="flex-1 flex flex-col items-center justify-end gap-0.5 py-2 min-h-[64px]"
              style={{ background: bg }}
            >
              <span className="text-[9px] font-semibold tabular-nums" style={{ color: labelL }}>{step}</span>
            </div>
          )
        })}
      </div>
      <div className="flex gap-px">
        {STEPS.map(step => (
          <div key={step} className="flex-1 text-center">
            <code className="text-[9px] text-muted-foreground font-mono">{scale.prefix}-{step}</code>
          </div>
        ))}
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

      {/* Color scales */}
      <DSSection
        title="Color scales"
        description="Each hue runs from 100 (near-white, very light) to 900 (near-black, very dark). Use lower stops for backgrounds and tints, mid stops for icons and badges, upper stops for text on light surfaces."
      >
        <div className="space-y-5">
          {SCALES.map(scale => <ScaleRow key={scale.name} scale={scale} />)}
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
