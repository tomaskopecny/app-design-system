'use client'

import { DSLayout } from '@/components/ds/ds-layout'
import { DSSection } from '@/components/ds/ds-section'
import { useState } from 'react'
import { X, Trash2, AlertCircle, Plus, ChevronDown, Check } from 'lucide-react'

function Modal({
  open,
  onClose,
  children,
  width = 'max-w-md',
}: {
  open: boolean
  onClose: () => void
  children: React.ReactNode
  width?: string
}) {
  if (!open) return null
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/20"
      onClick={onClose}
    >
      <div
        className={`relative w-full ${width} rounded-lg border border-border bg-popover`}
        style={{ boxShadow: '0 8px 40px rgba(0,0,0,0.35)' }}
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  )
}

function ModalHeader({ title, onClose }: { title: string; onClose: () => void }) {
  return (
    <div className="flex items-center justify-between px-5 py-4 border-b border-border">
      <h2 className="text-sm font-semibold text-foreground">{title}</h2>
      <button
        onClick={onClose}
        className="w-6 h-6 flex items-center justify-center rounded text-muted-foreground hover:text-foreground hover:bg-surface-3 transition-colors cursor-pointer"
      >
        <X className="w-3.5 h-3.5" />
      </button>
    </div>
  )
}

function ModalFooter({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center justify-end gap-2 px-5 py-3.5 border-t border-border bg-surface-1 rounded-b-lg">
      {children}
    </div>
  )
}

// Full-width split footer — two buttons side-by-side, flush to modal edges
function ModalFooterFull({
  cancelLabel = 'Cancel',
  confirmLabel = 'Confirm',
  onCancel,
  onConfirm,
  variant = 'default',
}: {
  cancelLabel?: string
  confirmLabel?: string
  onCancel: () => void
  onConfirm: () => void
  variant?: 'default' | 'destructive'
}) {
  // Cancel = Secondary: dark surface bg, foreground text
  // Confirm default = Primary: foreground bg, background text
  // Confirm destructive = solid bg-destructive, white text — matches the Delete button in ConfirmModal
  const confirmCls = variant === 'destructive'
    ? 'bg-destructive text-white hover:bg-destructive/90'
    : 'bg-foreground text-background hover:bg-foreground/90'
  return (
    <div className="flex border-t border-border rounded-b-lg overflow-hidden">
      <button
        onClick={onCancel}
        className="flex-1 py-3.5 text-sm font-medium text-foreground bg-surface-2 hover:bg-surface-3 transition-colors cursor-pointer"
      >
        {cancelLabel}
      </button>
      <div className="w-px bg-border shrink-0" />
      <button
        onClick={onConfirm}
        className={`flex-1 py-3.5 text-sm font-medium transition-colors cursor-pointer ${confirmCls}`}
      >
        {confirmLabel}
      </button>
    </div>
  )
}

function PermissionModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  return (
    <Modal open={open} onClose={onClose} width="max-w-sm">
      <ModalHeader title="Missing permission" onClose={onClose} />
      <div className="px-5 py-4 space-y-3">
        <div className="flex items-start gap-3 px-4 py-3 rounded-md bg-[var(--yellow-800)]/40 border border-[var(--yellow-700)]/50">
          <AlertCircle className="w-4 h-4 text-[var(--yellow-400)] shrink-0 mt-0.5" />
          <p className="text-xs text-muted-foreground leading-relaxed">
            To use this feature, please request access through your administrator or the Service Desk.
          </p>
        </div>
      </div>
      <ModalFooterFull
        cancelLabel="Leave"
        confirmLabel="Go to Service Desk"
        onCancel={onClose}
        onConfirm={onClose}
        variant="default"
      />
    </Modal>
  )
}

function DestructiveFullModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  return (
    <Modal open={open} onClose={onClose} width="max-w-sm">
      <ModalHeader title="Delete project" onClose={onClose} />
      <div className="px-5 py-4 space-y-3">
        <div className="flex items-start gap-3">
          <div className="w-8 h-8 rounded-full bg-destructive/15 flex items-center justify-center shrink-0">
            <Trash2 className="w-4 h-4 text-destructive" />
          </div>
          <p className="text-xs text-muted-foreground leading-relaxed">
            All issues and data will be permanently removed. This cannot be undone.
          </p>
        </div>
      </div>
      <ModalFooterFull
        cancelLabel="Cancel"
        confirmLabel="Delete project"
        onCancel={onClose}
        onConfirm={onClose}
        variant="destructive"
      />
    </Modal>
  )
}

function CreateFullModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [name, setName] = useState('')
  const [desc, setDesc] = useState('')
  return (
    <Modal open={open} onClose={onClose} width="max-w-sm">
      <ModalHeader title="New project" onClose={onClose} />
      <div className="px-5 py-4 space-y-3">
        <div className="space-y-2">
          <input
            autoFocus
            value={name}
            onChange={e => setName(e.target.value)}
            placeholder="Project name"
            className="w-full px-3 py-2 text-sm rounded-md bg-surface-2 border border-border text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-1 focus:ring-ring"
          />
          <textarea
            value={desc}
            onChange={e => setDesc(e.target.value)}
            placeholder="Description (optional)"
            rows={3}
            className="w-full px-3 py-2 text-sm rounded-md bg-surface-2 border border-border text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-1 focus:ring-ring resize-none"
          />
        </div>
      </div>
      <ModalFooterFull
        cancelLabel="Cancel"
        confirmLabel="Create project"
        onCancel={onClose}
        onConfirm={onClose}
        variant="default"
      />
    </Modal>
  )
}

function CreateIssueModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [title, setTitle] = useState('')
  const [priority, setPriority] = useState('medium')

  return (
    <Modal open={open} onClose={onClose} width="max-w-lg">
      <ModalHeader title="Create issue" onClose={onClose} />
      <div className="px-5 py-4 space-y-4">
        <input
          autoFocus
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Issue title"
          className="w-full bg-transparent text-base text-foreground placeholder:text-muted-foreground/40 focus:outline-none font-medium"
        />
        <textarea
          rows={2}
          placeholder="Add description..."
          className="w-full bg-transparent text-sm text-foreground placeholder:text-muted-foreground/40 focus:outline-none resize-none leading-relaxed"
        />
        <div className="flex items-center gap-2 pt-1">
          {/* Priority picker */}
          <div className="relative">
            <button
              onClick={() => setPriority(priority === 'medium' ? 'high' : 'medium')}
              className="inline-flex items-center gap-1.5 px-2 py-1 text-xs rounded-md bg-surface-2 border border-border text-muted-foreground hover:bg-surface-3 transition-colors cursor-pointer"
            >
              <span
                className="w-2 h-2 rounded-full shrink-0"
                style={{ background: priority === 'high' ? '#E07B39' : '#D4A72C' }}
              />
              {priority === 'high' ? 'High' : 'Medium'}
            </button>
          </div>
          {/* Status */}
          <button className="inline-flex items-center gap-1.5 px-2 py-1 text-xs rounded-md bg-surface-2 border border-border text-muted-foreground hover:bg-surface-3 transition-colors cursor-pointer">
            <span className="w-2 h-2 rounded-full bg-[#6B6B6B]" />
            Todo
          </button>
          {/* Assignee */}
          <button className="inline-flex items-center gap-1 px-2 py-1 text-xs rounded-md bg-surface-2 border border-border text-muted-foreground hover:bg-surface-3 transition-colors cursor-pointer">
            <span className="text-[11px]">Assign</span>
            <ChevronDown className="w-3 h-3" />
          </button>
        </div>
      </div>
      <ModalFooter>
        <button
          onClick={onClose}
          className="px-3 py-1.5 text-xs font-medium rounded-md text-muted-foreground hover:bg-surface-3 transition-colors cursor-pointer"
        >
          Cancel
        </button>
        <button
          disabled={!title.trim()}
          className="px-3.5 py-1.5 text-xs font-medium rounded-md bg-foreground text-background hover:bg-foreground/90 transition-colors cursor-pointer disabled:opacity-40 disabled:pointer-events-none"
        >
          Create issue
        </button>
      </ModalFooter>
    </Modal>
  )
}

function ConfirmModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  return (
    <Modal open={open} onClose={onClose} width="max-w-sm">
      <ModalHeader title="Delete issue" onClose={onClose} />
      <div className="px-5 py-4 space-y-3">
        <div className="flex items-start gap-3">
          <div className="w-8 h-8 rounded-full bg-destructive/15 flex items-center justify-center shrink-0">
            <Trash2 className="w-4 h-4 text-destructive" />
          </div>
          <p className="text-xs text-muted-foreground leading-relaxed">
            Are you sure you want to delete <span className="text-foreground font-medium">ENG-2451</span>? This action cannot be undone.
          </p>
        </div>
      </div>
      <ModalFooter>
        <button
          onClick={onClose}
          className="px-3 py-1.5 text-xs font-medium rounded-md text-muted-foreground hover:bg-surface-3 transition-colors cursor-pointer"
        >
          Cancel
        </button>
        <button
          onClick={onClose}
          className="px-3.5 py-1.5 text-xs font-medium rounded-md bg-destructive text-white hover:bg-destructive/90 transition-colors cursor-pointer"
        >
          Delete
        </button>
      </ModalFooter>
    </Modal>
  )
}

function AlertModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  return (
    <Modal open={open} onClose={onClose} width="max-w-sm">
      <ModalHeader title="Unsaved changes" onClose={onClose} />
      <div className="px-5 py-4 space-y-3">
        <div className="flex items-start gap-3">
          <div className="w-8 h-8 rounded-full bg-[#D4A72C]/15 flex items-center justify-center shrink-0">
            <AlertCircle className="w-4 h-4 text-[#D4A72C]" />
          </div>
          <p className="text-xs text-muted-foreground leading-relaxed">
            You have unsaved changes. Do you want to save before leaving?
          </p>
        </div>
      </div>
      <ModalFooter>
        <button
          onClick={onClose}
          className="px-3 py-1.5 text-xs font-medium rounded-md text-muted-foreground hover:bg-surface-3 transition-colors cursor-pointer"
        >
          Discard
        </button>
        <button
          onClick={onClose}
          className="px-3.5 py-1.5 text-xs font-medium rounded-md bg-foreground text-background hover:bg-foreground/90 transition-colors cursor-pointer"
        >
          Save changes
        </button>
      </ModalFooter>
    </Modal>
  )
}

