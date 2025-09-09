import { useEffect } from 'react'
import { Form, Col, Row, Flex, Typography } from 'antd'
import { DeleteOutlined, PlusOutlined } from '@ant-design/icons'
import { useSelector } from 'react-redux'

import LIST_OPTIONS_STATUS from '@/constants/listOptionStatus'

import ReservationFormAdmin from '@/components/common/reservation-form-admin'
import { TableCustom, FormItemControl } from '@/components/common'
import columnTableReservation from '@/pages/privatePages/tableReservationManagement/components/columnTableReservation'

import { useReservationFormAdmin } from '@/hooks/useFormReservationAdmin'

const { Text } = Typography
import {
  CustomInput,
  CustomButton,
  CustomSelect,
  CustomDatePicker,
} from '@/components/common/ui'

export default function TableReservationManagement() {
  const { reservationList, loading, pagination, availableTables } = useSelector(
    (state) => state.reservation
  )

  const {
    handlePaginationChange,
    handleResetFilters,
    fetchReservations,
    formikSearch,
    onChangeFilter,
    editingRecord,
    isModalOpen,
    setIsModalOpen,
    showModal,
    handleEdit,
  } = useReservationFormAdmin()

  useEffect(() => {
    fetchReservations()
  }, [])

  return (
    <div>
      <Form onFinish={formikSearch.handleSubmit} layout='vertical'>
        <Row gutter={16}>
          <Col xs={24} md={12} lg={8}>
            <FormItemControl
              name='search'
              label='Tìm kiếm'
              formik={formikSearch}
            >
              <CustomInput
                name='search'
                placeholder='Tìm kiếm tên, số điện thoại...'
                size='large'
                value={formikSearch.values.search}
                allowClear
                onChange={(event) =>
                  onChangeFilter('search', event.target.value)
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
              <CustomSelect
                size='large'
                name='status'
                value={formikSearch.values.status}
                options={LIST_OPTIONS_STATUS}
                onChange={(val) => onChangeFilter('status', val)}
                placeholder='Chọn trạng thái'
              />
            </FormItemControl>
          </Col>
          <Col xs={24} md={12} lg={4}>
            <FormItemControl
              name='dateFilter'
              label={<Text strong>Ngày đặt</Text>}
              formik={formikSearch}
            >
              <CustomDatePicker
                name='dateFilter'
                value={formikSearch.values.dateFilter}
                onChange={(val) => onChangeFilter('dateFilter', val)}
                placeholder='Chọn ngày'
              />
            </FormItemControl>
          </Col>
          <Col xs={24} md={12} lg={8}>
            <Flex justify='end' gap={8}>
              <FormItemControl emptyLabel>
                <CustomButton
                  size='large'
                  icon={<DeleteOutlined />}
                  onClick={handleResetFilters}
                >
                  Clear all
                </CustomButton>
              </FormItemControl>
              <FormItemControl emptyLabel>
                <CustomButton
                  type='primary'
                  size='large'
                  icon={<PlusOutlined />}
                  onClick={showModal}
                >
                  Thêm đặt bàn
                </CustomButton>
              </FormItemControl>
            </Flex>
          </Col>
        </Row>
      </Form>

      <ReservationFormAdmin
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        setIsModalOpen={setIsModalOpen}
        loading={loading}
        editingRecord={editingRecord}
        availableTables={availableTables}
      />

      <TableCustom
        columns={columnTableReservation({
          onEdit: handleEdit,
        })}
        dataSource={reservationList}
        loading={loading}
        pagination={pagination}
        onPaginationChange={handlePaginationChange}
        locale={{ emptyText: 'Không có dữ liệu' }}
      />
    </div>
  )
}
