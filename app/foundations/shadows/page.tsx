import { DSLayout } from '@/components/ds/ds-layout'
import { DSSection } from '@/components/ds/ds-section'

const shadows = [
  {
    name: 'None',
    class: '',
    css: 'none',
    usage: 'Flat elements, code blocks, data tables',
    style: {},
  },
  {
    name: 'XS',
    class: 'shadow-[0_1px_2px_rgba(0,0,0,0.4)]',
    css: '0 1px 2px rgba(0,0,0,0.4)',
    usage: 'Subtle lift for inline chips, kbd keys',
    style: { boxShadow: '0 1px 2px rgba(0,0,0,0.4)' },
  },
  {
    name: 'SM',
    class: 'shadow-[0_2px_6px_rgba(0,0,0,0.45)]',
    css: '0 2px 6px rgba(0,0,0,0.45)',
    usage: 'Cards, popovers, tooltips — default elevation',
    style: { boxShadow: '0 2px 6px rgba(0,0,0,0.45)' },
  },
  {
    name: 'MD',
    class: 'shadow-[0_4px_16px_rgba(0,0,0,0.5)]',
    css: '0 4px 16px rgba(0,0,0,0.5)',
    usage: 'Dropdowns, context menus, date pickers',
    style: { boxShadow: '0 4px 16px rgba(0,0,0,0.5)' },
  },
  {
    name: 'LG',
    class: 'shadow-[0_8px_32px_rgba(0,0,0,0.6)]',
    css: '0 8px 32px rgba(0,0,0,0.6)',
    usage: 'Modals, command palette, sheet overlays',
    style: { boxShadow: '0 8px 32px rgba(0,0,0,0.6)' },
  },
  {
    name: 'Inset',
    class: 'shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]',
    css: 'inset 0 1px 0 rgba(255,255,255,0.06)',
    usage: 'Gives buttons and inputs a subtle top-edge highlight',
    style: { boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.06)' },
  },
]

export default function ShadowsPage() {
  return (
    <DSLayout
      title="Shadows"
      description="On dark backgrounds, shadows are pure black at increasing opacity. There are no colored shadows. Combine with border tokens for maximum legibility."
    >
      <DSSection
        title="Elevation scale"
        description="Six levels — use the minimum elevation needed to communicate layering."
      >
        <div className="grid grid-cols-3 gap-4">
          {shadows.map((s) => (
            <div key={s.name} className="p-5 border border-border bg-surface-1 rounded-md space-y-4">
              <div
                className="w-full h-20 rounded-md border border-border/40 bg-surface-2"
                style={s.style}
              />
              <div>
                <div className="flex items-center justify-between mb-1">
                  <p className="text-sm font-medium text-foreground">{s.name}</p>
                </div>
                <code className="text-[10px] font-mono text-muted-foreground/60 block break-all">{s.css}</code>
                <p className="text-[11px] text-muted-foreground mt-2 leading-relaxed">{s.usage}</p>
              </div>
            </div>
          ))}
        </div>
      </DSSection>

      <DSSection
        title="Layer stack"
        description="Each UI layer combines border + background + shadow for clear visual hierarchy."
      >
        <div className="relative p-8 rounded-md border border-border bg-background overflow-hidden">
          {/* Background */}
          <div className="absolute inset-0 bg-background" />
          {/* Card */}
          <div
            className="relative mx-auto max-w-sm p-4 rounded-lg border border-border bg-surface-1"
            style={{ boxShadow: '0 2px 6px rgba(0,0,0,0.45)' }}
          >
            <p className="text-xs text-muted-foreground mb-3">Card (SM shadow)</p>
            {/* Popover */}
            <div
              className="ml-4 p-3 rounded-md border border-border bg-popover"
              style={{ boxShadow: '0 4px 16px rgba(0,0,0,0.5)' }}
            >
              <p className="text-xs text-muted-foreground mb-2">Dropdown (MD shadow)</p>
              {/* Tooltip */}
              <div
                className="ml-4 px-2.5 py-1.5 rounded border border-border bg-surface-3 inline-block"
                style={{ boxShadow: '0 1px 2px rgba(0,0,0,0.4)' }}
              >
                <p className="text-[10px] text-foreground">Tooltip (XS shadow)</p>
              </div>
            </div>
          </div>
        </div>
      </DSSection>

      <DSSection title="Rules">
        <div className="grid grid-cols-2 gap-3">
          {[
            ['Dark = deeper shadows', 'On near-black backgrounds, standard Tailwind shadows are invisible. Always use the custom higher-opacity shadows defined in this system.'],
            ['Border + shadow together', 'Cards and popups should use border AND shadow — the border provides crisp edge definition, the shadow provides depth.'],
            ['Never color shadows', 'No blue-tinted or purple-tinted glow effects. Shadows are always rgba(0,0,0,x) only.'],
            ['Inset for interactivity', 'Add the inset highlight shadow to buttons in their default state. Remove it on :active to simulate pressing.'],
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
