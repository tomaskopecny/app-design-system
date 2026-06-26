'use client'

import { DSLayout } from '@/components/ds/ds-layout'
import { DSSection, DSPreview } from '@/components/ds/ds-section'
import { useState } from 'react'
import { AlertCircle, Check, Loader2 } from 'lucide-react'

// ─── Form primitives ──────────────────────────────────────────────────────────

function Label({ htmlFor, required, children }: { htmlFor: string; required?: boolean; children: React.ReactNode }) {
  return (
    <label htmlFor={htmlFor} className="block text-xs font-medium text-foreground mb-1.5">
      {children}
      {required && <span className="ml-1 text-destructive" aria-label="required">*</span>}
    </label>
  )
}

function HelperText({ children }: { children: React.ReactNode }) {
  return <p className="mt-1.5 text-[11px] text-muted-foreground leading-relaxed">{children}</p>
}

function ErrorText({ children }: { children: React.ReactNode }) {
  return (
    <p className="mt-1.5 text-[11px] text-destructive flex items-center gap-1" role="alert">
      <AlertCircle className="w-3 h-3 shrink-0" aria-hidden="true" />
      {children}
    </p>
  )
}

function Input({
  id,
  placeholder,
  error,
  disabled,
  value,
  onChange,
  type = 'text',
}: {
  id: string
  placeholder?: string
  error?: boolean
  disabled?: boolean
  value?: string
  onChange?: (v: string) => void
  type?: string
}) {
  return (
    <input
      id={id}
      type={type}
      placeholder={placeholder}
      disabled={disabled}
      value={value}
      onChange={e => onChange?.(e.target.value)}
      aria-invalid={error}
      className={`w-full px-3 py-2 rounded-md text-xs text-foreground bg-surface-2 border transition-colors focus:outline-none focus:ring-1
        placeholder:text-muted-foreground/50
        disabled:opacity-40 disabled:pointer-events-none
        ${error
          ? 'border-destructive/50 focus:ring-destructive/40'
          : 'border-border focus:border-foreground/30 focus:ring-ring'
        }`}
    />
  )
}

function Select({ id, options, disabled }: { id: string; options: string[]; disabled?: boolean }) {
  return (
    <select
      id={id}
      disabled={disabled}
      className="w-full px-3 py-2 rounded-md text-xs text-foreground bg-surface-2 border border-border focus:outline-none focus:ring-1 focus:ring-ring focus:border-foreground/30 disabled:opacity-40 disabled:pointer-events-none cursor-pointer"
    >
      {options.map(o => <option key={o}>{o}</option>)}
    </select>
  )
}

function Textarea({ id, placeholder, rows = 3 }: { id: string; placeholder?: string; rows?: number }) {
  const [val, setVal] = useState('')
  const max = 280
  return (
    <div>
      <textarea
        id={id}
        rows={rows}
        placeholder={placeholder}
        value={val}
        onChange={e => setVal(e.target.value)}
        maxLength={max}
        aria-describedby={`${id}-count`}
        className="w-full px-3 py-2 rounded-md text-xs text-foreground bg-surface-2 border border-border focus:outline-none focus:ring-1 focus:ring-ring focus:border-foreground/30 placeholder:text-muted-foreground/50 resize-none"
      />
      <div id={`${id}-count`} className="flex justify-end mt-1">
        <span className={`text-[10px] ${val.length > max * 0.9 ? 'text-priority-high' : 'text-muted-foreground/50'}`}>
          {val.length}/{max}
        </span>
      </div>
    </div>
  )
}

