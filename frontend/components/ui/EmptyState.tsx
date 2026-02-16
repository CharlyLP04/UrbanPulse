import Link from 'next/link'
import type { ReactNode } from 'react'

type EmptyStateProps = {
  title: string
  description: string
  actionLabel?: string
  actionHref?: string
  onAction?: () => void
  icon?: ReactNode
}

export default function EmptyState({
  title,
  description,
  actionLabel,
  actionHref,
  onAction,
  icon,
}: EmptyStateProps) {
  const hasLinkAction = Boolean(actionLabel && actionHref)
  const hasButtonAction = Boolean(actionLabel && onAction && !actionHref)

  return (
    <section
      role="status"
      aria-live="polite"
      className="rounded-lg border border-dashed border-gray-300 bg-gray-50 p-8 text-center"
    >
      <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-white text-gray-500">
        {icon ?? (
          <svg
            aria-hidden="true"
            className="h-6 w-6"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            viewBox="0 0 24 24"
          >
            <path
              d="M20.25 11.25v8.25a.75.75 0 0 1-.75.75H4.5a.75.75 0 0 1-.75-.75v-8.25M3.75 8.25l8.25 5.25 8.25-5.25M5.25 3.75h13.5a1.5 1.5 0 0 1 1.5 1.5v3L12 13.5 3.75 8.25v-3a1.5 1.5 0 0 1 1.5-1.5Z"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        )}
      </div>

      <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
      <p className="mt-2 text-sm text-gray-600">{description}</p>

      {hasLinkAction && actionHref ? (
        <Link
          href={actionHref}
          className="mt-5 inline-flex rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2"
        >
          {actionLabel}
        </Link>
      ) : null}

      {hasButtonAction && onAction ? (
        <button
          type="button"
          onClick={onAction}
          className="mt-5 inline-flex rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2"
        >
          {actionLabel}
        </button>
      ) : null}
    </section>
  )
}
