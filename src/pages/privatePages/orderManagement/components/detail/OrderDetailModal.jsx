import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import dayjs from 'dayjs'
import {
  Grid,
  Descriptions,
  Table,
  Tooltip,
  Button,
  Card,
  Segmented,
  Popconfirm,
  Space,
  Image,
  Flex,
} from 'antd'
import {
  CheckCircleOutlined,
  DollarOutlined,
  UserOutlined,
  BankOutlined,
  MoneyCollectOutlined,
} from '@ant-design/icons'

import DATE_FORMAT from '@/constants/dateTimeFormat'
import { ORDER_STATUS_TAGS, PAYMENT_STATUS_TAGS } from '@/constants/options'

import { getPaymentRequest } from '@/sagas/orderManager/orderManagerSlice'

import { CustomTag } from '@/components/common/ui'

import useOrderPayment from '@/hooks/useOrderPayment'

import { getWidthCard } from '@/utils/getWidthCard'
import { formatCurrency, getStatusConfig } from '@/utils/format'

import {
  StyledModal,
  StyledText,
  StyledStatus,
  Dish,
  StyledSpace,
} from './styled'

const { useBreakpoint } = Grid

const OrderDetailModal = ({ open, onClose, orderData }) => {
  const screens = useBreakpoint()
  const widthCard = getWidthCard(screens, 'modal')

  const dispatch = useDispatch()
  const { payment, handleChangeMethod, confirmPayment } = useOrderPayment()

  useEffect(() => {
    if (orderData) {
      dispatch(getPaymentRequest({ id: orderData?.id }))
    }
  }, [orderData?.id])

  if (!orderData) return null

  const { color, label } = getStatusConfig(orderData.status, ORDER_STATUS_TAGS)

  const columns = [
    {
      title: 'Tên món',
      dataIndex: 'name',
      key: 'name',
      render: (text) => (
        <Tooltip title={text}>
          <span>{text}</span>
        </Tooltip>
      ),
    },
    {
      title: 'Giá',
      dataIndex: 'price',
      key: 'price',
      render: (price) => formatCurrency(price),
    },
    {
      title: 'Số lượng',
      dataIndex: 'quantity',
      key: 'quantity',
      render: (qty) => <span>{qty}</span>,
    },
    {
      title: 'Tổng',
      key: 'total',
      render: (_, record) => formatCurrency(record.price * record.quantity),
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      key: 'status',
      render: (val) => {
        const { color, label } = getStatusConfig(val, ORDER_STATUS_TAGS)
        return <CustomTag color={color}>{label}</CustomTag>
      },
    },
  ]

  return (
    <StyledModal.Wrap
      title={<StyledModal.Title level={4}>Chi tiết đơn hàng</StyledModal.Title>}
      open={open}
      onCancel={onClose}
      footer={null}
      width={widthCard}
    >
      <StyledModal.Content vertical>
        <StyledStatus.Container>
          <StyledStatus.Title>
            <CheckCircleOutlined />
            Trạng thái đơn hàng:
          </StyledStatus.Title>
          <StyledStatus.TagContainer>
            <CustomTag color={color}>{label}</CustomTag>
          </StyledStatus.TagContainer>
        </StyledStatus.Container>

        <Descriptions bordered size='small' column={screens?.md ? 2 : 1}>
          <Descriptions.Item label='Mã đơn hàng' span={1}>
            <StyledText.Monospace>{orderData.id || '-'}</StyledText.Monospace>
          </Descriptions.Item>
          <Descriptions.Item label='Số người'>
            <StyledText.Description>
              <UserOutlined />
              {orderData.numPeople || '-'} người
            </StyledText.Description>
          </Descriptions.Item>
          <Descriptions.Item label='Số bàn'>
            <StyledText.Description>
              {orderData.table?.tableNumber || '-'}
            </StyledText.Description>
          </Descriptions.Item>
          <Descriptions.Item label='Sức chứa'>
            <StyledText.Description>
              {orderData.table?.capacity || '-'} người
            </StyledText.Description>
          </Descriptions.Item>
          <Descriptions.Item label='Combo'>
            <StyledText.Description>
              {orderData.combo?.name || '-'}
            </StyledText.Description>
          </Descriptions.Item>
          <Descriptions.Item label='Giá combo'>
            <StyledText.Description>
              <DollarOutlined />
              {formatCurrency(orderData?.combo?.price || 0)}
            </StyledText.Description>
          </Descriptions.Item>
          <Descriptions.Item label='Tổng tiền' span={2}>
            <StyledText.Strong>
              {formatCurrency(orderData.totalPrice || 0)}
            </StyledText.Strong>
          </Descriptions.Item>
          <Descriptions.Item label='Ngày tạo'>
            <StyledText.Description>
              {orderData.createdAt
                ? dayjs(orderData.createdAt).format(DATE_FORMAT.DATE_TIME)
                : '-'}
            </StyledText.Description>
          </Descriptions.Item>
          <Descriptions.Item label='Cập nhật lần cuối'>
            <StyledText.Description>
              {orderData.updatedAt
                ? dayjs(orderData.updatedAt).format(DATE_FORMAT.DATE_TIME)
                : '-'}
            </StyledText.Description>
          </Descriptions.Item>
          {orderData.comment && (
            <Descriptions.Item label='Ghi chú' span={2}>
              <StyledText.Description>
                {orderData.comment}
              </StyledText.Description>
            </Descriptions.Item>
          )}
        </Descriptions>

        <Card
          size='small'
          title={
            <StyledStatus.Title>
              <CheckCircleOutlined />
              Thanh toán
            </StyledStatus.Title>
          }
          extra={
            payment &&
            payment.status === 'pending' && (
              <Space>
                <Popconfirm
                  title='Xác nhận thanh toán'
                  description='Bạn chắc chắn muốn xác nhận đơn hàng này đã thanh toán?'
                  okText='Xác nhận'
                  cancelText='Hủy'
                  onConfirm={() => confirmPayment(payment.id)}
                >
                  <Button variant='solid' color='green'>
                    Xác nhận đã thanh toán
                  </Button>
                </Popconfirm>
              </Space>
            )
          }
        >
          {(!payment || payment.status === 'pending') && (
            <StyledSpace direction='vertical' size={8}>
              <div style={{ fontWeight: 500 }}>Chọn phương thức thanh toán</div>
              <Segmented
                block
                value={payment?.method || null}
                onChange={(val) => handleChangeMethod(orderData.id, val)}
                options={[
                  {
                    label: (
                      <Space size={6}>
                        <MoneyCollectOutlined />
                        Tiền mặt
                      </Space>
                    ),
                    value: 'cash',
                  },
                  {
                    label: (
                      <Space size={6}>
                        <BankOutlined />
                        Chuyển khoản
                      </Space>
                    ),
                    value: 'banking',
                  },
                ]}
              />
              <Flex align='center' justify='space-between' vertical>
                {payment && payment.method === 'banking' && (
                  <Image
                    src={payment.qrUrl}
                    alt='qr'
                    width={400}
                    height={400}
                    preview={false}
                  />
                )}
              </Flex>
            </StyledSpace>
          )}

          {payment && (
            <StyledSpace direction='vertical'>
              <Descriptions bordered size='small' column={screens?.md ? 2 : 1}>
                <Descriptions.Item label='Phương thức'>
                  {payment.method === 'cash' ? (
                    <Space size={6}>
                      <MoneyCollectOutlined />
                      Tiền mặt
                    </Space>
                  ) : (
                    <Space size={6}>
                      <BankOutlined />
                      Chuyển khoản
                    </Space>
                  )}
                </Descriptions.Item>
                <Descriptions.Item label='Số tiền'>
                  <StyledText.Strong>
                    {formatCurrency(payment.amount)}
                  </StyledText.Strong>
                </Descriptions.Item>
                <Descriptions.Item label='Trạng thái' span={2}>
                  <CustomTag
                    style={{ marginTop: 0 }}
                    color={
                      getStatusConfig(payment.status, PAYMENT_STATUS_TAGS).color
                    }
                  >
                    {getStatusConfig(payment.status, PAYMENT_STATUS_TAGS).label}
                  </CustomTag>
                </Descriptions.Item>
                <Descriptions.Item label='Ngày tạo'>
                  {payment.createdAt
                    ? dayjs(payment.createdAt).format(DATE_FORMAT.DATE_TIME)
                    : '-'}
                </Descriptions.Item>
                <Descriptions.Item label='Cập nhật'>
                  {payment.updatedAt
                    ? dayjs(payment.updatedAt).format(DATE_FORMAT.DATE_TIME)
                    : '-'}
                </Descriptions.Item>
              </Descriptions>
            </StyledSpace>
          )}
        </Card>

        {orderData.normalDishes?.length > 0 && (
          <>
            <StyledText.Block>
              {`Tổng số món đã đặt (${orderData.normalDishes?.length || 0})`}
            </StyledText.Block>

            <Dish.Container>
              <Table
                columns={columns}
                dataSource={orderData.normalDishes}
                bordered
                pagination={false}
              />
              {(() => {
                const dishes = orderData.normalDishes
                const subtotal =
                  dishes?.reduce((sum, d) => {
                    const q = d?.quantity ?? 1
                    const p = d?.price || 0
                    return sum + q * p
                  }, 0) || 0
                return (
                  <Dish.Footer>
                    <span>Tạm tính</span>
                    <Dish.Price $strong>{formatCurrency(subtotal)}</Dish.Price>
                  </Dish.Footer>
                )
              })()}
            </Dish.Container>
          </>
        )}
      </StyledModal.Content>
    </StyledModal.Wrap>
  )
}

export default OrderDetailModal
