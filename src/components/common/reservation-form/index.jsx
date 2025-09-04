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

const format = 'HH:mm'

export default function ReservationForm() {
  const { formik } = useReservationForm()

  const listOptionSeat = [
    { value: '1', label: '1 chỗ ngồi' },
    { value: '2', label: '2 chỗ ngồi' },
    { value: '3', label: '3 chỗ ngồi' },
    { value: '4', label: '4 chỗ ngồi' },
    { value: '5', label: '5 chỗ ngồi' },
    { value: '6', label: '6 chỗ ngồi' },
  ]

  const listOptionTable = [
    { value: 0, label: 'Không yêu cầu' },
    { value: 4, label: 'Bàn 4 người' },
    { value: 6, label: 'Bàn 6 người' },
    { value: 8, label: 'Bàn 8 người' },
    { value: 10, label: 'Bàn 10 người' },
  ]

  return (
    <Reservation.Wrapper>
      <Reservation.Logo>
        <img src={HOME_RESERVATION.logoReservation} alt='Reservation Logo' />
      </Reservation.Logo>
      <Reservation.Background>
        <Reservation.FormBox>
          <h3>Đặt bàn</h3>
          <Form>
            <FormItemControl formik={formik}>
              <Reservation.Row gutter={20}>
                <Col xs={24} md={12}>
                  <InputStyled name='name' placeholder='Nhập tên của bạn' />
                </Col>
                <Col xs={24} md={12}>
                  <InputStyled name='phone' placeholder='Số điện thoại' />
                </Col>
              </Reservation.Row>
            </FormItemControl>

            <FormItemControl formik={formik}>
              <Reservation.Row gutter={20}>
                <Col xs={24} md={12}>
                  <DatePickerStyled size='large' placeholder='Chọn ngày' />
                </Col>
                <Col xs={24} md={12}>
                  <TimePickerStyled placeholder='Chọn giờ' format={format} />
                </Col>
              </Reservation.Row>
            </FormItemControl>

            <FormItemControl>
              <Reservation.Row gutter={20}>
                <Col xs={24} md={12}>
                  <SelectStyled
                    showSearch
                    placeholder='Loại bàn'
                    options={listOptionTable}
                  />
                </Col>
                <Col xs={24} md={12}>
                  <SelectStyled
                    showSearch
                    placeholder='Số khách'
                    options={listOptionSeat}
                  />
                </Col>
              </Reservation.Row>
            </FormItemControl>

            <FormItemControl>
              <TextAreaStyled placeholder='Ghi chú' />
            </FormItemControl>
            <ButtonStyled type='primary'>ĐẶT BÀN NGAY</ButtonStyled>
          </Form>
        </Reservation.FormBox>
      </Reservation.Background>
    </Reservation.Wrapper>
  )
}
