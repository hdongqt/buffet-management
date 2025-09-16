import React from 'react'
import { Link } from 'react-router-dom'
import { Col, Flex, Form, Row } from 'antd'

import { RESTAURANT_TABLE_OPTION } from '@/constants/options'

import { FormItemControl, CommonUI } from '@/components/common'

import { useTableManagerAction } from '@/hooks'

import { TableStyle } from '../styled'

const { CustomInput, CustomSelect, CustomSwitch, CustomModal } = CommonUI

const ActionTable = ({ editingTable, isModalOpen, setIsModalOpen }) => {
  const { formik, actionLoading, onCloseForm, onChangeFormValue } =
    useTableManagerAction(editingTable, setIsModalOpen)

  const URLTable = `${import.meta.env.VITE_CLIENT_URL}/table/${
    editingTable?.token
  }`

  return (
    <CustomModal
      title={editingTable ? 'Sửa bàn' : 'Thêm bàn'}
      open={isModalOpen}
      confirmLoading={actionLoading}
      onCancel={onCloseForm}
      onOk={formik.handleSubmit}
      cancelText='Hủy'
      okText={editingTable ? 'Sửa' : 'Thêm'}
    >
      <Form onFinish={formik.handleSubmit} layout='vertical'>
        <Row gutter={16}>
          <Col xs={12}>
            <FormItemControl name='tableNumber' label='Số bàn' formik={formik}>
              <CustomInput
                min={1}
                type='number'
                disabled={!!editingTable}
                name='tableNumber'
                size='large'
                value={formik.values.tableNumber}
                onChange={(event) => onChangeFormValue('tableNumber', event)}
              />
            </FormItemControl>
          </Col>

          <Col xs={12}>
            <FormItemControl
              name='capacity'
              label='Chỗ ngồi tối đa'
              formik={formik}
            >
              <CustomInput
                min={1}
                type='number'
                name='capacity'
                size='large'
                value={formik.values.capacity}
                onChange={(event) => onChangeFormValue('capacity', event)}
              />
            </FormItemControl>
          </Col>
          {!!editingTable && (
            <>
              <Col xs={12}>
                <FormItemControl label='Trạng thái'>
                  <CustomSelect
                    size='large'
                    name='status'
                    value={editingTable?.status}
                    options={RESTAURANT_TABLE_OPTION}
                    disabled
                    placeholder='Chọn trạng thái'
                  />
                </FormItemControl>
              </Col>
              <Col xs={12}>
                <FormItemControl label='Thay đổi QR' name='changeQR'>
                  <CustomSwitch
                    name='changeQR'
                    value={formik.values.changeQR}
                    onChange={(checked) =>
                      onChangeFormValue('changeQR', checked)
                    }
                  />
                </FormItemControl>
              </Col>
              <Col xs={24}>
                <FormItemControl label='QR Bàn'>
                  <Flex justify='center'>
                    <TableStyle.ImageQR
                      src={`${editingTable?.qrURL}?t=${editingTable?.updatedAt}`}
                      alt='QR Code'
                    />
                  </Flex>
                </FormItemControl>
              </Col>
              <Col xs={24}>
                <FormItemControl label='URL Bàn'>
                  <Link to={URLTable} target='_blank'>
                    {URLTable}
                  </Link>
                </FormItemControl>
              </Col>
            </>
          )}
        </Row>
      </Form>
    </CustomModal>
  )
}

export default ActionTable
