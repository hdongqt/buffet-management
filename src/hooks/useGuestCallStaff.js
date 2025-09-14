import { useState } from 'react'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'

import { callStaffRequest } from '@/sagas/guestOrder/guestOrderSlice'

import useDebounceCallback from './useDebounceCallback'

const useGuestCallStaff = () => {
  const dispatch = useDispatch()
  const { orderId, actionLoading } = useSelector((state) => state.guestOrder)

  const [customMessage, setCustomMessage] = useState('')

  const suggestions = ['Bát đũa', 'Dọn bàn', 'Thêm nước', 'Tư vấn thực đơn']

  const handleAddSuggestion = (text) => {
    setCustomMessage((prev) => (prev ? `${prev}, ${text}` : text))
  }

  const onChangeMessage = (e) => {
    setCustomMessage(e.target.value)
  }

  const handleSubmit = useDebounceCallback(async () => {
    await dispatch(
      callStaffRequest({
        orderId,
        note: customMessage,
        callback: () => setCustomMessage(''),
      })
    )
  })

  return {
    customMessage,
    actionLoading,
    suggestions,
    handleAddSuggestion,
    onChangeMessage,
    handleSubmit,
  }
}
export default useGuestCallStaff
