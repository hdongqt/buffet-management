import { useMemo } from 'react'
import { useSelector } from 'react-redux'
import { Spin } from 'antd'

import DishItem from './dishItem'

import { MenuGrid } from '../styled'

const ComboMenu = () => {
  const {
    order,
    cart,
    loading: loadingOrder,
  } = useSelector((state) => state.guestOrder)
  const { loadingDishes } = useSelector((state) => state.guestDish)

  const dishComboHandler = useMemo(() => {
    const listComboDish = order?.combo?.listDish || []
    return listComboDish.map((item) => {
      const cartItem = cart.find((cartItem) => cartItem.id === item.id)
      const quantity = cartItem ? cartItem.quantity : 0

      return {
        ...item,
        quantity,
      }
    })
  }, [order, cart])

  return (
    <Spin size='large' spinning={loadingOrder && loadingDishes}>
      <MenuGrid>
        {dishComboHandler &&
          dishComboHandler.map((dish) => (
            <DishItem
              dish={dish}
              key={`dishCombo${dish.id}`}
              isDishOfCombo={true}
            />
          ))}
      </MenuGrid>
    </Spin>
  )
}

export default ComboMenu
