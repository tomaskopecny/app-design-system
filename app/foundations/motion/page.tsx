'use client'

import { DSLayout } from '@/components/ds/ds-layout'
import { DSSection, DSPreview } from '@/components/ds/ds-section'
import { useState } from 'react'
import { ChevronRight, Loader2 } from 'lucide-react'

const durations = [
  { label: '75ms', token: 'duration-75', usage: 'Micro: icon color, opacity flicker' },
  { label: '100ms', token: 'duration-100', usage: 'Default hover: bg, border, text' },
  { label: '150ms', token: 'duration-150', usage: 'Menu appear, tooltip fade' },
  { label: '200ms', token: 'duration-200', usage: 'Modal enter, dropdown slide' },
  { label: '300ms', token: 'duration-300', usage: 'Page transitions, drawer' },
  { label: '500ms', token: 'duration-500', usage: 'Progress bar fill' },
]

const easings = [
  { label: 'linear', token: 'ease-linear', desc: 'Spinners, loaders — constant speed' },
  { label: 'ease-in', token: 'ease-in', desc: 'Elements leaving the screen' },
  { label: 'ease-out', token: 'ease-out', desc: 'Elements entering the screen (most common)' },
  { label: 'ease-in-out', token: 'ease-in-out', desc: 'State toggles, reversible motions' },
]

function Demo({ label, animClass }: { label: string; animClass: string }) {
  const [key, setKey] = useState(0)
  return (
    <button
      onClick={() => setKey(k => k + 1)}
      className="flex flex-col items-center gap-2 cursor-pointer group"
    >
      <div className="w-24 h-12 bg-surface-1 border border-border rounded-md flex items-center justify-center overflow-hidden">
        <div key={key} className={`w-6 h-6 bg-foreground rounded ${animClass}`} />
      </div>
      <span className="text-[10px] text-muted-foreground group-hover:text-foreground transition-colors">{label}</span>
    </button>
  )
}

