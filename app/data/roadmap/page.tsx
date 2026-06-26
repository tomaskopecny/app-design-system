'use client'

import { DSLayout } from '@/components/ds/ds-layout'
import { DSSection } from '@/components/ds/ds-section'
import { useRef, useState } from 'react'
import { ChevronDown, ChevronRight } from 'lucide-react'

// ─── Data ────────────────────────────────────────────────────────────────────

const WEEK_WIDTH = 28 // px per week column
const ROW_HEIGHT = 32 // px per row
const LABEL_WIDTH = 200 // px for left label column

// Reference date: today anchored to a Monday
const TODAY = new Date(2025, 5, 18) // Jun 18 2025

function mondayOf(d: Date) {
  const day = new Date(d)
  const diff = (day.getDay() + 6) % 7 // Mon=0
  day.setDate(day.getDate() - diff)
  day.setHours(0, 0, 0, 0)
  return day
}

const CHART_START = mondayOf(new Date(2025, 1, 3)) // Feb 3
const TOTAL_WEEKS = 36 // covers ~9 months

// Map a date to x offset in px from CHART_START
function dateToX(date: Date): number {
  const msPerWeek = 7 * 24 * 60 * 60 * 1000
  return ((date.getTime() - CHART_START.getTime()) / msPerWeek) * WEEK_WIDTH
}

// Milestone diamond position
function MilestoneDiamond({
  date,
  label,
  color,
}: {
  date: Date
  label: string
  color: string
}) {
  const x = dateToX(date)
  return (
    <g>
      <rect
        x={x - 5}
        y={ROW_HEIGHT / 2 - 5}
        width={10}
        height={10}
        rx={1}
        transform={`rotate(45, ${x}, ${ROW_HEIGHT / 2})`}
        fill={color}
        opacity={0.9}
      />
      <text
        x={x}
        y={ROW_HEIGHT - 3}
        textAnchor="middle"
        fontSize={8}
        fill="oklch(0.75 0 0)"
        fontFamily="var(--font-sans)"
      >
        {label}
      </text>
    </g>
  )
}

// ─── Types ───────────────────────────────────────────────────────────────────

type Milestone = { date: Date; label: string }

type GanttRow = {
  id: string
  label: string
  sublabel?: string
  color: string
  start: Date
  end: Date
  milestones?: Milestone[]
  children?: GanttRow[]
  avatarColor?: string
  avatarInitials?: string
  progress?: number // 0–100
}

// ─── Sample data ─────────────────────────────────────────────────────────────

const rows: GanttRow[] = [
  {
    id: 'driver-rating',
    label: 'Driver rating system',
    sublabel: 'Public Release 12% +3',
    color: '#c0392b',
    avatarInitials: 'DR',
    avatarColor: '#e74c3c',
    progress: 68,
    start: new Date(2025, 2, 3),
    end: new Date(2025, 7, 25),
    milestones: [],
  },
  {
    id: 'spanish',
    label: 'Spanish localization',
    color: '#2980b9',
    avatarInitials: 'SL',
    avatarColor: '#3498db',
    progress: 45,
    start: new Date(2025, 2, 17),
    end: new Date(2025, 6, 14),
    milestones: [
      { date: new Date(2025, 3, 28), label: 'First translation' },
      { date: new Date(2025, 5, 23), label: 'Final review' },
    ],
    children: [
      {
        id: 'spanish-ui',
        label: 'UI strings',
        color: '#3498db',
        progress: 80,
        start: new Date(2025, 2, 17),
        end: new Date(2025, 4, 5),
      },
      {
        id: 'spanish-docs',
        label: 'Help docs',
        color: '#3498db',
        progress: 20,
        start: new Date(2025, 4, 5),
        end: new Date(2025, 6, 14),
      },
    ],
  },
  {
    id: 'oxxo',
    label: 'Add OXXO support',
    color: '#8e44ad',
    avatarInitials: 'OX',
    avatarColor: '#9b59b6',
    progress: 30,
    start: new Date(2025, 4, 12),
    end: new Date(2025, 7, 11),
    milestones: [
      { date: new Date(2025, 5, 9), label: 'Legal' },
      { date: new Date(2025, 6, 7), label: 'Soft launch' },
    ],
  },
  {
    id: 'split-fares',
    label: 'Split fares',
    color: '#16a085',
    avatarInitials: 'SF',
    avatarColor: '#1abc9c',
    progress: 55,
    start: new Date(2025, 3, 7),
    end: new Date(2025, 8, 1),
    milestones: [
      { date: new Date(2025, 4, 26), label: 'Specs' },
      { date: new Date(2025, 5, 23), label: 'Design' },
      { date: new Date(2025, 8, 1), label: 'Stripe' },
    ],
    children: [
      {
        id: 'rewards',
        label: 'Rewards',
        color: '#1abc9c',
        progress: 40,
        start: new Date(2025, 4, 19),
        end: new Date(2025, 7, 18),
        milestones: [
          { date: new Date(2025, 5, 9), label: 'Prototype' },
          { date: new Date(2025, 6, 7), label: 'Internal beta' },
          { date: new Date(2025, 7, 11), label: 'Release' },
        ],
      },
      {
        id: 'location-api',
        label: 'Location-tracking API',
        color: '#1abc9c',
        progress: 10,
        start: new Date(2025, 5, 16),
        end: new Date(2025, 8, 1),
      },
    ],
  },
]

