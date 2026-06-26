'use client'

import { DSLayout } from '@/components/ds/ds-layout'
import { DSSection, DSPreview } from '@/components/ds/ds-section'
import { useState, useRef, useEffect } from 'react'
import { ChevronLeft, ChevronRight, X, CalendarDays } from 'lucide-react'

// ─── helpers ─────────────────────────────────────────────────────────────────

const today = new Date()
today.setHours(0, 0, 0, 0)

function cloneDate(d: Date) {
  return new Date(d.getTime())
}

function sameDay(a: Date, b: Date) {
  return a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
}

function addDays(d: Date, n: number) {
  const r = cloneDate(d)
  r.setDate(r.getDate() + n)
  return r
}

function startOfWeek(d: Date) {
  const r = cloneDate(d)
  const day = r.getDay()
  r.setDate(r.getDate() - day)
  return r
}

function startOfMonth(d: Date) {
  return new Date(d.getFullYear(), d.getMonth(), 1)
}

function daysInMonth(d: Date) {
  return new Date(d.getFullYear(), d.getMonth() + 1, 0).getDate()
}

const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December']
const DAYS_SHORT = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa']
const DAYS_MIN = ['S', 'M', 'T', 'W', 'T', 'F', 'S']

// shared day-picker classNames
const SHARED_CN = {
  nav: 'flex items-center gap-0.5',
  navBtn: 'w-6 h-6 flex items-center justify-center rounded text-muted-foreground hover:text-foreground hover:bg-accent transition-colors cursor-pointer shrink-0',
  caption: 'text-xs font-semibold text-foreground',
  weekday: 'flex-1 text-center text-[10px] font-medium text-muted-foreground select-none',
}

// ─── event data ──────────────────────────────────────────────────────────────

type CalEvent = {
  id: number
  title: string
  date: Date
  color: 'blue' | 'green' | 'orange' | 'purple'
  startHour: number
  endHour: number
}

const EVENT_COLORS: Record<CalEvent['color'], { bg: string; text: string; border: string }> = {
  blue:   { bg: 'bg-status-inprogress/15', text: 'text-status-inprogress', border: 'border-status-inprogress/30' },
  green:  { bg: 'bg-status-done/15',       text: 'text-status-done',       border: 'border-status-done/30' },
  orange: { bg: 'bg-priority-high/15',     text: 'text-priority-high',     border: 'border-priority-high/30' },
  purple: { bg: 'bg-label-feature/15',     text: 'text-label-feature',     border: 'border-label-feature/30' },
}

const SAMPLE_EVENTS: CalEvent[] = [
  { id: 1, title: 'Design review', date: addDays(today, 0), color: 'blue',   startHour: 10, endHour: 11 },
  { id: 2, title: 'Sprint planning', date: addDays(today, 1), color: 'green', startHour: 14, endHour: 16 },
  { id: 3, title: 'Engineering sync', date: addDays(today, 1), color: 'orange', startHour: 9, endHour: 10 },
  { id: 4, title: 'Product demo', date: addDays(today, 2), color: 'purple', startHour: 15, endHour: 16 },
  { id: 5, title: 'Quarterly review', date: addDays(today, 3), color: 'blue', startHour: 11, endHour: 13 },
  { id: 6, title: 'Onboarding call', date: addDays(today, 4), color: 'green', startHour: 10, endHour: 11 },
  { id: 7, title: '1:1 with manager', date: addDays(today, -1), color: 'orange', startHour: 13, endHour: 14 },
  { id: 8, title: 'Roadmap session', date: addDays(today, -1), color: 'purple', startHour: 15, endHour: 17 },
  { id: 9, title: 'Code freeze', date: addDays(today, 5), color: 'blue', startHour: 9, endHour: 10 },
  { id: 10, title: 'Release party', date: addDays(today, 5), color: 'green', startHour: 17, endHour: 18 },
]

const EVENT_DOTS: Date[] = SAMPLE_EVENTS.map(e => e.date)

// ─── 1. Mini picker (sidebar / popover) ──────────────────────────────────────

