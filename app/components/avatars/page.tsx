import { DSLayout } from '@/components/ds/ds-layout'
import { DSSection } from '@/components/ds/ds-section'

const avatarColors = [
  { initials: 'AF', bg: '#4D8EE8' },
  { initials: 'LF', bg: '#E07B39' },
  { initials: 'YB', bg: '#4CAF7D' },
  { initials: 'OD', bg: '#9B6DFF' },
  { initials: 'MK', bg: '#E5534B' },
]

function InitialAvatar({ initials, bg, size = 'md' }: { initials: string; bg: string; size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' }) {
  const sizeClasses = {
    xs: 'w-5 h-5 text-[9px]',
    sm: 'w-6 h-6 text-[10px]',
    md: 'w-8 h-8 text-xs',
    lg: 'w-10 h-10 text-sm',
    xl: 'w-12 h-12 text-base',
  }
  return (
    <div
      className={`${sizeClasses[size]} rounded-full flex items-center justify-center font-semibold text-white shrink-0 select-none`}
      style={{ background: bg }}
    >
      {initials}
    </div>
  )
}

function TeamIcon({ name, bg, size = 'md' }: { name: string; bg: string; size?: 'sm' | 'md' | 'lg' }) {
  const sizeClasses = { sm: 'w-5 h-5 rounded text-[9px]', md: 'w-7 h-7 rounded-md text-[11px]', lg: 'w-9 h-9 rounded-lg text-xs' }
  return (
    <div
      className={`${sizeClasses[size]} flex items-center justify-center font-bold text-white shrink-0`}
      style={{ background: bg }}
    >
      {name[0]}
    </div>
  )
}

function PreviewBox({ children }: { children: React.ReactNode }) {
  return (
    <div className="p-6 bg-surface-1 flex flex-wrap gap-4 items-center rounded-t-md border border-border">
      {children}
    </div>
  )
}

export default function AvatarsPage() {
  return (
    <DSLayout
      title="Avatars"
      description="Avatars use initials on colored backgrounds when no image is available. Shapes: round for users, rounded-md for teams/workspaces. Always use a border for legibility on dark surfaces."
    >
      <DSSection title="Sizes" description="Five sizes from xs (20px) to xl (48px).">
        <PreviewBox>
          {(['xs', 'sm', 'md', 'lg', 'xl'] as const).map((size) => (
            <InitialAvatar key={size} initials="AF" bg="#4D8EE8" size={size} />
          ))}
        </PreviewBox>
      </DSSection>

      <DSSection title="User avatars" description="Round (rounded-full). Initials are 2 characters max.">
        <div className="rounded-md border border-border overflow-hidden">
          <PreviewBox>
            {avatarColors.map((a) => (
              <InitialAvatar key={a.initials} initials={a.initials} bg={a.bg} size="md" />
            ))}
            {/* With online indicator */}
            <div className="relative">
              <InitialAvatar initials="LF" bg="#E07B39" size="md" />
              <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-[#4CAF7D] border-2 border-background" />
            </div>
            {/* Offline */}
            <div className="relative">
              <InitialAvatar initials="YB" bg="#4CAF7D" size="md" />
              <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-surface-3 border-2 border-background" />
            </div>
          </PreviewBox>
          <div className="border-t border-border bg-background px-4 py-3">
            <pre className="font-mono text-[11px] text-muted-foreground">{`// With online indicator
<div className="relative">
  <Avatar />
  <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full
    bg-[#4CAF7D] border-2 border-background" />
</div>`}</pre>
          </div>
        </div>
      </DSSection>

      <DSSection title="Avatar stack" description="Overlapping avatars for team members. Overlap with -space-x-1.5.">
        <div className="rounded-md border border-border overflow-hidden">
          <PreviewBox>
            {/* Small stack */}
            <div className="flex -space-x-2">
              {avatarColors.slice(0, 4).map((a) => (
                <div key={a.initials} className="ring-2 ring-background rounded-full">
                  <InitialAvatar initials={a.initials} bg={a.bg} size="sm" />
                </div>
              ))}
              <div className="w-6 h-6 rounded-full bg-surface-3 border-2 border-background ring-2 ring-background flex items-center justify-center">
                <span className="text-[9px] font-medium text-muted-foreground">+3</span>
              </div>
            </div>

            {/* Medium stack */}
            <div className="flex -space-x-2.5">
              {avatarColors.slice(0, 3).map((a) => (
                <div key={a.initials} className="ring-2 ring-background rounded-full">
                  <InitialAvatar initials={a.initials} bg={a.bg} size="md" />
                </div>
              ))}
            </div>

            {/* Assignee display */}
            <div className="flex items-center gap-2">
              <div className="flex -space-x-1.5">
                {avatarColors.slice(0, 2).map((a) => (
                  <div key={a.initials} className="ring-1 ring-background rounded-full">
                    <InitialAvatar initials={a.initials} bg={a.bg} size="xs" />
                  </div>
                ))}
              </div>
              <span className="text-xs text-muted-foreground">2 assignees</span>
            </div>
          </PreviewBox>
        </div>
      </DSSection>

      <DSSection title="Team & workspace icons" description="Rounded square (rounded-md). Used in sidebar for team/workspace entries.">
        <div className="rounded-md border border-border overflow-hidden">
          <PreviewBox>
            {(['sm', 'md', 'lg'] as const).map((size) => (
              <TeamIcon key={size} name="Engineering" bg="#4D8EE8" size={size} />
            ))}
            <TeamIcon name="Design" bg="#9B6DFF" size="md" />
            <TeamIcon name="Marketing" bg="#E07B39" size="md" />
            <TeamIcon name="Product" bg="#4CAF7D" size="md" />

            {/* Bot / agent avatar */}
            <div className="w-8 h-8 rounded-md bg-surface-3 border border-border flex items-center justify-center">
              <span className="text-xs font-mono text-muted-foreground">AI</span>
            </div>
          </PreviewBox>
          <div className="border-t border-border bg-background px-4 py-3">
            <pre className="font-mono text-[11px] text-muted-foreground">{`// Team icon
<div className="w-7 h-7 rounded-md flex items-center justify-center font-bold text-white"
  style={{ background: '#4D8EE8' }}>
  E
</div>`}</pre>
          </div>
        </div>
      </DSSection>

      <DSSection title="Unassigned state" description="A dashed border placeholder communicates empty assignee slots.">
        <PreviewBox>
          <div className="w-8 h-8 rounded-full border border-dashed border-border flex items-center justify-center text-muted-foreground/50">
            <span className="text-[10px]">–</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full border border-dashed border-border flex items-center justify-center text-muted-foreground/50">
              <span className="text-[8px]">–</span>
            </div>
            <span className="text-xs text-muted-foreground">Unassigned</span>
          </div>
        </PreviewBox>
      </DSSection>
    </DSLayout>
  )
}
