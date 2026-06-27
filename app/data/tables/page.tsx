'use client'

import { DSLayout } from '@/components/ds/ds-layout'
import { DSSection } from '@/components/ds/ds-section'
import { ArrowUp, ArrowDown, MoreHorizontal, CheckCircle2, Circle, AlertCircle, Minus } from 'lucide-react'
import { useState } from 'react'

type SortDir = 'asc' | 'desc' | null

interface Col {
  key: string
  label: string
  width?: string
  sortable?: boolean
}

const columns: Col[] = [
  { key: 'id',       label: 'ID',       width: 'w-24',  sortable: true },
  { key: 'title',    label: 'Title',    width: 'flex-1', sortable: true },
  { key: 'status',   label: 'Status',   width: 'w-36',  sortable: false },
  { key: 'priority', label: 'Priority', width: 'w-28',  sortable: true },
  { key: 'assignee', label: 'Assignee', width: 'w-28',  sortable: false },
  { key: 'updated',  label: 'Updated',  width: 'w-28',  sortable: true },
]

const rows = [
  { id: 'ENG-2451', title: 'Implement command palette', status: 'inprogress', priority: 'urgent', assignee: { initials: 'AF', color: '#4D8EE8' }, updated: '2m ago' },
  { id: 'ENG-2449', title: 'Fix sidebar scroll persistence', status: 'todo', priority: 'high', assignee: { initials: 'LF', color: '#E07B39' }, updated: '1h ago' },
  { id: 'ENG-2448', title: 'Add real-time presence indicators', status: 'todo', priority: 'medium', assignee: { initials: 'YB', color: '#4CAF7D' }, updated: '3h ago' },
  { id: 'ENG-2445', title: 'Virtual scroll for issue list', status: 'inprogress', priority: 'high', assignee: { initials: 'OD', color: '#9B6DFF' }, updated: 'Yesterday' },
  { id: 'ENG-2440', title: 'Design token audit', status: 'done', priority: 'low', assignee: { initials: 'MK', color: '#E5534B' }, updated: '3d ago' },
]

const statusMap: Record<string, { label: string; color: string; Icon: typeof Circle }> = {
  todo:       { label: 'Todo',        color: '#6B6B6B', Icon: Circle },
  inprogress: { label: 'In Progress', color: '#4D8EE8', Icon: Circle },
  done:       { label: 'Done',        color: '#4CAF7D', Icon: CheckCircle2 },
}

const priorityMap: Record<string, { label: string; color: string; Icon: typeof AlertCircle }> = {
  urgent: { label: 'Urgent', color: '#E5534B', Icon: AlertCircle },
  high:   { label: 'High',   color: '#E07B39', Icon: AlertCircle },
  medium: { label: 'Medium', color: '#D4A72C', Icon: Minus },
  low:    { label: 'Low',    color: '#6B6B6B', Icon: Minus },
}

