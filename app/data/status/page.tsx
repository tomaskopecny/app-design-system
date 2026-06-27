import { DSLayout } from '@/components/ds/ds-layout'
import { DSSection } from '@/components/ds/ds-section'
import { AlertCircle, ArrowUp, Minus, ArrowDown, Circle, CheckCircle2, X, Clock } from 'lucide-react'

function PreviewBox({ children }: { children: React.ReactNode }) {
  return (
    <div className="p-6 bg-surface-1 flex flex-wrap gap-4 items-center rounded-t-md border border-border">
      {children}
    </div>
  )
}

function CodeSnippet({ code }: { code: string }) {
  return (
    <div className="border-t border-border bg-background px-4 py-3 rounded-b-md">
      <pre className="font-mono text-[11px] text-muted-foreground overflow-x-auto">{code}</pre>
    </div>
  )
}

const statusEntries = [
  { key: 'backlog',    label: 'Backlog',      color: '#6B6B6B', Icon: Circle,       variant: 'outline' },
  { key: 'todo',       label: 'Todo',         color: '#6B6B6B', Icon: Circle,       variant: 'outline' },
  { key: 'inprogress', label: 'In Progress',  color: '#4D8EE8', Icon: Circle,       variant: 'half' },
  { key: 'review',     label: 'In Review',    color: '#D4A72C', Icon: Clock,        variant: 'solid' },
  { key: 'done',       label: 'Done',         color: '#4CAF7D', Icon: CheckCircle2, variant: 'solid' },
  { key: 'cancelled',  label: 'Cancelled',    color: '#404040', Icon: X,            variant: 'solid' },
]

const priorityEntries = [
  { key: 'no-priority', label: 'No priority', color: '#6B6B6B', Icon: Minus },
  { key: 'urgent',      label: 'Urgent',      color: '#E5534B', Icon: AlertCircle },
  { key: 'high',        label: 'High',        color: '#E07B39', Icon: ArrowUp },
  { key: 'medium',      label: 'Medium',      color: '#D4A72C', Icon: Minus },
  { key: 'low',         label: 'Low',         color: '#6B6B6B', Icon: ArrowDown },
]