// ─── Sub-components ───────────────────────────────────────────────────────────

function GanttHeader({ totalPx }: { totalPx: number }) {
  // Build month + week labels
  const months: { label: string; x: number; width: number }[] = []
  const weeks: { x: number; isMonthStart: boolean; weekNum: number }[] = []

  let cur = new Date(CHART_START)
  for (let w = 0; w < TOTAL_WEEKS; w++) {
    const x = w * WEEK_WIDTH
    const isMonthStart = cur.getDate() <= 7
    weeks.push({ x, isMonthStart, weekNum: w })

    // Group into months
    const mo = cur.toLocaleString('en', { month: 'short' }).toUpperCase()
    const last = months[months.length - 1]
    if (!last || last.label !== mo) {
      months.push({ label: mo, x, width: WEEK_WIDTH })
    } else {
      last.width += WEEK_WIDTH
    }
    cur.setDate(cur.getDate() + 7)
  }

  return (
    <div
      className="sticky top-0 z-10 bg-surface-1 border-b border-border select-none"
      style={{ width: totalPx }}
    >
      {/* Month row */}
      <div className="relative h-6 border-b border-border/50">
        {months.map((m) => (
          <div
            key={`${m.label}-${m.x}`}
            className="absolute top-0 h-full flex items-center px-2"
            style={{ left: m.x, width: m.width }}
          >
            <span className="text-[10px] font-semibold text-muted-foreground/70 tracking-widest">
              {m.label}
            </span>
          </div>
        ))}
      </div>
      {/* Week row */}
      <div className="relative h-5">
        {weeks.map((w) => {
          const d = new Date(CHART_START)
          d.setDate(d.getDate() + w.weekNum * 7)
          const day = d.getDate()
          return (
            <div
              key={w.x}
              className="absolute top-0 h-full flex items-center justify-center"
              style={{ left: w.x, width: WEEK_WIDTH }}
            >
              <span
                className={`text-[9px] tabular-nums ${
                  w.isMonthStart
                    ? 'text-muted-foreground/60'
                    : 'text-muted-foreground/30'
                }`}
              >
                {day}
              </span>
            </div>
          )
        })}
      </div>
    </div>
  )
}

function TodayLine({ height }: { height: number }) {
  const x = dateToX(TODAY) + WEEK_WIDTH / 2
  const labelW = 36
  return (
    <g>
      <line
        x1={x}
        y1={0}
        x2={x}
        y2={height}
        stroke="oklch(0.65 0.18 255)"
        strokeWidth={1}
        strokeDasharray="3 2"
        opacity={0.7}
      />
      <rect
        x={x - labelW / 2}
        y={-18}
        width={labelW}
        height={14}
        rx={3}
        fill="oklch(0.65 0.18 255)"
      />
      <text
        x={x}
        y={-7}
        textAnchor="middle"
        fontSize={8}
        fontWeight={600}
        fill="oklch(0.97 0 0)"
        fontFamily="var(--font-sans)"
      >
        {TODAY.toLocaleString('en', { month: 'short', day: 'numeric' }).toUpperCase()}
      </text>
    </g>
  )
}

