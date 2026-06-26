'use client'

import { DSLayout } from '@/components/ds/ds-layout'
import { DSSection, DSPreview } from '@/components/ds/ds-section'
import { useState, useEffect, useCallback } from 'react'
import { CheckCircle2, AlertCircle, Info, XCircle, X, Loader2 } from 'lucide-react'

type ToastVariant = 'success' | 'error' | 'warning' | 'info' | 'loading'

interface Toast {
  id: string
  message: string
  description?: string
  variant: ToastVariant
  action?: { label: string; onClick: () => void }
}

const variantConfig: Record<ToastVariant, { icon: React.ElementType; iconColor: string; border: string }> = {
  success: { icon: CheckCircle2, iconColor: 'text-status-done', border: 'border-status-done/20' },
  error:   { icon: XCircle,      iconColor: 'text-destructive', border: 'border-destructive/20' },
  warning: { icon: AlertCircle,  iconColor: 'text-priority-high', border: 'border-priority-high/20' },
  info:    { icon: Info,         iconColor: 'text-status-inprogress', border: 'border-status-inprogress/20' },
  loading: { icon: Loader2,      iconColor: 'text-muted-foreground', border: 'border-border' },
}

function ToastItem({ toast, onDismiss }: { toast: Toast; onDismiss: (id: string) => void }) {
  const { icon: Icon, iconColor, border } = variantConfig[toast.variant]
  return (
    <div className={`flex items-start gap-3 w-80 bg-popover border ${border} rounded-md px-3 py-2.5 shadow-xl animate-in slide-in-from-bottom-2 duration-200`}>
      <Icon className={`w-4 h-4 shrink-0 mt-0.5 ${iconColor} ${toast.variant === 'loading' ? 'animate-spin' : ''}`} />
      <div className="flex-1 min-w-0">
        <p className="text-xs font-medium text-foreground">{toast.message}</p>
        {toast.description && <p className="text-[11px] text-muted-foreground mt-0.5">{toast.description}</p>}
        {toast.action && (
          <button onClick={toast.action.onClick} className="mt-1.5 text-[11px] text-foreground underline underline-offset-2 hover:no-underline cursor-pointer">
            {toast.action.label}
          </button>
        )}
      </div>
      <button
        onClick={() => onDismiss(toast.id)}
        className="w-4 h-4 flex items-center justify-center rounded text-muted-foreground hover:text-foreground transition-colors cursor-pointer shrink-0 mt-0.5"
      >
        <X className="w-3 h-3" />
      </button>
    </div>
  )
}

function ToastStack({ toasts, onDismiss }: { toasts: Toast[]; onDismiss: (id: string) => void }) {
  return (
    <div className="fixed bottom-4 right-4 flex flex-col gap-2 z-50">
      {toasts.map(t => <ToastItem key={t.id} toast={t} onDismiss={onDismiss} />)}
    </div>
  )
}

let toastIdCounter = 0

