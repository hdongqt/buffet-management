import { useEffect } from 'react'
import dayjs from 'dayjs'
import {
  Col,
  Form,
  Row,
  Flex,
  Typography,
  Space,
  Tooltip,
  Popover,
  Dropdown,
} from 'antd'
import {
  DeleteOutlined,
  PlusOutlined,
  EyeOutlined,
  RetweetOutlined,
  MoreOutlined,
} from '@ant-design/icons'

import {
  ORDER_STATUS_OPTIONS,
  ORDER_STATUS_TAGS,
  ORDER_STATUS_UPDATE,
} from '@/constants/options'
import DATE_FORMAT from '@/constants/dateTimeFormat'
import { SOCKET_EVENT } from '@/constants/status'

import { useSocket } from '@/contexts/socket'

import OrderFormModal from '@/pages/privatePages/orderManagement/components/orderForm/OrderFormModal'
import OrderDetailModal from '@/pages/privatePages/orderManagement/components/detail/OrderDetailModal'
import OrderFormModalFood from '@/pages/privatePages/orderManagement/components/updateDishes/UpdateDishModal'

import {
  CustomButton,
  CustomInput,
  CustomSelect,
  CustomTag,
} from '@/components/common/ui'
import { FormItemControl, TableCustom } from '@/components/common'

import useOrderManagement from '@/hooks/useOrderManager'

import { formatCurrency, getStatusConfig } from '@/utils/format'

import { StyledText } from '@/pages/privatePages/orderManagement/styled'

const OrderManagement = () => {
  const {
    orders,
    loading,
    pagination,

    formikSearch,

    fetchOrders,
    handleChangeStatus,
    checkOrdered,
    canUpdateStatus,

    modalState,
    openModal,
    closeModal,
    detailModalState,
    openDetailModal,
    closeDetailModal,
    modalFoodState,
    openModalFood,
    closeModalFood,

    handleChangeFilter,
    handleResetFilters,
    handlePagination,
    hasFilterOrder,
  } = useOrderManagement()

  const confirmed = ORDER_STATUS_UPDATE.find((s) => s.key === 'confirmed')
  const cancelled = ORDER_STATUS_UPDATE.find((s) => s.key === 'cancelled')

  const getMenuItems = (record) => {
    if (!checkOrdered(record) && record.status !== confirmed.key) {
      return ORDER_STATUS_UPDATE.map((status) => ({
        key: status.key,
        label: <span style={{ color: status.color }}>{status.label}</span>,
        onClick: () => handleChangeStatus(record.id, status.key),
      }))
    }

    return [
      {
        key: cancelled.key,
        label: (
          <span style={{ color: cancelled.color }}>{cancelled.label}</span>
        ),
        onClick: () => handleChangeStatus(record.id, cancelled.key),
      },
    ]
  }

  const menuPropsForRecord = (record) => ({
    items: [
      { label: 'Cập nhật đơn', key: 'openModal' },
      { label: 'Cập nhật món ăn', key: 'openModalFood' },
    ],
    onClick: ({ key }) => {
      if (key === 'openModal') {
        openModal(record)
      } else if (key === 'openModalFood') {
        openModalFood(record)
      }
    },
  })

  const columns = [
    {
      title: 'Số Bàn',
      dataIndex: 'table',
      render: (val) => <StyledText>{val?.tableNumber}</StyledText>,
    },
    {
      title: 'Số người',
      dataIndex: 'numPeople',
      render: (val) => <StyledText>{val}</StyledText>,
    },
    {
      title: 'Loại combo',
      dataIndex: 'combo',
      render: (val) => <StyledText>{val?.name}</StyledText>,
    },
    {
      title: 'Tổng tiền',
      dataIndex: 'totalPrice',
      render: (val) => formatCurrency(val),
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      render: (val) => {
        const { color, label } = getStatusConfig(val, ORDER_STATUS_TAGS)
        return <CustomTag color={color}>{label}</CustomTag>
      },
    },
    {
      title: 'Ngày tạo',
      dataIndex: 'createdAt',
      render: (val) =>
        val ? (
          dayjs(val).format(DATE_FORMAT.DATE_TIME)
        ) : (
          <Typography.Text type='secondary'>-</Typography.Text>
        ),
    },

    {
      title: 'Hành động',
      fixed: 'right',
      render: (_, record) => {
        return (
          <Space>
            <Tooltip title='Xem chi tiết'>
              <CustomButton
                icon={<EyeOutlined />}
                onClick={() => openDetailModal(record)}
              />
            </Tooltip>

            {canUpdateStatus(record) && (
              <Tooltip title='Cập nhật trạng thái'>
                <Dropdown
                  menu={{ items: getMenuItems(record) }}
                  trigger={['click']}
                  placement='bottomRight'
                >
                  <CustomButton icon={<RetweetOutlined />} />
                </Dropdown>
              </Tooltip>
            )}

            {record.status === confirmed.key && (
              <Dropdown
                menu={menuPropsForRecord(record)}
                placement='bottomRight'
              >
                <CustomButton icon={<MoreOutlined />} />
              </Dropdown>
            )}
          </Space>
        )
      },
    },
  ]

  const socket = useSocket()

  useEffect(() => {
    fetchOrders()
  }, [])

  useEffect(() => {
    if (!socket) return

    socket.on(SOCKET_EVENT.NEW_NOTIFICATION, fetchOrders)
  }, [socket])

  return (
    <div>
      <Form onFinish={formikSearch.handleSubmit} layout='vertical'>
        <Row gutter={16} align='middle'>
          <Col xs={24} md={12} lg={18}>
            <Row gutter={16}>
              <Col xs={24} md={12} lg={10}>
                <FormItemControl
                  label='Bàn'
                  name='tableNumber'
                  formik={formikSearch}
                >
                  <CustomInput
                    placeholder='Nhập số bàn...'
                    value={formikSearch.values.tableNumber}
                    onChange={(e) =>
                      handleChangeFilter('tableNumber', e.target.value)
                    }
                  />
                </FormItemControl>
              </Col>
              <Col xs={24} md={12} lg={6}>
                <FormItemControl
                  label='Trạng thái'
                  name='status'
                  formik={formikSearch}
                >
                  <CustomSelect
                    options={ORDER_STATUS_OPTIONS}
                    value={formikSearch.values.status}
                    onChange={(val) => handleChangeFilter('status', val)}
                    placeholder='Chọn trạng thái'
                    allowClear
                  />
                </FormItemControl>
              </Col>
            </Row>
          </Col>
          <Col xs={24} md={12} lg={6}>
            <Flex justify='end' gap={8}>
              {hasFilterOrder && (
                <CustomButton
                  onClick={handleResetFilters}
                  icon={<DeleteOutlined />}
                  size='large'
                >
                  Xóa bộ lọc
                </CustomButton>
              )}
              <CustomButton
                type='primary'
                icon={<PlusOutlined />}
                onClick={() => openModal()}
                size='large'
              >
                Thêm
              </CustomButton>
            </Flex>
          </Col>
        </Row>
      </Form>

      <TableCustom
        columns={columns}
        dataSource={orders || []}
        loading={loading}
        pagination={pagination}
        onPaginationChange={handlePagination}
      />

      <OrderFormModal
        open={modalState.open}
        onClose={closeModal}
        initialValues={modalState.record}
      />

      <OrderDetailModal
        open={detailModalState.open}
        onClose={closeDetailModal}
        orderData={detailModalState.record}
      />

      <OrderFormModalFood
        open={modalFoodState.open}
        onClose={closeModalFood}
        foodData={modalFoodState.record}
      />
    </div>
  )
}

export default OrderManagement