function GanttBar({
  row,
  y,
  depth = 0,
}: {
  row: GanttRow
  y: number
  depth?: number
}) {
  const x = dateToX(row.start)
  const w = Math.max(dateToX(row.end) - x, WEEK_WIDTH)
  const barH = depth === 0 ? 16 : 12
  const barY = y + (ROW_HEIGHT - barH) / 2

  return (
    <g>
      {/* Track background */}
      <rect
        x={x}
        y={barY}
        width={w}
        height={barH}
        rx={barH / 2}
        fill={row.color}
        opacity={0.18}
      />
      {/* Progress fill */}
      {row.progress !== undefined && (
        <rect
          x={x}
          y={barY}
          width={w * (row.progress / 100)}
          height={barH}
          rx={barH / 2}
          fill={row.color}
          opacity={0.75}
        />
      )}
      {/* Milestones */}
      {row.milestones?.map((m) => (
        <g key={m.label} transform={`translate(0, ${y})`}>
          <MilestoneDiamond date={m.date} label={m.label} color={row.color} />
        </g>
      ))}
    </g>
  )
}

// ─── Flattened row renderer ────────────────────────────────────────────────

type FlatRow = { row: GanttRow; depth: number; parentId?: string }

function flattenRows(rows: GanttRow[], depth = 0, expanded: Set<string>): FlatRow[] {
  const result: FlatRow[] = []
  for (const row of rows) {
    result.push({ row, depth })
    if (row.children && expanded.has(row.id)) {
      result.push(...flattenRows(row.children, depth + 1, expanded))
    }
  }
  return result
}

// ─── Main chart ───────────────────────────────────────────────────────────────

