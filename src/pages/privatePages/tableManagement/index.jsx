import React, { useEffect } from 'react'
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
} from '@ant-design/icons'
import {
  RESTAURANT_TABLE_OPTION,
  RESTAURANT_TABLE_TAG,
} from '@/constants/options'

import ActionTable from './components/ActionTable'
import { FormItemControl, TableCustom, CommonUI } from '@/components/common'

import { TableStyle } from '@/pages/privatePages/tableManagement/styled'

import { useTableManager } from '@/hooks'

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
        </Space>
      ),
    },
  ]

  return (
    <div>
      <Form onFinish={formikSearch.handleSubmit} layout='vertical'>
        <Row gutter={16}>
          <Col xs={24} md={12} lg={6}>
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
          <Col lg={14}>
            <Flex justify='end'>
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
