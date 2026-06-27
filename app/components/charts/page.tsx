'use client'

import { DSLayout } from '@/components/ds/ds-layout'
import { DSSection, DSPreview } from '@/components/ds/ds-section'
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
} from '@/components/ui/chart'
import {
  LineChart, Line,
  BarChart, Bar,
  AreaChart, Area,
  PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid,
  ResponsiveContainer,
} from 'recharts'

// ---------------------------------------------------------------------------
// Shared data
// ---------------------------------------------------------------------------

const weeklyIssues = [
  { week: 'W1', opened: 12, closed: 8,  inProgress: 4 },
  { week: 'W2', opened: 18, closed: 14, inProgress: 6 },
  { week: 'W3', opened: 9,  closed: 16, inProgress: 3 },
  { week: 'W4', opened: 22, closed: 18, inProgress: 8 },
  { week: 'W5', opened: 15, closed: 20, inProgress: 5 },
  { week: 'W6', opened: 11, closed: 13, inProgress: 7 },
  { week: 'W7', opened: 19, closed: 17, inProgress: 4 },
  { week: 'W8', opened: 24, closed: 22, inProgress: 9 },
]

const velocityData = [
  { sprint: 'S1', points: 34 },
  { sprint: 'S2', points: 41 },
  { sprint: 'S3', points: 38 },
  { sprint: 'S4', points: 52 },
  { sprint: 'S5', points: 47 },
  { sprint: 'S6', points: 55 },
  { sprint: 'S7', points: 49 },
]

const cumulativeFlow = [
  { week: 'W1', todo: 40, inProgress: 8,  done: 12 },
  { week: 'W2', todo: 36, inProgress: 12, done: 18 },
  { week: 'W3', todo: 30, inProgress: 10, done: 28 },
  { week: 'W4', todo: 24, inProgress: 14, done: 38 },
  { week: 'W5', todo: 18, inProgress: 11, done: 50 },
  { week: 'W6', todo: 12, inProgress: 9,  done: 62 },
]

const priorityDist = [
  { name: 'Urgent',   value: 6  },
  { name: 'High',     value: 18 },
  { name: 'Medium',   value: 31 },
  { name: 'Low',      value: 22 },
]

const assigneeLoad = [
  { name: 'Alex',   open: 8, _gap: 1, review: 3 },
  { name: 'Jordan', open: 5, _gap: 1, review: 6 },
  { name: 'Sam',    open: 11, _gap: 1, review: 2 },
  { name: 'Taylor', open: 4, _gap: 1, review: 7 },
  { name: 'Morgan', open: 7, _gap: 1, review: 4 },
]

// Sparkline mini data sets
const sparkLines: Record<string, { v: number }[]> = {
  'Issues opened':  [8,12,9,18,15,11,22,19].map(v => ({ v })),
  'Issues closed':  [5, 8,16,14,20,13,18,22].map(v => ({ v })),
  'Cycle time (d)': [4, 5, 3, 6, 4, 3, 5, 4].map(v => ({ v })),
}

const statCards = [
  { label: 'Issues opened',  value: '114',  delta: '+12%', up: true  },
  { label: 'Issues closed',  value: '116',  delta: '+8%',  up: true  },
  { label: 'Cycle time (d)', value: '4.2',  delta: '-5%',  up: false },
]

// ---------------------------------------------------------------------------
// Chart configs
// ---------------------------------------------------------------------------

const lineConfig = {
  opened:     { label: 'Opened',      color: 'var(--chart-1)' },
  closed:     { label: 'Closed',      color: 'var(--chart-2)' },
  inProgress: { label: 'In Progress', color: 'var(--chart-3)' },
}

const barConfig = {
  points: { label: 'Story points', color: 'var(--chart-1)' },
}

const stackedBarConfig = {
  open:   { label: 'Open',   color: 'var(--chart-1)' },
  review: { label: 'Review', color: 'var(--chart-3)' },
}

const areaConfig = {
  todo:       { label: 'Todo',        color: 'var(--chart-4)' },
  inProgress: { label: 'In Progress', color: 'var(--chart-1)' },
  done:       { label: 'Done',        color: 'var(--chart-2)' },
}

const donutColors = [
  'var(--chart-5)',
  'var(--chart-3)',
  'var(--chart-1)',
  'var(--chart-4)',
]

const sparkConfig = { v: { color: 'var(--chart-1)' } }

// ---------------------------------------------------------------------------
// Shared chart axis/grid styles
// ---------------------------------------------------------------------------

const axisProps = {
  tick:  { fontSize: 11, fill: 'var(--muted-foreground)' },
  tickLine: false,
  axisLine: false,
}

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------

