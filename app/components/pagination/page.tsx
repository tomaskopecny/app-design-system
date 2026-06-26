'use client'

import { DSLayout } from '@/components/ds/ds-layout'
import { DSSection, DSPreview } from '@/components/ds/ds-section'
import { useState } from 'react'
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight, MoreHorizontal } from 'lucide-react'

function PageBtn({
  children,
  active = false,
  disabled = false,
  onClick,
  ariaLabel,
}: {
  children: React.ReactNode
  active?: boolean
  disabled?: boolean
  onClick?: () => void
  ariaLabel?: string
}) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      aria-label={ariaLabel}
      aria-current={active ? 'page' : undefined}
      className={`min-w-[28px] h-7 px-1.5 flex items-center justify-center rounded-sm text-xs font-medium transition-colors cursor-pointer disabled:opacity-30 disabled:pointer-events-none focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring
        ${active
          ? 'bg-foreground text-background'
          : 'text-muted-foreground hover:text-foreground hover:bg-accent'
        }`}
    >
      {children}
    </button>
  )
}

function buildPages(current: number, total: number): (number | '...')[] {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1)
  if (current <= 4) return [1, 2, 3, 4, 5, '...', total]
  if (current >= total - 3) return [1, '...', total - 4, total - 3, total - 2, total - 1, total]
  return [1, '...', current - 1, current, current + 1, '...', total]
}

function Pagination({ total, showFirstLast = false }: { total: number; showFirstLast?: boolean }) {
  const [page, setPage] = useState(1)
  const pages = buildPages(page, total)

  return (
    <nav aria-label="Pagination" className="flex items-center gap-0.5">
      {showFirstLast && (
        <PageBtn onClick={() => setPage(1)} disabled={page === 1} ariaLabel="First page">
          <ChevronsLeft className="w-3.5 h-3.5" aria-hidden="true" />
        </PageBtn>
      )}
      <PageBtn onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1} ariaLabel="Previous page">
        <ChevronLeft className="w-3.5 h-3.5" aria-hidden="true" />
      </PageBtn>
      {pages.map((p, i) =>
        p === '...' ? (
          <span key={`ellipsis-${i}`} className="w-7 h-7 flex items-center justify-center text-muted-foreground" aria-hidden="true">
            <MoreHorizontal className="w-3.5 h-3.5" />
          </span>
        ) : (
          <PageBtn
            key={p}
            active={p === page}
            onClick={() => setPage(p as number)}
            ariaLabel={`Page ${p}`}
          >
            {p}
          </PageBtn>
        )
      )}
      <PageBtn onClick={() => setPage(p => Math.min(total, p + 1))} disabled={page === total} ariaLabel="Next page">
        <ChevronRight className="w-3.5 h-3.5" aria-hidden="true" />
      </PageBtn>
      {showFirstLast && (
        <PageBtn onClick={() => setPage(total)} disabled={page === total} ariaLabel="Last page">
          <ChevronsRight className="w-3.5 h-3.5" aria-hidden="true" />
        </PageBtn>
      )}
    </nav>
  )
}

function PaginationWithMeta({ total, perPage }: { total: number; perPage: number }) {
  const [page, setPage] = useState(1)
  const totalPages = Math.ceil(total / perPage)
  const from = (page - 1) * perPage + 1
  const to = Math.min(page * perPage, total)
  const pages = buildPages(page, totalPages)

  return (
    <div className="flex items-center justify-between w-full">
      <p className="text-xs text-muted-foreground">
        Showing <span className="text-foreground font-medium">{from}–{to}</span> of <span className="text-foreground font-medium">{total}</span> issues
      </p>
      <nav aria-label="Pagination" className="flex items-center gap-0.5">
        <PageBtn onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1} ariaLabel="Previous page">
          <ChevronLeft className="w-3.5 h-3.5" aria-hidden="true" />
        </PageBtn>
        {pages.map((p, i) =>
          p === '...' ? (
            <span key={`e-${i}`} className="w-7 h-7 flex items-center justify-center text-muted-foreground" aria-hidden="true">
              <MoreHorizontal className="w-3.5 h-3.5" />
            </span>
          ) : (
            <PageBtn key={p} active={p === page} onClick={() => setPage(p as number)} ariaLabel={`Page ${p}`}>{p}</PageBtn>
          )
        )}
        <PageBtn onClick={() => setPage(p => Math.min(totalPages, p + 1))} disabled={page === totalPages} ariaLabel="Next page">
          <ChevronRight className="w-3.5 h-3.5" aria-hidden="true" />
        </PageBtn>
      </nav>
    </div>
  )
}

export default function PaginationPage() {
  return (
    <DSLayout
      title="Pagination"
      description="Navigation controls for moving through pages of content. Ellipsis collapses large page ranges. Always includes prev/next arrows for keyboard and mobile accessibility."
    >
      <DSSection title="Default" description="Previous / next arrows with numbered page buttons and ellipsis for large ranges.">
        <DSPreview>
          <Pagination total={12} />
        </DSPreview>
      </DSSection>

      <DSSection title="With ellipsis" description="Pages are collapsed to first, last, and a window around the current page.">
        <DSPreview className="[&>div]:flex-col [&>div]:gap-4">
          <Pagination total={24} />
          <Pagination total={24} showFirstLast />
        </DSPreview>
      </DSSection>

      <DSSection title="With meta" description="Displays the current range and total count — standard for table footers.">
        <div className="rounded-md border border-border p-4 bg-surface-1">
          <PaginationWithMeta total={347} perPage={25} />
        </div>
      </DSSection>

      <DSSection title="Simple prev / next" description="Minimal variant for content that does not require direct page access (articles, onboarding steps).">
        <DSPreview>
          <div className="flex items-center gap-2">
            <button className="inline-flex items-center gap-1 px-3 py-1.5 rounded-md bg-surface-2 border border-border text-xs text-foreground hover:bg-surface-3 transition-colors cursor-pointer">
              <ChevronLeft className="w-3.5 h-3.5" aria-hidden="true" /> Previous
            </button>
            <button className="inline-flex items-center gap-1 px-3 py-1.5 rounded-md bg-surface-2 border border-border text-xs text-foreground hover:bg-surface-3 transition-colors cursor-pointer">
              Next <ChevronRight className="w-3.5 h-3.5" aria-hidden="true" />
            </button>
          </div>
        </DSPreview>
      </DSSection>
    </DSLayout>
  )
}
