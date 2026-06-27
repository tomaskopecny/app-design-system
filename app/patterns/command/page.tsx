'use client'

import React from 'react'
import { DSLayout } from '@/components/ds/ds-layout'
import { DSSection } from '@/components/ds/ds-section'
import { useState, useEffect, useRef } from 'react'
import {
  Search, Plus, GitBranch, Settings, User, Bell, Circle, CheckCircle2,
  AlertCircle, ArrowUp, Minus, FileText, Hash, Layers, Command,
} from 'lucide-react'

type CommandItem = {
  icon: React.ComponentType<{ className?: string; style?: React.CSSProperties }>
  label: string
  shortcut: string | null
  color: string | null
}

type CommandGroup = {
  heading: string
  items: CommandItem[]
}

const commandGroups: CommandGroup[] = [
  {
    heading: 'Issues',
    items: [
      { icon: Plus,        label: 'Create new issue',          shortcut: 'C',    color: null },
      { icon: Circle,      label: 'Change status',             shortcut: 'S',    color: '#6B6B6B' },
      { icon: AlertCircle, label: 'Set priority: Urgent',      shortcut: null,   color: '#E5534B' },
      { icon: ArrowUp,     label: 'Set priority: High',        shortcut: null,   color: '#E07B39' },
      { icon: Minus,       label: 'Set priority: Medium',      shortcut: null,   color: '#D4A72C' },
    ],
  },
  {
    heading: 'Navigation',
    items: [
      { icon: Hash,        label: 'Go to My Issues',           shortcut: 'G I',  color: null },
      { icon: Layers,      label: 'Go to Projects',            shortcut: 'G P',  color: null },
      { icon: GitBranch,   label: 'Go to Cycles',              shortcut: 'G C',  color: null },
      { icon: FileText,    label: 'Go to Docs',                shortcut: 'G D',  color: null },
    ],
  },
  {
    heading: 'Account',
    items: [
      { icon: Settings,    label: 'Open Settings',             shortcut: '⌘,',   color: null },
      { icon: User,        label: 'View Profile',              shortcut: null,   color: null },
      { icon: Bell,        label: 'Notification preferences',  shortcut: null,   color: null },
    ],
  },
]