function GanttChart() {
  const [expanded, setExpanded] = useState<Set<string>>(new Set(['spanish', 'split-fares']))
  const scrollRef = useRef<HTMLDivElement>(null)

  const totalPx = TOTAL_WEEKS * WEEK_WIDTH
  const flat = flattenRows(rows, 0, expanded)
  const svgHeight = flat.length * ROW_HEIGHT + 20 // extra for today label overflow

  function toggleExpand(id: string) {
    setExpanded(prev => {
      const next = new Set(prev)
      next.has(id) ? next.delete(id) : next.add(id)
      return next
    })
  }

  // Vertical grid line x positions for each week
  const gridLines = Array.from({ length: TOTAL_WEEKS + 1 }, (_, i) => i * WEEK_WIDTH)

  return (
    <div className="rounded-md border border-border bg-surface-1 overflow-hidden">
      <div className="flex">
        {/* ── Left label column ─────────────────────────────────────── */}
        <div
          className="shrink-0 border-r border-border bg-surface-1 z-20"
          style={{ width: LABEL_WIDTH }}
        >
          {/* Header spacer matching the GanttHeader height (24+20=44px) */}
          <div className="h-[44px] border-b border-border bg-surface-1 px-3 flex items-end pb-1.5">
            <span className="text-[9px] font-semibold uppercase tracking-widest text-muted-foreground/50">
              Project
            </span>
          </div>

          {/* Label rows */}
          {flat.map(({ row, depth }) => {
            const hasChildren = !!row.children?.length
            const isExpanded = expanded.has(row.id)
            return (
              <div
                key={row.id}
                className="flex items-center gap-1.5 border-b border-line last:border-0 hover:bg-surface-2 transition-colors cursor-pointer"
                style={{ height: ROW_HEIGHT, paddingLeft: 8 + depth * 14 }}
                onClick={() => hasChildren && toggleExpand(row.id)}
              >
                {/* Expand chevron or spacer */}
                <span className="w-4 shrink-0 flex items-center justify-center">
                  {hasChildren ? (
                    isExpanded ? (
                      <ChevronDown className="w-3 h-3 text-muted-foreground/50" />
                    ) : (
                      <ChevronRight className="w-3 h-3 text-muted-foreground/50" />
                    )
                  ) : (
                    <span
                      className="w-1.5 h-1.5 rounded-full shrink-0"
                      style={{ background: row.color, opacity: 0.6 }}
                    />
                  )}
                </span>

                <div className="flex-1 min-w-0">
                  <p
                    className={`truncate leading-none ${
                      depth === 0
                        ? 'text-[11px] font-medium text-foreground'
                        : 'text-[10px] text-muted-foreground'
                    }`}
                  >
                    {row.label}
                  </p>
                  {row.sublabel && (
                    <p className="text-[9px] text-muted-foreground/50 truncate mt-0.5">
                      {row.sublabel}
                    </p>
                  )}
                </div>

                {/* Avatar */}
                {row.avatarInitials && (
                  <span
                    className="w-4 h-4 rounded-full shrink-0 mr-2 flex items-center justify-center text-[7px] font-bold text-background"
                    style={{ background: row.avatarColor }}
                  >
                    {row.avatarInitials}
                  </span>
                )}
              </div>
            )
          })}
        </div>

        {/* ── Right scrollable chart ─────────────────────────────────── */}
        <div
          ref={scrollRef}
          className="flex-1 overflow-x-auto overflow-y-hidden"
          style={{ minWidth: 0 }}
        >
          {/* Sticky month/week header */}
          <GanttHeader totalPx={totalPx} />

          {/* SVG canvas */}
          <svg
            width={totalPx}
            height={svgHeight}
            style={{ display: 'block', overflow: 'visible' }}
          >
            {/* Vertical grid lines */}
            {gridLines.map((x) => (
              <line
                key={x}
                x1={x}
                y1={0}
                x2={x}
                y2={svgHeight}
                stroke="oklch(1 0 0 / 4%)"
                strokeWidth={1}
              />
            ))}

            {/* Horizontal row separators */}
            {flat.map((_, i) => (
              <line
                key={i}
                x1={0}
                y1={(i + 1) * ROW_HEIGHT}
                x2={totalPx}
                y2={(i + 1) * ROW_HEIGHT}
                stroke="oklch(1 0 0 / 5%)"
                strokeWidth={1}
              />
            ))}

            {/* Today line — rendered inside SVG, offset down by header height */}
            <g transform="translate(0, 18)">
              <TodayLine height={flat.length * ROW_HEIGHT} />
            </g>

            {/* Bars */}
            {flat.map(({ row, depth }, i) => (
              <GanttBar
                key={row.id}
                row={row}
                y={i * ROW_HEIGHT}
                depth={depth}
              />
            ))}
          </svg>
        </div>
      </div>
    </div>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function RoadmapPage() {
  return (
    <DSLayout
      title="Roadmap / Gantt"
      description="A timeline chart mapping projects and milestones across months. Rows show a progress bar inside a colored track; diamond markers indicate milestones. Rows with sub-tasks are collapsible."
    >
      <DSSection
        title="Roadmap chart"
        description="Horizontally scrollable canvas with a frozen label column. Each row renders a progress-filled bar; diamond markers note milestones. Click a row with children to expand or collapse sub-tasks."
      >
        <GanttChart />
      </DSSection>

      <DSSection
        title="Anatomy"
        description="Key elements of the chart and when to use each."
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {[
            {
              name: 'Track bar',
              desc: 'Full-width translucent bar shows the scheduled span. A filled portion reflects percentage complete.',
              color: '#2980b9',
            },
            {
              name: 'Milestone diamond',
              desc: 'Rotated 45° square marks a discrete event (launch, review, legal approval) at a specific date.',
              color: '#16a085',
            },
            {
              name: 'Today line',
              desc: 'Dashed vertical line with a date chip anchors the viewer in the current week at a glance.',
              color: 'oklch(0.65 0.18 255)',
            },
            {
              name: 'Collapsed children',
              desc: 'Click a parent row to reveal sub-tasks. Children indent by 14 px and use a smaller bar height.',
              color: '#8e44ad',
            },
          ].map((item) => (
            <div
              key={item.name}
              className="flex items-start gap-3 p-3 bg-surface-1 rounded-md border border-border"
            >
              <span
                className="w-2 h-2 rounded-sm mt-1 shrink-0"
                style={{ background: item.color }}
              />
              <div>
                <p className="text-xs font-medium text-foreground mb-0.5">{item.name}</p>
                <p className="text-[11px] text-muted-foreground leading-relaxed">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </DSSection>
    </DSLayout>
  )
}
