import { useMemo } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import {
  addDishToOrderRequest,
  getOrderDetailRequest,
  setCart,
  setComboDish,
  setExtraDishes,
} from '@/sagas/guestOrder/guestOrderSlice'

const useGuestOrder = () => {
  const dispatch = useDispatch()
  const {
    cart,
    order,
    extraDishes,
    comboDish,
    actionLoading,
    loading,
    totalPrice,
  } = useSelector((state) => state.guestOrder)

  const updateCart = (dish, delta) => {
    const exist = cart.find((item) => item.id === dish.id)
    let newCart

    if (!exist && delta > 0) {
      newCart = [...cart, { ...dish, quantity: 1 }]
    } else if (exist) {
      const newQuantity = exist.quantity + delta
      if (newQuantity <= 0) {
        newCart = cart.filter((item) => item.id !== dish.id)
      } else {
        newCart = cart.map((item) =>
          item.id === dish.id ? { ...item, quantity: newQuantity } : item
        )
      }
    } else {
      newCart = [...cart]
    }
    dispatch(setCart(newCart))
  }

  const handleSubmitOrder = async () => {
    const dishes = cart.map((item) => ({
      dishId: item.id,
      quantity: item.quantity,
    }))

    await dispatch(
      addDishToOrderRequest({
        orderId: order?.id,
        dishes,
        callback: async () => {
          await dispatch(setCart([]))
          await dispatch(getOrderDetailRequest({ id: order?.id }))
        },
      })
    )
  }

  const handlePayment = () => {}

  const totalAmount = useMemo(() => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0)
  }, [cart])

  const handleUpdateStatusDish = ({ snapshot, newPrice }) => {
    const { id, isCombo, status } = snapshot
    if (isCombo) {
      dispatch(
        setComboDish({ newComboDish: { ...comboDish, status }, newPrice })
      )
    } else {
      const newExtraDishes = extraDishes.map((item) =>
        item.id === id ? { ...item, status } : item
      )
      dispatch(setExtraDishes({ newExtraDishes, newPrice }))
    }
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending':
        return '#faad14'
      case 'completed':
        return '#52c41a'
      case 'cancelled':
        return '#f5222d'
      default:
        return '#d9d9d9'
    }
  }

  const getStatusText = (status) => {
    switch (status) {
      case 'pending':
        return 'Đang chuẩn bị'
      case 'completed':
        return 'Hoàn thành'
      case 'cancelled':
        return 'Đã hủy'
      default:
        return 'Chờ xử lý'
    }
  }

  return {
    cart,
    order,
    extraDishes,
    comboDish,
    actionLoading,
    loading,
    totalPrice,
    updateCart,
    handleSubmitOrder,
    handlePayment,
    totalAmount,
    handleUpdateStatusDish,
    getStatusColor,
    getStatusText,
  }
}

export default useGuestOrder
