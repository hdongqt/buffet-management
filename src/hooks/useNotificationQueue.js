import { notification } from 'antd'
import { useEffect, useRef, useState, useCallback } from 'react'

function useNotification() {
  const [queue, setQueue] = useState([])
  const showing = useRef(false)
  const [api, contextHolder] = notification.useNotification()

  const openNotification = ({ title, message }) => {
    api.info({
      message: title,
      duration: 3,
      description:
        message?.length > 100 ? message.slice(0, 100) + '...' : message,
      placement: 'bottomRight',
      onClose: () => {
        showing.current = false
        setQueue((prev) => prev.slice(1))
      },
    })
  }

  useEffect(() => {
    if (!showing.current && queue.length > 0) {
      showing.current = true
      const item = queue[0]

      openNotification(item)
    }
  }, [queue])

  const pushNotification = useCallback((noti) => {
    setQueue((prev) => [...prev, noti])
  }, [])

  return { pushNotification, contextHolder }
}

export default useNotification