export default function FormLayoutPage() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [nameError, setNameError] = useState('')
  const [emailError, setEmailError] = useState('')
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  const validate = () => {
    let valid = true
    if (!name.trim()) { setNameError('Name is required'); valid = false } else setNameError('')
    if (!email.includes('@')) { setEmailError('Enter a valid email'); valid = false } else setEmailError('')
    return valid
  }

  const submit = () => {
    if (!validate()) return
    setLoading(true)
    setTimeout(() => { setLoading(false); setSuccess(true) }, 1400)
  }

  return (
    <DSLayout
      title="Form Layout"
      description="Patterns for composing form fields — label position, error messages, required markers, helper text, and submit states. All forms follow the same vertical stacking convention."
    >
      <DSSection title="Vertical stacked (default)" description="The standard layout. Label above, helper text below. Required fields marked with a red asterisk.">
        <div className="rounded-md border border-border p-5 bg-surface-1 max-w-sm space-y-4">
          <div>
            <Label htmlFor="name" required>Display name</Label>
            <Input id="name" placeholder="Alice Chen" value={name} onChange={setName} error={!!nameError} />
            {nameError ? <ErrorText>{nameError}</ErrorText> : <HelperText>This is how you appear to teammates.</HelperText>}
          </div>
          <div>
            <Label htmlFor="email" required>Email address</Label>
            <Input id="email" type="email" placeholder="alice@linear.app" value={email} onChange={setEmail} error={!!emailError} />
            {emailError ? <ErrorText>{emailError}</ErrorText> : null}
          </div>
          <div>
            <Label htmlFor="role">Role</Label>
            <Select id="role" options={['Engineer', 'Designer', 'Product Manager', 'Other']} />
            <HelperText>Used to personalize your onboarding experience.</HelperText>
          </div>
          <div>
            <Label htmlFor="bio">Bio</Label>
            <Textarea id="bio" placeholder="Tell your team a bit about yourself..." rows={3} />
          </div>
          <div className="flex items-center gap-3 pt-2 border-t border-border">
            <button
              onClick={submit}
              disabled={loading || success}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-md bg-foreground text-background text-xs font-medium hover:bg-foreground/90 disabled:opacity-60 disabled:pointer-events-none transition-colors cursor-pointer min-w-[100px] justify-center"
            >
              {loading ? <><Loader2 className="w-3.5 h-3.5 animate-spin" aria-hidden="true" /> Saving...</> :
                success ? <><Check className="w-3.5 h-3.5" aria-hidden="true" /> Saved</> :
                  'Save changes'}
            </button>
            <button className="px-3 py-1.5 rounded-md text-xs text-muted-foreground hover:text-foreground hover:bg-accent transition-colors cursor-pointer">
              Cancel
            </button>
          </div>
        </div>
      </DSSection>

      <DSSection title="Inline / horizontal" description="Label and input side-by-side. Use when space is available and the form is simple (3 or fewer fields).">
        <div className="rounded-md border border-border p-5 bg-surface-1 max-w-md space-y-3">
          {[
            { label: 'Workspace name', id: 'ws-name', placeholder: 'Acme Corp' },
            { label: 'URL slug', id: 'ws-slug', placeholder: 'acme' },
          ].map(({ label, id, placeholder }) => (
            <div key={id} className="grid grid-cols-[140px_1fr] items-center gap-3">
              <label htmlFor={id} className="text-xs font-medium text-foreground text-right">{label}</label>
              <Input id={id} placeholder={placeholder} />
            </div>
          ))}
          <div className="grid grid-cols-[140px_1fr] items-start gap-3 pt-1">
            <label htmlFor="ws-plan" className="text-xs font-medium text-foreground text-right mt-2">Plan</label>
            <Select id="ws-plan" options={['Free', 'Pro', 'Enterprise']} />
          </div>
        </div>
      </DSSection>

      <DSSection title="Validation states" description="Three states: default, error (with inline message), success (with check).">
        <div className="rounded-md border border-border p-5 bg-surface-1 max-w-sm space-y-4">
          <div>
            <Label htmlFor="v-default">Default</Label>
            <Input id="v-default" placeholder="Type something..." />
            <HelperText>Helper text appears below the field.</HelperText>
          </div>
          <div>
            <Label htmlFor="v-error" required>With error</Label>
            <Input id="v-error" placeholder="Enter value..." error />
            <ErrorText>This field is required and cannot be blank.</ErrorText>
          </div>
          <div>
            <Label htmlFor="v-disabled">Disabled</Label>
            <Input id="v-disabled" placeholder="Not editable" disabled value="Read-only value" />
          </div>
        </div>
      </DSSection>

      <DSSection title="Fieldset" description="Group related fields with a legend for semantic grouping and accessibility.">
        <div className="rounded-md border border-border p-5 bg-surface-1 max-w-sm">
          <fieldset>
            <legend className="text-xs font-semibold text-foreground mb-3">Notification preferences</legend>
            <div className="space-y-2">
              {['Email me when assigned', 'Email me when mentioned', 'Weekly digest'].map((item) => (
                <label key={item} className="flex items-center gap-2.5 cursor-pointer group">
                  <input type="checkbox" defaultChecked={item !== 'Weekly digest'}
                    className="w-3.5 h-3.5 rounded-sm border border-border bg-surface-2 accent-foreground cursor-pointer" />
                  <span className="text-xs text-foreground group-hover:text-foreground/80 transition-colors">{item}</span>
                </label>
              ))}
            </div>
          </fieldset>
        </div>
      </DSSection>
    </DSLayout>
  )
}
