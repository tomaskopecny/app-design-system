'use client'

import { DSLayout } from '@/components/ds/ds-layout'
import { DSSection, DSPreview } from '@/components/ds/ds-section'

const LAYERS = [
  {
    name: 'Base',
    zIndex: '0',
    token: '--background',
    color: 'bg-background',
    shadow: '',
    uses: 'Page background, main content area',
    example: 'body, main, content containers',
  },
  {
    name: 'Raised',
    zIndex: '10',
    token: '--surface-1 / --card',
    color: 'bg-surface-1',
    shadow: 'shadow-sm',
    uses: 'Cards, inline panels, issue rows',
    example: 'IssueRow, CycleCard, KanbanCard',
  },
  {
    name: 'Overlay',
    zIndex: '20',
    token: '--surface-2',
    color: 'bg-surface-2',
    shadow: 'shadow-md',
    uses: 'Hover panels, inline dropdowns, sub-menus',
    example: 'Grouping headers, sticky toolbar',
  },
  {
    name: 'Sticky',
    zIndex: '30',
    token: '--sidebar',
    color: 'bg-sidebar',
    shadow: 'shadow-md',
    uses: 'Sidebar, top navigation bar, sticky table headers',
    example: 'DSSidebar, DSLayout header',
  },
  {
    name: 'Popover',
    zIndex: '50',
    token: '--popover',
    color: 'bg-popover',
    shadow: 'shadow-xl',
    uses: 'Dropdown menus, popovers, command palette',
    example: 'CommandPalette, ContextMenu, Popover',
  },
  {
    name: 'Modal',
    zIndex: '60',
    token: '--popover',
    color: 'bg-popover',
    shadow: 'shadow-2xl',
    uses: 'Blocking dialogs, full-screen sheets',
    example: 'Modal, Drawer, DualMonthPicker',
  },
  {
    name: 'Toast',
    zIndex: '70',
    token: '--popover',
    color: 'bg-popover',
    shadow: 'shadow-xl',
    uses: 'Notification toasts — must appear above all other layers',
    example: 'Toast, Snackbar',
  },
]

export default function ElevationPage() {
  return (
    <DSLayout
      title="Elevation"
      description="The layer model defines z-index stacking contexts and background surfaces for every UI layer. Consistent layering prevents z-index conflicts and makes the depth hierarchy predictable."
    >
      <DSSection title="Layer stack" description="Seven layers from the page background to the topmost toast. Each layer has a defined z-index range, surface token, and shadow.">
        <div className="space-y-2">
          {[...LAYERS].reverse().map((layer) => (
            <div
              key={layer.name}
              className="flex items-center gap-4 p-3 rounded-md border border-border bg-surface-1"
              style={{ zIndex: 0 }}
            >
              {/* Surface swatch */}
              <div className={`w-10 h-10 rounded-sm border border-border shrink-0 ${layer.color} ${layer.shadow}`} aria-hidden="true" />
              {/* Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-semibold text-foreground">{layer.name}</span>
                  <code className="text-[10px] text-muted-foreground font-mono px-1.5 py-0.5 rounded-sm bg-surface-2 border border-border">z-{layer.zIndex}</code>
                  <code className="text-[10px] text-muted-foreground font-mono px-1.5 py-0.5 rounded-sm bg-surface-2 border border-border">{layer.shadow || 'no shadow'}</code>
                </div>
                <p className="text-[11px] text-muted-foreground mt-0.5">{layer.uses}</p>
              </div>
              {/* Token */}
              <code className="shrink-0 text-[10px] text-muted-foreground font-mono hidden md:block">{layer.token}</code>
            </div>
          ))}
        </div>
      </DSSection>

      <DSSection title="Layer reference table" description="Full reference with z-index values, tokens, shadows, and component examples.">
        <div className="rounded-md border border-border overflow-hidden">
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b border-border bg-surface-2">
                {['Layer', 'z-index', 'Surface token', 'Shadow', 'Examples'].map(h => (
                  <th key={h} className="text-left px-4 py-2.5 font-medium text-muted-foreground">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {LAYERS.map(l => (
                <tr key={l.name} className="border-b border-border last:border-0">
                  <td className="px-4 py-2.5 font-semibold text-foreground">{l.name}</td>
                  <td className="px-4 py-2.5 font-mono text-muted-foreground">{l.zIndex}</td>
                  <td className="px-4 py-2.5 font-mono text-muted-foreground text-[10px]">{l.token}</td>
                  <td className="px-4 py-2.5 font-mono text-muted-foreground">{l.shadow || '—'}</td>
                  <td className="px-4 py-2.5 text-muted-foreground">{l.example}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </DSSection>

      <DSSection title="Escape hatch rules" description="When and how to deviate from the standard layer stack.">
        <div className="rounded-md border border-border overflow-hidden">
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b border-border bg-surface-2">
                <th className="text-left px-4 py-2.5 font-medium text-muted-foreground">Rule</th>
                <th className="text-left px-4 py-2.5 font-medium text-muted-foreground">Reasoning</th>
              </tr>
            </thead>
            <tbody>
              {[
                ['Never use z-index values between layers', 'Causes unpredictable stacking when two components share the same range'],
                ['Modals create their own stacking context', 'Use isolation: isolate on the modal root to prevent child z-index leaks'],
                ['Toasts are always on top', 'z-70 is reserved — do not add any component above it'],
                ['Avoid position: fixed inside overflow: hidden', 'Fixed children escape clip, use portals (teleports) instead'],
                ['Use shadow to reinforce depth, not replace z-index', 'Shadow is decorative; z-index controls actual stacking'],
              ].map(([rule, reason]) => (
                <tr key={rule} className="border-b border-border last:border-0">
                  <td className="px-4 py-2.5 font-medium text-foreground">{rule}</td>
                  <td className="px-4 py-2.5 text-muted-foreground">{reason}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </DSSection>
    </DSLayout>
  )
}