export default function StatusPage() {
  return (
    <DSLayout
      title="Status & Priority"
      description="Status and priority are the two most critical metadata fields in an issue tracker. Each has a precise icon, color, and label — always used together as a pair."
    >
      <DSSection
        title="Status icons"
        description="Six workflow states. Icon shape and fill communicate the state category at a glance without reading the label."
      >
        <div className="rounded-md border border-border overflow-hidden">
          <PreviewBox>
            {statusEntries.map(({ key, label, color, Icon }) => (
              <div key={key} className="flex items-center gap-2">
                <Icon className="w-4 h-4 shrink-0" style={{ color }} />
                <span className="text-sm text-foreground">{label}</span>
              </div>
            ))}
          </PreviewBox>
          <CodeSnippet code={`import { Circle, CheckCircle2, X } from 'lucide-react'

// Todo
<Circle className="w-4 h-4" style={{ color: '#6B6B6B' }} />

// In Progress
<Circle className="w-4 h-4" style={{ color: '#4D8EE8' }} />

// Done
<CheckCircle2 className="w-4 h-4" style={{ color: '#4CAF7D' }} />

// Cancelled
<X className="w-4 h-4" style={{ color: '#404040' }} />`} />
        </div>
      </DSSection>

      <DSSection
        title="Priority icons"
        description="Five priority levels. Use icon + color consistently — never just one of them."
      >
        <div className="rounded-md border border-border overflow-hidden">
          <PreviewBox>
            {priorityEntries.map(({ key, label, color, Icon }) => (
              <div key={key} className="flex items-center gap-2">
                <Icon className="w-4 h-4 shrink-0" style={{ color }} />
                <span className="text-sm text-foreground">{label}</span>
              </div>
            ))}
          </PreviewBox>
          <CodeSnippet code={`import { AlertCircle, ArrowUp, Minus, ArrowDown } from 'lucide-react'

// Urgent
<AlertCircle className="w-4 h-4" style={{ color: '#E5534B' }} />

// High
<ArrowUp className="w-4 h-4" style={{ color: '#E07B39' }} />

// Medium
<Minus className="w-4 h-4" style={{ color: '#D4A72C' }} />

// Low
<ArrowDown className="w-4 h-4" style={{ color: '#6B6B6B' }} />`} />
        </div>
      </DSSection>

      <DSSection
        title="Combined in context"
        description="Status and priority always appear together on an issue row. Priority is left of status."
      >
        <div className="rounded-md border border-border bg-surface-1">
          {[
            { label: 'Implement command palette', priority: priorityEntries[1], status: statusEntries[2] },
            { label: 'Fix sidebar scroll bug', priority: priorityEntries[2], status: statusEntries[0] },
            { label: 'Design token audit', priority: priorityEntries[4], status: statusEntries[4] },
            { label: 'Add presence indicators', priority: priorityEntries[3], status: statusEntries[1] },
          ].map(({ label, priority, status }) => (
            <div key={label} className="flex items-center gap-3 px-4 py-2.5 border-b border-border last:border-0 hover:bg-accent/50 transition-colors">
              <priority.Icon className="w-3.5 h-3.5 shrink-0" style={{ color: priority.color }} />
              <status.Icon className="w-3.5 h-3.5 shrink-0" style={{ color: status.color }} />
              <span className="text-sm text-foreground">{label}</span>
            </div>
          ))}
        </div>
      </DSSection>

      <DSSection
        title="Status color reference"
        description="All status and priority values with their exact hex values and CSS variable equivalents."
      >
        <div className="rounded-md border border-border overflow-hidden">
          <div className="grid grid-cols-[140px_100px_160px_1fr] px-4 py-2.5 bg-surface-2 border-b border-border gap-4">
            {['State', 'Color', 'CSS Variable', 'Usage'].map(h => (
              <p key={h} className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">{h}</p>
            ))}
          </div>
          <div className="bg-surface-1">
            {[
              ...statusEntries.map(e => ({ name: e.label, color: e.color, cssVar: `--status-${e.key.replace('inprogress','inprogress')}`, usage: 'Issue workflow state' })),
              ...priorityEntries.filter(e => e.key !== 'no-priority').map(e => ({ name: e.label, color: e.color, cssVar: `--priority-${e.key}`, usage: 'Issue priority level' })),
            ].map(({ name, color, cssVar, usage }) => (
              <div key={name} className="grid grid-cols-[140px_100px_160px_1fr] px-4 py-2.5 border-b border-border last:border-0 gap-4 items-center">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ background: color }} />
                  <span className="text-xs text-foreground">{name}</span>
                </div>
                <code className="text-[11px] font-mono text-muted-foreground">{color}</code>
                <code className="text-[11px] font-mono text-muted-foreground">{cssVar}</code>
                <span className="text-xs text-muted-foreground">{usage}</span>
              </div>
            ))}
          </div>
        </div>
      </DSSection>

      <DSSection title="Rules">
        <div className="grid grid-cols-2 gap-3">
          {[
            ['Always pair icon + color', 'Never use color alone or icon alone to communicate status/priority. Colorblind users need the icon; low-contrast contexts need the color.'],
            ['Icon at 14px (3.5 in Tailwind)', 'Use w-3.5 h-3.5 in compact rows and w-4 h-4 in standalone displays. Never smaller than 14px.'],
            ['Cancelled uses near-black', 'Cancelled state uses #404040 — visually suppressed, not absent. It should read as "inactive" not "error".'],
            ['No-priority is gray', 'No-priority shares the same gray (#6B6B6B) as low and backlog. This is intentional — all de-emphasized states merge visually.'],
          ].map(([t, b]) => (
            <div key={t} className="p-4 rounded-md border border-border bg-surface-1 space-y-1">
              <p className="text-xs font-semibold text-foreground">{t}</p>
              <p className="text-xs text-muted-foreground leading-relaxed">{b}</p>
            </div>
          ))}
        </div>
      </DSSection>
    </DSLayout>
  )
}
