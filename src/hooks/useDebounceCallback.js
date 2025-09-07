import { useRef } from 'react'
export function useDebounceCallback(callback, delay = 500) {
  const timer = useRef()

  return (...args) => {
    if (timer.current) clearTimeout(timer.current)
    timer.current = setTimeout(() => {
      callback(...args)
    }, delay)
  }
}
