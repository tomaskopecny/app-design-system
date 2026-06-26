'use client'

import { DSLayout } from '@/components/ds/ds-layout'
import { DSSection, DSPreview } from '@/components/ds/ds-section'
import { useState } from 'react'
import { DayPicker, type DateRange } from 'react-day-picker'
import { format, isToday } from 'date-fns'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import 'react-day-picker/style.css'

// Dates with issue events
const today = new Date()
const eventDates = [
  new Date(today.getFullYear(), today.getMonth(), today.getDate() - 2),
  new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1),
  new Date(today.getFullYear(), today.getMonth(), today.getDate() + 4),
  new Date(today.getFullYear(), today.getMonth(), today.getDate() + 7),
  new Date(today.getFullYear(), today.getMonth(), today.getDate() + 9),
]

// Cycle range
const cycleStart = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 5)
const cycleEnd = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 8)

function LinearCalendarSingle({ showEvents = false }: { showEvents?: boolean }) {
  const [selected, setSelected] = useState<Date | undefined>(today)
  const [month, setMonth] = useState(today)

  return (
    <div className="inline-flex flex-col bg-popover border border-border rounded-md shadow-lg overflow-hidden w-[268px]">
      <DayPicker
        mode="single"
        selected={selected}
        onSelect={setSelected}
        month={month}
        onMonthChange={setMonth}
        showOutsideDays
        classNames={{
          root: 'p-3',
          months: 'relative',
          month: 'space-y-2',
          month_caption: 'flex items-center justify-between mb-1',
          caption_label: 'text-xs font-semibold text-foreground',
          nav: 'flex items-center gap-0.5',
          button_previous: 'w-6 h-6 flex items-center justify-center rounded text-muted-foreground hover:text-foreground hover:bg-accent transition-colors cursor-pointer',
          button_next: 'w-6 h-6 flex items-center justify-center rounded text-muted-foreground hover:text-foreground hover:bg-accent transition-colors cursor-pointer',
          weeks: 'space-y-0.5',
          weekdays: 'flex',
          weekday: 'flex-1 text-center text-[10px] font-medium text-muted-foreground py-1',
          week: 'flex',
          day: 'flex-1 text-center',
          day_button: `w-7 h-7 mx-auto flex items-center justify-center text-[11px] rounded transition-colors cursor-pointer
            text-foreground hover:bg-accent focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring`,
          selected: '!bg-foreground !text-background hover:!bg-foreground/90',
          today: 'font-semibold text-foreground',
          outside: 'opacity-30',
          disabled: 'opacity-20 pointer-events-none',
        }}
        components={{
          Chevron: ({ orientation }) =>
            orientation === 'left'
              ? <ChevronLeft className="w-3 h-3" />
              : <ChevronRight className="w-3 h-3" />,
          DayButton: ({ day, modifiers, children, ...props }) => {
            const hasEvent = showEvents && eventDates.some(d =>
              d.getDate() === day.date.getDate() &&
              d.getMonth() === day.date.getMonth() &&
              d.getFullYear() === day.date.getFullYear()
            )
            return (
              <button
                {...props}
                className={`w-7 h-7 mx-auto flex flex-col items-center justify-center text-[11px] rounded transition-colors cursor-pointer relative
                  ${modifiers.selected ? 'bg-foreground text-background' : ''}
                  ${modifiers.today && !modifiers.selected ? 'font-bold' : ''}
                  ${modifiers.outside ? 'opacity-30' : ''}
                  hover:bg-accent
                `}
              >
                {children}
                {hasEvent && !modifiers.selected && (
                  <span className="absolute bottom-0.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-status-inprogress" />
                )}
              </button>
            )
          },
        }}
      />
    </div>
  )
}