function MiniPicker({ selected, onSelect }: {
  selected: Date | undefined
  onSelect: (d: Date) => void
}) {
  const [month, setMonth] = useState(today)
  const first = startOfMonth(month)
  const offset = first.getDay()
  const total = daysInMonth(month)

  const cells: (Date | null)[] = Array.from({ length: 42 }, (_, i) => {
    const d = i - offset + 1
    return d >= 1 && d <= total ? new Date(month.getFullYear(), month.getMonth(), d) : null
  })

  return (
    <div className="inline-flex flex-col bg-popover border border-border rounded-md p-3 w-[216px] shadow-lg">
      <div className="flex items-center justify-between mb-2">
        <button onClick={() => setMonth(new Date(month.getFullYear(), month.getMonth() - 1))} className={SHARED_CN.navBtn}><ChevronLeft className="w-3 h-3" /></button>
        <span className={SHARED_CN.caption}>{MONTHS[month.getMonth()]} {month.getFullYear()}</span>
        <button onClick={() => setMonth(new Date(month.getFullYear(), month.getMonth() + 1))} className={SHARED_CN.navBtn}><ChevronRight className="w-3 h-3" /></button>
      </div>
      <div className="grid grid-cols-7">
        {DAYS_MIN.map((d, i) => <div key={i} className="text-center text-[9px] font-medium text-muted-foreground pb-1">{d}</div>)}
        {cells.map((date, i) => {
          if (!date) return <div key={i} />
          const isSel = selected && sameDay(date, selected)
          const isNow = sameDay(date, today)
          const hasEvent = EVENT_DOTS.some(e => sameDay(e, date))
          const isOut = date.getMonth() !== month.getMonth()
          return (
            <button key={i} onClick={() => onSelect(date)}
              className={`relative w-full aspect-square flex items-center justify-center text-[10px] rounded transition-colors cursor-pointer
                ${isSel ? 'bg-foreground text-background font-semibold' :
                  isNow ? 'ring-1 ring-foreground/40 text-foreground font-semibold hover:bg-accent' :
                    isOut ? 'text-muted-foreground/30 hover:bg-accent/50' :
                      'text-foreground/80 hover:bg-accent'}`}
            >
              {date.getDate()}
              {hasEvent && !isSel && (
                <span className="absolute bottom-0.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-status-inprogress" />
              )}
            </button>
          )
        })}
      </div>
    </div>
  )
}

// ─── 2. Full single-month grid with events ───────────────────────────────────

