import { useState, useCallback, useRef, useEffect } from 'react'

const useDisableButton = (callback, delay = 30000) => {
  const [disabled, setDisabled] = useState(false)
  const timeoutRef = useRef(null)

  const onClick = useCallback(
    (...args) => {
      if (disabled) return
      setDisabled(true)

      if (callback) {
        callback(...args)
      }

      timeoutRef.current = setTimeout(() => {
        setDisabled(false)
      }, delay)
    },
    [callback, delay, disabled]
  )

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
    }
  }, [])

  return { disabled, onClick }
}

export default useDisableButton
