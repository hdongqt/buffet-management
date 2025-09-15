import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'

import { getOrderDetailRequest } from '@/sagas/guestOrder/guestOrderSlice'

const ProtectedGuestOrderRoute = ({ children }) => {
  const dispatch = useDispatch()
  const { orderId } = useSelector((state) => state.guestOrder)

  const handleRedirect = () => {
    window.location.replace('/')
    localStorage.removeItem('guestOrder')
  }

  useEffect(() => {
    if (orderId) {
      dispatch(
        getOrderDetailRequest({
          id: orderId,
          callback: (isSuccess) => {
            if (!isSuccess) {
              handleRedirect()
            }
          },
        })
      )
    }
  }, [dispatch, orderId])

  if (!orderId) {
    return <Navigate to='/' replace />
  }
  return children
}

export default ProtectedGuestOrderRoute