function LinearCalendarRange() {
  const [range, setRange] = useState<DateRange>({
    from: cycleStart,
    to: cycleEnd,
  })
  const [month, setMonth] = useState(today)

  return (
    <div className="inline-flex flex-col bg-popover border border-border rounded-md shadow-lg overflow-hidden w-[268px]">
      <DayPicker
        mode="range"
        selected={range}
        onSelect={(r: DateRange | undefined) => setRange(r ?? { from: undefined, to: undefined })}
        month={month}
        onMonthChange={setMonth}
        showOutsideDays
        classNames={{
          root: 'p-3',
          months: 'relative',
          month: 'space-y-2',
          month_caption: 'flex items-center justify-between mb-1',
          caption_label: 'text-xs font-semibold text-foreground',
          nav: 'flex items-center gap-0.5',
          button_previous: 'w-6 h-6 flex items-center justify-center rounded text-muted-foreground hover:text-foreground hover:bg-accent transition-colors cursor-pointer',
          button_next: 'w-6 h-6 flex items-center justify-center rounded text-muted-foreground hover:text-foreground hover:bg-accent transition-colors cursor-pointer',
          weeks: 'space-y-0.5',
          weekdays: 'flex',
          weekday: 'flex-1 text-center text-[10px] font-medium text-muted-foreground py-1',
          week: 'flex',
          day: 'flex-1 text-center',
          day_button: `w-7 h-7 mx-auto flex items-center justify-center text-[11px] rounded transition-colors cursor-pointer
            text-foreground hover:bg-accent focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring`,
          selected: '!bg-foreground !text-background hover:!bg-foreground/90',
          today: 'font-semibold text-foreground',
          outside: 'opacity-30',
          range_start: '!bg-foreground !text-background rounded-l-full rounded-r-none',
          range_end: '!bg-foreground !text-background rounded-r-full rounded-l-none',
          range_middle: '!bg-foreground/10 !text-foreground !rounded-none',
          disabled: 'opacity-20 pointer-events-none',
        }}
        components={{
          Chevron: ({ orientation }) =>
            orientation === 'left'
              ? <ChevronLeft className="w-3 h-3" />
              : <ChevronRight className="w-3 h-3" />,
          DayButton: ({ day, modifiers, children, ...props }) => (
            <button
              {...props}
              className={`w-7 h-7 mx-auto flex flex-col items-center justify-center text-[11px] rounded transition-colors cursor-pointer relative
                ${modifiers.range_start ? 'bg-foreground text-background !rounded-full' : ''}
                ${modifiers.range_end ? 'bg-foreground text-background !rounded-full' : ''}
                ${modifiers.range_middle ? 'bg-foreground/10 text-foreground !rounded-none' : ''}
                ${modifiers.today && !modifiers.selected ? 'font-bold' : ''}
                ${modifiers.outside ? 'opacity-30' : ''}
                hover:bg-accent
              `}
            >
              {children}
            </button>
          ),
        }}
      />
    </div>
  )
}

