import React, { useEffect } from 'react'
import dayjs from 'dayjs'
import {
  Form,
  Space,
  Tooltip,
  Popconfirm,
  Tag,
  Typography,
  Row,
  Col,
  Flex,
} from 'antd'
import {
  DeleteOutlined,
  EditOutlined,
  PauseCircleOutlined,
  PlusOutlined,
  SearchOutlined,
} from '@ant-design/icons'

import DATE_FORMAT from '@/constants/dateTimeFormat'
import {
  MENU_COMBO_OPTIONS,
  MENU_SOFT_BY,
  MENU_STATUS_TAGS,
  ORDER_BY,
} from '@/constants/options'

import { CustomButton, CustomSelect, CustomTag } from '@/components/common/ui'
import { FormItemControl, TableCustom } from '@/components/common'
import MenuFormModal from '@/pages/privatePages/menuManagement/components/formModal/MenuFormModal'

import useMenuPage from '@/hooks/useMenuPage'

import { formatCurrency, getStatusConfig, truncateText } from '@/utils/format'

import {
  FilterInput,
  StyledRow,
  StyledText,
} from '@/pages/privatePages/menuManagement/styled'
import useCategoriesManagement from '@/hooks/useCategories'

const MenuManagement = () => {
  const {
    menuList,
    loading,
    pagination,
    modalState,

    openModal,
    closeModal,

    formikSearch,
    handleFilter,
    handleTableChange,
    handleResetFilters,

    fetchMenuList,
    deleteMenu,
  } = useMenuPage()

  const { fetchCategories, categoryItemList } = useCategoriesManagement()

  useEffect(() => {
    fetchCategories()
    fetchMenuList()
  }, [])

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      render: (text) => (
        <StyledText ellipsis={{ tooltip: text }}>
          {truncateText(text, 20)}
        </StyledText>
      ),
    },
    {
      title: 'Description',
      dataIndex: 'description',
      render: (text = '') => {
        return (
          <StyledText type='secondary'>{truncateText(text, 35)}</StyledText>
        )
      },
    },
    {
      title: 'Price',
      dataIndex: 'price',
      render: (value) => formatCurrency(value),
    },
    {
      title: 'Combo',
      dataIndex: 'isCombo',
      render: (value) => (
        <Tag color={value ? 'blue' : 'default'}>{value ? 'Yes' : 'No'}</Tag>
      ),
    },
    {
      title: 'Status',
      dataIndex: 'status',
      render: (val) => {
        const { color, label } = getStatusConfig(val, MENU_STATUS_TAGS)
        return <CustomTag color={color}>{label}</CustomTag>
      },
    },
    {
      title: 'Created',
      dataIndex: 'createdAt',
      render: (value) =>
        dayjs(value).format(DATE_FORMAT.DATE_TIME) || (
          <Typography.Text type='secondary'>-</Typography.Text>
        ),
    },
    {
      title: 'Action',
      key: 'action',
      fixed: 'right',
      render: (_, record) => (
        <Space>
          <Tooltip title='Cập nhật'>
            <CustomButton
              icon={<EditOutlined />}
              onClick={() => openModal(record)}
            />
          </Tooltip>
          <Tooltip title='Xóa món ăn'>
            <Popconfirm
              title='Xóa món ăn'
              description='Bạn có chắc chắn muốn xóa món ăn này?'
              onConfirm={() => deleteMenu(record.id)}
              okText='Xóa'
              cancelText='Hủy'
            >
              <CustomButton danger icon={<DeleteOutlined />} />
            </Popconfirm>
          </Tooltip>
        </Space>
      ),
    },
  ]

  return (
    <>
      <StyledRow gutter={16} justify='space-between' align='middle'>
        <Col xs={24} md={24} lg={18}>
          <Form onFinish={formikSearch.handleSubmit}>
            <Row gutter={8}>
              <Col xs={24} md={24} lg={13}>
                <FormItemControl
                  name='search'
                  label='Tìm kiếm'
                  formik={formikSearch}
                  layout='vertical'
                >
                  <FilterInput
                    allowClear
                    prefix={<SearchOutlined />}
                    placeholder='Tìm món ăn...'
                    value={formikSearch.values.search}
                    onChange={(e) => {
                      handleFilter('search', e.target.value)
                    }}
                  />
                </FormItemControl>
              </Col>
            </Row>
          </Form>
        </Col>
        <Col xs={24} md={24} lg={6}>
          <Flex justify='end'>
            <CustomButton
              size='large'
              type='primary'
              icon={<PlusOutlined />}
              onClick={() => openModal()}
            >
              Thêm món
            </CustomButton>
          </Flex>
        </Col>
        <Col xs={24} md={24} lg={24}>
          <Row gutter={8} align='middle'>
            <Col xs={24} md={8} lg={5}>
              <FormItemControl
                name='categoryId'
                label='Loại món ăn'
                formik={formikSearch}
                layout='vertical'
              >
                <CustomSelect
                  placeholder='Loại món ăn'
                  value={formikSearch.values.categoryId}
                  onChange={(val) => {
                    handleFilter('categoryId', val)
                  }}
                  options={categoryItemList}
                  allowClear
                />
              </FormItemControl>
            </Col>
            <Col xs={24} md={8} lg={5}>
              <FormItemControl
                name='isCombo'
                label='Combo'
                formik={formikSearch}
                layout='vertical'
              >
                <CustomSelect
                  placeholder='Combo'
                  value={formikSearch.values.isCombo}
                  onChange={(val) => {
                    handleFilter('isCombo', val)
                  }}
                  options={MENU_COMBO_OPTIONS}
                  allowClear
                />
              </FormItemControl>
            </Col>
            <Col xs={24} md={8} lg={5}>
              <FormItemControl
                name='sortBy'
                formik={formikSearch}
                label='Sắp xếp'
                layout='vertical'
              >
                <CustomSelect
                  placeholder='Sắp xếp theo'
                  value={formikSearch.values.sortBy}
                  onChange={(val) => handleFilter('sortBy', val)}
                  options={MENU_SOFT_BY}
                  allowClear
                />
              </FormItemControl>
            </Col>
            <Col xs={24} md={8} lg={5}>
              <FormItemControl
                name='order'
                formik={formikSearch}
                label='Thứ tự'
                layout='vertical'
              >
                <CustomSelect
                  placeholder='Thứ tự'
                  value={formikSearch.values.order}
                  onChange={(val) => handleFilter('order', val)}
                  options={ORDER_BY}
                  allowClear
                />
              </FormItemControl>
            </Col>
            <Col xs={24} md={8} lg={4}>
              <Flex justify='end'>
                <CustomButton
                  onClick={handleResetFilters}
                  icon={<DeleteOutlined />}
                  size='large'
                >
                  Clear all
                </CustomButton>
              </Flex>
            </Col>
          </Row>
        </Col>
      </StyledRow>

      <TableCustom
        bordered
        columns={columns}
        dataSource={menuList}
        loading={loading}
        size='large'
        tableLayout='fixed'
        onPaginationChange={({ page, limit }) => {
          handleTableChange({ page: page, limit: limit })
        }}
        pagination={pagination}
      />

      <MenuFormModal
        open={modalState.open}
        onClose={closeModal}
        initialValues={modalState.record}
      />
    </>
  )
}

export default MenuManagement
