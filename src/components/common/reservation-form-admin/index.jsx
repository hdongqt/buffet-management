import { Col, Form, Row } from 'antd'

import DATE_FORMAT from '@/constants/dateTimeFormat'
import LIST_OPTIONS_STATUS from '@/constants/listOptionStatus'

import {
  CustomDatePicker,
  CustomTimePicker,
  CustomInput,
  CustomTextArea,
  CustomSelect,
  CustomModal,
} from '@/components/common/ui'
import { FormItemControl } from '@/components/common'

import { useReservationFormAdminAction } from '@/hooks/useFormReservationAdminAction'

export default function ReservationFormAdmin({
  open,
  setIsModalOpen,
  onCancel,
  loading,
  editingRecord,
  availableTables = [],
}) {
  const {
    formik,
    onChangeFormItem,
    disabledDate,
    handleDateChange,
    handleTimeChange,
    handleNumPeopleChange,
  } = useReservationFormAdminAction(editingRecord, setIsModalOpen)

  const listOptionSeat = Array.from({ length: 30 }, (_, i) => ({
    key: i + 1,
    value: i + 1,
    label: `${i + 1} chỗ ngồi`,
  }))

  const listOptionTable = availableTables.map((table) => ({
    key: table.id,
    value: table.id,
    label: `Bàn  ${table.tableNumber} - ${table.capacity} chỗ ngồi`,
  }))

  const [, ...listOptionStatus] = LIST_OPTIONS_STATUS

  return (
    <CustomModal
      title={editingRecord ? 'Sửa đặt bàn' : 'Tạo đặt bàn mới'}
      open={open}
      onOk={() => formik.submitForm()}
      onCancel={onCancel}
      okText={editingRecord ? 'Cập nhật' : 'Xác nhận'}
      confirmLoading={loading}
    >
      <Form layout='vertical' onFinish={formik.handleSubmit}>
        <FormItemControl label='Họ và tên' name='fullname' formik={formik}>
          <CustomInput
            name='fullname'
            placeholder='Nhập tên'
            value={formik.values.fullname}
            onChange={(e) => onChangeFormItem('fullname', e.target.value)}
            onBlur={formik.handleBlur}
          />
        </FormItemControl>

        <Row gutter={20}>
          <Col xs={24} md={12}>
            <FormItemControl label='Số điện thoại' name='phone' formik={formik}>
              <CustomInput
                name='phone'
                placeholder='Số điện thoại'
                value={formik.values.phone}
                onChange={(e) => onChangeFormItem('phone', e.target.value)}
                onBlur={formik.handleBlur}
              />
            </FormItemControl>
          </Col>
          <Col xs={24} md={12}>
            <FormItemControl label='Số khách' name='numPeople' formik={formik}>
              <CustomSelect
                showSearch
                placeholder='Số khách'
                options={listOptionSeat}
                value={formik.values.numPeople}
                onChange={handleNumPeopleChange}
                notFoundContent='Không có dữ liệu'
              />
            </FormItemControl>
          </Col>
        </Row>

        <Row gutter={20}>
          <Col xs={24} md={12}>
            <FormItemControl label='Ngày' name='dateBooking' formik={formik}>
              <CustomDatePicker
                name='dateBooking'
                disabledDate={disabledDate}
                value={formik.values.dateBooking}
                onChange={handleDateChange}
                onBlur={formik.handleBlur}
                placeholder='Chọn ngày'
              />
            </FormItemControl>
          </Col>
          <Col xs={24} md={12}>
            <FormItemControl label='Giờ' name='timeBooking' formik={formik}>
              <CustomTimePicker
                name='timeBooking'
                format={DATE_FORMAT.TIME}
                value={formik.values.timeBooking}
                onChange={handleTimeChange}
                onBlur={formik.handleBlur}
                placeholder='Chọn giờ'
              />
            </FormItemControl>
          </Col>
        </Row>

        <Row gutter={20}>
          <Col xs={24} md={12}>
            <FormItemControl label='Bàn' name='tableId' formik={formik}>
              <CustomSelect
                name='tableId'
                options={listOptionTable}
                value={formik.values.tableId}
                onChange={(val) => onChangeFormItem('tableId', val)}
                notFoundContent='Không có dữ liệu'
              />
            </FormItemControl>
          </Col>
          <Col xs={24} md={12}>
            <FormItemControl label='Trạng thái' name='status' formik={formik}>
              <CustomSelect
                name='status'
                options={listOptionStatus}
                value={formik.values.status}
                onChange={(val) => onChangeFormItem('status', val)}
              />
            </FormItemControl>
          </Col>
        </Row>

        <FormItemControl label='Ghi chú' name='note' formik={formik}>
          <CustomTextArea
            name='note'
            placeholder='Nhập ghi chú (nếu có)'
            value={formik.values.note}
            onChange={(e) => onChangeFormItem('note', e.target.value)}
          />
        </FormItemControl>
      </Form>
    </CustomModal>
  )
}
