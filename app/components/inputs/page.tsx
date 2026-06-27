'use client'

import { DSLayout } from '@/components/ds/ds-layout'
import { DSSection } from '@/components/ds/ds-section'
import { Search, X, AlertCircle, Eye, EyeOff } from 'lucide-react'
import { useState } from 'react'

function CodeSnippet({ code }: { code: string }) {
  return (
    <div className="border-t border-border bg-background px-4 py-3 rounded-b-md">
      <pre className="font-mono text-[11px] text-muted-foreground overflow-x-auto">{code}</pre>
    </div>
  )
}

function PreviewBox({ children }: { children: React.ReactNode }) {
  return (
    <div className="p-6 bg-surface-1 flex flex-wrap gap-4 items-start rounded-t-md border border-border">
      {children}
    </div>
  )
}

export default function InputsPage() {
  const [search, setSearch] = useState('')
  const [showPass, setShowPass] = useState(false)

  return (
    <DSLayout
      title="Inputs"
      description="Inputs are low-profile — dark background, subtle border, no box-shadow on default state. Focus ring uses the --ring token for keyboard accessibility."
    >
      {/* Base input */}
      <DSSection title="Text input" description="Default and placeholder states.">
        <div className="rounded-md border border-border overflow-hidden">
          <PreviewBox>
            <div className="w-64 space-y-2">
              <input
                type="text"
                placeholder="Issue title"
                className="w-full px-3 py-1.5 text-sm rounded-md bg-surface-2 border border-border text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-1 focus:ring-ring transition-colors"
              />
              <input
                type="text"
                defaultValue="Build onboarding flow"
                className="w-full px-3 py-1.5 text-sm rounded-md bg-surface-2 border border-border text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-1 focus:ring-ring transition-colors"
              />
              <input
                type="text"
                disabled
                placeholder="Disabled"
                className="w-full px-3 py-1.5 text-sm rounded-md bg-surface-2 border border-border text-muted-foreground/40 placeholder:text-muted-foreground/30 cursor-not-allowed opacity-50"
              />
            </div>
          </PreviewBox>
          <CodeSnippet code={`<input
  type="text"
  placeholder="Issue title"
  className="w-full px-3 py-1.5 text-sm rounded-md
    bg-surface-2 border border-border text-foreground
    placeholder:text-muted-foreground/50
    focus:outline-none focus:ring-1 focus:ring-ring"
/>`} />
        </div>
      </DSSection>

      {/* Search */}
      <DSSection title="Search input" description="Left icon for context, optional clear button on right.">
        <div className="rounded-md border border-border overflow-hidden">
          <PreviewBox>
            <div className="relative w-64">
              <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground pointer-events-none" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search issues..."
                className="w-full pl-8 pr-7 py-1.5 text-sm rounded-md bg-surface-2 border border-border text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-1 focus:ring-ring transition-colors"
              />
              {search && (
                <button
                  onClick={() => setSearch('')}
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Inline search with kbd shortcut */}
            <div className="relative w-56">
              <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground pointer-events-none" />
              <input
                type="text"
                placeholder="Search..."
                className="w-full pl-8 pr-14 py-1.5 text-sm rounded-md bg-surface-1 border border-border text-foreground placeholder:text-muted-foreground/40 focus:outline-none focus:ring-1 focus:ring-ring"
              />
              <kbd className="absolute right-2 top-1/2 -translate-y-1/2 px-1.5 py-0.5 text-[10px] font-mono rounded border border-border bg-surface-3 text-muted-foreground pointer-events-none">
                ⌘K
              </kbd>
            </div>
          </PreviewBox>
          <CodeSnippet code={`<div className="relative">
  <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" />
  <input className="w-full pl-8 pr-14 py-1.5 text-sm rounded-md bg-surface-2 border border-border ..." />
  <kbd className="absolute right-2 top-1/2 -translate-y-1/2 ...">⌘K</kbd>
</div>`} />
        </div>
      </DSSection>

      {/* Error state */}
      <DSSection title="Validation states" description="Error uses destructive token. Success uses status-done.">
        <div className="rounded-md border border-border overflow-hidden">
          <PreviewBox>
            <div className="space-y-3 w-64">
              {/* Error */}
              <div className="space-y-1">
                <label className="text-xs font-medium text-foreground">Email</label>
                <div className="relative">
                  <input
                    type="email"
                    defaultValue="not-an-email"
                    className="w-full px-3 py-1.5 pr-8 text-sm rounded-md bg-surface-2 border border-destructive/60 text-foreground focus:outline-none focus:ring-1 focus:ring-destructive/40"
                  />
                  <AlertCircle className="absolute right-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-destructive" />
                </div>
                <p className="text-[11px] text-destructive">Please enter a valid email address.</p>
              </div>

              {/* Success */}
              <div className="space-y-1">
                <label className="text-xs font-medium text-foreground">Username</label>
                <input
                  type="text"
                  defaultValue="linear-user"
                  className="w-full px-3 py-1.5 text-sm rounded-md bg-surface-2 border border-[#4CAF7D]/50 text-foreground focus:outline-none focus:ring-1 focus:ring-[#4CAF7D]/40"
                />
                <p className="text-[11px] text-[#4CAF7D]">Username is available.</p>
              </div>
            </div>
          </PreviewBox>
          <CodeSnippet code={`// Error
<input className="... border-destructive/60 focus:ring-destructive/40" />
<p className="text-[11px] text-destructive">Error message here.</p>

// Success  
<input className="... border-[#4CAF7D]/50 focus:ring-[#4CAF7D]/40" />`} />
        </div>
      </DSSection>

      {/* Password */}
      <DSSection title="Password input" description="Toggle visibility with an icon button on the right.">
        <div className="rounded-md border border-border overflow-hidden">
          <PreviewBox>
            <div className="relative w-64">
              <input
                type={showPass ? 'text' : 'password'}
                defaultValue="super-secret"
                className="w-full px-3 py-1.5 pr-9 text-sm rounded-md bg-surface-2 border border-border text-foreground focus:outline-none focus:ring-1 focus:ring-ring"
              />
              <button
                onClick={() => setShowPass(!showPass)}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
              >
                {showPass ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
              </button>
            </div>
          </PreviewBox>
        </div>
      </DSSection>

      {/* Textarea */}
      <DSSection title="Textarea" description="Resizable, consistent with the base input style.">
        <div className="rounded-md border border-border overflow-hidden">
          <PreviewBox>
            <textarea
              rows={3}
              placeholder="Add a comment or description..."
              className="w-72 px-3 py-2 text-sm rounded-md bg-surface-2 border border-border text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-1 focus:ring-ring resize-y leading-relaxed"
            />
          </PreviewBox>
          <CodeSnippet code={`<textarea
  rows={3}
  placeholder="Add a comment..."
  className="w-full px-3 py-2 text-sm rounded-md bg-surface-2 border border-border
    text-foreground placeholder:text-muted-foreground/50
    focus:outline-none focus:ring-1 focus:ring-ring resize-y leading-relaxed"
/>`} />
        </div>
      </DSSection>
    </DSLayout>
  )
}
