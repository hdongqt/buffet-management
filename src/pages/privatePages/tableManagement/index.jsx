import React, { useEffect } from 'react'
import dayjs from 'dayjs'
import {
  Form,
  Select,
  Space,
  Col,
  Row,
  Flex,
  Typography,
  Tooltip,
  Popconfirm,
  Tag,
} from 'antd'

import {
  EditOutlined,
  PlusOutlined,
  PauseCircleOutlined,
  RetweetOutlined,
  DeleteOutlined,
} from '@ant-design/icons'

import {
  ORDER_BY,
  RESTAURANT_TABLE_OPTION,
  RESTAURANT_TABLE_SORT_BY,
  RESTAURANT_TABLE_TAG,
} from '@/constants/options'

import ActionTable from './components/ActionTable'
import { FormItemControl, TableCustom, CommonUI } from '@/components/common'
import { CustomSelect } from '@/components/common/ui'

import DATE_FORMAT from '@/constants/dateTimeFormat'
import { RESTAURANT_TABLE_STATUS } from '@/constants/status'

import { useTableManager } from '@/hooks'

import { TableStyle } from '@/pages/privatePages/tableManagement/styled'

const { Text } = Typography
const { CustomInput, CustomButton } = CommonUI

export default function TableManagement() {
  const {
    tables,
    loading,
    pagination,
    isModalOpen,
    setIsModalOpen,
    editingTable,
    fetchTables,
    setEditingTable,
    formikSearch,
    handleChangeStatus,
    onChangeFilter,
    onChangePagination,
    getTitleActionStatus,
    handleResetFilters,
  } = useTableManager()

  useEffect(() => {
    fetchTables()
  }, [])

  const getTag = (status) => {
    const tagSelect = RESTAURANT_TABLE_TAG?.[status] || {
      text: status,
      color: 'default',
    }

    return <Tag color={tagSelect.color}>{tagSelect.text}</Tag>
  }

  const columns = [
    { title: 'Số bàn', dataIndex: 'tableNumber', key: 'tableNumber' },
    { title: 'Chỗ ngồi tối đa', dataIndex: 'capacity', key: 'capacity' },
    {
      title: 'QR Bàn',
      render: (_, record) => (
        <TableStyle.ImageQR
          src={`${record?.qrURL}?t=${record?.updatedAt}`}
          alt={`QR Bàn ${record?.tableNumber}`}
        />
      ),
    },
    {
      title: 'Trạng thái',
      render: (_, record) => getTag(record?.status),
    },
    {
      title: 'Lịch đặt sắp tới',
      render: (record) => (
        <Typography.Text type='danger' strong>
          {record?.nextReservationToday &&
            dayjs(record.nextReservationToday).format(DATE_FORMAT.DATE_TIME)}
        </Typography.Text>
      ),
    },
    {
      title: 'Ngày tạo',
      dataIndex: 'createdAt',
      render: (record) => record && dayjs(record).format(DATE_FORMAT.DATE_TIME),
    },
    {
      title: 'Hành động',
      fixed: 'right',
      render: (_, record) => (
        <Space>
          <Tooltip title='Cập nhật'>
            <CustomButton
              icon={<EditOutlined />}
              onClick={() => {
                setEditingTable(record)
                setIsModalOpen(true)
              }}
            />
          </Tooltip>

          {(record?.status === RESTAURANT_TABLE_STATUS.AVAILABLE ||
            record?.status === RESTAURANT_TABLE_STATUS.DISABLED) && (
            <Tooltip title={getTitleActionStatus(record)}>
              <Popconfirm
                title={getTitleActionStatus(record)}
                onConfirm={() => handleChangeStatus(record)}
              >
                {record?.status === 'disabled' ? (
                  <CustomButton
                    color='green'
                    variant='outlined'
                    icon={<RetweetOutlined />}
                  />
                ) : (
                  <CustomButton danger icon={<PauseCircleOutlined />} />
                )}
              </Popconfirm>
            </Tooltip>
          )}
        </Space>
      ),
    },
  ]

  return (
    <div>
      <Form onFinish={formikSearch.handleSubmit} layout='vertical'>
        <Row gutter={16}>
          <Col xs={24} md={12} lg={4}>
            <FormItemControl
              name='tableNumber'
              label='Số bàn'
              formik={formikSearch}
            >
              <CustomInput
                name='tableNumber'
                placeholder='Nhập số bàn...'
                size='large'
                value={formikSearch.values.tableNumber}
                allowClear
                onChange={(event) =>
                  onChangeFilter('tableNumber', event.target.value)
                }
              />
            </FormItemControl>
          </Col>
          <Col xs={24} md={12} lg={4}>
            <FormItemControl
              name='status'
              label={<Text strong>Trạng thái</Text>}
              formik={formikSearch}
            >
              <Select
                size='large'
                name='status'
                value={formikSearch.values.status}
                options={RESTAURANT_TABLE_OPTION}
                onChange={(val) => onChangeFilter('status', val)}
                placeholder='Chọn trạng thái'
              />
            </FormItemControl>
          </Col>
          <Col xs={24} md={8} lg={4}>
            <FormItemControl
              name='sortBy'
              formik={formikSearch}
              label='Sắp xếp'
              layout='vertical'
            >
              <CustomSelect
                placeholder='Sắp xếp theo'
                value={formikSearch.values.sortBy}
                onChange={(val) => onChangeFilter('sortBy', val)}
                options={RESTAURANT_TABLE_SORT_BY}
                allowClear
              />
            </FormItemControl>
          </Col>
          <Col xs={24} md={8} lg={4}>
            <FormItemControl
              name='order'
              formik={formikSearch}
              label='Thứ tự'
              layout='vertical'
            >
              <CustomSelect
                placeholder='Thứ tự'
                value={formikSearch.values.order}
                onChange={(val) => onChangeFilter('order', val)}
                options={ORDER_BY}
                allowClear
              />
            </FormItemControl>
          </Col>
          <Col lg={8}>
            <Flex justify='end' gap={8}>
              <FormItemControl emptyLabel>
                <CustomButton
                  onClick={handleResetFilters}
                  icon={<DeleteOutlined />}
                  size='large'
                >
                  Clear all
                </CustomButton>
              </FormItemControl>
              <FormItemControl emptyLabel>
                <CustomButton
                  type='primary'
                  size='large'
                  icon={<PlusOutlined />}
                  onClick={() => {
                    setEditingTable(null)
                    setIsModalOpen(true)
                  }}
                >
                  Thêm bàn
                </CustomButton>
              </FormItemControl>
            </Flex>
          </Col>
        </Row>
      </Form>

      <TableCustom
        columns={columns}
        dataSource={tables}
        loading={loading}
        pagination={pagination}
        onPaginationChange={onChangePagination}
      />

      <ActionTable
        editingTable={editingTable}
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
      />
    </div>
  )
}
