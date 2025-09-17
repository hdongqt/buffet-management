import { useState, useCallback, useRef, useEffect } from 'react'

const useDisabledButton = (
  callback,
  delay = 30000,
  key = 'button_disabled'
) => {
  const [disabled, setDisabled] = useState(false)
  const timeoutRef = useRef(null)

  useEffect(() => {
    try {
      const stored = localStorage.getItem(key)
      if (stored) {
        const { expireAt } = JSON.parse(stored)
        if (Date.now() < expireAt) {
          setDisabled(true)
          timeoutRef.current = setTimeout(() => {
            setDisabled(false)
            localStorage.removeItem(key)
          }, expireAt - Date.now())
        } else {
          localStorage.removeItem(key)
        }
      }
    } catch {
      localStorage.removeItem(key)
    }
  }, [key])

  const onClick = useCallback(
    (...args) => {
      if (disabled) return
      setDisabled(true)

      if (callback) callback(...args)

      const expireAt = Date.now() + delay
      localStorage.setItem(key, JSON.stringify({ expireAt }))

      timeoutRef.current = setTimeout(() => {
        setDisabled(false)
        localStorage.removeItem(key)
      }, delay)
    },
    [callback, delay, disabled, key]
  )

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
    }
  }, [])

  return { disabled, onClick }
}

export default useDisabledButton