function MiniCalendar() {
  const [sel, setSel] = useState<Date | undefined>(today)
  const [month, setMonth] = useState(today)
  const daysInMonth = new Date(month.getFullYear(), month.getMonth() + 1, 0).getDate()
  const firstDay = new Date(month.getFullYear(), month.getMonth(), 1).getDay()
  const days = Array.from({ length: 42 }, (_, i) => {
    const d = i - firstDay + 1
    return d >= 1 && d <= daysInMonth ? new Date(month.getFullYear(), month.getMonth(), d) : null
  })

  return (
    <div className="inline-flex flex-col bg-surface-1 border border-border rounded-md p-3 w-[200px]">
      <div className="flex items-center justify-between mb-2">
        <button onClick={() => setMonth(new Date(month.getFullYear(), month.getMonth() - 1))} className="w-5 h-5 flex items-center justify-center rounded text-muted-foreground hover:text-foreground hover:bg-accent cursor-pointer">
          <ChevronLeft className="w-3 h-3" />
        </button>
        <span className="text-[11px] font-semibold text-foreground">{format(month, 'MMMM yyyy')}</span>
        <button onClick={() => setMonth(new Date(month.getFullYear(), month.getMonth() + 1))} className="w-5 h-5 flex items-center justify-center rounded text-muted-foreground hover:text-foreground hover:bg-accent cursor-pointer">
          <ChevronRight className="w-3 h-3" />
        </button>
      </div>
      <div className="grid grid-cols-7 gap-0">
        {['S','M','T','W','T','F','S'].map((d, i) => (
          <div key={i} className="text-center text-[9px] font-medium text-muted-foreground py-0.5">{d}</div>
        ))}
        {days.map((date, i) => {
          if (!date) return <div key={i} />
          const isSelected = sel && date.getTime() === sel.getTime()
          const isCurrentDay = isToday(date)
          return (
            <button
              key={i}
              onClick={() => setSel(date)}
              className={`w-full aspect-square flex items-center justify-center text-[10px] rounded transition-colors cursor-pointer
                ${isSelected ? 'bg-foreground text-background' : isCurrentDay ? 'font-bold text-foreground' : 'text-muted-foreground hover:bg-accent hover:text-foreground'}`}
            >
              {date.getDate()}
            </button>
          )
        })}
      </div>
    </div>
  )
}

export default function CalendarPage() {
  return (
    <DSLayout
      title="Calendar"
      description="Calendar components built on react-day-picker. Three modes: single date picker, date range picker, and mini calendar. Event dots indicate days with scheduled issues or due dates."
    >
      <DSSection title="Single date picker" description="Click any day to select it. Today is bold. Used for setting issue due dates.">
        <DSPreview code={`import { DayPicker } from 'react-day-picker'
import 'react-day-picker/style.css'

<DayPicker
  mode="single"
  selected={selected}
  onSelect={setSelected}
  classNames={{
    selected: '!bg-foreground !text-background',
    today: 'font-semibold',
    ...
  }}
/>`}>
          <LinearCalendarSingle />
        </DSPreview>
      </DSSection>

      <DSSection title="Date range picker" description="Select a start and end date — used for cycle/sprint date definition.">
        <DSPreview>
          <LinearCalendarRange />
        </DSPreview>
      </DSSection>

      <DSSection title="With event indicators" description="Dots beneath days indicate scheduled events, due dates, or active cycles.">
        <DSPreview>
          <LinearCalendarSingle showEvents />
        </DSPreview>
      </DSSection>

      <DSSection title="Mini calendar" description="Compact sidebar calendar for quick date navigation. Narrower at 200px, smaller text, no shadows.">
        <DSPreview>
          <MiniCalendar />
        </DSPreview>
      </DSSection>

      <DSSection title="Due date chip" description="Once a date is selected, it renders as a compact chip in the issue detail view.">
        <DSPreview>
          <div className="flex flex-wrap gap-2">
            <div className="inline-flex items-center gap-1.5 h-6 px-2 rounded-md bg-surface-2 border border-border text-xs text-foreground cursor-pointer hover:bg-surface-3 transition-colors">
              <span className="text-muted-foreground">Due:</span>
              {format(today, 'MMM d')}
            </div>
            <div className="inline-flex items-center gap-1.5 h-6 px-2 rounded-md bg-priority-urgent/10 border border-priority-urgent/30 text-xs text-priority-urgent cursor-pointer hover:bg-priority-urgent/15 transition-colors">
              <span className="opacity-70">Due:</span>
              {format(new Date(today.getFullYear(), today.getMonth(), today.getDate() - 1), 'MMM d')} (overdue)
            </div>
            <div className="inline-flex items-center gap-1.5 h-6 px-2 rounded-md bg-surface-2 border border-border text-xs text-muted-foreground cursor-pointer hover:bg-surface-3 transition-colors">
              + Add due date
            </div>
          </div>
        </DSPreview>
      </DSSection>
    </DSLayout>
  )
}
