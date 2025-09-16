import React, { useEffect, useMemo, useState } from 'react'
import { useDispatch } from 'react-redux'
import {
  Modal,
  Grid,
  Flex,
  Typography,
  Space,
  Button,
  Popconfirm,
  Empty,
  Tooltip,
  Input,
  Spin,
} from 'antd'
import { PlusOutlined } from '@ant-design/icons'

import { DISH_STATUS_OPTIONS, DISH_STATUS_TAGS } from '@/constants/options'

import {
  getOrderRequest,
  setCartOrder,
} from '@/sagas/orderManager/orderManagerSlice'

import AddDishesModal from '../addDishes/AddDishModal'
import { TableCustom } from '@/components/common'
import { CustomTag } from '@/components/common/ui'

import { useMenuManagement, useOrderManagement } from '@/hooks'
import useOrderDishes from '@/hooks/useOrderDish'

import { getWidthCard } from '@/utils/getWidthCard'
import { formatCurrency, getStatusConfig } from '@/utils/format'

import {
  StyledDivider,
  StyledSelect,
} from '@/pages/privatePages/orderManagement/components/updateDishes/styled'
import useCategoriesManagement from '@/hooks/useCategories'

const { useBreakpoint } = Grid

const OrderFormModalFood = ({ open, onClose, foodData }) => {
  const screens = useBreakpoint()
  const widthCard = getWidthCard(screens, 'modal')

  const dispatch = useDispatch()

  const { actionLoading, pagination, handlePagination } = useOrderManagement()
  const { fetchMenus } = useMenuManagement()
  const { fetchCategories } = useCategoriesManagement()

  const {
    searchValue,
    setSearchValue,
    filterStatus,
    setFilterStatus,
    addModalOpen,
    openAddModal,
    closeAddModal,
    dataFiltered,
    updateRowStatus,
  } = useOrderDishes()

  useEffect(() => {
    if (open) {
      setFilterStatus()
      fetchCategories({ page: 1, limit: -1 })
      fetchMenus({ page: 1, limit: -1, isCombo: false })
      dispatch(getOrderRequest({ id: foodData?.id }))
      dispatch(setCartOrder([]))
    }
  }, [open])

  const columns = [
    {
      title: 'Món',
      dataIndex: 'name',
      key: 'name',
      width: 150,
      render: (text) => (
        <Tooltip title={text}>
          <Typography.Text strong ellipsis>
            {text}
          </Typography.Text>
        </Tooltip>
      ),
      ellipsis: true,
    },
    {
      title: 'SL',
      dataIndex: 'quantity',
      key: 'quantity',
      align: 'center',
      render: (val) => <Typography.Text>{val}</Typography.Text>,
    },
    {
      title: 'Giá',
      dataIndex: 'price',
      key: 'price',
      align: 'center',
      render: (val) => <Typography.Text>{formatCurrency(val)}</Typography.Text>,
    },
    {
      title: 'Trang thái',
      dataIndex: 'status',
      key: 'status',
      align: 'center',
      render: (val) => {
        const { color, label } = getStatusConfig(val, DISH_STATUS_TAGS)
        return <CustomTag color={color}>{label}</CustomTag>
      },
    },
    {
      title: 'Hành động',
      key: 'actions',
      align: 'center',
      render: (_, record) => {
        return record.status === 'pending' ? (
          <Space wrap>
            <Tooltip title='Xác nhận lên món'>
              <Button
                size='small'
                type='primary'
                onClick={() => updateRowStatus(record.id, 'completed')}
              >
                Phục vụ
              </Button>
            </Tooltip>
            <Popconfirm
              title='Xác nhận hủy món này?'
              okText='Xác nhận'
              cancelText='Hủy'
              onConfirm={() => updateRowStatus(record.id, 'cancelled')}
            >
              <Tooltip title='Hủy món này'>
                <Button size='small' danger>
                  Hủy
                </Button>
              </Tooltip>
            </Popconfirm>
          </Space>
        ) : null
      },
    },
  ]

  return (
    <>
      <Modal
        open={open}
        onCancel={onClose}
        title={
          <Flex align='center' gap={8}>
            <Typography.Title level={4}>Cập nhật món đã đặt</Typography.Title>
          </Flex>
        }
        footer={
          <Flex justify='space-between' align='center'>
            <Space>
              <Button icon={<PlusOutlined />} onClick={openAddModal}>
                Thêm món
              </Button>
            </Space>
            <Space>
              <Button onClick={onClose}>Đóng</Button>
            </Space>
          </Flex>
        }
        width={widthCard}
      >
        <Flex vertical gap={12}>
          <Flex wrap='wrap' gap={8} align='middle' justify='start'>
            <Flex vertical>
              <Typography.Text strong> Tìm kiếm:</Typography.Text>
              <Input
                placeholder='Tìm kiếm'
                name='search'
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                allowClear
              />
            </Flex>
            <Flex vertical>
              <Typography.Text strong> Trạng thái:</Typography.Text>
              <StyledSelect
                allowClear
                placeholder='Tất cả'
                value={filterStatus}
                onChange={setFilterStatus}
                options={DISH_STATUS_OPTIONS}
              />
            </Flex>
          </Flex>
          <StyledDivider />
          <Spin spinning={actionLoading}>
            {dataFiltered?.length ? (
              <TableCustom
                size='middle'
                columns={columns}
                dataSource={dataFiltered || []}
                pagination={pagination}
                onPaginationChange={handlePagination}
              />
            ) : (
              <Empty description='Không có món nào' />
            )}
          </Spin>
        </Flex>
      </Modal>

      <AddDishesModal open={addModalOpen} onClose={closeAddModal} />
    </>
  )
}

export default OrderFormModalFood
