import React, { useEffect, useMemo } from 'react'
import { Grid } from 'antd'
import { CheckCircleOutlined } from '@ant-design/icons'

import { CustomInputNumber, CustomSelect } from '@/components/common/ui'
import { FormItemControl } from '@/components/common'

import {
  useMenuManagement,
  useOrderFormAction,
  useOrderManagement,
  useTableManager,
} from '@/hooks'

import { getWidthCard } from '@/utils/getWidthCard'
import { formatCurrency } from '@/utils/format'

import { StyledModal, FormSpace, StyledSection, StyledPrice } from './styled'

const { useBreakpoint } = Grid

const OrderFormModal = ({ open, onClose, initialValues }) => {
  const { fetchTables } = useTableManager()
  const { fetchMenus } = useMenuManagement()
  const { actionLoading } = useOrderManagement()

  const {
    formik,
    listOptionTable,
    listCombo,
    selectedCombo,
    totalPrice,
    actionLoading: loadingAvailableTable,
    onChangeFormItem,
  } = useOrderFormAction({
    initialValues,
    onClose,
  })

  const screens = useBreakpoint()
  const widthCard = getWidthCard(screens)

  useEffect(() => {
    if (!open) formik.resetForm()
  }, [open])

  useEffect(() => {
    fetchTables()
    fetchMenus()
  }, [])

  return (
    <StyledModal.Wrap
      title={
        <StyledModal.Title align='center' gap={8}>
          <StyledModal.TitleText level={4}>
            {initialValues ? 'Cập nhật đơn hàng' : 'Tạo đơn hàng mới'}
          </StyledModal.TitleText>
        </StyledModal.Title>
      }
      open={open}
      onOk={formik.handleSubmit}
      onCancel={onClose}
      okText={initialValues ? 'Cập nhật' : 'Tạo đơn hàng'}
      cancelText='Hủy'
      confirmLoading={actionLoading}
      width={widthCard}
    >
      <StyledModal.Content vertical>
        <FormSpace direction='vertical' size='large'>
          <StyledSection.Container>
            <StyledSection.Title strong>
              Thông tin khách hàng
            </StyledSection.Title>
            <FormItemControl label='Số người' name='numPeople' formik={formik}>
              <CustomInputNumber
                name='numPeople'
                placeholder='Nhập số người'
                value={formik.values.numPeople}
                onChange={(val) => onChangeFormItem('numPeople', val)}
                min={1}
                max={30}
              />
            </FormItemControl>
          </StyledSection.Container>

          <StyledSection.Container>
            <StyledSection.Title strong>Thông tin bàn</StyledSection.Title>
            <FormItemControl label='Chọn bàn' name='tableId' formik={formik}>
              <CustomSelect
                name='tableId'
                placeholder='Chọn bàn'
                labelInValue
                value={formik.values.tableId}
                onChange={(val) => onChangeFormItem('tableId', val)}
                options={listOptionTable}
                disabled={loadingAvailableTable || !!initialValues}
                loading={loadingAvailableTable}
                allowClear
              />
            </FormItemControl>
          </StyledSection.Container>

          <StyledSection.Container>
            <StyledSection.Title strong>Thông tin combo</StyledSection.Title>
            <FormItemControl label='Chọn combo' name='comboId' formik={formik}>
              <CustomSelect
                name='comboId'
                placeholder='Chọn combo'
                labelInValue
                value={formik.values.comboId}
                onChange={(val) => onChangeFormItem('comboId', val)}
                options={listCombo}
                allowClear
              />
            </FormItemControl>
          </StyledSection.Container>

          {selectedCombo && formik.values.numPeople && (
            <StyledPrice.Container align='center' justify='space-between'>
              <StyledPrice.Title strong>
                <CheckCircleOutlined />
                Tổng tiền dự kiến:
              </StyledPrice.Title>
              <StyledPrice.Amount strong>
                {formatCurrency(totalPrice)}
              </StyledPrice.Amount>
            </StyledPrice.Container>
          )}
        </FormSpace>
      </StyledModal.Content>
    </StyledModal.Wrap>
  )
}

export default OrderFormModal
