'use client'

import { DSLayout } from '@/components/ds/ds-layout'
import { DSSection, DSPreview } from '@/components/ds/ds-section'
import { useState, useRef, useEffect } from 'react'
import {
  Copy, ExternalLink, GitBranch, Trash2, Edit, Link2,
  AlertCircle, ArrowUp, ArrowRight, ArrowDown, Minus,
  Circle, CircleDot, CheckCircle2, XCircle, ChevronRight,
} from 'lucide-react'

type MenuItemDef =
  | { type: 'item'; label: string; icon?: React.ElementType; shortcut?: string[]; destructive?: boolean; sub?: MenuItemDef[] }
  | { type: 'separator' }
  | { type: 'label'; text: string }

function KbdKey({ k }: { k: string }) {
  return <kbd className="px-1 py-0.5 text-[10px] font-mono bg-surface-3 border border-border rounded-[3px] leading-none">{k}</kbd>
}

function MenuItems({ items, onClose }: { items: MenuItemDef[]; onClose: () => void }) {
  const [subOpen, setSubOpen] = useState<string | null>(null)

  return (
    <>
      {items.map((item, i) => {
        if (item.type === 'separator') return <div key={i} className="my-0.5 border-t border-border" />
        if (item.type === 'label') return (
          <p key={i} className="px-2.5 pt-2 pb-1 text-[10px] font-semibold uppercase tracking-widest text-muted-foreground/60">{item.text}</p>
        )
        const Icon = item.icon
        const hasSub = item.sub && item.sub.length > 0
        return (
          <div key={i} className="relative">
            <button
              onClick={() => { if (!hasSub) onClose() }}
              onMouseEnter={() => hasSub ? setSubOpen(item.label) : setSubOpen(null)}
              className={`w-full flex items-center gap-2.5 px-2.5 py-1.5 text-xs rounded-[4px] transition-colors cursor-pointer text-left
                ${item.destructive
                  ? 'text-destructive hover:bg-destructive/10'
                  : 'text-foreground hover:bg-accent'}`}
            >
              {Icon && <Icon className="w-3.5 h-3.5 shrink-0 opacity-70" />}
              <span className="flex-1">{item.label}</span>
              {item.shortcut && (
                <span className="flex items-center gap-0.5 ml-3">
                  {item.shortcut.map(k => <KbdKey key={k} k={k} />)}
                </span>
              )}
              {hasSub && <ChevronRight className="w-3 h-3 text-muted-foreground shrink-0" />}
            </button>
            {hasSub && subOpen === item.label && (
              <div className="absolute left-full top-0 ml-1 w-44 bg-popover border border-border rounded-md shadow-lg py-1 z-50">
                <MenuItems items={item.sub!} onClose={onClose} />
              </div>
            )}
          </div>
        )
      })}
    </>
  )
}

function ContextMenu({ items, trigger }: { items: MenuItemDef[]; trigger: string }) {
  const [open, setOpen] = useState(false)
  const [pos, setPos] = useState({ x: 0, y: 0 })
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const close = () => setOpen(false)
    document.addEventListener('click', close)
    return () => document.removeEventListener('click', close)
  }, [])

  const handleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault()
    setPos({ x: e.nativeEvent.offsetX, y: e.nativeEvent.offsetY })
    setOpen(true)
  }

  return (
    <div
      ref={ref}
      onContextMenu={handleContextMenu}
      className="relative p-4 bg-surface-1 border border-border rounded-md text-xs text-muted-foreground select-none cursor-context-menu"
    >
      {trigger}
      {open && (
        <div
          className="absolute z-50 w-52 bg-popover border border-border rounded-md shadow-xl py-1"
          style={{ left: pos.x, top: pos.y }}
          onClick={e => e.stopPropagation()}
        >
          <MenuItems items={items} onClose={() => setOpen(false)} />
        </div>
      )}
    </div>
  )
}

