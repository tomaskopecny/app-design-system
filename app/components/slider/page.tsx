'use client'

import { DSLayout } from '@/components/ds/ds-layout'
import { DSSection, DSPreview } from '@/components/ds/ds-section'
import { useState } from 'react'

function Slider({
  value,
  onChange,
  min = 0,
  max = 100,
  step = 1,
  disabled = false,
  color = 'default',
  label,
}: {
  value: number
  onChange: (v: number) => void
  min?: number
  max?: number
  step?: number
  disabled?: boolean
  color?: 'default' | 'primary' | 'warning' | 'destructive'
  label?: string
}) {
  const pct = ((value - min) / (max - min)) * 100

  const trackColors: Record<string, string> = {
    default: 'bg-foreground',
    primary: 'bg-status-inprogress',
    warning: 'bg-priority-medium',
    destructive: 'bg-destructive',
  }

  return (
    <div className={`flex flex-col gap-1.5 w-full ${disabled ? 'opacity-40' : ''}`}>
      {label && (
        <div className="flex items-center justify-between">
          <span className="text-xs text-muted-foreground">{label}</span>
          <span className="text-xs font-medium text-foreground tabular-nums">{value}</span>
        </div>
      )}
      <div className="relative flex items-center h-5">
        {/* Track */}
        <div className="absolute w-full h-1 rounded-full bg-surface-3 border border-border/50">
          <div
            className={`absolute h-full rounded-full transition-all ${trackColors[color]}`}
            style={{ width: `${pct}%` }}
            aria-hidden="true"
          />
        </div>
        {/* Native input — hidden but functional */}
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          disabled={disabled}
          aria-label={label}
          aria-valuemin={min}
          aria-valuemax={max}
          aria-valuenow={value}
          onChange={e => onChange(Number(e.target.value))}
          className="absolute w-full h-5 opacity-0 cursor-pointer disabled:cursor-not-allowed"
        />
        {/* Thumb */}
        <div
          className={`absolute w-4 h-4 rounded-full border-2 border-foreground bg-background shadow-sm transition-all pointer-events-none ${trackColors[color].replace('bg-', 'border-')}`}
          style={{ left: `calc(${pct}% - 8px)` }}
          aria-hidden="true"
        />
      </div>
    </div>
  )
}

function RangeSlider() {
  const [min, setMin] = useState(20)
  const [max, setMax] = useState(75)
  const range = 100

  return (
    <div className="flex flex-col gap-1.5 w-full">
      <div className="flex items-center justify-between">
        <span className="text-xs text-muted-foreground">Estimate range</span>
        <span className="text-xs font-medium text-foreground tabular-nums">{min} – {max} pts</span>
      </div>
      <div className="relative flex items-center h-5">
        <div className="absolute w-full h-1 rounded-full bg-surface-3 border border-border/50">
          <div
            className="absolute h-full bg-status-inprogress rounded-full"
            style={{ left: `${min}%`, width: `${max - min}%` }}
            aria-hidden="true"
          />
        </div>
        {/* Min thumb */}
        <input
          type="range" min={0} max={max - 1} value={min}
          onChange={e => setMin(Number(e.target.value))}
          aria-label="Minimum value"
          className="absolute w-full h-5 opacity-0 cursor-pointer"
        />
        <div
          className="absolute w-4 h-4 rounded-full border-2 border-status-inprogress bg-background shadow-sm pointer-events-none"
          style={{ left: `calc(${min / range * 100}% - 8px)` }}
          aria-hidden="true"
        />
        {/* Max thumb */}
        <input
          type="range" min={min + 1} max={100} value={max}
          onChange={e => setMax(Number(e.target.value))}
          aria-label="Maximum value"
          className="absolute w-full h-5 opacity-0 cursor-pointer"
        />
        <div
          className="absolute w-4 h-4 rounded-full border-2 border-status-inprogress bg-background shadow-sm pointer-events-none"
          style={{ left: `calc(${max / range * 100}% - 8px)` }}
          aria-hidden="true"
        />
      </div>
    </div>
  )
}

export default function SliderPage() {
  const [effort, setEffort] = useState(3)
  const [zoom, setZoom] = useState(100)
  const [volume, setVolume] = useState(65)
  const [threshold, setThreshold] = useState(80)

  return (
    <DSLayout
      title="Slider"
      description="A range input for selecting a value within a continuous scale. Used for effort estimation, zoom controls, and threshold settings."
    >
      <DSSection title="Default" description="Standard slider with track fill and a floating thumb.">
        <DSPreview className="[&>div]:flex-col [&>div]:gap-6 [&>div]:w-full">
          <Slider value={zoom} onChange={setZoom} label="Zoom" min={50} max={200} step={10} />
          <Slider value={volume} onChange={setVolume} label="Volume" />
        </DSPreview>
      </DSSection>

      <DSSection title="Colors" description="Track color conveys semantic meaning — use primary for navigation, warning for thresholds, destructive for critical values.">
        <DSPreview className="[&>div]:flex-col [&>div]:gap-6 [&>div]:w-full">
          <Slider value={effort} onChange={setEffort} label="Effort (default)" min={1} max={10} color="default" />
          <Slider value={50} onChange={() => {}} label="Progress (primary)" color="primary" />
          <Slider value={threshold} onChange={setThreshold} label="Threshold (warning)" color="warning" />
          <Slider value={90} onChange={() => {}} label="Critical usage (destructive)" color="destructive" />
        </DSPreview>
      </DSSection>

      <DSSection title="Range" description="Two-thumb variant for selecting a min–max window, used in date range filters and estimate ranges.">
        <DSPreview className="[&>div]:flex-col [&>div]:w-full">
          <RangeSlider />
        </DSPreview>
      </DSSection>

      <DSSection title="Disabled" description="Full opacity reduction. Input events are suppressed.">
        <DSPreview className="[&>div]:flex-col [&>div]:gap-4 [&>div]:w-full">
          <Slider value={40} onChange={() => {}} label="Read-only" disabled />
        </DSPreview>
      </DSSection>

      <DSSection title="With step markers" description="Discrete slider with a fixed set of labeled steps, used for effort or priority scoring.">
        <div className="rounded-md border border-border p-6 bg-surface-1">
          <Slider value={effort} onChange={setEffort} label="Effort" min={1} max={5} step={1} color="primary" />
          <div className="flex justify-between mt-1 px-0.5">
            {['XS', 'S', 'M', 'L', 'XL'].map((s, i) => (
              <button key={s} onClick={() => setEffort(i + 1)} className="text-[10px] text-muted-foreground hover:text-foreground transition-colors cursor-pointer">{s}</button>
            ))}
          </div>
        </div>
      </DSSection>
    </DSLayout>
  )
}
