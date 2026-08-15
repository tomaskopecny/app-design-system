'use client'

import { useEffect, type RefObject } from 'react'

/**
 * Closes an open element (dropdown, select, popover) when the user
 * clicks or taps outside of the referenced container.
 */
export function useClickOutside<T extends HTMLElement>(
  ref: RefObject<T | null>,
  onOutsideClick: () => void,
  enabled = true,
) {
  useEffect(() => {
    if (!enabled) return

    function handlePointerDown(event: MouseEvent | TouchEvent) {
      const target = event.target as Node
      if (ref.current && !ref.current.contains(target)) {
        onOutsideClick()
      }
    }

    document.addEventListener('mousedown', handlePointerDown)
    document.addEventListener('touchstart', handlePointerDown)

    return () => {
      document.removeEventListener('mousedown', handlePointerDown)
      document.removeEventListener('touchstart', handlePointerDown)
    }
  }, [ref, onOutsideClick, enabled])
}
