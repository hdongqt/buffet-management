import {
  fetchOrdersRequest,
  postPaymentRequest,
  putPaymentRequest,
} from '@/sagas/orderManager/orderManagerSlice'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'

const useOrderPayment = () => {
  const dispatch = useDispatch()
  const { payment, filters } = useSelector((state) => state.orderManager)

  const handleChangeMethod = (id, value) => {
    dispatch(postPaymentRequest({ id, values: { method: value } }))
  }
  const confirmPayment = (id) => {
    dispatch(
      putPaymentRequest({
        id,
        callback: () => {
          dispatch(fetchOrdersRequest({ params: { ...filters } }))
        },
      })
    )
  }

  return { payment, handleChangeMethod, confirmPayment }
}

export default useOrderPayment
