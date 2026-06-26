'use client'

import { DSLayout } from '@/components/ds/ds-layout'
import { DSSection, DSPreview } from '@/components/ds/ds-section'
import { useState } from 'react'
import { X, ArrowRight, CheckCircle2, Sparkles, ChevronRight } from 'lucide-react'

// ─── Coachmark / Spotlight tooltip ───────────────────────────────────────────
function Coachmark({
  title,
  body,
  step,
  total,
  onNext,
  onDismiss,
}: {
  title: string
  body: string
  step: number
  total: number
  onNext: () => void
  onDismiss: () => void
}) {
  return (
    <div className="w-64 bg-popover border border-border rounded-md shadow-xl p-4 space-y-3" role="dialog" aria-label={title}>
      <div className="flex items-start justify-between gap-2">
        <p className="text-xs font-semibold text-foreground">{title}</p>
        <button onClick={onDismiss} aria-label="Dismiss tip" className="shrink-0 w-5 h-5 flex items-center justify-center rounded-sm text-muted-foreground hover:text-foreground hover:bg-accent transition-colors cursor-pointer">
          <X className="w-3 h-3" aria-hidden="true" />
        </button>
      </div>
      <p className="text-[11px] text-muted-foreground leading-relaxed">{body}</p>
      <div className="flex items-center justify-between pt-1 border-t border-border">
        <span className="text-[10px] text-muted-foreground">{step} of {total}</span>
        <button
          onClick={onNext}
          className="inline-flex items-center gap-1 px-2.5 py-1 rounded-sm bg-foreground text-background text-[11px] font-medium hover:bg-foreground/90 transition-colors cursor-pointer"
        >
          {step === total ? 'Done' : 'Next'} <ChevronRight className="w-3 h-3" aria-hidden="true" />
        </button>
      </div>
    </div>
  )
}

const TIPS = [
  { title: 'Create your first issue', body: 'Press C anywhere to open the quick create modal. You can set priority, assignee, and label without leaving the keyboard.' },
  { title: 'Use the command palette', body: 'Press ⌘K to open the command palette. Search for any action, navigate to any view, or apply bulk changes across issues.' },
  { title: 'Set up cycles', body: 'Cycles are fixed sprints. Go to Cycles in the sidebar to create one and drag in issues you plan to complete this week.' },
]

function CoachmarkDemo() {
  const [step, setStep] = useState(0)
  const [dismissed, setDismissed] = useState(false)
  const [completed, setCompleted] = useState(false)

  if (dismissed || completed) {
    return (
      <div className="flex flex-col items-center gap-3 py-4">
        <p className="text-xs text-muted-foreground">{dismissed ? 'Tips dismissed.' : 'All tips completed!'}</p>
        <button onClick={() => { setDismissed(false); setCompleted(false); setStep(0) }} className="px-2.5 py-1 rounded-sm bg-surface-2 border border-border text-xs text-foreground hover:bg-surface-3 transition-colors cursor-pointer">
          Reset
        </button>
      </div>
    )
  }

  return (
    <div className="relative">
      <div className="flex gap-2 mb-4 flex-wrap">
        {TIPS.map((t, i) => (
          <div key={i} className={`px-2.5 py-1 rounded-sm border text-xs transition-colors ${i === step ? 'bg-foreground text-background border-foreground' : i < step ? 'bg-surface-2 border-status-done/30 text-status-done' : 'bg-surface-2 border-border text-muted-foreground'}`}>
            {t.title}
          </div>
        ))}
      </div>
      <Coachmark
        title={TIPS[step].title}
        body={TIPS[step].body}
        step={step + 1}
        total={TIPS.length}
        onNext={() => { if (step < TIPS.length - 1) setStep(s => s + 1); else setCompleted(true) }}
        onDismiss={() => setDismissed(true)}
      />
    </div>
  )
}

// ─── Checklist / Getting started widget ──────────────────────────────────────
const CHECKLIST = [
  { id: 'workspace', label: 'Create your workspace' },
  { id: 'team', label: 'Invite a teammate' },
  { id: 'issue', label: 'Create your first issue' },
  { id: 'cycle', label: 'Start a cycle' },
  { id: 'integration', label: 'Connect GitHub' },
]

