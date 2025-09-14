import React from 'react'
import dayjs from 'dayjs'
import { Grid, Descriptions, Table, Tooltip } from 'antd'
import {
  CheckCircleOutlined,
  DollarOutlined,
  UserOutlined,
} from '@ant-design/icons'

import DATE_FORMAT from '@/constants/dateTimeFormat'
import { ORDER_STATUS_TAGS } from '@/constants/options'

import { CustomTag } from '@/components/common/ui'

import { getWidthCard } from '@/utils/getWidthCard'
import { formatCurrency, getStatusConfig } from '@/utils/format'

import { StyledModal, StyledText, StyledStatus, Dish } from './styled'

const { useBreakpoint } = Grid

const OrderDetailModal = ({ open, onClose, orderData }) => {
  const screens = useBreakpoint()
  const widthCard = getWidthCard(screens, 'modal')

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
      title={
        <StyledModal.Title align='center' gap={8}>
          <StyledModal.Title level={4}>Chi tiết đơn hàng</StyledModal.Title>
        </StyledModal.Title>
      }
      open={open}
      onCancel={onClose}
      footer={null}
      width={widthCard}
    >
      <StyledModal.Content vertical>
        <StyledStatus.Container>
          <StyledStatus.Title strong>
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
