import React, { useEffect } from 'react'
import { Form, Select, Spin, Grid, Flex } from 'antd'

import { FALLBACK_IMAGES } from '@/constants/images/fallbackImage'
import { GUEST_ORDER_ROUTES } from '@/constants/listRoutes'

import { FormItemControl } from '@/components/common'
import { CommonUI } from '@/components/common'

import { SOCKET_EVENT } from '@/constants/status'
import { MAIN_IMAGES } from '@/constants/images/mainUserImage'

import { useSocket } from '@/contexts/socket'
import useGuestTableQR from '@/hooks/useGuestTableQR'

import { getWidthCard } from '@/utils/getWidthCard'
import { formatCurrency } from '@/utils/format'

import { TableQR } from './styled'
import { CustomInputNumber } from '@/components/common/ui'

const { CustomButton, CustomInput, CustomSelect } = CommonUI
const { useBreakpoint } = Grid

const GuestTableQRPage = function () {
  const {
    token,
    isAlowShowForm,
    formik,
    loading,
    error,
    order,
    actionLoading,
    isWaitAccept,
    comboList,
    checkExistingOrder,
    handleChangeFormData,
    handleConfirmed,
  } = useGuestTableQR()

  const socket = useSocket()

  const screens = useBreakpoint()
  const widthCard = getWidthCard(screens)

  useEffect(() => {
    checkExistingOrder()
  }, [token])

  useEffect(() => {
    if (!order?.id || !socket) return

    socket.emit(SOCKET_EVENT.JOIN_ORDER, order.id)

    socket.on(SOCKET_EVENT.ORDER_STATUS_UPDATED, handleConfirmed)

    return () => {
      socket.off(SOCKET_EVENT.ORDER_STATUS_UPDATED, handleConfirmed)
    }
  }, [handleConfirmed, order, socket])

  if (isWaitAccept) {
    return (
      <TableQR.Background>
        <TableQR.Overlay>
          <TableQR.Title level={1}>Chào mừng bạn đến với</TableQR.Title>
          <TableQR.Logo src={MAIN_IMAGES.logoImage} alt='Sakura Buffet' />
          <TableQR.Text>Chúc quý khách ngon miệng!</TableQR.Text>
          <Spin size='large' />
          <TableQR.WaitingText>
            Vui lòng chờ cửa hàng xác nhận
          </TableQR.WaitingText>
        </TableQR.Overlay>
      </TableQR.Background>
    )
  }

  return (
    <>
      <TableQR.Background>
        {!isAlowShowForm && (
          <TableQR.Overlay>
            <TableQR.Title level={1}>Chào mừng bạn đến với</TableQR.Title>
            <TableQR.Logo src={MAIN_IMAGES.logoImage} alt='Sakura Buffet' />
            <TableQR.Text>Chúc quý khách ngon miệng!</TableQR.Text>
            {loading && <Spin size='large' />}
            {error && (
              <TableQR.TextError>
                QR không hợp lệ hoặc đã có lỗi xảy ra
              </TableQR.TextError>
            )}
          </TableQR.Overlay>
        )}
        {isAlowShowForm && (
          <>
            <TableQR.Card $width={widthCard}>
              <TableQR.LogoWrapper>
                <TableQR.Logo
                  src={MAIN_IMAGES.logoBlackImage}
                  alt='Sakura Buffet'
                />
              </TableQR.LogoWrapper>
              <Form
                layout='vertical'
                onFinish={formik.handleSubmit}
                style={{ width: '100%' }}
              >
                <FormItemControl
                  label='Số người'
                  name='numPeople'
                  formik={formik}
                >
                  <CustomInputNumber
                    name='numPeople'
                    value={formik.values.numPeople}
                    onChange={(event) =>
                      handleChangeFormData('numPeople', event)
                    }
                    min={1}
                    max={30}
                  />
                </FormItemControl>

                <FormItemControl
                  label='Chọn combo'
                  name='comboId'
                  formik={formik}
                >
                  <CustomSelect
                    placeholder='Chọn combo'
                    value={formik.values.comboId}
                    onChange={(value) => handleChangeFormData('comboId', value)}
                    optionLabelProp='label'
                  >
                    {comboList &&
                      comboList.map((dish) => (
                        <Select.Option
                          key={dish.id}
                          value={dish.id}
                          label={`${dish.name} - ${formatCurrency(dish.price)}`}
                        >
                          <Flex
                            gap={8}
                            alignItems='center'
                            justifyContent='space-between'
                          >
                            <TableQR.ImageSelect
                              src={dish.imageUrl || FALLBACK_IMAGES.noImage}
                              alt={dish.name}
                              style={{}}
                            />
                            <TableQR.OptionContainer>
                              <TableQR.OptionTitle>
                                {dish.name} - {dish.price}₫
                              </TableQR.OptionTitle>
                              <TableQR.OptionDescription>
                                {dish.description}
                              </TableQR.OptionDescription>
                            </TableQR.OptionContainer>
                          </Flex>
                        </Select.Option>
                      ))}
                  </CustomSelect>
                </FormItemControl>

                <FormItemControl>
                  <CustomButton
                    type='primary'
                    htmlType='submit'
                    loading={actionLoading}
                    block
                  >
                    Xác nhận
                  </CustomButton>
                </FormItemControl>
              </Form>
            </TableQR.Card>
          </>
        )}
      </TableQR.Background>
    </>
  )
}

export default GuestTableQRPage
