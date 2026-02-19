'use client'

import type { KeyboardEvent } from 'react'
import { useRef } from 'react'

export function useArrowMenuNavigation<T extends HTMLElement>() {
  const itemRefs = useRef<(T | null)[]>([])

  const onKeyDown = (event: KeyboardEvent<HTMLElement>) => {
    const validKeys = ['ArrowRight', 'ArrowLeft', 'Home', 'End']
    if (!validKeys.includes(event.key)) {
      return
    }

    const items = itemRefs.current.filter((item): item is T => item !== null)
    if (items.length === 0) {
      return
    }

    const currentIndex = items.findIndex((item) => item === document.activeElement)
    if (currentIndex === -1) {
      return
    }

    event.preventDefault()

    if (event.key === 'Home') {
      items[0].focus()
      return
    }

    if (event.key === 'End') {
      items[items.length - 1].focus()
      return
    }

    const delta = event.key === 'ArrowRight' ? 1 : -1
    const nextIndex = (currentIndex + delta + items.length) % items.length
    items[nextIndex].focus()
  }

  return { itemRefs, onKeyDown }
}
