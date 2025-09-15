import React from 'react'
import { Button, Typography, Divider, Empty, Image, Flex, Spin } from 'antd'
import {
  MinusOutlined,
  PlusOutlined,
  ShoppingCartOutlined,
  CreditCardOutlined,
} from '@ant-design/icons'

import { FALLBACK_IMAGES } from '@/constants/images/fallbackImage'
import DATE_FORMAT from '@/constants/dateTimeFormat'

import useGuestOrder from '@/hooks/useGuestOrder'

import { formatCurrency } from '@/utils/format'

import { GuestOrderStyles } from './styled'
import { CustomButton } from '@/components/common/ui'
import dayjs from 'dayjs'

const { Title } = Typography

const OrdersPage = () => {
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
    handleRequestPayment,
    totalAmount,
    getStatusColor,
    getStatusText,
  } = useGuestOrder()

  const totalCartItem = cart.reduce((total, item) => total + item.quantity, 0)

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
                      <GuestOrderStyles.ComboHeaderContainer>
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
                        </GuestOrderStyles.ComboHeader>

                        <GuestOrderStyles.ItemStatus>
                          <GuestOrderStyles.OrderTime>
                            {order.combo.createdAt &&
                              dayjs(order.combo.createdAt).format(
                                DATE_FORMAT.DATE_TIME
                              )}
                          </GuestOrderStyles.OrderTime>
                        </GuestOrderStyles.ItemStatus>
                      </GuestOrderStyles.ComboHeaderContainer>

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
                  <GuestOrderStyles.SummaryExtraTitle level={4}>
                    Món gọi thêm
                  </GuestOrderStyles.SummaryExtraTitle>
                  <GuestOrderStyles.OrderedItems>
                    {extraDishes.map((item) => (
                      <GuestOrderStyles.OrderedItem key={item.id}>
                        <Flex justify='space-between' align='center'>
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
                        </Flex>

                        <GuestOrderStyles.ItemStatus>
                          <GuestOrderStyles.OrderTime>
                            {item?.createdAt &&
                              dayjs(item.createdAt).format(
                                DATE_FORMAT.DATE_TIME
                              )}
                          </GuestOrderStyles.OrderTime>
                          <GuestOrderStyles.StatusBadge
                            color={getStatusColor(item.status)}
                          >
                            {getStatusText(item.status)}
                          </GuestOrderStyles.StatusBadge>
                        </GuestOrderStyles.ItemStatus>
                      </GuestOrderStyles.OrderedItem>
                    ))}
                  </GuestOrderStyles.OrderedItems>
                </>
              )}
            </>
          )}
          {order && (
            <GuestOrderStyles.OrderSummary>
              <GuestOrderStyles.SummaryHeader>
                <GuestOrderStyles.SummaryTitle level={4}>
                  Tổng tiền:
                </GuestOrderStyles.SummaryTitle>
                <GuestOrderStyles.SummaryTitle level={3}>
                  {formatCurrency(totalPrice)}
                </GuestOrderStyles.SummaryTitle>
              </GuestOrderStyles.SummaryHeader>
              <CustomButton
                type='primary'
                size='large'
                block
                color='green'
                variant='solid'
                loading={actionLoading}
                icon={<CreditCardOutlined />}
                onClick={handleRequestPayment}
              >
                Yêu cầu thanh toán
              </CustomButton>
            </GuestOrderStyles.OrderSummary>
          )}
        </GuestOrderStyles.OrderedSection>
      </GuestOrderStyles.OrderContainer>
    </Spin>
  )
}

export default OrdersPage
