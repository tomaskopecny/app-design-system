'use client'

import { DSLayout } from '@/components/ds/ds-layout'
import { DSSection, DSPreview } from '@/components/ds/ds-section'

function Kbd({ children }: { children: React.ReactNode }) {
  return (
    <kbd className="inline-flex items-center justify-center px-1.5 py-0.5 min-w-[20px] h-5 text-[11px] font-mono font-medium text-muted-foreground bg-surface-2 border border-border rounded-[4px] leading-none shadow-[0_1px_0_0_var(--color-border)]">
      {children}
    </kbd>
  )
}

function KbdCombo({ keys }: { keys: string[] }) {
  return (
    <span className="inline-flex items-center gap-0.5">
      {keys.map((k, i) => <Kbd key={i}>{k}</Kbd>)}
    </span>
  )
}

function ShortcutRow({ action, keys, category }: { action: string; keys: string[]; category?: string }) {
  return (
    <div className="flex items-center justify-between py-2 border-b border-border last:border-0">
      <div className="flex items-center gap-3">
        {category && (
          <span className="text-[10px] font-medium text-muted-foreground/50 w-16 uppercase tracking-wide">{category}</span>
        )}
        <span className="text-xs text-foreground">{action}</span>
      </div>
      <KbdCombo keys={keys} />
    </div>
  )
}

const shortcuts = {
  navigation: [
    { action: 'Open command palette', keys: ['⌘', 'K'] },
    { action: 'Go to inbox', keys: ['G', 'I'] },
    { action: 'Go to my issues', keys: ['G', 'M'] },
    { action: 'Go to all issues', keys: ['G', 'A'] },
    { action: 'Go to projects', keys: ['G', 'P'] },
    { action: 'Go to settings', keys: ['G', 'S'] },
  ],
  issues: [
    { action: 'Create new issue', keys: ['C'] },
    { action: 'Create new issue (modal)', keys: ['⌘', 'I'] },
    { action: 'Set priority urgent', keys: ['⌥', '1'] },
    { action: 'Set priority high', keys: ['⌥', '2'] },
    { action: 'Set priority medium', keys: ['⌥', '3'] },
    { action: 'Set priority low', keys: ['⌥', '4'] },
    { action: 'Close / cancel', keys: ['Esc'] },
    { action: 'Delete issue', keys: ['⌘', '⌫'] },
  ],
  views: [
    { action: 'Switch to list view', keys: ['⌘', '1'] },
    { action: 'Switch to board view', keys: ['⌘', '2'] },
    { action: 'Switch to timeline', keys: ['⌘', '3'] },
    { action: 'Toggle sidebar', keys: ['⌘', '\\'] },
    { action: 'Search', keys: ['/'] },
  ],
}

export default function KbdPage() {
  return (
    <DSLayout
      title="Keyboard Shortcuts"
      description="Linear is built for keyboard-first workflows. The <kbd> element renders monospaced keys with a subtle 3D press shadow. Always pair shortcuts with tooltips and the command palette."
    >
      <DSSection title="Kbd element" description="Single keys, modifier combos, and special characters.">
        <DSPreview code={`<kbd className="inline-flex items-center px-1.5 py-0.5 min-w-[20px] h-5
  text-[11px] font-mono font-medium text-muted-foreground
  bg-surface-2 border border-border rounded-[4px]
  shadow-[0_1px_0_0_var(--color-border)]">
  ⌘
</kbd>`}>
          <div className="flex flex-wrap items-center gap-3">
            <KbdCombo keys={['⌘', 'K']} />
            <KbdCombo keys={['⌘', 'I']} />
            <KbdCombo keys={['G', 'I']} />
            <KbdCombo keys={['Esc']} />
            <KbdCombo keys={['⌥', '1']} />
            <KbdCombo keys={['⌘', '⌫']} />
            <KbdCombo keys={['⌘', '\\']} />
            <KbdCombo keys={['Tab']} />
            <KbdCombo keys={['↑']} />
            <KbdCombo keys={['↓']} />
            <KbdCombo keys={['↵']} />
          </div>
        </DSPreview>
      </DSSection>

      <DSSection title="In-context usage" description="Shortcuts shown inline within tooltips, menus, and help text.">
        <DSPreview>
          <div className="flex flex-col gap-3 w-full max-w-sm">
            {/* Tooltip-like */}
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1.5 bg-surface-2 rounded-md border border-border w-fit">
              <span className="text-xs text-foreground">New issue</span>
              <KbdCombo keys={['C']} />
            </div>
            {/* Menu item */}
            <div className="flex flex-col gap-0.5 bg-surface-1 border border-border rounded-md overflow-hidden">
              {[
                { label: 'Open in full page', keys: ['⌘', '↵'] },
                { label: 'Copy issue link', keys: ['⌘', 'L'] },
                { label: 'Delete issue', keys: ['⌘', '⌫'] },
              ].map(({ label, keys }) => (
                <div key={label} className="flex items-center justify-between px-3 py-2 hover:bg-accent transition-colors">
                  <span className="text-xs text-foreground">{label}</span>
                  <KbdCombo keys={keys} />
                </div>
              ))}
            </div>
          </div>
        </DSPreview>
      </DSSection>

      <DSSection title="Navigation shortcuts" description="Global keyboard shortcuts for moving around Linear.">
        <div className="rounded-md border border-border bg-surface-1 overflow-hidden px-4 py-1">
          {shortcuts.navigation.map(s => <ShortcutRow key={s.action} {...s} />)}
        </div>
      </DSSection>

      <DSSection title="Issue shortcuts">
        <div className="rounded-md border border-border bg-surface-1 overflow-hidden px-4 py-1">
          {shortcuts.issues.map(s => <ShortcutRow key={s.action} {...s} />)}
        </div>
      </DSSection>

      <DSSection title="View shortcuts">
        <div className="rounded-md border border-border bg-surface-1 overflow-hidden px-4 py-1">
          {shortcuts.views.map(s => <ShortcutRow key={s.action} {...s} />)}
        </div>
      </DSSection>
    </DSLayout>
  )
}