export default function MotionPage() {
  const [collapsed, setCollapsed] = useState(false)
  const [spin, setSpin] = useState(false)

  return (
    <DSLayout
      title="Motion & Animation"
      description="Motion is fast and purposeful — never decorative. Hover transitions use 100ms, entering elements use 150–200ms ease-out. The goal is to feel instant, not animated."
    >
      <DSSection title="Duration scale" description="All durations used in the system — shorter is almost always better.">
        <div className="rounded-md border border-border bg-surface-1 overflow-hidden">
          <div className="flex items-center gap-4 px-4 py-2 border-b border-border bg-surface-2">
            <span className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground/60 w-16">Duration</span>
            <span className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground/60 w-32">Tailwind class</span>
            <span className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground/60">Usage</span>
          </div>
          {durations.map(({ label, token, usage }) => (
            <div key={label} className="flex items-center gap-4 px-4 py-2.5 border-b border-border last:border-0">
              <span className="text-xs font-mono text-foreground w-16">{label}</span>
              <span className="text-xs font-mono text-muted-foreground w-32">{token}</span>
              <span className="text-xs text-muted-foreground">{usage}</span>
            </div>
          ))}
        </div>
      </DSSection>

      <DSSection title="Easing functions" description="Which curve to use for which motion direction.">
        <div className="rounded-md border border-border bg-surface-1 overflow-hidden">
          {easings.map(({ label, token, desc }) => (
            <div key={label} className="flex items-start gap-4 px-4 py-2.5 border-b border-border last:border-0">
              <span className="text-xs font-mono text-foreground w-28 shrink-0">{label}</span>
              <span className="text-xs font-mono text-muted-foreground w-32 shrink-0">{token}</span>
              <span className="text-xs text-muted-foreground">{desc}</span>
            </div>
          ))}
        </div>
      </DSSection>

      <DSSection title="Hover transitions" description="The most common animation in the system — background and text color on hover at 100ms.">
        <DSPreview code={`// All interactive elements use this base
className="transition-colors duration-100 hover:bg-accent hover:text-foreground"

// Buttons add opacity and scale for press
className="transition-all duration-100 active:opacity-80 active:scale-[0.98]"`}>
          <div className="flex flex-wrap gap-2">
            {['Ghost button', 'Sidebar link', 'Icon button'].map(label => (
              <button
                key={label}
                className="px-3 py-1.5 text-xs font-medium rounded-md text-muted-foreground hover:text-foreground hover:bg-accent transition-colors duration-100 cursor-pointer border border-transparent hover:border-border"
              >
                {label}
              </button>
            ))}
          </div>
        </DSPreview>
      </DSSection>

      <DSSection title="Collapse animation" description="Chevron rotate + content fade — used for sidebar sections and group headers.">
        <DSPreview code={`// Chevron
className={\`transition-transform duration-150 \${open ? 'rotate-90' : 'rotate-0'}\`}

// Content
className={\`transition-all duration-200 \${open ? 'opacity-100' : 'opacity-0 h-0'}\`}`}>
          <div className="flex flex-col gap-0 w-full max-w-xs bg-surface-1 rounded-md border border-border overflow-hidden">
            <button
              onClick={() => setCollapsed(!collapsed)}
              className="flex items-center gap-2 px-3 py-2.5 hover:bg-surface-2 transition-colors cursor-pointer"
            >
              <ChevronRight className={`w-3 h-3 text-muted-foreground transition-transform duration-150 ${collapsed ? '' : 'rotate-90'}`} />
              <span className="text-xs font-medium text-foreground">Engineering</span>
              <span className="text-[11px] text-muted-foreground ml-0.5">12</span>
            </button>
            <div className={`transition-all duration-200 overflow-hidden ${collapsed ? 'max-h-0 opacity-0' : 'max-h-40 opacity-100'}`}>
              {['All Issues', 'Active', 'Backlog', 'My Issues'].map(item => (
                <div key={item} className="flex items-center gap-2 px-6 py-1.5 text-xs text-muted-foreground hover:text-foreground hover:bg-surface-2 transition-colors cursor-pointer">
                  {item}
                </div>
              ))}
            </div>
          </div>
        </DSPreview>
      </DSSection>

      <DSSection title="Loading spinner" description="Loader2 with animate-spin at linear easing. Always the same speed — never accelerates or decelerates.">
        <DSPreview code={`<Loader2 className="w-4 h-4 animate-spin text-muted-foreground" />`}>
          <div className="flex items-center gap-6 flex-wrap">
            {(['w-3 h-3', 'w-4 h-4', 'w-5 h-5'] as const).map(size => (
              <div key={size} className="flex flex-col items-center gap-2">
                <Loader2 className={`${size} animate-spin text-muted-foreground`} />
                <span className="text-[10px] text-muted-foreground font-mono">{size}</span>
              </div>
            ))}
          </div>
        </DSPreview>
      </DSSection>

      <DSSection title="Principles" description="Rules that keep motion fast and functional.">
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {[
            { title: 'Never animate for decoration', desc: 'Every transition must communicate state — hover, loading, collapse, appear. If nothing changes semantically, nothing should animate.' },
            { title: 'Enter with ease-out, exit with ease-in', desc: 'Things entering the screen decelerate into place. Things leaving accelerate out. This matches physical intuition.' },
            { title: 'Keep it under 200ms', desc: 'Anything over 200ms feels sluggish in a productivity tool. Hover states should be 100ms. If it feels slow, it probably is.' },
            { title: 'Avoid layout animations', desc: 'Never animate width, height, or layout properties — they cause reflow. Use opacity and transform (translate, scale) only.' },
          ].map(({ title, desc }) => (
            <div key={title} className="p-4 bg-surface-1 rounded-md border border-border">
              <p className="text-xs font-semibold text-foreground mb-1">{title}</p>
              <p className="text-[11px] text-muted-foreground leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </DSSection>
    </DSLayout>
  )
}
