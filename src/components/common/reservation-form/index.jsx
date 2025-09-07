import { Form, Col } from 'antd'

import { Reservation } from './styled'
import FormItemControl from '../formItemControl'
import { useReservationForm } from '@/hooks/useFormReservation'
import { HOME_RESERVATION } from '@/constants/images/homeUserImage'

import InputStyled from '../ui/Input'
import TimePickerStyled from '../ui/TimePicker'
import DatePickerStyled from '../ui/DatePicker'
import SelectStyled from '../ui/Select'
import TextAreaStyled from '../ui/TextArea'
import ButtonStyled from '../ui/Button'
import { useEffect } from 'react'

const format = 'HH:mm'

export default function ReservationForm() {
  const { formik, onChangeFormItem, disabledDate, loading, success } =
    useReservationForm()

  const listOptionSeat = Array.from({ length: 30 }, (_, i) => ({
    value: i + 1,
    label: `${i + 1} chỗ ngồi`,
  }))

  useEffect(() => {
    if (success) {
      formik.resetForm()
    }
  }, [success])

  return (
    <Reservation.Wrapper>
      <Reservation.Logo>
        <img src={HOME_RESERVATION.logoReservation} alt='Reservation Logo' />
      </Reservation.Logo>
      <Reservation.Background>
        <Reservation.FormBox>
          <h3>Đặt bàn</h3>
          <Form layout='vertical' onFinish={formik.handleSubmit}>
            <Reservation.Row gutter={20}>
              <Col xs={24} md={12}>
                <FormItemControl
                  label='Họ và tên'
                  formik={formik}
                  name='fullname'
                >
                  <InputStyled
                    name='fullname'
                    placeholder='Nhập tên của bạn'
                    value={formik.values.fullname}
                    onChange={(e) =>
                      onChangeFormItem('fullname', e.target.value)
                    }
                    onBlur={formik.handleBlur}
                  />
                </FormItemControl>
              </Col>
              <Col xs={24} md={12}>
                <FormItemControl
                  label='Số điện thoại'
                  formik={formik}
                  name='phone'
                >
                  <InputStyled
                    name='phone'
                    value={formik.values.phone}
                    onChange={(e) => onChangeFormItem('phone', e.target.value)}
                    onBlur={formik.handleBlur}
                    placeholder='Số điện thoại'
                  />
                </FormItemControl>
              </Col>
            </Reservation.Row>

            <Reservation.Row gutter={20}>
              <Col xs={24} md={8}>
                <FormItemControl
                  label={'Ngày'}
                  formik={formik}
                  name='dateBooking'
                >
                  <DatePickerStyled
                    name='dateBooking'
                    disabledDate={disabledDate}
                    value={formik.values.dateBooking}
                    onChange={(value) => onChangeFormItem('dateBooking', value)}
                    onBlur={formik.handleBlur}
                    placeholder='Chọn ngày'
                  />
                </FormItemControl>
              </Col>
              <Col xs={24} md={8}>
                <FormItemControl
                  label={'Giờ'}
                  formik={formik}
                  name='timeBooking'
                >
                  <TimePickerStyled
                    value={formik.values.timeBooking}
                    onChange={(value) => onChangeFormItem('timeBooking', value)}
                    onBlur={formik.handleBlur}
                    placeholder='Chọn giờ'
                    name='timeBooking'
                    format={format}
                  />
                </FormItemControl>
              </Col>
              <Col xs={24} md={8}>
                <FormItemControl
                  label={'Số khách'}
                  formik={formik}
                  name='numPeople'
                >
                  <SelectStyled
                    showSearch
                    placeholder='Số khách'
                    options={listOptionSeat}
                    value={formik.values.numPeople}
                    onChange={(value) => onChangeFormItem('numPeople', value)}
                  />
                </FormItemControl>
              </Col>
            </Reservation.Row>

            <FormItemControl label={'Ghi chú'} formik={formik} name='note'>
              <TextAreaStyled
                value={formik.values.note}
                onChange={(event) =>
                  onChangeFormItem('note', event.target.value)
                }
                placeholder='Ghi chú'
              />
            </FormItemControl>

            <ButtonStyled
              type='primary'
              size='large'
              htmlType='submit'
              loading={loading}
            >
              ĐẶT BÀN NGAY
            </ButtonStyled>
          </Form>
        </Reservation.FormBox>
      </Reservation.Background>
    </Reservation.Wrapper>
  )
}
