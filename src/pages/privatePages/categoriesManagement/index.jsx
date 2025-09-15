import dayjs from 'dayjs'
import { useEffect } from 'react'
import { Form, Col, Flex, Row, Popconfirm, Tooltip } from 'antd'
import {
  DeleteOutlined,
  EditOutlined,
  PlusOutlined,
  SearchOutlined,
} from '@ant-design/icons'

import DATE_FORMAT from '@/constants/dateTimeFormat'

import { FormItemControl, TableCustom } from '@/components/common'
import { CustomButton, CustomInput, CustomModal } from '@/components/common/ui'

import useCategoriesManagement from '@/hooks/useCategories'

export default function CategoriesManagement() {
  const ActionButtons = ({ record }) => (
    <Flex gap={8}>
      <Tooltip title='Chỉnh sửa '>
        <CustomButton
          icon={<EditOutlined />}
          onClick={() => handleEditCategory(record)}
        />
      </Tooltip>
      <Tooltip title='Xóa'>
        <Popconfirm
          title='Xóa danh mục'
          description='Bạn có chắc chắn muốn xóa danh mục này?'
          onConfirm={() => deleteCategory(record.id)}
          okText='Xóa'
          cancelText='Hủy'
        >
          <CustomButton danger icon={<DeleteOutlined />} />
        </Popconfirm>
      </Tooltip>
    </Flex>
  )

  const columnCategoriesTable = [
    {
      title: 'Tên danh mục',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Ngày tạo',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (value) => dayjs(value).format(DATE_FORMAT.DATE_TIME),
    },
    {
      title: 'Ngày cập nhật',
      dataIndex: 'updatedAt',
      key: 'updatedAt',
      render: (value) => dayjs(value).format(DATE_FORMAT.DATE_TIME),
    },
    {
      title: 'Hành động',
      key: 'action',
      render: (_, record) => <ActionButtons record={record} />,
    },
  ]

  const {
    categoriesList,
    fetchCategories,
    pagination,
    loading,
    editingRecord,
    actionLoading,
    handlePaginationChange,
    onSearchChange,
    formikSearch,
    formik,
    handleSubmit,
    showModal,
    isModalOpen,
    onCloseModal,
    handleEditCategory,
    deleteCategory,
  } = useCategoriesManagement()

  useEffect(() => {
    fetchCategories()
  }, [])

  return (
    <div>
      <Form layout='vertical'>
        <Row gutter={16}>
          <Col xs={24} md={16} lg={16}>
            <FormItemControl
              label='Tìm kiếm'
              name='search'
              formik={formikSearch}
            >
              <CustomInput
                placeholder='Nhập từ khóa tìm kiếm'
                prefix={<SearchOutlined />}
                allowClear
                value={formikSearch.values.search}
                onChange={(e) => onSearchChange(e.target.value)}
              />
            </FormItemControl>
          </Col>

          <Col xs={24} md={8} lg={8}>
            <Flex justify='end' gap={8}>
              <FormItemControl emptyLabel>
                <CustomButton
                  type='primary'
                  size='large'
                  icon={<PlusOutlined />}
                  onClick={showModal}
                >
                  Thêm danh mục
                </CustomButton>
              </FormItemControl>
            </Flex>
          </Col>
        </Row>
      </Form>

      <TableCustom
        columns={columnCategoriesTable}
        dataSource={categoriesList}
        pagination={pagination}
        loading={loading}
        onPaginationChange={handlePaginationChange}
        locale={{ emptyText: 'Không có dữ liệu' }}
      />

      <CustomModal
        title={editingRecord ? 'Chỉnh sửa danh mục' : 'Thêm danh mục'}
        open={isModalOpen}
        onOk={() => formik.submitForm()}
        onCancel={onCloseModal}
        confirmLoading={actionLoading}
        okText='Xác nhận'
      >
        <Form layout='vertical' onFinish={handleSubmit}>
          <FormItemControl label='Tên danh mục' name='name' formik={formik}>
            <CustomInput
              name='name'
              value={formik.values.name}
              onChange={(e) => formik.setFieldValue('name', e.target.value)}
              onBlur={formik.handleBlur}
              placeholder='Nhập tên danh mục'
              allowClear
            />
          </FormItemControl>
        </Form>
      </CustomModal>
    </div>
  )
}