function GettingStarted() {
  const [done, setDone] = useState<Set<string>>(new Set(['workspace']))
  const toggle = (id: string) => setDone(prev => { const n = new Set(prev); n.has(id) ? n.delete(id) : n.add(id); return n })
  const pct = Math.round((done.size / CHECKLIST.length) * 100)

  return (
    <div className="rounded-md border border-border bg-surface-1 overflow-hidden w-full max-w-sm">
      <div className="px-4 pt-4 pb-3 border-b border-border">
        <div className="flex items-center gap-2 mb-1">
          <Sparkles className="w-3.5 h-3.5 text-priority-medium" aria-hidden="true" />
          <p className="text-sm font-semibold text-foreground">Getting started</p>
        </div>
        <p className="text-xs text-muted-foreground">Complete these steps to get the most out of Linear.</p>
        <div className="mt-3 flex items-center gap-2">
          <div className="flex-1 h-1 rounded-full bg-surface-3 overflow-hidden">
            <div className="h-full rounded-full bg-status-done transition-all" style={{ width: `${pct}%` }} aria-hidden="true" />
          </div>
          <span className="text-[10px] text-muted-foreground shrink-0">{done.size}/{CHECKLIST.length}</span>
        </div>
      </div>
      <div className="divide-y divide-border">
        {CHECKLIST.map(item => {
          const checked = done.has(item.id)
          return (
            <button
              key={item.id}
              onClick={() => toggle(item.id)}
              aria-checked={checked}
              role="checkbox"
              className="w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-accent/40 transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-inset focus-visible:ring-1 focus-visible:ring-ring"
            >
              <div className={`w-4 h-4 rounded-sm border flex items-center justify-center shrink-0 transition-colors ${checked ? 'bg-status-done/20 border-status-done/50' : 'border-border bg-surface-2'}`}>
                {checked && <CheckCircle2 className="w-3 h-3 text-status-done" aria-hidden="true" />}
              </div>
              <span className={`text-xs ${checked ? 'line-through text-muted-foreground/50' : 'text-foreground'}`}>{item.label}</span>
              {!checked && <ArrowRight className="w-3 h-3 text-muted-foreground ml-auto" aria-hidden="true" />}
            </button>
          )
        })}
      </div>
    </div>
  )
}

// ─── Pulse / highlight ring ───────────────────────────────────────────────────
function PulseHighlight() {
  const [active, setActive] = useState(true)

  return (
    <div className="flex items-center gap-8">
      <div className="relative inline-block">
        <button className="px-3 py-1.5 rounded-md bg-surface-2 border border-border text-xs text-foreground cursor-pointer">
          New cycle
        </button>
        {active && (
          <>
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-status-inprogress animate-ping" aria-hidden="true" />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-status-inprogress" aria-hidden="true" />
          </>
        )}
      </div>
      <button onClick={() => setActive(a => !a)} className="px-2.5 py-1 rounded-sm bg-surface-2 border border-border text-xs text-muted-foreground hover:text-foreground transition-colors cursor-pointer">
        Toggle pulse
      </button>
    </div>
  )
}

export default function OnboardingPage() {
  return (
    <DSLayout
      title="Onboarding"
      description="Patterns for guiding new users: coachmarks, getting started checklists, and pulsing highlights. Keep flows short — maximum 5 steps."
    >
      <DSSection title="Coachmark" description="An anchored tooltip with a title, body, step counter, and next/dismiss actions. Chains through a sequence of tips.">
        <DSPreview className="[&>div]:items-start">
          <CoachmarkDemo />
        </DSPreview>
      </DSSection>

      <DSSection title="Getting started checklist" description="A persistent widget tracking setup tasks with a progress bar. Items are togglable so users can mark their own progress.">
        <DSPreview>
          <GettingStarted />
        </DSPreview>
      </DSSection>

      <DSSection title="Pulse highlight" description="A pulsing dot on a UI element to draw attention to a new feature. Remove after the user has interacted with the element.">
        <DSPreview>
          <PulseHighlight />
        </DSPreview>
      </DSSection>

      <DSSection title="Rules" description="Guidelines for onboarding patterns.">
        <div className="rounded-md border border-border overflow-hidden">
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b border-border bg-surface-2">
                <th className="text-left px-4 py-2.5 font-medium text-muted-foreground">Rule</th>
                <th className="text-left px-4 py-2.5 font-medium text-muted-foreground">Reasoning</th>
              </tr>
            </thead>
            <tbody>
              {[
                ['Max 5 coachmark steps', 'Longer tours are abandoned before completion'],
                ['Always dismissible', 'Forced tutorials create friction for returning users'],
                ['One coachmark at a time', 'Multiple overlapping tips create cognitive overload'],
                ['Remove pulse after interaction', 'Persistent pulses become visual noise'],
                ['Checklist max 7 items', 'More than 7 feels like a burden, not a guide'],
              ].map(([rule, reason]) => (
                <tr key={rule} className="border-b border-border last:border-0">
                  <td className="px-4 py-2.5 font-medium text-foreground">{rule}</td>
                  <td className="px-4 py-2.5 text-muted-foreground">{reason}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </DSSection>
    </DSLayout>
  )
}
