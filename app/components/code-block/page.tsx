'use client'

import { DSLayout } from '@/components/ds/ds-layout'
import { DSSection, DSPreview } from '@/components/ds/ds-section'
import { useState } from 'react'
import { Check, Copy, Terminal } from 'lucide-react'

// Minimal syntax highlighter — token-based, no external dep
function tokenize(code: string, lang: string): { text: string; type: 'keyword' | 'string' | 'comment' | 'number' | 'fn' | 'plain' }[] {
  if (lang === 'bash') {
    return code.split(' ').map((t, i) => ({
      text: (i === code.split(' ').length - 1 ? t : t + ' '),
      type: i === 0 ? 'fn' : t.startsWith('--') || t.startsWith('-') ? 'keyword' : 'plain',
    }))
  }
  // Very small TS/JS highlighter
  const keywords = /\b(const|let|var|function|return|import|from|export|default|if|else|async|await|type|interface|class|new|true|false|null|undefined)\b/g
  const strings = /(['"`])((?:\\.|(?!\1)[^\\])*)\1/g
  const comments = /(\/\/[^\n]*|\/\*[\s\S]*?\*\/)/g
  const numbers = /\b(\d+\.?\d*)\b/g
  const fns = /\b([a-zA-Z_$][a-zA-Z0-9_$]*)\s*(?=\()/g

  const tokens: { text: string; type: 'keyword' | 'string' | 'comment' | 'number' | 'fn' | 'plain' }[] = []
  let last = 0

  const parts: { start: number; end: number; type: 'keyword' | 'string' | 'comment' | 'number' | 'fn' }[] = []
  for (const [pattern, type] of [
    [comments, 'comment'],
    [strings, 'string'],
    [keywords, 'keyword'],
    [numbers, 'number'],
    [fns, 'fn'],
  ] as [RegExp, 'keyword' | 'string' | 'comment' | 'number' | 'fn'][]) {
    for (const m of code.matchAll(new RegExp(pattern.source, 'g'))) {
      if (m.index !== undefined) parts.push({ start: m.index, end: m.index + m[0].length, type })
    }
  }
  parts.sort((a, b) => a.start - b.start)

  const used = new Set<number>()
  for (const p of parts) {
    if ([...used].some(u => u >= p.start && u < p.end)) continue
    if (p.start > last) tokens.push({ text: code.slice(last, p.start), type: 'plain' })
    tokens.push({ text: code.slice(p.start, p.end), type: p.type })
    for (let i = p.start; i < p.end; i++) used.add(i)
    last = p.end
  }
  if (last < code.length) tokens.push({ text: code.slice(last), type: 'plain' })
  return tokens
}

const TYPE_COLORS: Record<string, string> = {
  keyword: 'text-status-inprogress',
  string: 'text-status-done',
  comment: 'text-muted-foreground',
  number: 'text-priority-medium',
  fn: 'text-priority-high',
  plain: 'text-foreground',
}

function CodeBlock({
  code,
  lang = 'ts',
  filename,
  showLineNumbers = false,
}: {
  code: string
  lang?: string
  filename?: string
  showLineNumbers?: boolean
}) {
  const [copied, setCopied] = useState(false)

  const copy = () => {
    navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const lines = code.split('\n')

  return (
    <div className="rounded-md border border-border overflow-hidden bg-surface-1 font-mono text-[12px]">
      {/* Header */}
      {(filename || lang) && (
        <div className="flex items-center justify-between px-4 py-2 border-b border-border bg-surface-2">
          <div className="flex items-center gap-2">
            <Terminal className="w-3 h-3 text-muted-foreground" aria-hidden="true" />
            <span className="text-[11px] text-muted-foreground">{filename ?? lang}</span>
          </div>
          <button
            onClick={copy}
            aria-label={copied ? 'Copied' : 'Copy code'}
            className="flex items-center gap-1 px-2 py-1 rounded-sm text-[10px] text-muted-foreground hover:text-foreground hover:bg-surface-3 transition-colors cursor-pointer"
          >
            {copied ? <Check className="w-3 h-3 text-status-done" aria-hidden="true" /> : <Copy className="w-3 h-3" aria-hidden="true" />}
            {copied ? 'Copied' : 'Copy'}
          </button>
        </div>
      )}
      {/* Body */}
      <div className="overflow-x-auto">
        <pre className="p-4 leading-relaxed" tabIndex={0}>
          {lines.map((line, i) => (
            <div key={i} className="flex">
              {showLineNumbers && (
                <span className="select-none pr-4 text-muted-foreground/40 text-right shrink-0" style={{ minWidth: '2rem' }} aria-hidden="true">
                  {i + 1}
                </span>
              )}
              <code>
                {tokenize(line, lang).map((tok, j) => (
                  <span key={j} className={TYPE_COLORS[tok.type]}>{tok.text}</span>
                ))}
                {i < lines.length - 1 ? '\n' : ''}
              </code>
            </div>
          ))}
        </pre>
      </div>
    </div>
  )
}

// Inline code
function InlineCode({ children }: { children: string }) {
  return (
    <code className="px-1.5 py-0.5 rounded-sm bg-surface-2 border border-border text-[11px] font-mono text-foreground">
      {children}
    </code>
  )
}

const EXAMPLE_TS = `import { createIssue } from '@linear/sdk'

// Create a new issue in a team
const issue = await createIssue({
  teamId: 'ENG',
  title: 'Implement keyboard shortcuts',
  priority: 2, // high
  assigneeId: user.id,
})

return issue.id`

const EXAMPLE_BASH = `pnpm install @linear/sdk`

const EXAMPLE_JSON = `{
  "id": "ENG-1234",
  "title": "Keyboard shortcut support",
  "status": "in_progress",
  "priority": 2,
  "assignee": {
    "name": "Alice Chen",
    "email": "alice@linear.app"
  }
}`

export default function CodeBlockPage() {
  return (
    <DSLayout
      title="Code Block"
      description="Displays code with syntax highlighting, a copy button, and optional line numbers. Used in documentation, issue descriptions, and onboarding guides."
    >
      <DSSection title="With filename" description="Show the filename in the header when context matters — especially useful for config files.">
        <CodeBlock code={EXAMPLE_TS} lang="ts" filename="create-issue.ts" showLineNumbers />
      </DSSection>

      <DSSection title="Shell command" description="Terminal commands use a distinct Terminal icon and plain token coloring.">
        <CodeBlock code={EXAMPLE_BASH} lang="bash" filename="Terminal" />
      </DSSection>

      <DSSection title="Without header" description="When the language context is obvious from surrounding text, omit the header.">
        <CodeBlock code={EXAMPLE_JSON} lang="json" />
      </DSSection>

      <DSSection title="Inline code" description="Short code references inside prose — field names, values, identifiers.">
        <DSPreview className="[&>div]:flex-col [&>div]:items-start">
          <p className="text-xs text-muted-foreground leading-relaxed">
            Set the <InlineCode>priority</InlineCode> field to <InlineCode>2</InlineCode> for high priority issues.
            The <InlineCode>teamId</InlineCode> is a three-letter abbreviation like <InlineCode>ENG</InlineCode>.
          </p>
        </DSPreview>
      </DSSection>

      <DSSection title="Spec" description="Typography and sizing reference.">
        <div className="rounded-md border border-border overflow-hidden">
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b border-border bg-surface-2">
                <th className="text-left px-4 py-2.5 font-medium text-muted-foreground">Property</th>
                <th className="text-left px-4 py-2.5 font-medium text-muted-foreground">Value</th>
              </tr>
            </thead>
            <tbody>
              {[
                ['Font', 'font-mono (Geist Mono)'],
                ['Font size', '12px body, 11px inline'],
                ['Line height', 'leading-relaxed (1.625)'],
                ['Background', 'bg-surface-1'],
                ['Header', 'bg-surface-2, border-b border-border'],
                ['Copy feedback', '2 second success state with check icon'],
              ].map(([prop, val]) => (
                <tr key={prop} className="border-b border-border last:border-0">
                  <td className="px-4 py-2.5 font-medium text-foreground">{prop}</td>
                  <td className="px-4 py-2.5 text-muted-foreground font-mono">{val}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </DSSection>
    </DSLayout>
  )
}