export default function ModalsPage() {
  const [createOpen, setCreateOpen] = useState(false)
  const [confirmOpen, setConfirmOpen] = useState(false)
  const [alertOpen, setAlertOpen] = useState(false)
  const [permissionOpen, setPermissionOpen] = useState(false)
  const [destructiveFullOpen, setDestructiveFullOpen] = useState(false)
  const [createFullOpen, setCreateFullOpen] = useState(false)

  return (
    <DSLayout
      title="Modals"
      description="Minimal modals with a dark semi-transparent backdrop. Three categories: create forms, destructive confirmations, and informational alerts. All are dismissible by clicking outside or pressing ESC."
    >
      <DSSection
        title="Create modal"
        description="Used for issue creation, project creation, and inline forms. Has a content area and a footer with actions."
      >
        <div className="p-6 bg-surface-1 rounded-md border border-border flex flex-col items-start gap-4">
          <button
            onClick={() => setCreateOpen(true)}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-medium rounded-md bg-foreground text-background hover:bg-foreground/90 transition-colors cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            New issue
          </button>
          <p className="text-xs text-muted-foreground">Type a title in the modal to enable the Create button.</p>
        </div>
        <CreateIssueModal open={createOpen} onClose={() => setCreateOpen(false)} />
      </DSSection>

      <DSSection
        title="Confirm (destructive)"
        description="For irreversible actions — delete, archive, leave. Icon background uses destructive/15."
      >
        <div className="p-6 bg-surface-1 rounded-md border border-border">
          <button
            onClick={() => setConfirmOpen(true)}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md text-destructive border border-destructive/30 hover:bg-destructive/10 transition-colors cursor-pointer"
          >
            <Trash2 className="w-3.5 h-3.5" />
            Delete issue
          </button>
        </div>
        <ConfirmModal open={confirmOpen} onClose={() => setConfirmOpen(false)} />
      </DSSection>

      <DSSection
        title="Alert modal"
        description="For warnings and decisions that aren't destructive but require user acknowledgment."
      >
        <div className="p-6 bg-surface-1 rounded-md border border-border">
          <button
            onClick={() => setAlertOpen(true)}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md bg-surface-2 border border-border text-foreground hover:bg-surface-3 transition-colors cursor-pointer"
          >
            <AlertCircle className="w-3.5 h-3.5 text-[#D4A72C]" />
            Trigger alert
          </button>
        </div>
        <AlertModal open={alertOpen} onClose={() => setAlertOpen(false)} />
      </DSSection>

      <DSSection
        title="Full-width split footer"
        description="Two equal-width buttons flush to the modal's bottom edge, separated by a vertical divider. No footer padding — buttons stretch wall-to-wall and inherit the modal's bottom border-radius. Use for two-option decisions where both actions carry equal visual weight."
      >
        <div className="p-6 bg-surface-1 rounded-md border border-border flex flex-wrap gap-3">
          <button
            onClick={() => setPermissionOpen(true)}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md bg-surface-2 border border-border text-foreground hover:bg-surface-3 transition-colors cursor-pointer"
          >
            <AlertCircle className="w-3.5 h-3.5 text-[var(--yellow-400)]" />
            Permission modal
          </button>
          <button
            onClick={() => setDestructiveFullOpen(true)}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md text-destructive border border-destructive/30 hover:bg-destructive/10 transition-colors cursor-pointer"
          >
            <Trash2 className="w-3.5 h-3.5" />
            Destructive modal
          </button>
          <button
            onClick={() => setCreateFullOpen(true)}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md bg-surface-2 border border-border text-foreground hover:bg-surface-3 transition-colors cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            Creation modal
          </button>
        </div>
        <PermissionModal open={permissionOpen} onClose={() => setPermissionOpen(false)} />
        <DestructiveFullModal open={destructiveFullOpen} onClose={() => setDestructiveFullOpen(false)} />
        <CreateFullModal open={createFullOpen} onClose={() => setCreateFullOpen(false)} />
      </DSSection>

      <DSSection title="Modal anatomy">
        <div className="rounded-md border border-border overflow-hidden">
          <div className="grid grid-cols-[160px_1fr] px-4 py-2.5 bg-surface-2 border-b border-border gap-4">
            <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">Zone</p>
            <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">Spec</p>
          </div>
          {[
            ['Backdrop',   'fixed inset-0 z-50 · bg-black/20 · click to dismiss'],
            ['Panel',      'rounded-lg · border border-border · bg-popover · shadow-[0_8px_32px_rgba(0,0,0,0.6)]'],
            ['Header',     'px-5 py-4 · border-b · flex justify-between · 14px font-semibold + close icon button'],
            ['Close btn',  'w-6 h-6 · rounded · text-muted-foreground hover:text-foreground hover:bg-surface-3'],
            ['Body',       'px-5 py-4 · free-form content area'],
            ['Footer',     'px-5 py-3.5 · border-t · bg-surface-1 · rounded-b-lg · flex justify-end gap-2'],
            ['Cancel btn', 'Ghost variant · text-muted-foreground · dismisses modal'],
            ['Primary btn','bg-foreground text-background · disabled when form is incomplete'],
            ['Danger btn', 'bg-destructive text-white · only for destructive confirms'],
          ].map(([zone, spec]) => (
            <div key={zone} className="grid grid-cols-[160px_1fr] px-4 py-2.5 border-b border-border last:border-0 bg-surface-1 gap-4 items-start">
              <code className="text-xs font-mono text-foreground">{zone}</code>
              <p className="text-xs text-muted-foreground">{spec}</p>
            </div>
          ))}
        </div>
      </DSSection>

      <DSSection title="Code pattern">
        <div className="p-4 rounded-md bg-surface-1 border border-border">
          <pre className="font-mono text-[11px] text-muted-foreground leading-relaxed overflow-x-auto">{`// Backdrop + panel
{open && (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20"
    onClick={onClose}>
    <div
      className="relative w-full max-w-md rounded-lg border border-border bg-popover"
      style={{ boxShadow: '0 8px 32px rgba(0,0,0,0.6)' }}
      onClick={e => e.stopPropagation()}>
      {/* header + body + footer */}
    </div>
  </div>
)}

// ESC to close
useEffect(() => {
  const handler = (e: KeyboardEvent) => e.key === 'Escape' && onClose()
  document.addEventListener('keydown', handler)
  return () => document.removeEventListener('keydown', handler)
}, [])`}</pre>
        </div>
      </DSSection>
    </DSLayout>
  )
}
