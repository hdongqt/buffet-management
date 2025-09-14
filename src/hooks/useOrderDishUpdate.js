import { addDishToOrderRequest } from '@/sagas/guestOrder/guestOrderSlice'
import {
  getOrderRequest,
  setCartOrder,
} from '@/sagas/orderManager/orderManagerSlice'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'

const useOrderDishUpdate = (onClose) => {
  const dispatch = useDispatch()

  const { order } = useSelector((state) => state.orderManager)

  const handleAddDishes = ({ orderId, cart }) => {
    const dishes = cart.map((item) => ({
      dishId: item.id,
      quantity: item.quantity,
    }))

    dispatch(
      addDishToOrderRequest({ orderId, dishes, callback: commonCallback })
    )
  }
  const [newCart, setNewCart] = useState([])

  const commonCallback = async () => {
    await dispatch(getOrderRequest({ id: order?.id }))
    dispatch(setCartOrder([]))
    setNewCart([])
    onClose()
  }

  const addToCart = (item) => {
    setNewCart((prev) => {
      const found = prev.find((p) => p.id === item.id)
      if (found) {
        return prev.map((p) =>
          p.id === item.id ? { ...p, quantity: p.quantity + 1 } : p
        )
      }
      return [...prev, { ...item, quantity: 1, note: '' }]
    })
  }

  const updateQty = (id, qty) => {
    setNewCart((prev) =>
      prev.map((p) => (p.id === id ? { ...p, quantity: qty || 1 } : p))
    )
  }

  const removeFromCart = (id) =>
    setNewCart((prev) => prev.filter((p) => p.id !== id))

  // const total = useMemo(
  //   () => newCart.reduce((s, it) => s + it.price * it.quantity, 0),
  //   [newCart]
  // )

  useEffect(() => {
    dispatch(setCartOrder(newCart))
  }, [newCart])

  return {
    handleAddDishes,
    newCart,
    setNewCart,
    addToCart,
    removeFromCart,
    updateQty,
  }
}

export default useOrderDishUpdate
