import { DSLayout } from '@/components/ds/ds-layout'
import { DSSection } from '@/components/ds/ds-section'
import { Check, X } from 'lucide-react'

function Rule({ correct, wrong, note }: { correct: string; wrong: string; note?: string }) {
  return (
    <div className="rounded-md border border-border overflow-hidden">
      <div className="grid grid-cols-2 divide-x divide-border">
        <div className="flex items-start gap-2 p-3 bg-status-done/5">
          <Check className="w-3.5 h-3.5 text-status-done mt-0.5 shrink-0" aria-hidden="true" />
          <p className="text-xs text-foreground">{correct}</p>
        </div>
        <div className="flex items-start gap-2 p-3 bg-destructive/5">
          <X className="w-3.5 h-3.5 text-destructive mt-0.5 shrink-0" aria-hidden="true" />
          <p className="text-xs text-foreground line-through decoration-destructive/60">{wrong}</p>
        </div>
      </div>
      {note && <div className="px-3 py-2 border-t border-border bg-surface-2"><p className="text-[11px] text-muted-foreground">{note}</p></div>}
    </div>
  )
}

function TableSection({ title, rows }: { title: string; rows: [string, string][] }) {
  return (
    <div>
      <p className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground/60 mb-2">{title}</p>
      <div className="rounded-md border border-border overflow-hidden">
        <table className="w-full text-xs">
          <thead>
            <tr className="border-b border-border bg-surface-2">
              <th className="text-left px-4 py-2.5 font-medium text-muted-foreground w-1/2">Do</th>
              <th className="text-left px-4 py-2.5 font-medium text-muted-foreground">Avoid</th>
            </tr>
          </thead>
          <tbody>
            {rows.map(([good, bad]) => (
              <tr key={good} className="border-b border-border last:border-0">
                <td className="px-4 py-2.5 text-foreground">{good}</td>
                <td className="px-4 py-2.5 text-muted-foreground line-through decoration-destructive/40">{bad}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default function WritingPage() {
  return (
    <DSLayout
      title="Writing Style"
      description="Copy guidelines for UI text — button labels, empty states, error messages, tooltips, and notifications. Consistent copy is as important as consistent components."
    >
      <DSSection title="Capitalization" description="Use sentence case everywhere — only capitalize proper nouns and the first word of a sentence.">
        <div className="space-y-3">
          <Rule correct="Create new issue" wrong="Create New Issue" note="Sentence case for buttons, labels, navigation items, and headings." />
          <Rule correct="Command palette" wrong="Command Palette" note="Title case only appears in product names (Linear, GitHub, Slack) and legal terms." />
          <Rule correct="Set due date" wrong="Set Due Date" note="Modal and dialog titles use sentence case." />
        </div>
      </DSSection>

      <DSSection title="Button labels" description="Buttons are verb + noun pairs. They describe exactly what will happen on click.">
        <div className="space-y-3">
          <Rule correct="Create issue" wrong="Submit" note="Be specific — 'Submit' is vague. 'Create issue' tells the user exactly what will happen." />
          <Rule correct="Save changes" wrong="OK" note="'OK' is ambiguous. Use an action verb." />
          <Rule correct="Delete project" wrong="Yes, delete" note="No confirmation fragments. Repeat the action in the destructive confirm button." />
          <Rule correct="Invite members" wrong="Invite" note="Add the object when it helps clarity and fits the available space." />
        </div>
      </DSSection>

      <DSSection title="Empty states" description="Follow the formula: what's missing → why it matters → action to fix it.">
        <div className="space-y-3">
          <Rule
            correct="No issues yet. Create your first issue to start tracking work."
            wrong="Nothing here."
            note="Always include a CTA that resolves the empty state."
          />
          <Rule
            correct="No results for 'keyboard'. Try a different search term."
            wrong="No results found."
            note="Echo the user's search query so they know what they searched for."
          />
          <Rule
            correct="This cycle has no issues. Add issues to track progress."
            wrong="Empty cycle."
            note="Explain the value of filling the empty state, not just that it's empty."
          />
        </div>
      </DSSection>

      <DSSection title="Error messages" description="Errors should explain what went wrong and what to do about it.">
        <div className="space-y-3">
          <Rule
            correct="Couldn't save changes. Check your connection and try again."
            wrong="Error 500."
            note="Never show error codes to end users. Use plain language."
          />
          <Rule
            correct="Email is already in use. Try signing in instead."
            wrong="Invalid email."
            note="Tell the user specifically what is wrong and offer a path forward."
          />
          <Rule
            correct="Name must be at least 2 characters."
            wrong="Name is too short."
            note="Be specific about constraints and include the actual requirement."
          />
        </div>
      </DSSection>

      <DSSection title="Tone reference" description="Quick reference for word choices in common UI situations.">
        <div className="space-y-4">
          <TableSection
            title="Actions"
            rows={[
              ['Create', 'Add / New / Make'],
              ['Delete', 'Remove / Clear'],
              ['Cancel', 'Go back / Never mind'],
              ['Save changes', 'Update / Apply'],
              ['Invite members', 'Add users / Send invite'],
            ]}
          />
          <TableSection
            title="Status"
            rows={[
              ['In progress', 'Active / Running / Started'],
              ['Done', 'Closed / Finished / Complete'],
              ['Cancelled', 'Deleted / Closed / Rejected'],
              ['Backlog', 'Pending / Upcoming / Queue'],
            ]}
          />
          <TableSection
            title="Time"
            rows={[
              ['Due Jul 15', 'Due date: 2026-07-15'],
              ['3 days ago', '72 hours ago'],
              ['Just now', '0 seconds ago'],
              ['Overdue', 'Past due / Late'],
            ]}
          />
        </div>
      </DSSection>

      <DSSection title="Punctuation" description="Minimal punctuation in UI text. Prose and body copy use standard punctuation.">
        <div className="rounded-md border border-border overflow-hidden">
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b border-border bg-surface-2">
                <th className="text-left px-4 py-2.5 font-medium text-muted-foreground">Element</th>
                <th className="text-left px-4 py-2.5 font-medium text-muted-foreground">Rule</th>
              </tr>
            </thead>
            <tbody>
              {[
                ['Button labels', 'No period. No ellipsis. No exclamation.'],
                ['Tooltip labels', 'No period unless it\'s a full sentence.'],
                ['Helper text', 'End with a period if it\'s a complete sentence.'],
                ['Error messages', 'End with a period. Full sentence required.'],
                ['Empty state body', 'Full sentences with periods.'],
                ['Navigation items', 'No punctuation.'],
                ['Placeholder text', 'No period. Descriptive phrase only.'],
                ['Loading messages', 'End with ellipsis: "Loading…" or "Saving…"'],
              ].map(([el, rule]) => (
                <tr key={el} className="border-b border-border last:border-0">
                  <td className="px-4 py-2.5 font-medium text-foreground">{el}</td>
                  <td className="px-4 py-2.5 text-muted-foreground">{rule}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </DSSection>
    </DSLayout>
  )
}
