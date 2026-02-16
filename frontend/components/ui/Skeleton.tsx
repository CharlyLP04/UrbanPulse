type SkeletonProps = {
  className?: string
}

type SkeletonListProps = {
  items?: number
}

export function Skeleton({ className = '' }: SkeletonProps) {
  return (
    <div
      aria-hidden="true"
      className={`animate-pulse rounded-md bg-gray-200 ${className}`.trim()}
    />
  )
}

export function ListSkeleton({ items = 3 }: SkeletonListProps) {
  return (
    <div className="space-y-3" aria-hidden="true">
      {Array.from({ length: items }).map((_, index) => (
        <Skeleton key={`list-skeleton-${index}`} className="h-14 w-full" />
      ))}
    </div>
  )
}

export function CardSkeleton() {
  return (
    <div className="rounded-lg border border-gray-200 p-4" aria-hidden="true">
      <Skeleton className="mb-3 h-5 w-2/5" />
      <Skeleton className="mb-2 h-4 w-full" />
      <Skeleton className="h-4 w-4/5" />
    </div>
  )
}

export function ReportListSkeleton({ items = 3 }: SkeletonListProps) {
  return (
    <div className="space-y-3" aria-hidden="true">
      {Array.from({ length: items }).map((_, index) => (
        <div
          key={`report-skeleton-${index}`}
          className="rounded-md border border-gray-200 p-4"
        >
          <Skeleton className="mb-2 h-5 w-3/5" />
          <Skeleton className="mb-2 h-4 w-full" />
          <Skeleton className="h-4 w-1/4" />
        </div>
      ))}
    </div>
  )
}