export default function ChartsPage() {
  return (
    <DSLayout title="Charts" description="Data visualisation components using Recharts + shadcn/ui ChartContainer. All colours are pulled from the chart token palette so they stay consistent with the design system.">

      {/* ------------------------------------------------------------------ */}
      {/* Line chart                                                           */}
      {/* ------------------------------------------------------------------ */}
      <DSSection
        title="Line chart"
        description="Weekly issue flow — opened, closed and in-progress over 8 weeks. Use for trends with 2–4 series."
      >
        <div className="rounded-md border border-border bg-surface-1 p-6">
          <p className="text-xs font-medium text-muted-foreground mb-4 uppercase tracking-wider">Weekly issue flow</p>
          <ChartContainer config={lineConfig} className="h-56 w-full">
            <LineChart data={weeklyIssues} margin={{ top: 4, right: 4, left: -16, bottom: 0 }}>
              <CartesianGrid vertical={false} stroke="var(--border)" />
              <XAxis dataKey="week" {...axisProps} />
              <YAxis {...axisProps} />
              <ChartTooltip content={<ChartTooltipContent />} />
              <ChartLegend content={<ChartLegendContent />} />
              <Line type="linear" dataKey="opened"     stroke="var(--color-opened)"     strokeWidth={2} dot={{ r: 2, strokeWidth: 0 }} activeDot={{ r: 3 }} />
              <Line type="linear" dataKey="closed"     stroke="var(--color-closed)"     strokeWidth={2} dot={{ r: 2, strokeWidth: 0 }} activeDot={{ r: 3 }} />
              <Line type="linear" dataKey="inProgress" stroke="var(--color-inProgress)" strokeWidth={2} dot={{ r: 2, strokeWidth: 0 }} activeDot={{ r: 3 }} strokeDasharray="4 2" />
            </LineChart>
          </ChartContainer>
        </div>
      </DSSection>

      {/* ------------------------------------------------------------------ */}
      {/* Bar chart                                                            */}
      {/* ------------------------------------------------------------------ */}
      <DSSection
        title="Bar chart"
        description="Sprint velocity in story points. Use for discrete period comparisons with a single metric."
      >
        <div className="rounded-md border border-border bg-surface-1 p-6">
          <p className="text-xs font-medium text-muted-foreground mb-4 uppercase tracking-wider">Sprint velocity</p>
          <ChartContainer config={barConfig} className="h-52 w-full">
            <BarChart data={velocityData} margin={{ top: 4, right: 4, left: -16, bottom: 0 }} barSize={24}>
              <CartesianGrid vertical={false} stroke="var(--border)" />
              <XAxis dataKey="sprint" {...axisProps} />
              <YAxis {...axisProps} />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Bar dataKey="points" fill="var(--color-points)" radius={[3, 3, 0, 0]} />
            </BarChart>
          </ChartContainer>
        </div>
      </DSSection>

      {/* ------------------------------------------------------------------ */}
      {/* Stacked bar chart                                                    */}
      {/* ------------------------------------------------------------------ */}
      <DSSection
        title="Stacked bar chart"
        description="Workload per assignee split by open and in-review issues. Use to compare distribution across team members."
      >
        <div className="rounded-md border border-border bg-surface-1 p-6">
          <p className="text-xs font-medium text-muted-foreground mb-4 uppercase tracking-wider">Team workload</p>
          <ChartContainer config={stackedBarConfig} className="h-52 w-full">
            <BarChart data={assigneeLoad} margin={{ top: 4, right: 4, left: -16, bottom: 0 }} barSize={24}>
              <CartesianGrid vertical={false} stroke="var(--border)" />
              <XAxis dataKey="name" {...axisProps} />
              <YAxis {...axisProps} />
              <ChartTooltip content={<ChartTooltipContent hideLabel />} />
              <ChartLegend content={<ChartLegendContent />} />
              <Bar dataKey="open"    fill="var(--color-open)"           stackId="a" radius={[0, 0, 3, 3]} />
              <Bar dataKey="_gap"    fill="var(--background)"           stackId="a" radius={0} legendType="none" tooltipType="none" />
              <Bar dataKey="review"  fill="var(--color-review)"         stackId="a" radius={[3, 3, 0, 0]} />
            </BarChart>
          </ChartContainer>
        </div>
      </DSSection>

      {/* ------------------------------------------------------------------ */}
      {/* Area chart                                                           */}
      {/* ------------------------------------------------------------------ */}
      <DSSection
        title="Area chart"
        description="Cumulative flow diagram showing issues moving from todo through in-progress to done. Use for pipeline health over time."
      >
        <div className="rounded-md border border-border bg-surface-1 p-6">
          <p className="text-xs font-medium text-muted-foreground mb-4 uppercase tracking-wider">Cumulative flow</p>
          <ChartContainer config={areaConfig} className="h-56 w-full">
            <AreaChart data={cumulativeFlow} margin={{ top: 4, right: 4, left: -16, bottom: 0 }}>
              <defs>
                <linearGradient id="gradTodo"       x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%"  stopColor="var(--color-todo)"       stopOpacity={0.25} />
                  <stop offset="95%" stopColor="var(--color-todo)"       stopOpacity={0} />
                </linearGradient>
                <linearGradient id="gradInProgress" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%"  stopColor="var(--color-inProgress)" stopOpacity={0.25} />
                  <stop offset="95%" stopColor="var(--color-inProgress)" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="gradDone"       x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%"  stopColor="var(--color-done)"       stopOpacity={0.25} />
                  <stop offset="95%" stopColor="var(--color-done)"       stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid vertical={false} stroke="var(--border)" />
              <XAxis dataKey="week" {...axisProps} />
              <YAxis {...axisProps} />
              <ChartTooltip content={<ChartTooltipContent />} />
              <ChartLegend content={<ChartLegendContent />} />
              <Area type="linear" dataKey="todo"       stroke="var(--color-todo)"       fill="url(#gradTodo)"       strokeWidth={2} dot={false} />
              <Area type="linear" dataKey="inProgress" stroke="var(--color-inProgress)" fill="url(#gradInProgress)" strokeWidth={2} dot={false} />
              <Area type="linear" dataKey="done"       stroke="var(--color-done)"       fill="url(#gradDone)"       strokeWidth={2} dot={false} />
            </AreaChart>
          </ChartContainer>
        </div>
      </DSSection>

      {/* ------------------------------------------------------------------ */}
      {/* Donut chart                                                          */}
      {/* ------------------------------------------------------------------ */}
      <DSSection
        title="Donut chart"
        description="Priority distribution across active issues. Use for part-to-whole relationships with 3–5 categories."
      >
        <div className="rounded-md border border-border bg-surface-1 p-6">
          <p className="text-xs font-medium text-muted-foreground mb-4 uppercase tracking-wider">Priority distribution</p>
          <div className="flex items-center gap-8">
            <ChartContainer config={{}} className="h-44 w-44 shrink-0">
              <PieChart>
                <ChartTooltip
                  content={({ active, payload }) =>
                    active && payload?.length ? (
                      <div className="rounded-md border border-border bg-popover px-3 py-2 text-xs text-foreground shadow-md">
                        <span className="font-medium">{payload[0].name}</span>
                        <span className="ml-2 text-muted-foreground">{payload[0].value} issues</span>
                      </div>
                    ) : null
                  }
                />
                <Pie
                  data={priorityDist}
                  cx="50%"
                  cy="50%"
                  innerRadius={48}
                  outerRadius={68}
                  paddingAngle={2}
                  dataKey="value"
                  strokeWidth={0}
                >
                  {priorityDist.map((_, i) => (
                    <Cell key={i} fill={donutColors[i]} />
                  ))}
                </Pie>
              </PieChart>
            </ChartContainer>
            {/* Legend */}
            <div className="space-y-2.5">
              {priorityDist.map((item, i) => (
                <div key={item.name} className="flex items-center gap-2.5 text-xs">
                  <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ background: donutColors[i] }} />
                  <span className="text-foreground w-16">{item.name}</span>
                  <span className="text-muted-foreground">{item.value} issues</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </DSSection>

      {/* ------------------------------------------------------------------ */}
      {/* Sparklines in stat cards                                             */}
      {/* ------------------------------------------------------------------ */}
      <DSSection
        title="Sparklines"
        description="Micro trend lines embedded in stat cards. Use inline to show directional change without axes or labels."
      >
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {statCards.map(({ label, value, delta, up }) => (
            <div key={label} className="rounded-md border border-border bg-surface-1 p-4 space-y-3">
              <p className="text-[11px] text-muted-foreground uppercase tracking-wider">{label}</p>
              <div className="flex items-end justify-between gap-4">
                <div>
                  <p className="text-2xl font-semibold text-foreground tabular-nums">{value}</p>
                  <p className={`text-[11px] font-medium mt-0.5 ${up ? 'text-[var(--green-400)]' : 'text-[var(--red-400)]'}`}>
                    {delta} vs last period
                  </p>
                </div>
                <ChartContainer config={sparkConfig} className="h-12 w-24 shrink-0">
                  <LineChart data={sparkLines[label]} margin={{ top: 2, right: 2, left: 2, bottom: 2 }}>
                    <Line
                      type="linear"
                      dataKey="v"
                      stroke={up ? 'var(--color-v)' : 'var(--chart-5)'}
                      strokeWidth={1.5}
                      dot={false}
                    />
                  </LineChart>
                </ChartContainer>
              </div>
            </div>
          ))}
        </div>
      </DSSection>

    </DSLayout>
  )
}
