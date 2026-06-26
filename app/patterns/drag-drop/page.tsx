'use client'

import { DSLayout } from '@/components/ds/ds-layout'
import { DSSection, DSPreview } from '@/components/ds/ds-section'
import { useState, useRef } from 'react'
import { GripVertical, Circle, ArrowUp, Minus, ArrowDown, MoreHorizontal } from 'lucide-react'

// ─── Sortable list ────────────────────────────────────────────────────────────

interface Item {
  id: string
  title: string
  priority: 'urgent' | 'high' | 'medium' | 'low'
}

const PRIORITY_COLORS = {
  urgent: 'text-priority-urgent',
  high: 'text-priority-high',
  medium: 'text-priority-medium',
  low: 'text-muted-foreground',
}

const PRIORITY_ICONS = {
  urgent: AlertIcon,
  high: ArrowUp,
  medium: Minus,
  low: ArrowDown,
}

function AlertIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 16 16" fill="none" {...props}>
      <circle cx="8" cy="8" r="6" stroke="currentColor" strokeWidth="1.5" />
      <path d="M8 5v3.5M8 10.5v.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  )
}

const INITIAL_ITEMS: Item[] = [
  { id: '1', title: 'Implement keyboard shortcut handler', priority: 'urgent' },
  { id: '2', title: 'Add drag and drop to issue list', priority: 'high' },
  { id: '3', title: 'Improve empty state copy', priority: 'medium' },
  { id: '4', title: 'Update color tokens for light mode', priority: 'low' },
  { id: '5', title: 'Document API rate limits', priority: 'medium' },
]

function SortableList() {
  const [items, setItems] = useState<Item[]>(INITIAL_ITEMS)
  const [dragging, setDragging] = useState<string | null>(null)
  const [over, setOver] = useState<string | null>(null)
  const dragItem = useRef<string | null>(null)

  const handleDragStart = (id: string) => {
    dragItem.current = id
    setDragging(id)
  }

  const handleDragOver = (e: React.DragEvent, id: string) => {
    e.preventDefault()
    if (id !== dragItem.current) setOver(id)
  }

  const handleDrop = (e: React.DragEvent, targetId: string) => {
    e.preventDefault()
    if (!dragItem.current || dragItem.current === targetId) return

    const from = items.findIndex(i => i.id === dragItem.current)
    const to = items.findIndex(i => i.id === targetId)
    const next = [...items]
    const [moved] = next.splice(from, 1)
    next.splice(to, 0, moved)
    setItems(next)
    setDragging(null)
    setOver(null)
    dragItem.current = null
  }

  const handleDragEnd = () => {
    setDragging(null)
    setOver(null)
    dragItem.current = null
  }

  return (
    <div className="rounded-md border border-border overflow-hidden bg-surface-1">
      {items.map((item) => {
        const PIcon = PRIORITY_ICONS[item.priority]
        const isDragging = dragging === item.id
        const isOver = over === item.id

        return (
          <div
            key={item.id}
            draggable
            onDragStart={() => handleDragStart(item.id)}
            onDragOver={e => handleDragOver(e, item.id)}
            onDrop={e => handleDrop(e, item.id)}
            onDragEnd={handleDragEnd}
            aria-grabbed={isDragging}
            className={`group flex items-center gap-3 px-3 py-2.5 border-b border-border last:border-0 transition-colors
              ${isDragging ? 'opacity-40 bg-surface-2' : ''}
              ${isOver ? 'bg-accent/60 border-l-2 border-l-status-inprogress' : 'hover:bg-accent/30'}
            `}
          >
            {/* Drag handle — visible on hover */}
            <div
              className="cursor-grab active:cursor-grabbing text-muted-foreground/0 group-hover:text-muted-foreground/50 transition-colors shrink-0"
              aria-label="Drag to reorder"
            >
              <GripVertical className="w-3.5 h-3.5" aria-hidden="true" />
            </div>
            {/* Priority */}
            <PIcon className={`w-3.5 h-3.5 shrink-0 ${PRIORITY_COLORS[item.priority]}`} aria-label={item.priority} />
            {/* Status */}
            <Circle className="w-3.5 h-3.5 text-muted-foreground/40 shrink-0" aria-hidden="true" />
            {/* Title */}
            <span className="flex-1 text-xs text-foreground truncate">{item.title}</span>
            {/* Actions */}
            <button className="opacity-0 group-hover:opacity-100 w-6 h-6 flex items-center justify-center rounded-sm text-muted-foreground hover:text-foreground hover:bg-surface-3 transition-all cursor-pointer" aria-label="More options">
              <MoreHorizontal className="w-3.5 h-3.5" aria-hidden="true" />
            </button>
          </div>
        )
      })}
    </div>
  )
}

