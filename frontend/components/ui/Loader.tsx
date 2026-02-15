type LoaderProps = {
  label?: string
  size?: 'sm' | 'md' | 'lg'
  fullHeight?: boolean
}

const spinnerSize = {
  sm: 'h-4 w-4',
  md: 'h-6 w-6',
  lg: 'h-8 w-8',
}

export default function Loader({
  label = 'Cargando...',
  size = 'md',
  fullHeight = false,
}: LoaderProps) {
  const content = (
    <div role="status" aria-live="polite" className="flex items-center gap-3 text-gray-700">
      <span
        aria-hidden="true"
        className={`inline-block animate-spin rounded-full border-2 border-gray-300 border-t-blue-600 ${spinnerSize[size]}`}
      />
      <span>{label}</span>
    </div>
  )

  if (fullHeight) {
    return <div className="flex min-h-[40vh] items-center justify-center">{content}</div>
  }

  return content
}
