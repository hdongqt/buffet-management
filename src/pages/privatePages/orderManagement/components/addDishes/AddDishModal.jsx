import React, { useEffect } from 'react'
import {
  Modal,
  Flex,
  Typography,
  Input,
  List,
  Button,
  Space,
  InputNumber,
  Divider,
  Empty,
  Pagination,
  Select,
} from 'antd'
import {
  SearchOutlined,
  ShoppingCartOutlined,
  PlusOutlined,
  DeleteOutlined,
} from '@ant-design/icons'

import {
  StyledFlex,
  StyledList,
} from '@/pages/privatePages/orderManagement/components/addDishes/styled'
import { FormItemControl } from '@/components/common'

import {
  useMenuManagement,
  useMenuPage,
  useOrderDishUpdate,
  useOrderManagement,
} from '@/hooks'
import useCategoriesManagement from '@/hooks/useCategories'

import { formatCurrency } from '@/utils/format'

const AddDishesModal = ({ open, onClose }) => {
  const { formikSearch, handleFilter, handlePageChange } = useMenuPage()
  const { listDish, loading, pagination } = useMenuManagement()
  const { fetchCategories, categoryItemList } = useCategoriesManagement()
  const { order, cart, actionLoading } = useOrderManagement()

  const {
    handleAddDishes,
    newCart,
    setNewCart,
    addToCart,
    updateQty,
    removeFromCart,
  } = useOrderDishUpdate(onClose)

  useEffect(() => {
    if (open) {
      fetchCategories()
      setNewCart(cart || [])
    }
  }, [open])

  return (
    <Modal
      open={open}
      onCancel={onClose}
      width={980}
      title={<Typography.Title level={4}>Thêm món vào đơn</Typography.Title>}
      footer={
        <Flex justify='end'>
          <Space>
            <Button variant='outline' danger onClick={onClose}>
              Hủy
            </Button>
            <Button
              type='primary'
              icon={<ShoppingCartOutlined />}
              disabled={!newCart.length}
              loading={actionLoading}
              onClick={() =>
                handleAddDishes({
                  orderId: order.id,
                  cart: newCart,
                })
              }
            >
              Thêm vào đơn
            </Button>
          </Space>
        </Flex>
      }
    >
      <Flex gap={16}>
        <StyledFlex vertical>
          <FormItemControl name='search' formik={formikSearch} label='Tìm kiếm'>
            <Input
              allowClear
              name='search'
              placeholder='Tìm món theo tên...'
              prefix={<SearchOutlined />}
              value={formikSearch.values.search}
              onChange={(e) => handleFilter('search', e.target.value)}
            />
          </FormItemControl>
          <FormItemControl
            name='categoryId'
            formik={formikSearch}
            label='Chọn danh mục'
          >
            <Select
              allowClear
              placeholder='Chọn danh mục'
              value={formikSearch.values.categoryId}
              onChange={(value) => handleFilter('categoryId', value)}
              options={categoryItemList}
            />
          </FormItemControl>

          <div>
            {listDish?.length ? (
              <>
                <List
                  loading={loading}
                  dataSource={listDish || []}
                  renderItem={(item) => (
                    <List.Item
                      actions={[
                        <Button
                          size='small'
                          type='primary'
                          icon={<PlusOutlined />}
                          onClick={() => addToCart(item)}
                        >
                          Thêm
                        </Button>,
                      ]}
                    >
                      <List.Item.Meta
                        title={
                          <Typography.Text strong>{item.name}</Typography.Text>
                        }
                        description={formatCurrency(item.price)}
                      />
                    </List.Item>
                  )}
                />
                <Pagination
                  align='end'
                  current={pagination.page}
                  pageSize={pagination.pageSize}
                  total={pagination.total}
                  showSizeChanger
                  pageSizeOptions={['20', '30', '40']}
                  onShowSizeChange={(page, limit) =>
                    handlePageChange({ page, limit })
                  }
                />
              </>
            ) : (
              <Empty description='Không tìm thấy món phù hợp' />
            )}
          </div>
        </StyledFlex>

        <Divider type='vertical' />

        <StyledFlex vertical>
          <Flex justify='space-between'>
            <Typography.Text strong>
              Món đã chọn ({newCart.length} món)
            </Typography.Text>
            {!!newCart.length && (
              <Button
                type='text'
                size='small'
                onClick={() => setNewCart([])}
                icon={<DeleteOutlined />}
              >
                Xóa tất cả
              </Button>
            )}
          </Flex>

          <div>
            {newCart.length ? (
              <StyledList
                dataSource={newCart}
                renderItem={(item) => (
                  <List.Item
                    actions={[
                      <Space>
                        <InputNumber
                          min={1}
                          value={item.quantity}
                          onChange={(val) => updateQty(item.id, val)}
                          size='small'
                        />
                        <Button
                          size='small'
                          type='text'
                          danger
                          onClick={() => removeFromCart(item.id)}
                        >
                          Xóa
                        </Button>
                      </Space>,
                    ]}
                  >
                    <List.Item.Meta
                      title={
                        <Typography.Text strong>{item.name}</Typography.Text>
                      }
                      description={
                        <>
                          {formatCurrency(item.price)} / phần
                          <br />
                          <Typography.Text type='secondary'>
                            Thành tiền:{' '}
                            {formatCurrency(item.price * item.quantity)}
                          </Typography.Text>
                        </>
                      }
                    />
                  </List.Item>
                )}
              />
            ) : (
              <Empty description='Chưa có món nào trong giỏ' />
            )}
          </div>
        </StyledFlex>
      </Flex>
    </Modal>
  )
}

export default AddDishesModal