export default function TablesPage() {
  const [sortKey, setSortKey] = useState<string | null>('id')
  const [sortDir, setSortDir] = useState<SortDir>('asc')
  const [selected, setSelected] = useState<string[]>([])

  const toggleSort = (key: string) => {
    if (sortKey === key) {
      setSortDir(d => d === 'asc' ? 'desc' : 'asc')
    } else {
      setSortKey(key)
      setSortDir('asc')
    }
  }

  const toggleAll = () => {
    setSelected(prev => prev.length === rows.length ? [] : rows.map(r => r.id))
  }

  const toggleRow = (id: string) => {
    setSelected(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id])
  }

  const allSelected = selected.length === rows.length
  const someSelected = selected.length > 0 && !allSelected

  return (
    <DSLayout
      title="Tables"
      description="Data tables are compact, sortable, and row-selectable. Every column header is a button when sortable. Rows get a hover highlight and a checkbox on hover."
    >
      <DSSection
        title="Sortable data table"
        description="Click column headers to sort. Click rows to select them."
      >
        <div className="rounded-md border border-border overflow-hidden overflow-x-auto">
          <table className="w-full min-w-[600px] text-sm border-collapse">
            <thead>
              <tr className="border-b border-border bg-surface-2">
                {/* Select-all */}
                <th className="w-10 px-3 py-2.5 text-left">
                  <button
                    onClick={toggleAll}
                    className={`w-3.5 h-3.5 rounded border flex items-center justify-center transition-colors ${
                      allSelected ? 'bg-foreground border-foreground' : someSelected ? 'bg-foreground/30 border-foreground/50' : 'border-border hover:border-muted-foreground'
                    }`}
                  >
                    {allSelected && <span className="w-2 h-0.5 bg-background rounded-full" />}
                    {someSelected && !allSelected && <span className="w-1.5 h-0.5 bg-background rounded-full" />}
                  </button>
                </th>
                {columns.map((col) => (
                  <th
                    key={col.key}
                    className={`${col.width} px-3 py-2.5 text-left`}
                  >
                    {col.sortable ? (
                      <button
                        onClick={() => toggleSort(col.key)}
                        className="inline-flex items-center gap-1 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground hover:text-foreground transition-colors cursor-pointer group"
                      >
                        {col.label}
                        <span className="opacity-0 group-hover:opacity-100 transition-opacity">
                          {sortKey === col.key ? (
                            sortDir === 'asc' ? <ArrowUp className="w-3 h-3" /> : <ArrowDown className="w-3 h-3" />
                          ) : (
                            <ArrowUp className="w-3 h-3 text-muted-foreground/40" />
                          )}
                        </span>
                        {sortKey === col.key && (
                          <span className="opacity-100">
                            {sortDir === 'asc' ? <ArrowUp className="w-3 h-3" /> : <ArrowDown className="w-3 h-3" />}
                          </span>
                        )}
                      </button>
                    ) : (
                      <span className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                        {col.label}
                      </span>
                    )}
                  </th>
                ))}
                <th className="w-10" />
              </tr>
            </thead>
            <tbody className="bg-surface-1 divide-y divide-border">
              {rows.map((row) => {
                const isSelected = selected.includes(row.id)
                const status = statusMap[row.status]
                const priority = priorityMap[row.priority]
                const StatusIcon = status.Icon
                const PriorityIcon = priority.Icon
                return (
                  <tr
                    key={row.id}
                    onClick={() => toggleRow(row.id)}
                    className={`group cursor-pointer transition-colors ${isSelected ? 'bg-accent' : 'hover:bg-accent/60'}`}
                  >
                    {/* Checkbox */}
                    <td className="px-3 py-2.5">
                      <div className={`w-3.5 h-3.5 rounded border flex items-center justify-center transition-colors ${
                        isSelected ? 'bg-foreground border-foreground' : 'border-border opacity-0 group-hover:opacity-100'
                      }`}>
                        {isSelected && <span className="w-2 h-0.5 bg-background rounded-full" />}
                      </div>
                    </td>
                    {/* ID */}
                    <td className="w-24 px-3 py-2.5">
                      <code className="text-[11px] font-mono text-muted-foreground/70">{row.id}</code>
                    </td>
                    {/* Title */}
                    <td className="flex-1 px-3 py-2.5 max-w-0">
                      <span className="text-sm text-foreground truncate block">{row.title}</span>
                    </td>
                    {/* Status */}
                    <td className="w-36 px-3 py-2.5">
                      <div className="flex items-center gap-1.5">
                        <StatusIcon className="w-3.5 h-3.5 shrink-0" style={{ color: status.color }} />
                        <span className="text-xs text-muted-foreground">{status.label}</span>
                      </div>
                    </td>
                    {/* Priority */}
                    <td className="w-28 px-3 py-2.5">
                      <div className="flex items-center gap-1.5">
                        <PriorityIcon className="w-3.5 h-3.5 shrink-0" style={{ color: priority.color }} />
                        <span className="text-xs text-muted-foreground">{priority.label}</span>
                      </div>
                    </td>
                    {/* Assignee */}
                    <td className="w-28 px-3 py-2.5">
                      <div className="flex items-center gap-2">
                        <div
                          className="w-5 h-5 rounded-full flex items-center justify-center text-[9px] font-semibold text-white shrink-0"
                          style={{ background: row.assignee.color }}
                        >
                          {row.assignee.initials}
                        </div>
                        <span className="text-xs text-muted-foreground">{row.assignee.initials}</span>
                      </div>
                    </td>
                    {/* Updated */}
                    <td className="w-28 px-3 py-2.5">
                      <span className="text-xs text-muted-foreground/60">{row.updated}</span>
                    </td>
                    {/* Actions */}
                    <td className="w-10 px-2 py-2.5">
                      <button
                        onClick={(e) => e.stopPropagation()}
                        className="w-6 h-6 flex items-center justify-center rounded text-muted-foreground opacity-0 group-hover:opacity-100 hover:bg-surface-3 transition-all cursor-pointer"
                      >
                        <MoreHorizontal className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>

          {/* Table footer */}
          <div className="flex items-center justify-between px-4 py-2.5 border-t border-border bg-surface-2">
            <span className="text-[11px] text-muted-foreground">
              {selected.length > 0 ? `${selected.length} of ${rows.length} selected` : `${rows.length} issues`}
            </span>
            <div className="flex items-center gap-3">
              <button className="text-[11px] text-muted-foreground hover:text-foreground transition-colors cursor-pointer">Previous</button>
              <span className="text-[11px] text-muted-foreground">Page 1 of 4</span>
              <button className="text-[11px] text-muted-foreground hover:text-foreground transition-colors cursor-pointer">Next</button>
            </div>
          </div>
        </div>
      </DSSection>

      <DSSection title="Table anatomy">
        <div className="rounded-md border border-border overflow-hidden">
          <div className="grid grid-cols-[140px_1fr] px-4 py-2.5 bg-surface-2 border-b border-border gap-4">
            <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">Element</p>
            <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">Spec</p>
          </div>
          {[
            ['Header row',    'bg-surface-2 · py-2.5 · 11px uppercase tracking-wider · sortable headers are <button>'],
            ['Data row',      'bg-surface-1 · py-2.5 · divide-y divide-border · hover:bg-accent/60 · cursor-pointer'],
            ['Selected row',  'bg-accent · checkbox filled with white mark'],
            ['Checkbox',      'opacity-0 on idle · group-hover:opacity-100 · always visible when checked'],
            ['Actions cell',  'opacity-0 on idle · group-hover:opacity-100 · right-most column · 40px wide'],
            ['Footer',        'bg-surface-2 · 11px text · row count on left · pagination on right'],
          ].map(([el, spec]) => (
            <div key={el} className="grid grid-cols-[140px_1fr] px-4 py-2.5 border-b border-border last:border-0 bg-surface-1 gap-4 items-start">
              <code className="text-xs font-mono text-foreground">{el}</code>
              <p className="text-xs text-muted-foreground">{spec}</p>
            </div>
          ))}
        </div>
      </DSSection>
    </DSLayout>
  )
}
