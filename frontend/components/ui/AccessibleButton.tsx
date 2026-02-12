import React from 'react'

export type AccessibleButtonProps = {
  label: string
  disabled?: boolean
  onClick?: () => void
}

const AccessibleButton = ({
  label,
  disabled = false,
  onClick,
}: AccessibleButtonProps) => {
  return (
    <button
      type="button"
      disabled={disabled}
      aria-disabled={disabled}
      onClick={onClick}
    >
      {label}
    </button>
  )
}

export default AccessibleButton

