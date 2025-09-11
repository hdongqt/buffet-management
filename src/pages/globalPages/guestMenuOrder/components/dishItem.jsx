import { useSelector, useDispatch } from 'react-redux'
import { Button, Image, Card, Flex } from 'antd'
import { MinusOutlined, PlusOutlined } from '@ant-design/icons'

import { setCart } from '@/sagas/guestOrder/guestOrderSlice'

import { formatCurrency } from '@/utils/format'
import { FALLBACK_IMAGES } from '@/constants/images/fallbackImage'
import { DishItemStyles } from '../styled'

const DishItem = ({ dish, isDishOfCombo }) => {
  const dispatch = useDispatch()

  const { cart } = useSelector((state) => state.guestOrder)

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

  return (
    <DishItemStyles.MenuItemCard key={dish.id}>
      <DishItemStyles.StyledImageWrapper>
        <Image
          src={dish.imageUrl || FALLBACK_IMAGES.noImage}
          alt={dish.name}
          preview={{
            mask: 'Xem ảnh',
          }}
        />
      </DishItemStyles.StyledImageWrapper>
      <DishItemStyles.ItemContent>
        <DishItemStyles.ItemName>{dish.name}</DishItemStyles.ItemName>
        <DishItemStyles.ItemDescription>
          {dish.description}
        </DishItemStyles.ItemDescription>
        <DishItemStyles.ItemFooter>
          {isDishOfCombo ? (
            <Flex gap={8}>
              <DishItemStyles.ItemPrice $oldPrice>
                {formatCurrency(dish.price)}
              </DishItemStyles.ItemPrice>
              <DishItemStyles.ItemPrice>0đ</DishItemStyles.ItemPrice>
            </Flex>
          ) : (
            <DishItemStyles.ItemPrice>
              {formatCurrency(dish.price)}
            </DishItemStyles.ItemPrice>
          )}
          <Flex gap={10} align='center'>
            {dish?.quantity > 0 && (
              <>
                <Button
                  type='primary'
                  shape='circle'
                  size='small'
                  danger
                  icon={<MinusOutlined />}
                  onClick={() => updateCart(dish, -1)}
                />
                <Quantity level={5}>{dish?.quantity}</Quantity>
              </>
            )}
            <Button
              type='primary'
              shape='circle'
              danger
              disabled={dish?.quantity >= 10}
              size='small'
              icon={<PlusOutlined />}
              onClick={() => updateCart(dish, +1)}
            />
          </Flex>
        </DishItemStyles.ItemFooter>
      </DishItemStyles.ItemContent>
    </DishItemStyles.MenuItemCard>
  )
}

export default DishItem
