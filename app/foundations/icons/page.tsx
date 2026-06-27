'use client'

import { DSLayout } from '@/components/ds/ds-layout'
import { DSSection, DSPreview } from '@/components/ds/ds-section'
import {
  // Navigation
  Home, Inbox, Search, Settings, Users, Bell, Hash, GitBranch, Layers,
  // Issues
  Circle, CircleDot, CheckCircle2, XCircle, AlertCircle, ArrowUp, ArrowRight, ArrowDown, Minus,
  // Actions
  Plus, Trash2, Edit, Copy, ExternalLink, Link2, Filter, MoreHorizontal, MoreVertical, X, Check,
  // Layout
  LayoutDashboard, List, Command, ChevronRight, ChevronDown, ChevronLeft, ChevronUp,
  // Misc
  Calendar, Clock, Tag, Zap, GitCommit, GitMerge, GitPullRequest, Star, Flag, Loader2,
  // Files
  FileText, Paperclip, Download, Upload,
} from 'lucide-react'

type IconEntry = { name: string; icon: React.ElementType; category: string }

const icons: IconEntry[] = [
  // Navigation
  { name: 'Home', icon: Home, category: 'Navigation' },
  { name: 'Inbox', icon: Inbox, category: 'Navigation' },
  { name: 'Search', icon: Search, category: 'Navigation' },
  { name: 'Settings', icon: Settings, category: 'Navigation' },
  { name: 'Users', icon: Users, category: 'Navigation' },
  { name: 'Bell', icon: Bell, category: 'Navigation' },
  { name: 'Hash', icon: Hash, category: 'Navigation' },
  { name: 'Command', icon: Command, category: 'Navigation' },
  { name: 'Layers', icon: Layers, category: 'Navigation' },
  // Issue status
  { name: 'Circle', icon: Circle, category: 'Status' },
  { name: 'CircleDot', icon: CircleDot, category: 'Status' },
  { name: 'CheckCircle2', icon: CheckCircle2, category: 'Status' },
  { name: 'XCircle', icon: XCircle, category: 'Status' },
  // Priority
  { name: 'AlertCircle', icon: AlertCircle, category: 'Priority' },
  { name: 'ArrowUp', icon: ArrowUp, category: 'Priority' },
  { name: 'ArrowRight', icon: ArrowRight, category: 'Priority' },
  { name: 'ArrowDown', icon: ArrowDown, category: 'Priority' },
  { name: 'Minus', icon: Minus, category: 'Priority' },
  // Actions
  { name: 'Plus', icon: Plus, category: 'Actions' },
  { name: 'Trash2', icon: Trash2, category: 'Actions' },
  { name: 'Edit', icon: Edit, category: 'Actions' },
  { name: 'Copy', icon: Copy, category: 'Actions' },
  { name: 'ExternalLink', icon: ExternalLink, category: 'Actions' },
  { name: 'Link2', icon: Link2, category: 'Actions' },
  { name: 'Filter', icon: Filter, category: 'Actions' },
  { name: 'MoreHorizontal', icon: MoreHorizontal, category: 'Actions' },
  { name: 'MoreVertical', icon: MoreVertical, category: 'Actions' },
  { name: 'X', icon: X, category: 'Actions' },
  { name: 'Check', icon: Check, category: 'Actions' },
  { name: 'Download', icon: Download, category: 'Actions' },
  { name: 'Upload', icon: Upload, category: 'Actions' },
  // Layout / Nav
  { name: 'LayoutDashboard', icon: LayoutDashboard, category: 'Layout' },
  { name: 'List', icon: List, category: 'Layout' },
  { name: 'ChevronRight', icon: ChevronRight, category: 'Layout' },
  { name: 'ChevronDown', icon: ChevronDown, category: 'Layout' },
  { name: 'ChevronLeft', icon: ChevronLeft, category: 'Layout' },
  { name: 'ChevronUp', icon: ChevronUp, category: 'Layout' },
  // Misc
  { name: 'Calendar', icon: Calendar, category: 'Misc' },
  { name: 'Clock', icon: Clock, category: 'Misc' },
  { name: 'Tag', icon: Tag, category: 'Misc' },
  { name: 'Zap', icon: Zap, category: 'Misc' },
  { name: 'GitBranch', icon: GitBranch, category: 'Misc' },
  { name: 'GitCommit', icon: GitCommit, category: 'Misc' },
  { name: 'GitMerge', icon: GitMerge, category: 'Misc' },
  { name: 'GitPullRequest', icon: GitPullRequest, category: 'Misc' },
  { name: 'Star', icon: Star, category: 'Misc' },
  { name: 'Flag', icon: Flag, category: 'Misc' },
  { name: 'Loader2', icon: Loader2, category: 'Misc' },
  { name: 'FileText', icon: FileText, category: 'Misc' },
  { name: 'Paperclip', icon: Paperclip, category: 'Misc' },
]

