import { DSLayout } from '@/components/ds/ds-layout'
import { DSSection } from '@/components/ds/ds-section'

const radii = [
  { name: 'None', token: 'rounded-none', value: '0px', cssVar: '--radius-sm / 0', usage: 'Hard dividers, code blocks' },
  { name: 'SM', token: 'rounded', value: '3px', cssVar: '--radius-sm', usage: 'Tiny pills, badges, kbd keys' },
  { name: 'MD', token: 'rounded-md', value: '6px', cssVar: '--radius-md', usage: 'Buttons, inputs, menu items — primary radius' },
  { name: 'LG', token: 'rounded-lg', value: '8px', cssVar: '--radius-lg', usage: 'Cards, panels, modal containers' },
  { name: 'XL', token: 'rounded-xl', value: '12px', cssVar: '--radius-xl', usage: 'Large surfaces, sheet overlays' },
  { name: '2XL', token: 'rounded-2xl', value: '16px', cssVar: '--radius-2xl', usage: 'Hero areas, onboarding cards' },
  { name: 'Full', token: 'rounded-full', value: '9999px', cssVar: '--radius-full', usage: 'Avatars, circular icon buttons, dot indicators' },
]

export default function RadiusPage() {
  return (
    <DSLayout
      title="Border Radius"
      description="Linear uses very restrained border radii — the base unit is 6px. Sharp corners signal precision and focus. Use rounded-full only for circular elements."
    >
      <DSSection
        title="Radius scale"
        description="Seven steps from flat to pill. Base token is --radius: 0.375rem (6px)."
      >
        <div className="grid grid-cols-4 gap-3">
          {radii.map((r) => (
            <div key={r.name} className="p-4 border border-border bg-surface-1 rounded-md space-y-3">
              <div
                className="w-full h-16 bg-surface-3 border border-border/60"
                style={{ borderRadius: r.value }}
              />
              <div>
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium text-foreground">{r.name}</p>
                  <code className="text-[10px] font-mono text-muted-foreground">{r.value}</code>
                </div>
                <code className="text-[10px] font-mono text-muted-foreground/60 block mt-0.5">{r.token}</code>
                <p className="text-[11px] text-muted-foreground mt-1.5 leading-relaxed">{r.usage}</p>
              </div>
            </div>
          ))}
        </div>
      </DSSection>

      <DSSection
        title="Applied examples"
        description="See how the radius scale looks on real components."
      >
        <div className="flex flex-wrap items-center gap-4 p-6 rounded-md border border-border bg-surface-1">
          {/* Button */}
          <button className="px-3.5 py-1.5 text-sm font-medium text-background bg-foreground rounded-md">
            Button — md
          </button>
          {/* Badge */}
          <span className="px-2 py-0.5 text-[10px] font-medium rounded bg-surface-3 border border-border text-muted-foreground">
            Badge — sm
          </span>
          {/* Card */}
          <div className="px-4 py-3 rounded-lg border border-border bg-surface-2 text-xs text-muted-foreground">
            Card — lg
          </div>
          {/* Avatar */}
          <div className="w-8 h-8 rounded-full bg-surface-3 border border-border flex items-center justify-center text-xs text-muted-foreground">
            AV
          </div>
          {/* Kbd */}
          <kbd className="px-1.5 py-0.5 text-[10px] font-mono rounded border border-border bg-surface-2 text-muted-foreground">
            ⌘K
          </kbd>
        </div>
      </DSSection>

      <DSSection title="Rules">
        <div className="grid grid-cols-2 gap-3">
          {[
            ['Default to rounded-md', 'Most interactive elements (buttons, inputs, menu items) use the base 6px radius. When in doubt, use rounded-md.'],
            ['Never mix radius levels in one component', 'A card is rounded-lg on all sides. Don\'t mix rounded-tl-md with rounded-br-xl on the same element.'],
            ['Avatars are always round', 'User images, workspace icons, and bot avatars always use rounded-full. No exceptions.'],
            ['Flat for data', 'Tables, code blocks and structured data use rounded-none or minimal radius to feel precise and scannable.'],
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