const issueMenu: MenuItemDef[] = [
  { type: 'item', label: 'Edit issue', icon: Edit, shortcut: ['↵'] },
  { type: 'item', label: 'Open in full page', icon: ExternalLink, shortcut: ['⌘', '↵'] },
  { type: 'item', label: 'Copy issue link', icon: Link2, shortcut: ['⌘', 'L'] },
  { type: 'item', label: 'Copy branch name', icon: GitBranch },
  { type: 'separator' },
  { type: 'label', text: 'Set Priority' },
  {
    type: 'item', label: 'Priority', icon: AlertCircle,
    sub: [
      { type: 'item', label: 'Urgent', icon: AlertCircle },
      { type: 'item', label: 'High', icon: ArrowUp },
      { type: 'item', label: 'Medium', icon: ArrowRight },
      { type: 'item', label: 'Low', icon: ArrowDown },
      { type: 'item', label: 'No priority', icon: Minus },
    ],
  },
  {
    type: 'item', label: 'Status', icon: Circle,
    sub: [
      { type: 'item', label: 'Todo', icon: Circle },
      { type: 'item', label: 'In Progress', icon: CircleDot },
      { type: 'item', label: 'Done', icon: CheckCircle2 },
      { type: 'item', label: 'Cancelled', icon: XCircle },
    ],
  },
  { type: 'separator' },
  { type: 'item', label: 'Duplicate issue', icon: Copy },
  { type: 'item', label: 'Delete issue', icon: Trash2, destructive: true, shortcut: ['⌘', '⌫'] },
]

const staticMenu: MenuItemDef[] = [
  { type: 'item', label: 'Edit issue', icon: Edit, shortcut: ['↵'] },
  { type: 'item', label: 'Open in full page', icon: ExternalLink, shortcut: ['⌘', '↵'] },
  { type: 'item', label: 'Copy issue link', icon: Link2, shortcut: ['⌘', 'L'] },
  { type: 'separator' },
  { type: 'item', label: 'Duplicate issue', icon: Copy },
  { type: 'item', label: 'Delete issue', icon: Trash2, destructive: true, shortcut: ['⌘', '⌫'] },
]

export default function ContextMenuPage() {
  return (
    <DSLayout
      title="Context Menus"
      description="Right-click menus follow the popover styling: 208px wide, 4px rounded, 1px border, shadow-xl. Items are 12px with 14px icons. Destructive items use the destructive color. Submenus expand on hover."
    >
      <DSSection title="Interactive — right-click the area" description="Right-click anywhere in the box to trigger the context menu with sub-menus.">
        <ContextMenu trigger="Right-click anywhere in this area to open the context menu →" items={issueMenu} />
      </DSSection>

      <DSSection title="Static preview" description="Always-visible menu for reference — shows item types, icons, shortcuts, separator, and destructive variant.">
        <DSPreview code={`<div className="w-52 bg-popover border border-border rounded-md shadow-xl py-1">
  <button className="w-full flex items-center gap-2.5 px-2.5 py-1.5 text-xs
                     text-foreground hover:bg-accent rounded-[4px]">
    <Edit className="w-3.5 h-3.5 opacity-70" />
    <span className="flex-1">Edit issue</span>
    <kbd className="...">↵</kbd>
  </button>
  <div className="my-0.5 border-t border-border" />
  <button className="... text-destructive hover:bg-destructive/10">Delete</button>
</div>`}>
          <div className="w-52 bg-popover border border-border rounded-md shadow-xl py-1">
            <MenuItems items={staticMenu} onClose={() => {}} />
          </div>
        </DSPreview>
      </DSSection>

      <DSSection title="Menu item types" description="Four building blocks: standard item, item with shortcut, separator, and label heading.">
        <DSPreview>
          <div className="w-52 bg-popover border border-border rounded-md shadow-xl py-1">
            <MenuItems
              items={[
                { type: 'label', text: 'Actions' },
                { type: 'item', label: 'Standard item', icon: Edit },
                { type: 'item', label: 'With shortcut', icon: Copy, shortcut: ['⌘', 'D'] },
                { type: 'item', label: 'Has submenu', icon: ArrowRight, sub: [{ type: 'item', label: 'Sub item' }] },
                { type: 'separator' },
                { type: 'item', label: 'Destructive item', icon: Trash2, destructive: true },
              ]}
              onClose={() => {}}
            />
          </div>
        </DSPreview>
      </DSSection>
    </DSLayout>
  )
}
