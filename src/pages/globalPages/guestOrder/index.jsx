import React, { useEffect } from 'react'
import { Button, Typography, Divider, Empty, Image, Flex, Spin } from 'antd'
import {
  MinusOutlined,
  PlusOutlined,
  ShoppingCartOutlined,
  CreditCardOutlined,
} from '@ant-design/icons'

import { FALLBACK_IMAGES } from '@/constants/images/fallbackImage'

import { useSocket } from '@/contexts/socket'
import useGuestOrder from '@/hooks/useGuestOrder'

import { formatCurrency } from '@/utils/format'

import { GuestOrderStyles } from './styled'

const { Title } = Typography

const OrdersPage = () => {
  const socket = useSocket()

  const {
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
  } = useGuestOrder()

  useEffect(() => {
    if (!order?.id || !socket) return

    socket.emit('join_order', order.id)
  }, [order?.id, socket])

  const totalCartItem = cart.reduce((total, item) => total + item.quantity, 0)

  // Listen ORDER_CONFIRMED
  useEffect(() => {
    if (!socket) return

    socket.on('DISH_STATUS_UPDATED', ({ snapshot, isNewPrice, newPrice }) => {
      if (snapshot) {
        handleUpdateStatusDish({ snapshot, isNewPrice, newPrice })
      }
    })

    return () => {
      socket.off('DISH_STATUS_UPDATED')
    }
  }, [socket])

  return (
    <Spin spinning={loading}>
      <GuestOrderStyles.OrderContainer>
        <GuestOrderStyles.CartSection>
          <Title level={3}>
            <ShoppingCartOutlined /> Giỏ hàng ({totalCartItem})
          </Title>

          {cart.length === 0 ? (
            <Empty
              description='Giỏ hàng trống'
              image={Empty.PRESENTED_IMAGE_SIMPLE}
            />
          ) : (
            <GuestOrderStyles.CartItems>
              {cart.map((item) => (
                <GuestOrderStyles.CartItem key={item.id}>
                  <GuestOrderStyles.ItemImage>
                    <Image
                      src={item.imageUrl || FALLBACK_IMAGES.noImage}
                      alt={item.name}
                      preview={false}
                    />
                  </GuestOrderStyles.ItemImage>

                  <GuestOrderStyles.ItemInfo>
                    <GuestOrderStyles.ItemName>
                      {item.name}
                    </GuestOrderStyles.ItemName>
                    {item.category && (
                      <GuestOrderStyles.ItemCategory>
                        {item.category.name}
                      </GuestOrderStyles.ItemCategory>
                    )}
                    <GuestOrderStyles.ItemPrice>
                      {formatCurrency(item.price)}
                    </GuestOrderStyles.ItemPrice>
                  </GuestOrderStyles.ItemInfo>

                  <GuestOrderStyles.ItemActions>
                    <GuestOrderStyles.QuantityControls>
                      <Button
                        type='primary'
                        shape='circle'
                        size='small'
                        danger
                        icon={<MinusOutlined />}
                        onClick={() => updateCart(item, -1)}
                      />
                      <GuestOrderStyles.QuantityText>
                        {item?.quantity}
                      </GuestOrderStyles.QuantityText>
                      <Button
                        type='primary'
                        shape='circle'
                        size='small'
                        danger
                        disabled={item?.quantity >= 10}
                        icon={<PlusOutlined />}
                        onClick={() => updateCart(item, 1)}
                      />
                    </GuestOrderStyles.QuantityControls>
                  </GuestOrderStyles.ItemActions>
                </GuestOrderStyles.CartItem>
              ))}
            </GuestOrderStyles.CartItems>
          )}

          {cart.length > 0 && (
            <GuestOrderStyles.CartSummary>
              <Divider />
              <Flex justify='space-between' align='center'>
                <Title level={4}>Tổng cộng:</Title>
                <GuestOrderStyles.TotalAmount>
                  {formatCurrency(totalAmount)}
                </GuestOrderStyles.TotalAmount>
              </Flex>
              <Button
                type='primary'
                size='large'
                block
                onClick={handleSubmitOrder}
                loading={actionLoading}
              >
                Đặt món
              </Button>
            </GuestOrderStyles.CartSummary>
          )}
        </GuestOrderStyles.CartSection>

        {/* Ordered Items Section */}
        <GuestOrderStyles.OrderedSection>
          {!order ? (
            <Empty
              description='Chưa có món nào được đặt'
              image={Empty.PRESENTED_IMAGE_SIMPLE}
            />
          ) : (
            <>
              {comboDish && (
                <>
                  <Title level={4} style={{ marginTop: 24, marginBottom: 16 }}>
                    Menu combo đã gọi
                  </Title>
                  <GuestOrderStyles.OrderedItems>
                    <GuestOrderStyles.ComboItem key={order.combo.id}>
                      <GuestOrderStyles.ComboHeader>
                        <GuestOrderStyles.ItemImage>
                          <Image
                            src={
                              order.combo.imageUrl || FALLBACK_IMAGES.noImage
                            }
                            alt={order.combo.name}
                            preview={false}
                          />
                        </GuestOrderStyles.ItemImage>

                        <GuestOrderStyles.ItemInfo>
                          <GuestOrderStyles.ItemName>
                            {order.combo.name}
                          </GuestOrderStyles.ItemName>
                          <GuestOrderStyles.ItemPrice>
                            {formatCurrency(order.combo.price)}
                          </GuestOrderStyles.ItemPrice>
                          <GuestOrderStyles.ItemQuantity>
                            x{order.numPeople} người
                          </GuestOrderStyles.ItemQuantity>
                        </GuestOrderStyles.ItemInfo>

                        <GuestOrderStyles.ItemStatus>
                          <GuestOrderStyles.StatusBadge
                            color={getStatusColor(comboDish.status)}
                          >
                            {getStatusText(comboDish.status)}
                          </GuestOrderStyles.StatusBadge>
                          <GuestOrderStyles.OrderTime>
                            {new Date(order.combo.createdAt).toLocaleString(
                              'vi-VN'
                            )}
                          </GuestOrderStyles.OrderTime>
                        </GuestOrderStyles.ItemStatus>
                      </GuestOrderStyles.ComboHeader>

                      <GuestOrderStyles.ComboDishes>
                        <GuestOrderStyles.ComboDishesTitle>
                          Bao gồm:
                        </GuestOrderStyles.ComboDishesTitle>
                        {comboDish.listDish?.map((dish) => (
                          <GuestOrderStyles.ComboDishItem key={dish.id}>
                            <GuestOrderStyles.ComboDishImage>
                              <Image
                                src={dish.imageUrl || FALLBACK_IMAGES.noImage}
                                alt={dish.name}
                                preview={false}
                              />
                            </GuestOrderStyles.ComboDishImage>
                            <GuestOrderStyles.ComboDishInfo>
                              <GuestOrderStyles.ComboDishName>
                                {dish.name}
                              </GuestOrderStyles.ComboDishName>
                              {dish.category && (
                                <GuestOrderStyles.ItemCategory>
                                  {dish.category.name}
                                </GuestOrderStyles.ItemCategory>
                              )}
                            </GuestOrderStyles.ComboDishInfo>
                          </GuestOrderStyles.ComboDishItem>
                        ))}
                      </GuestOrderStyles.ComboDishes>
                    </GuestOrderStyles.ComboItem>
                  </GuestOrderStyles.OrderedItems>
                </>
              )}

              {/* Extra Items Section */}
              {extraDishes?.length > 0 && (
                <>
                  <Title level={4} style={{ marginTop: 24, marginBottom: 16 }}>
                    Món gọi thêm
                  </Title>
                  <GuestOrderStyles.OrderedItems>
                    {extraDishes.map((item) => (
                      <GuestOrderStyles.OrderedItem key={item.id}>
                        <GuestOrderStyles.ItemImage>
                          <Image
                            src={item.imageUrl || FALLBACK_IMAGES.noImage}
                            alt={item.name}
                            preview={false}
                          />
                        </GuestOrderStyles.ItemImage>

                        <GuestOrderStyles.ItemInfo>
                          <GuestOrderStyles.ItemName>
                            {item.name}
                          </GuestOrderStyles.ItemName>
                          {item.category && (
                            <GuestOrderStyles.ItemCategory>
                              {item.category.name}
                            </GuestOrderStyles.ItemCategory>
                          )}
                          <GuestOrderStyles.ItemPrice>
                            {formatCurrency(item.price)}
                          </GuestOrderStyles.ItemPrice>
                          <GuestOrderStyles.ItemQuantity>
                            x{item.quantity}
                          </GuestOrderStyles.ItemQuantity>
                        </GuestOrderStyles.ItemInfo>

                        <GuestOrderStyles.ItemStatus>
                          <GuestOrderStyles.StatusBadge
                            color={getStatusColor(item.status)}
                          >
                            {getStatusText(item.status)}
                          </GuestOrderStyles.StatusBadge>
                          <GuestOrderStyles.OrderTime>
                            {new Date(item.createdAt).toLocaleString('vi-VN')}
                          </GuestOrderStyles.OrderTime>
                        </GuestOrderStyles.ItemStatus>
                      </GuestOrderStyles.OrderedItem>
                    ))}
                  </GuestOrderStyles.OrderedItems>
                </>
              )}
            </>
          )}
          {order && (
            <div
              style={{
                background: '#f0f8ff',
                padding: '16px',
                borderRadius: '8px',
                marginTop: '20px',
                border: '1px solid #d6e4ff',
              }}
            >
              <Flex
                justify='space-between'
                align='center'
                style={{ marginBottom: '16px' }}
              >
                <Title level={4} style={{ margin: 0, color: '#1890ff' }}>
                  Tổng tiền:
                </Title>
                <Title level={3} style={{ margin: 0, color: '#1890ff' }}>
                  {formatCurrency(totalPrice)}
                </Title>
              </Flex>
              <Button
                type='primary'
                size='large'
                block
                icon={<CreditCardOutlined />}
                onClick={handlePayment}
                style={{
                  background: '#52c41a',
                  borderColor: '#52c41a',
                  height: '48px',
                  fontSize: '16px',
                  fontWeight: 'bold',
                }}
              >
                Yêu cầu thanh toán
              </Button>
            </div>
          )}
        </GuestOrderStyles.OrderedSection>
      </GuestOrderStyles.OrderContainer>
    </Spin>
  )
}

export default OrdersPage