// ─── Drop zone ────────────────────────────────────────────────────────────────
function DropZone() {
  const [active, setActive] = useState(false)
  const [files, setFiles] = useState<string[]>([])

  return (
    <div
      onDragOver={e => { e.preventDefault(); setActive(true) }}
      onDragLeave={() => setActive(false)}
      onDrop={e => {
        e.preventDefault()
        setActive(false)
        const dropped = Array.from(e.dataTransfer.files).map(f => f.name)
        setFiles(prev => [...prev, ...dropped])
      }}
      role="region"
      aria-label="File drop zone"
      className={`rounded-md border-2 border-dashed p-8 flex flex-col items-center gap-2 transition-colors
        ${active
          ? 'border-status-inprogress bg-status-inprogress/6'
          : 'border-border bg-surface-1 hover:border-border/70'
        }`}
    >
      <div className={`w-8 h-8 rounded-md border flex items-center justify-center transition-colors ${active ? 'border-status-inprogress/40 bg-status-inprogress/10' : 'border-border bg-surface-2'}`}>
        <GripVertical className={`w-4 h-4 ${active ? 'text-status-inprogress' : 'text-muted-foreground'}`} aria-hidden="true" />
      </div>
      <p className={`text-xs font-medium transition-colors ${active ? 'text-status-inprogress' : 'text-foreground'}`}>
        {active ? 'Drop files here' : 'Drag files here'}
      </p>
      <p className="text-[11px] text-muted-foreground">or click to browse — PNG, JPG, PDF up to 10 MB</p>
      {files.length > 0 && (
        <div className="mt-2 w-full space-y-1">
          {files.map((f, i) => (
            <div key={i} className="flex items-center gap-2 px-2 py-1 rounded-sm bg-surface-2 border border-border">
              <span className="text-[10px] text-foreground truncate">{f}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default function DragDropPage() {
  return (
    <DSLayout
      title="Drag & Drop"
      description="Visual and interaction patterns for draggable list items, sortable cards, and file drop zones. Built on the native HTML Drag and Drop API."
    >
      <DSSection title="Sortable list" description="Drag the handle icon on the left to reorder. The dragged item becomes transparent; the target row shows a blue left border.">
        <SortableList />
      </DSSection>

      <DSSection title="File drop zone" description="Accepts file drops with a dashed border that turns blue on dragover. Also accepts click-to-browse.">
        <DropZone />
      </DSSection>

      <DSSection title="Interaction states" description="Reference for all drag and drop visual states.">
        <div className="rounded-md border border-border overflow-hidden">
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b border-border bg-surface-2">
                <th className="text-left px-4 py-2.5 font-medium text-muted-foreground">State</th>
                <th className="text-left px-4 py-2.5 font-medium text-muted-foreground">Visual treatment</th>
              </tr>
            </thead>
            <tbody>
              {[
                ['Draggable item', 'GripVertical handle, hidden at rest, visible on row hover'],
                ['Dragging', 'Source item: opacity-40, cursor-grabbing'],
                ['Drop target', 'bg-accent/60, blue left border (border-l-2 border-l-status-inprogress)'],
                ['Drop zone idle', 'Dashed border, bg-surface-1'],
                ['Drop zone active', 'border-status-inprogress, bg-status-inprogress/6, blue icon and text'],
                ['After drop', 'Smooth reorder, no animation flash'],
              ].map(([state, treatment]) => (
                <tr key={state} className="border-b border-border last:border-0">
                  <td className="px-4 py-2.5 font-medium text-foreground">{state}</td>
                  <td className="px-4 py-2.5 text-muted-foreground">{treatment}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </DSSection>
    </DSLayout>
  )
}