const categories = Array.from(new Set(icons.map(i => i.category)))

const sizes = [
  { label: '12px', className: 'w-3 h-3', usage: 'Badges, inline counts' },
  { label: '14px', className: 'w-3.5 h-3.5', usage: 'Buttons, table cells (default)' },
  { label: '16px', className: 'w-4 h-4', usage: 'Sidebar nav, tooltips' },
  { label: '20px', className: 'w-5 h-5', usage: 'Empty states, feature headings' },
  { label: '24px', className: 'w-6 h-6', usage: 'Illustrations, large actions' },
]

export default function IconsPage() {
  return (
    <DSLayout
      title="Icons"
      description="Lucide React with strokeWidth={1.5} at 14px by default. Icons are always text-muted-foreground at rest and text-foreground on hover or active states."
    >
      <DSSection title="Sizes" description="Five sizes with recommended use cases. Always use w-N h-N Tailwind classes — never resize with CSS transforms.">
        <DSPreview>
          <div className="flex items-end gap-6 flex-wrap">
            {sizes.map(({ label, className, usage }) => (
              <div key={label} className="flex flex-col items-center gap-2">
                <Settings className={className} />
                <div className="flex flex-col items-center gap-0.5">
                  <span className="text-[11px] font-mono text-foreground">{label}</span>
                  <span className="text-[10px] text-muted-foreground text-center max-w-[80px]">{usage}</span>
                </div>
              </div>
            ))}
          </div>
        </DSPreview>
      </DSSection>

      <DSSection title="Stroke width" description="Always use strokeWidth={1.5} — the defining visual trait of this system's icons. Never use the default 2px.">
        <DSPreview code={`// Always
<Settings className="w-4 h-4" strokeWidth={1.5} />

// Never
<Settings className="w-4 h-4" /> // strokeWidth defaults to 2`}>
          <div className="flex items-center gap-8">
            <div className="flex flex-col items-center gap-2">
              <Settings className="w-6 h-6 text-foreground" strokeWidth={2} />
              <span className="text-[11px] text-destructive font-mono">stroke 2 (wrong)</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <Settings className="w-6 h-6 text-foreground" strokeWidth={1.5} />
              <span className="text-[11px] text-status-done font-mono">stroke 1.5 (correct)</span>
            </div>
          </div>
        </DSPreview>
      </DSSection>

      <DSSection title="Color states" description="Icons follow text color tokens. Use text-muted-foreground at rest, text-foreground on hover or focus.">
        <DSPreview>
          <div className="flex items-center gap-6 flex-wrap">
            {[
              { label: 'Default', className: 'text-foreground' },
              { label: 'Muted (rest)', className: 'text-muted-foreground' },
              { label: 'Disabled', className: 'text-muted-foreground opacity-30' },
              { label: 'Urgent', className: 'text-priority-urgent' },
              { label: 'High', className: 'text-priority-high' },
              { label: 'Done', className: 'text-status-done' },
              { label: 'In Progress', className: 'text-status-inprogress' },
              { label: 'Destructive', className: 'text-destructive' },
            ].map(({ label, className }) => (
              <div key={label} className="flex flex-col items-center gap-1.5">
                <Circle className={`w-4 h-4 ${className}`} strokeWidth={1.5} />
                <span className="text-[10px] text-muted-foreground">{label}</span>
              </div>
            ))}
          </div>
        </DSPreview>
      </DSSection>

      {categories.map(category => (
        <DSSection key={category} title={category} description={category === 'Status' ? 'Used for issue status indicators — pair with the matching status color token.' : undefined}>
          <div className="flex flex-wrap gap-2">
            {icons.filter(i => i.category === category).map(({ name, icon: Icon }) => (
              <div
                key={name}
                className="flex flex-col items-center gap-1.5 p-3 rounded-md bg-surface-1 border border-border hover:bg-surface-2 transition-colors w-[84px]"
              >
                <Icon className="w-4 h-4 text-foreground" strokeWidth={1.5} />
                <span className="text-[10px] text-muted-foreground text-center leading-tight break-all">{name}</span>
              </div>
            ))}
          </div>
        </DSSection>
      ))}
    </DSLayout>
  )
}
