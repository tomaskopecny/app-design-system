'use client'

import { DSLayout } from '@/components/ds/ds-layout'
import { DSSection, DSPreview } from '@/components/ds/ds-section'
import { useState } from 'react'
import { Check, ChevronLeft, ChevronRight, Circle } from 'lucide-react'

// ─── Horizontal stepper ───────────────────────────────────────────────────────
function HorizontalStepper({
  steps,
  current,
}: {
  steps: { label: string; description?: string }[]
  current: number
}) {
  return (
    <nav aria-label="Progress" className="w-full">
      <ol className="flex items-start w-full">
        {steps.map((step, i) => {
          const done = i < current
          const active = i === current
          return (
            <li key={step.label} className="flex-1 flex items-start">
              <div className="flex flex-col items-center w-full">
                <div className="flex items-center w-full">
                  {/* Connector left */}
                  <div className={`flex-1 h-px ${i === 0 ? 'invisible' : done ? 'bg-status-done/60' : 'bg-border'}`} aria-hidden="true" />
                  {/* Step circle */}
                  <div
                    className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 text-xs font-semibold border transition-colors
                      ${done ? 'bg-status-done/20 border-status-done/50 text-status-done' :
                        active ? 'bg-foreground border-foreground text-background' :
                          'bg-surface-2 border-border text-muted-foreground'}`}
                    aria-current={active ? 'step' : undefined}
                  >
                    {done ? <Check className="w-3.5 h-3.5" aria-hidden="true" /> : i + 1}
                  </div>
                  {/* Connector right */}
                  <div className={`flex-1 h-px ${i === steps.length - 1 ? 'invisible' : done ? 'bg-status-done/60' : 'bg-border'}`} aria-hidden="true" />
                </div>
                <div className="mt-2 text-center px-1">
                  <p className={`text-[11px] font-medium ${active ? 'text-foreground' : done ? 'text-muted-foreground' : 'text-muted-foreground/60'}`}>
                    {step.label}
                  </p>
                  {step.description && (
                    <p className="text-[10px] text-muted-foreground/50 mt-0.5 hidden sm:block">{step.description}</p>
                  )}
                </div>
              </div>
            </li>
          )
        })}
      </ol>
    </nav>
  )
}

// ─── Vertical stepper ─────────────────────────────────────────────────────────
function VerticalStepper({
  steps,
  current,
}: {
  steps: { label: string; description: string }[]
  current: number
}) {
  return (
    <nav aria-label="Progress">
      <ol className="space-y-0">
        {steps.map((step, i) => {
          const done = i < current
          const active = i === current
          const last = i === steps.length - 1
          return (
            <li key={step.label} className="relative flex gap-4">
              {/* Vertical line */}
              {!last && (
                <div className={`absolute left-[13px] top-7 bottom-0 w-px ${done ? 'bg-status-done/40' : 'bg-border'}`} aria-hidden="true" />
              )}
              {/* Circle */}
              <div className={`relative z-10 mt-0.5 w-7 h-7 rounded-full flex items-center justify-center shrink-0 text-xs font-semibold border transition-colors
                ${done ? 'bg-status-done/20 border-status-done/50 text-status-done' :
                  active ? 'bg-foreground border-foreground text-background' :
                    'bg-surface-2 border-border text-muted-foreground'}`}
                aria-current={active ? 'step' : undefined}
              >
                {done ? <Check className="w-3.5 h-3.5" aria-hidden="true" /> : i + 1}
              </div>
              {/* Content */}
              <div className={`pb-6 ${last ? 'pb-0' : ''}`}>
                <p className={`text-sm font-medium ${active ? 'text-foreground' : done ? 'text-muted-foreground' : 'text-muted-foreground/60'}`}>
                  {step.label}
                </p>
                <p className={`text-xs mt-0.5 leading-relaxed ${active ? 'text-muted-foreground' : 'text-muted-foreground/50'}`}>
                  {step.description}
                </p>
              </div>
            </li>
          )
        })}
      </ol>
    </nav>
  )
}

// ─── Interactive demo ─────────────────────────────────────────────────────────
const SETUP_STEPS = [
  { label: 'Workspace', description: 'Name and URL' },
  { label: 'Team', description: 'Members & roles' },
  { label: 'Integrations', description: 'GitHub, Slack' },
  { label: 'Finish', description: 'Review & launch' },
]

const ONBOARDING_STEPS = [
  { label: 'Create workspace', description: 'Choose a name and URL slug for your team.' },
  { label: 'Invite members', description: 'Add your teammates by email or share an invite link.' },
  { label: 'Connect GitHub', description: 'Sync pull requests with issues automatically.' },
  { label: 'Go live', description: 'Review your settings and start tracking issues.' },
]

// Dot stepper for lightweight progress
function DotStepper({ total, current }: { total: number; current: number }) {
  return (
    <div className="flex items-center gap-1.5" role="progressbar" aria-valuenow={current + 1} aria-valuemin={1} aria-valuemax={total} aria-label={`Step ${current + 1} of ${total}`}>
      {Array.from({ length: total }).map((_, i) => (
        <div
          key={i}
          className={`rounded-full transition-all ${i === current ? 'w-4 h-1.5 bg-foreground' : i < current ? 'w-1.5 h-1.5 bg-foreground/50' : 'w-1.5 h-1.5 bg-surface-3 border border-border'}`}
          aria-hidden="true"
        />
      ))}
    </div>
  )
}

export default function StepperPage() {
  const [hStep, setHStep] = useState(1)
  const [vStep, setVStep] = useState(1)
  const [dotStep, setDotStep] = useState(1)

  return (
    <DSLayout
      title="Stepper"
      description="A sequential progress indicator for multi-step flows — onboarding, settings wizards, and checkout. Shows position, completed steps, and upcoming steps."
    >
      <DSSection title="Horizontal stepper" description="Use for 3–5 steps where all labels fit on one row. Primary choice for top-of-page wizard progress.">
        <div className="rounded-md border border-border p-6 bg-surface-1 space-y-6">
          <HorizontalStepper steps={SETUP_STEPS} current={hStep} />
          <div className="flex items-center justify-between pt-2 border-t border-border">
            <button
              onClick={() => setHStep(s => Math.max(0, s - 1))}
              disabled={hStep === 0}
              className="inline-flex items-center gap-1 px-3 py-1.5 rounded-md bg-surface-2 border border-border text-xs text-foreground hover:bg-surface-3 disabled:opacity-30 disabled:pointer-events-none transition-colors cursor-pointer"
            >
              <ChevronLeft className="w-3.5 h-3.5" aria-hidden="true" /> Back
            </button>
            <span className="text-[11px] text-muted-foreground">Step {hStep + 1} of {SETUP_STEPS.length}</span>
            <button
              onClick={() => setHStep(s => Math.min(SETUP_STEPS.length - 1, s + 1))}
              disabled={hStep === SETUP_STEPS.length - 1}
              className="inline-flex items-center gap-1 px-3 py-1.5 rounded-md bg-foreground text-background text-xs font-medium hover:bg-foreground/90 disabled:opacity-30 disabled:pointer-events-none transition-colors cursor-pointer"
            >
              Continue <ChevronRight className="w-3.5 h-3.5" aria-hidden="true" />
            </button>
          </div>
        </div>
      </DSSection>

      <DSSection title="Vertical stepper" description="Use when steps have descriptions or when vertical layout better fits the page structure.">
        <div className="rounded-md border border-border p-6 bg-surface-1 space-y-6 max-w-sm">
          <VerticalStepper steps={ONBOARDING_STEPS} current={vStep} />
          <div className="flex gap-2 pt-2 border-t border-border">
            <button onClick={() => setVStep(s => Math.max(0, s - 1))} disabled={vStep === 0} className="px-3 py-1.5 rounded-md bg-surface-2 border border-border text-xs text-foreground hover:bg-surface-3 disabled:opacity-30 disabled:pointer-events-none transition-colors cursor-pointer">Back</button>
            <button onClick={() => setVStep(s => Math.min(ONBOARDING_STEPS.length - 1, s + 1))} disabled={vStep === ONBOARDING_STEPS.length - 1} className="px-3 py-1.5 rounded-md bg-foreground text-background text-xs font-medium hover:bg-foreground/90 disabled:opacity-30 disabled:pointer-events-none transition-colors cursor-pointer">Next</button>
          </div>
        </div>
      </DSSection>

      <DSSection title="Dot stepper" description="Minimal variant for 3–7 step flows where labels are not needed. The active dot is wider for a pill shape.">
        <DSPreview>
          <div className="flex flex-col items-center gap-4">
            <DotStepper total={5} current={dotStep} />
            <div className="flex gap-2">
              <button onClick={() => setDotStep(s => Math.max(0, s - 1))} disabled={dotStep === 0} className="px-2.5 py-1 rounded-md bg-surface-2 border border-border text-xs text-foreground hover:bg-surface-3 disabled:opacity-30 disabled:pointer-events-none transition-colors cursor-pointer">Prev</button>
              <button onClick={() => setDotStep(s => Math.min(4, s + 1))} disabled={dotStep === 4} className="px-2.5 py-1 rounded-md bg-foreground text-background text-xs font-medium hover:bg-foreground/90 disabled:opacity-30 disabled:pointer-events-none transition-colors cursor-pointer">Next</button>
            </div>
          </div>
        </DSPreview>
      </DSSection>
    </DSLayout>
  )
}