export default function ToastsPage() {
  const [toasts, setToasts] = useState<Toast[]>([])

  const dismiss = useCallback((id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id))
  }, [])

  const push = useCallback((t: Omit<Toast, 'id'>, autoDismiss = true) => {
    const id = `toast-${++toastIdCounter}`
    setToasts(prev => [...prev, { ...t, id }])
    if (autoDismiss) setTimeout(() => dismiss(id), 3500)
    return id
  }, [dismiss])

  return (
    <DSLayout
      title="Toasts"
      description="Toasts give instant feedback at bottom-right of the screen. Four semantic variants (success, error, warning, info) plus a loading state. Auto-dismiss after 3.5 seconds."
    >
      <ToastStack toasts={toasts} onDismiss={dismiss} />

      <DSSection title="Variants" description="All four semantic variants shown as static previews.">
        <div className="flex flex-col gap-2">
          {(Object.entries(variantConfig) as [ToastVariant, typeof variantConfig[ToastVariant]][]).map(([variant, { icon: Icon, iconColor, border }]) => (
            <div key={variant} className={`flex items-start gap-3 w-80 bg-popover border ${border} rounded-md px-3 py-2.5 shadow-sm`}>
              <Icon className={`w-4 h-4 shrink-0 mt-0.5 ${iconColor} ${variant === 'loading' ? 'animate-spin' : ''}`} />
              <div className="flex-1 min-w-0">
                <p className="text-xs font-medium text-foreground capitalize">{variant} toast</p>
                <p className="text-[11px] text-muted-foreground mt-0.5">This is a {variant} message.</p>
              </div>
              <button className="w-4 h-4 flex items-center justify-center rounded text-muted-foreground">
                <X className="w-3 h-3" />
              </button>
            </div>
          ))}
        </div>
      </DSSection>

      <DSSection title="Live demo" description="Click a button to push a real toast to the bottom-right corner.">
        <DSPreview>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => push({ variant: 'success', message: 'Issue created', description: 'ENG-433 was created successfully.' })}
              className="px-3 py-1.5 text-xs font-medium rounded-md bg-status-done/15 border border-status-done/30 text-status-done hover:bg-status-done/20 transition-colors cursor-pointer"
            >
              Success
            </button>
            <button
              onClick={() => push({ variant: 'error', message: 'Failed to save', description: 'Something went wrong. Please try again.' })}
              className="px-3 py-1.5 text-xs font-medium rounded-md bg-destructive/10 border border-destructive/30 text-destructive hover:bg-destructive/15 transition-colors cursor-pointer"
            >
              Error
            </button>
            <button
              onClick={() => push({ variant: 'warning', message: 'Cycle ending soon', description: 'Sprint 24 ends in 2 days.' })}
              className="px-3 py-1.5 text-xs font-medium rounded-md bg-priority-high/10 border border-priority-high/30 text-priority-high hover:bg-priority-high/15 transition-colors cursor-pointer"
            >
              Warning
            </button>
            <button
              onClick={() => push({ variant: 'info', message: 'Tip: use ⌘K', description: 'Open the command palette to take actions quickly.' })}
              className="px-3 py-1.5 text-xs font-medium rounded-md bg-status-inprogress/10 border border-status-inprogress/30 text-status-inprogress hover:bg-status-inprogress/15 transition-colors cursor-pointer"
            >
              Info
            </button>
            <button
              onClick={() => { const id = push({ variant: 'loading', message: 'Saving changes…' }, false); setTimeout(() => { dismiss(id); push({ variant: 'success', message: 'Changes saved' }) }, 2000) }}
              className="px-3 py-1.5 text-xs font-medium rounded-md bg-surface-2 border border-border text-foreground hover:bg-surface-3 transition-colors cursor-pointer"
            >
              Loading → Success
            </button>
          </div>
        </DSPreview>
      </DSSection>

      <DSSection title="With action" description="Optional inline action link for undo patterns — Linear uses this for 'Undo archive' etc.">
        <DSPreview code={`// Toast with action
push({
  variant: 'success',
  message: 'Issue archived',
  action: { label: 'Undo', onClick: handleUndo }
})`}>
          <div className="flex flex-col gap-2">
            <div className="flex items-start gap-3 w-80 bg-popover border border-status-done/20 rounded-md px-3 py-2.5 shadow-sm">
              <CheckCircle2 className="w-4 h-4 text-status-done shrink-0 mt-0.5" />
              <div className="flex-1">
                <p className="text-xs font-medium text-foreground">Issue archived</p>
                <button className="mt-1.5 text-[11px] text-foreground underline underline-offset-2 hover:no-underline cursor-pointer">Undo</button>
              </div>
              <button className="w-4 h-4 flex items-center justify-center rounded text-muted-foreground"><X className="w-3 h-3" /></button>
            </div>
            <button
              onClick={() => push({ variant: 'success', message: 'Issue archived', action: { label: 'Undo', onClick: () => push({ variant: 'info', message: 'Undo successful' }) } })}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md bg-surface-2 border border-border text-foreground hover:bg-surface-3 transition-colors cursor-pointer w-fit"
            >
              Try it live
            </button>
          </div>
        </DSPreview>
      </DSSection>
    </DSLayout>
  )
}
