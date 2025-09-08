import { useRef } from 'react'
const useDebounceCallback = (callback, delay = 500) => {
  const timer = useRef()

  return (...args) => {
    if (timer.current) clearTimeout(timer.current)
    timer.current = setTimeout(() => {
      callback(...args)
    }, delay)
  }
}

export default useDebounceCallback