function MonthGrid() {
  const [month, setMonth] = useState(today)
  const [selected, setSelected] = useState<Date | undefined>(today)
  const first = startOfMonth(month)
  const offset = first.getDay()
  const total = daysInMonth(month)

  const cells: (Date | null)[] = Array.from({ length: 42 }, (_, i) => {
    const d = i - offset + 1
    return d >= 1 && d <= total ? new Date(month.getFullYear(), month.getMonth(), d) : null
  })

  const eventsFor = (date: Date) => SAMPLE_EVENTS.filter(e => sameDay(e.date, date))

  return (
    <div className="flex flex-col bg-surface-1 border border-border rounded-md overflow-hidden w-full max-w-xl">
      {/* header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-border">
        <button onClick={() => setMonth(new Date(month.getFullYear(), month.getMonth() - 1))} className={SHARED_CN.navBtn}><ChevronLeft className="w-3.5 h-3.5" /></button>
        <span className="text-sm font-semibold text-foreground">{MONTHS[month.getMonth()]} {month.getFullYear()}</span>
        <button onClick={() => setMonth(new Date(month.getFullYear(), month.getMonth() + 1))} className={SHARED_CN.navBtn}><ChevronRight className="w-3.5 h-3.5" /></button>
      </div>
      {/* weekday row */}
      <div className="grid grid-cols-7 border-b border-border">
        {DAYS_SHORT.map(d => (
          <div key={d} className="text-center text-[10px] font-medium text-muted-foreground py-2">{d}</div>
        ))}
      </div>
      {/* day cells */}
      <div className="grid grid-cols-7 flex-1">
        {cells.map((date, i) => {
          if (!date) return <div key={i} className="min-h-[72px] border-b border-r border-border last:border-r-0" />
          const isSel = selected && sameDay(date, selected)
          const isNow = sameDay(date, today)
          const isOut = date.getMonth() !== month.getMonth()
          const dayEvents = eventsFor(date)
          return (
            <div key={i} onClick={() => setSelected(date)}
              className={`min-h-[72px] border-b border-r border-border last:border-r-0 p-1.5 cursor-pointer transition-colors
                ${isSel ? 'bg-surface-2' : 'hover:bg-accent/40'}`}
            >
              <div className={`w-6 h-6 flex items-center justify-center rounded text-[11px] font-medium mb-1 transition-colors
                ${isSel ? 'bg-foreground text-background' :
                  isNow ? 'ring-1 ring-foreground/50 font-bold text-foreground' :
                    isOut ? 'text-muted-foreground/30' : 'text-foreground/80'}`}
              >
                {date.getDate()}
              </div>
              <div className="flex flex-col gap-0.5">
                {dayEvents.slice(0, 2).map(e => {
                  const c = EVENT_COLORS[e.color]
                  return (
                    <div key={e.id} className={`text-[9px] font-medium px-1 py-0.5 rounded truncate ${c.bg} ${c.text}`}>
                      {e.title}
                    </div>
                  )
                })}
                {dayEvents.length > 2 && (
                  <div className="text-[9px] text-muted-foreground px-1">+{dayEvents.length - 2} more</div>
                )}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

// ─── 3. Horizontal week strip (date bar) ─────────────────────────────────────

function WeekStrip() {
  const [anchor, setAnchor] = useState(startOfWeek(today))
  const [selected, setSelected] = useState<Date>(today)

  // show 2 weeks (14 days)
  const days = Array.from({ length: 14 }, (_, i) => addDays(anchor, i))

  // group by week
  const week1 = days.slice(0, 7)
  const week2 = days.slice(7, 14)

  const DayCell = ({ date }: { date: Date }) => {
    const isSel = sameDay(date, selected)
    const isNow = sameDay(date, today)
    return (
      <button onClick={() => setSelected(date)}
        className="flex flex-col items-center gap-1 px-2 py-2 cursor-pointer group"
      >
        <span className="text-[10px] font-medium text-muted-foreground/60 group-hover:text-muted-foreground transition-colors">
          {DAYS_SHORT[date.getDay()]}
        </span>
        <span className={`w-8 h-8 flex items-center justify-center rounded-full text-[13px] font-semibold transition-colors
          ${isSel ? 'bg-foreground text-background' :
            isNow ? 'ring-1 ring-foreground/50 text-foreground' :
              'text-foreground/80 group-hover:bg-accent'}`}
        >
          {date.getDate()}
        </span>
      </button>
    )
  }

  return (
    <div className="flex items-center gap-0 bg-surface-1 border border-border rounded-md overflow-hidden w-full max-w-xl">
      <button onClick={() => setAnchor(addDays(anchor, -7))} className="px-2 h-full flex items-center text-muted-foreground hover:text-foreground hover:bg-accent transition-colors cursor-pointer shrink-0 self-stretch">
        <ChevronLeft className="w-3.5 h-3.5" />
      </button>

      {/* Week 1 */}
      <div className="flex flex-1 divide-x divide-border/50">
        {week1.map(d => <DayCell key={d.getTime()} date={d} />)}
      </div>

      {/* Divider */}
      <div className="w-px h-10 bg-border/80 shrink-0" />

      {/* Week 2 */}
      <div className="flex flex-1 divide-x divide-border/50">
        {week2.map(d => <DayCell key={d.getTime()} date={d} />)}
      </div>

      <button onClick={() => setAnchor(addDays(anchor, 7))} className="px-2 h-full flex items-center text-muted-foreground hover:text-foreground hover:bg-accent transition-colors cursor-pointer shrink-0 self-stretch">
        <ChevronRight className="w-3.5 h-3.5" />
      </button>
    </div>
  )
}

// ─── 4. Week time-grid (scheduler view) ──────────────────────────────────────

const HOURS = Array.from({ length: 11 }, (_, i) => i + 8) // 8–18

function WeekTimeGrid() {
  const [weekStart, setWeekStart] = useState(startOfWeek(today))
  const days = Array.from({ length: 7 }, (_, i) => addDays(weekStart, i))

  const eventsForDay = (date: Date) => SAMPLE_EVENTS.filter(e => sameDay(e.date, date))
  const HOUR_H = 52 // px per hour

  return (
    <div className="flex flex-col bg-surface-1 border border-border rounded-md overflow-hidden w-full">
      {/* Toolbar */}
      <div className="flex items-center gap-3 px-4 py-2.5 border-b border-border">
        <button onClick={() => setWeekStart(addDays(weekStart, -7))} className={SHARED_CN.navBtn}><ChevronLeft className="w-3.5 h-3.5" /></button>
        <span className="text-xs font-semibold text-foreground">
          {MONTHS[weekStart.getMonth()]} {weekStart.getDate()} – {MONTHS[addDays(weekStart, 6).getMonth()]} {addDays(weekStart, 6).getDate()}, {weekStart.getFullYear()}
        </span>
        <button onClick={() => setWeekStart(addDays(weekStart, 7))} className={SHARED_CN.navBtn}><ChevronRight className="w-3.5 h-3.5" /></button>
        <button onClick={() => setWeekStart(startOfWeek(today))}
          className="ml-auto text-[10px] px-2 py-1 rounded bg-surface-2 border border-border text-muted-foreground hover:text-foreground hover:bg-surface-3 transition-colors cursor-pointer"
        >
          Today
        </button>
      </div>

      {/* Day headers */}
      <div className="flex border-b border-border">
        <div className="w-12 shrink-0" />
        {days.map(d => {
          const isNow = sameDay(d, today)
          return (
            <div key={d.getTime()} className="flex-1 flex flex-col items-center py-2 border-l border-border first:border-l-0">
              <span className="text-[9px] font-medium text-muted-foreground">{DAYS_SHORT[d.getDay()]}</span>
              <span className={`w-6 h-6 flex items-center justify-center rounded-full text-[11px] font-semibold mt-0.5
                ${isNow ? 'bg-foreground text-background' : 'text-foreground/70'}`}
              >
                {d.getDate()}
              </span>
            </div>
          )
        })}
      </div>

      {/* Grid */}
      <div className="overflow-y-auto max-h-[400px]">
        <div className="flex">
          {/* Time labels */}
          <div className="w-12 shrink-0 flex flex-col">
            {HOURS.map(h => (
              <div key={h} className="flex items-start justify-end pr-2 text-[9px] text-muted-foreground/60" style={{ height: HOUR_H }}>
                <span className="-mt-2">{h}:00</span>
              </div>
            ))}
          </div>

          {/* Day columns */}
          {days.map(d => {
            const dayEvs = eventsForDay(d)
            const isNow = sameDay(d, today)
            return (
              <div key={d.getTime()} className="flex-1 relative border-l border-border">
                {/* Hour lines */}
                {HOURS.map(h => (
                  <div key={h} className="border-b border-line" style={{ height: HOUR_H }} />
                ))}
                {/* Today highlight */}
                {isNow && <div className="absolute inset-0 bg-foreground/[0.02] pointer-events-none" />}
                {/* Events */}
                {dayEvs.map(ev => {
                  const top = (ev.startHour - 8) * HOUR_H
                  const height = (ev.endHour - ev.startHour) * HOUR_H - 2
                  const c = EVENT_COLORS[ev.color]
                  return (
                    <div key={ev.id} className={`absolute left-0.5 right-0.5 rounded px-1.5 py-1 border ${c.bg} ${c.border} overflow-hidden cursor-pointer hover:brightness-110 transition-all`}
                      style={{ top: top + 1, height }}
                    >
                      <div className={`text-[10px] font-semibold leading-tight ${c.text}`}>{ev.title}</div>
                      <div className={`text-[9px] mt-0.5 opacity-70 ${c.text}`}>{ev.startHour}:00 – {ev.endHour}:00</div>
                    </div>
                  )
                })}
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

// ─── 5. Dual-month date picker (Linear due date style) ───────────────────────

function DualMonthPicker() {
  const [selected, setSelected] = useState<Date | undefined>(undefined)
  const [input, setInput] = useState('')
  const [range, setRange] = useState<{ from: Date | undefined; to: Date | undefined }>({ from: undefined, to: undefined })
  const [hovered, setHovered] = useState<Date | undefined>(undefined)
  const baseMonth = new Date(today.getFullYear(), today.getMonth(), 1)
  const nextMonth = new Date(today.getFullYear(), today.getMonth() + 1, 1)
  const [offset, setOffset] = useState(0)

  const m1 = new Date(baseMonth.getFullYear(), baseMonth.getMonth() + offset, 1)
  const m2 = new Date(baseMonth.getFullYear(), baseMonth.getMonth() + offset + 1, 1)

  function MonthBlock({ month, compact = false }: { month: Date; compact?: boolean }) {
    const first = startOfMonth(month)
    const off = first.getDay()
    const total = daysInMonth(month)
    const cells: (Date | null)[] = Array.from({ length: 42 }, (_, i) => {
      const d = i - off + 1
      return d >= 1 && d <= total ? new Date(month.getFullYear(), month.getMonth(), d) : null
    })

    return (
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-semibold text-foreground">{MONTHS[month.getMonth()]} {month.getFullYear()}</span>
          {compact && (
            <div className="flex items-center gap-0.5">
              <button onClick={() => setOffset(o => o - 1)} className={SHARED_CN.navBtn}><ChevronLeft className="w-3 h-3" /></button>
              <button onClick={() => setOffset(o => o + 1)} className={SHARED_CN.navBtn}><ChevronRight className="w-3 h-3" /></button>
            </div>
          )}
        </div>
        <div className="grid grid-cols-7">
          {DAYS_SHORT.map(d => <div key={d} className="text-center text-[9px] font-medium text-muted-foreground/60 pb-1">{d}</div>)}
          {cells.map((date, i) => {
            if (!date) return <div key={i} />
            const isSel = selected && sameDay(date, selected)
            const isNow = sameDay(date, today)
            const isOut = date.getMonth() !== month.getMonth()
            return (
              <button key={i}
                onClick={() => { setSelected(date); setInput(`${MONTHS[date.getMonth()].slice(0,3)} ${date.getDate()}, ${date.getFullYear()}`) }}
                className={`w-full aspect-square flex items-center justify-center text-[11px] rounded transition-colors cursor-pointer
                  ${isSel ? 'bg-foreground text-background font-semibold' :
                    isNow ? 'ring-1 ring-foreground/30 font-semibold text-foreground hover:bg-accent' :
                      isOut ? 'text-muted-foreground/25 hover:bg-accent/30' :
                        'text-foreground/80 hover:bg-accent'}`}
              >
                {date.getDate()}
              </button>
            )
          })}
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col bg-popover border border-border rounded-lg shadow-xl w-full max-w-[540px]">
      {/* Header */}
      <div className="flex items-start justify-between px-5 pt-4 pb-3 border-b border-border">
        <div>
          <p className="text-sm font-semibold text-foreground">
            Set due date
          </p>
          <p className="text-[11px] text-muted-foreground mt-0.5">Issue needs to be completed by this date</p>
        </div>
        <button className="w-6 h-6 flex items-center justify-center rounded text-muted-foreground hover:text-foreground hover:bg-accent transition-colors cursor-pointer">
          <X className="w-3.5 h-3.5" />
        </button>
      </div>
      {/* Input */}
      <div className="px-5 py-3 border-b border-border">
        <input
          type="text"
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder="e.g. Jun 30, 2026"
          className="w-full h-8 px-3 text-xs rounded-md bg-surface-2 border border-border text-foreground placeholder:text-muted-foreground/40 focus:outline-none focus:ring-1 focus:ring-ring transition-colors"
        />
      </div>
      {/* Two-month grid */}
      <div className="grid grid-cols-2 gap-0 px-5 py-4">
        <div className="pr-5 border-r border-border">
          <MonthBlock month={m1} />
        </div>
        <div className="pl-5">
          <MonthBlock month={m2} compact />
        </div>
      </div>
      {/* Footer */}
      <div className="flex items-center justify-end gap-2 px-5 py-3 border-t border-border">
        <button className="h-7 px-3 text-xs rounded-md bg-surface-2 border border-border text-foreground/70 hover:text-foreground hover:bg-surface-3 transition-colors cursor-pointer">
          Cancel
        </button>
        <button className="h-7 px-3 text-xs rounded-md bg-foreground text-background font-medium hover:bg-foreground/90 transition-colors cursor-pointer">
          Save due date
        </button>
      </div>
    </div>
  )
}

// ─── 6. Date range picker with input ─────────────────────────────────────────

function RangePicker() {
  const [range, setRange] = useState<{ from: Date; to: Date }>({
    from: addDays(today, -5),
    to: addDays(today, 8),
  })
  const [hovered, setHovered] = useState<Date | undefined>(undefined)
  const [selecting, setSelecting] = useState<'from' | 'to' | null>(null)
  const [month, setMonth] = useState(today)

  const first = startOfMonth(month)
  const off = first.getDay()
  const total = daysInMonth(month)
  const cells: (Date | null)[] = Array.from({ length: 42 }, (_, i) => {
    const d = i - off + 1
    return d >= 1 && d <= total ? new Date(month.getFullYear(), month.getMonth(), d) : null
  })

  const inRange = (d: Date) => {
    const end = selecting === 'to' && hovered ? hovered : range.to
    return d > range.from && d < end
  }
  const isStart = (d: Date) => sameDay(d, range.from)
  const isEnd = (d: Date) => {
    const end = selecting === 'to' && hovered ? hovered : range.to
    return sameDay(d, end)
  }

  const handleClick = (date: Date) => {
    if (!selecting || selecting === 'from') {
      setRange(r => ({ ...r, from: date }))
      setSelecting('to')
    } else {
      if (date < range.from) {
        setRange({ from: date, to: range.from })
      } else {
        setRange(r => ({ ...r, to: date }))
      }
      setSelecting(null)
    }
  }

  const fmt = (d: Date) => `${MONTHS[d.getMonth()].slice(0, 3)} ${d.getDate()}`

  return (
    <div className="inline-flex flex-col bg-popover border border-border rounded-md shadow-lg overflow-hidden w-[268px]">
      {/* Selected range display */}
      <div className="flex items-center gap-2 px-3 py-2 border-b border-border">
        <button onClick={() => setSelecting('from')}
          className={`flex-1 text-center text-[10px] rounded px-2 py-1 transition-colors cursor-pointer
            ${selecting === 'from' ? 'bg-foreground text-background' : 'bg-surface-2 text-foreground/70 hover:bg-surface-3'}`}
        >
          {fmt(range.from)}
        </button>
        <ChevronRight className="w-3 h-3 text-muted-foreground shrink-0" />
        <button onClick={() => setSelecting('to')}
          className={`flex-1 text-center text-[10px] rounded px-2 py-1 transition-colors cursor-pointer
            ${selecting === 'to' ? 'bg-foreground text-background' : 'bg-surface-2 text-foreground/70 hover:bg-surface-3'}`}
        >
          {fmt(range.to)}
        </button>
      </div>

      <div className="p-3">
        <div className="flex items-center justify-between mb-2">
          <button onClick={() => setMonth(new Date(month.getFullYear(), month.getMonth() - 1))} className={SHARED_CN.navBtn}><ChevronLeft className="w-3 h-3" /></button>
          <span className={SHARED_CN.caption}>{MONTHS[month.getMonth()]} {month.getFullYear()}</span>
          <button onClick={() => setMonth(new Date(month.getFullYear(), month.getMonth() + 1))} className={SHARED_CN.navBtn}><ChevronRight className="w-3 h-3" /></button>
        </div>

        <div className="grid grid-cols-7">
          {DAYS_MIN.map((d, i) => <div key={i} className="text-center text-[9px] font-medium text-muted-foreground pb-1">{d}</div>)}
          {cells.map((date, i) => {
            if (!date) return <div key={i} />
            const start = isStart(date)
            const end = isEnd(date)
            const mid = !start && !end && inRange(date)
            const isOut = date.getMonth() !== month.getMonth()
            return (
              <button key={i}
                onClick={() => handleClick(date)}
                onMouseEnter={() => { if (selecting === 'to') setHovered(date) }}
                onMouseLeave={() => setHovered(undefined)}
                className={`relative w-full aspect-square flex items-center justify-center text-[10px] transition-colors cursor-pointer
                  ${start || end ? 'bg-foreground text-background font-semibold rounded-full z-10' :
                    mid ? 'bg-foreground/12 text-foreground rounded-none' :
                      isOut ? 'text-muted-foreground/25 hover:bg-accent/30 rounded' :
                        'text-foreground/80 hover:bg-accent rounded'}`}
              >
                {date.getDate()}
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}

// ─── 7. Due date chip ────────────────────────────────────────────────────────

function DueDateChips() {
  const overdue = addDays(today, -3)
  const soon = addDays(today, 1)
  const upcoming = addDays(today, 14)

  const fmt = (d: Date) => `${MONTHS[d.getMonth()].slice(0, 3)} ${d.getDate()}`

  return (
    <div className="flex flex-wrap gap-2">
      <div className="inline-flex items-center gap-1.5 h-6 px-2 rounded bg-surface-2 border border-border text-[11px] text-foreground/70 cursor-pointer hover:bg-surface-3 hover:text-foreground transition-colors">
        <CalendarDays className="w-3 h-3" />
        {fmt(upcoming)}
      </div>
      <div className="inline-flex items-center gap-1.5 h-6 px-2 rounded bg-priority-high/10 border border-priority-high/25 text-[11px] text-priority-high cursor-pointer hover:bg-priority-high/15 transition-colors">
        <CalendarDays className="w-3 h-3" />
        {fmt(soon)} · Soon
      </div>
      <div className="inline-flex items-center gap-1.5 h-6 px-2 rounded bg-priority-urgent/10 border border-priority-urgent/25 text-[11px] text-priority-urgent cursor-pointer hover:bg-priority-urgent/15 transition-colors">
        <CalendarDays className="w-3 h-3" />
        {fmt(overdue)} · Overdue
      </div>
      <div className="inline-flex items-center gap-1.5 h-6 px-2 rounded bg-surface-2 border border-dashed border-border text-[11px] text-muted-foreground/50 cursor-pointer hover:text-muted-foreground hover:bg-surface-3 transition-colors">
        <CalendarDays className="w-3 h-3" />
        Add due date
      </div>
    </div>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function CalendarPage() {
  return (
    <DSLayout
      title="Calendar"
      description="Seven calendar variants — from a 200px mini picker to a full week scheduler. All built on design tokens with no external calendar library dependency."
    >
      <DSSection
        title="Mini picker"
        description="Compact 216px dropdown used in popovers, sidebars, and inline pickers. Dots mark days with events. Today shows a subtle ring; selected fills solid."
      >
        <DSPreview>
          <MiniPicker selected={today} onSelect={() => {}} />
        </DSPreview>
      </DSSection>

      <DSSection
        title="Month grid with events"
        description="Full-width month view with event chips in each cell. Up to 2 events shown per day; overflow is collapsed to '+N more'. Click a day to highlight it."
      >
        <DSPreview>
          <MonthGrid />
        </DSPreview>
      </DSSection>

      <DSSection
        title="Horizontal week strip"
        description="A single-row date bar showing two weeks at once, with a divider between them. Inspired by the attendance strip pattern — ideal for fixed headers above content."
      >
        <DSPreview>
          <WeekStrip />
        </DSPreview>
      </DSSection>

      <DSSection
        title="Week time-grid"
        description="7-column time scheduler with hourly rows. Event blocks are positioned absolutely by start/end hour and color-coded by category. Scrollable vertically."
      >
        <DSPreview>
          <WeekTimeGrid />
        </DSPreview>
      </DSSection>

      <DSSection
        title="Dual-month due date picker"
        description="Linear-style modal picker showing the current and next month side by side. Includes a typed date input, today circled, and Save / Cancel actions."
      >
        <DSPreview>
          <DualMonthPicker />
        </DSPreview>
      </DSSection>

      <DSSection
        title="Range picker"
        description="Interactive from/to selector. Click a start date, then click an end date. Hovering previews the range end. The from/to pills at the top are also clickable to re-select."
      >
        <DSPreview>
          <RangePicker />
        </DSPreview>
      </DSSection>

      <DSSection
        title="Due date chips"
        description="Inline chips used in issue rows and detail panels. Three states: upcoming (neutral), soon (orange), and overdue (red). An empty dashed chip opens the picker."
      >
        <DSPreview>
          <DueDateChips />
        </DSPreview>
      </DSSection>
    </DSLayout>
  )
}