function CommandPaletteDemo() {
  const [query, setQuery] = useState('')
  const [activeIdx, setActiveIdx] = useState(0)
  const inputRef = useRef<HTMLInputElement>(null)

  const allItems = commandGroups.flatMap(g => g.items)
  const filtered = query
    ? allItems.filter(i => i.label.toLowerCase().includes(query.toLowerCase()))
    : allItems

  // Flatten filtered items with their group headings
  const filteredGroups = query
    ? [{ heading: 'Results', items: filtered }]
    : commandGroups

  const flatItems = filteredGroups.flatMap(g => g.items)

  useEffect(() => {
    setActiveIdx(0)
  }, [query])

  const handleKey = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setActiveIdx(i => Math.min(i + 1, flatItems.length - 1))
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setActiveIdx(i => Math.max(i - 1, 0))
    }
  }

  let itemCounter = 0

  return (
    <div
      className="w-full max-w-xl mx-auto rounded-lg border border-border bg-popover overflow-hidden"
      style={{ boxShadow: '0 8px 32px rgba(0,0,0,0.6)' }}
    >
      {/* Search input */}
      <div className="flex items-center gap-3 px-4 py-3 border-b border-border">
        <Search className="w-4 h-4 text-muted-foreground shrink-0" />
        <input
          ref={inputRef}
          autoFocus
          value={query}
          onChange={e => setQuery(e.target.value)}
          onKeyDown={handleKey}
          placeholder="Search for issues, projects, settings..."
          className="flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none"
        />
        <kbd className="px-1.5 py-0.5 text-[10px] font-mono rounded border border-border bg-surface-3 text-muted-foreground">
          ESC
        </kbd>
      </div>

      {/* Results */}
      <div className="max-h-80 overflow-y-auto py-1.5">
        {filteredGroups.map((group) => (
          <div key={group.heading}>
            <p className="px-4 py-1.5 text-[10px] font-semibold uppercase tracking-widest text-muted-foreground/50 select-none">
              {group.heading}
            </p>
            {group.items.map((item) => {
              const idx = itemCounter++
              const isActive = idx === activeIdx
              const Icon = item.icon
              return (
                <button
                  key={item.label}
                  onMouseEnter={() => setActiveIdx(idx)}
                  className={`w-full flex items-center gap-3 px-4 py-2 text-sm transition-colors cursor-pointer ${
                    isActive ? 'bg-accent text-foreground' : 'text-foreground/80 hover:bg-accent/50'
                  }`}
                >
                  <Icon
                    className="w-4 h-4 shrink-0"
                    style={{ color: item.color ?? (isActive ? 'var(--foreground)' : 'var(--muted-foreground)') }}
                  />
                  <span className="flex-1 text-left">{item.label}</span>
                  {item.shortcut && (
                    <div className="flex items-center gap-1">
                      {item.shortcut.split(' ').map((k) => (
                        <kbd
                          key={k}
                          className="px-1.5 py-0.5 text-[10px] font-mono rounded border border-border bg-surface-3 text-muted-foreground"
                        >
                          {k}
                        </kbd>
                      ))}
                    </div>
                  )}
                </button>
              )
            })}
          </div>
        ))}

        {filtered.length === 0 && (
          <div className="px-4 py-8 text-center">
            <p className="text-sm text-muted-foreground">No results for &ldquo;{query}&rdquo;</p>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="flex items-center gap-4 px-4 py-2.5 border-t border-border bg-surface-2">
        <div className="flex items-center gap-1 text-[11px] text-muted-foreground/60">
          <kbd className="px-1 py-0.5 text-[10px] font-mono rounded border border-border bg-surface-3">↑↓</kbd>
          navigate
        </div>
        <div className="flex items-center gap-1 text-[11px] text-muted-foreground/60">
          <kbd className="px-1 py-0.5 text-[10px] font-mono rounded border border-border bg-surface-3">↵</kbd>
          select
        </div>
        <div className="flex items-center gap-1 text-[11px] text-muted-foreground/60">
          <kbd className="px-1 py-0.5 text-[10px] font-mono rounded border border-border bg-surface-3">ESC</kbd>
          close
        </div>
      </div>
    </div>
  )
}

export default function CommandPage() {
  return (
    <DSLayout
      title="Command Palette"
      description="The command palette (⌘K) is the primary power-user surface. It provides keyboard-first access to every action in the product via a fuzzy-search overlay."
    >
      <DSSection
        title="Interactive demo"
        description="Type to filter commands. Use ↑↓ to navigate, Enter to select."
      >
        <CommandPaletteDemo />
      </DSSection>

      <DSSection
        title="Anatomy"
        description="Five distinct zones that make the palette scannable and operable purely by keyboard."
      >
        <div className="rounded-md border border-border overflow-hidden">
          <div className="grid grid-cols-[160px_1fr] px-4 py-2.5 bg-surface-2 border-b border-border gap-4">
            <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">Zone</p>
            <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">Spec</p>
          </div>
          {[
            ['Backdrop',       'Fixed overlay: bg-black/60 backdrop-blur-sm. Click to dismiss.'],
            ['Panel',          'max-w-xl · rounded-lg · border border-border · shadow-[0_8px_32px_rgba(0,0,0,0.6)] · bg-popover'],
            ['Search bar',     'py-3 px-4 · Search icon left · ESC kbd right · no visible border — just border-b divider'],
            ['Group heading',  '10px uppercase tracking-widest · text-muted-foreground/50 · select-none · py-1.5'],
            ['Command item',   '14px · flex items-center gap-3 · py-2 px-4 · active = bg-accent · icon 16px'],
            ['Kbd shortcut',   'Right-aligned · 10px font-mono · rounded · border border-border bg-surface-3'],
            ['Footer',         'bg-surface-2 · border-t · 11px hints for navigate / select / close'],
          ].map(([zone, spec]) => (
            <div key={zone} className="grid grid-cols-[160px_1fr] px-4 py-2.5 border-b border-border last:border-0 bg-surface-1 gap-4 items-start">
              <code className="text-xs font-mono text-foreground">{zone}</code>
              <p className="text-xs text-muted-foreground">{spec}</p>
            </div>
          ))}
        </div>
      </DSSection>

      <DSSection title="Keyboard shortcut trigger">
        <div className="p-4 rounded-md bg-surface-1 border border-border flex items-center gap-4">
          <div className="flex items-center gap-1.5 px-3 py-2 rounded-md bg-surface-2 border border-border">
            <Command className="w-4 h-4 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">+</span>
            <kbd className="text-sm font-mono font-semibold text-foreground">K</kbd>
          </div>
          <p className="text-xs text-muted-foreground">Opens the command palette from anywhere in the app.</p>
        </div>
      </DSSection>

      <DSSection title="Code pattern">
        <div className="p-4 rounded-md bg-surface-1 border border-border">
          <pre className="font-mono text-[11px] text-muted-foreground leading-relaxed overflow-x-auto">{`// Listen for ⌘K globally
useEffect(() => {
  const handler = (e: KeyboardEvent) => {
    if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
      e.preventDefault()
      setOpen(true)
    }
  }
  window.addEventListener('keydown', handler)
  return () => window.removeEventListener('keydown', handler)
}, [])

// Panel
{open && (
  <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-start justify-center pt-32"
    onClick={() => setOpen(false)}>
    <div className="w-full max-w-xl rounded-lg border border-border bg-popover
      shadow-[0_8px_32px_rgba(0,0,0,0.6)]" onClick={e => e.stopPropagation()}>
      {/* search + results */}
    </div>
  </div>
)}`}</pre>
        </div>
      </DSSection>
    </DSLayout>
  )
}
