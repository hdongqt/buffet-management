import ReservationLogo from '@/assets/images/home/reservation/reservation-logo.png'
import {
  Form,
  Button,
  Input,
  Select,
  TimePicker,
  DatePicker,
  Row,
  Col,
} from 'antd'
import { ReservationFormStyled } from './styled'
import FormItemControl from '../formItemControl'
import { useReservationForm } from '@/hooks/useFormReservation'

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
    <ReservationFormStyled>
      <section className='reservation'>
        <div className='reservation__logo'>
          <img src={ReservationLogo} alt='Reservation Logo' />
        </div>
        <div className='reservation__background'>
          <div className='reservation__form'>
            <h3 className='reservation__form-title'>Đặt bàn</h3>
            <Form>
              <FormItemControl formik={formik}>
                <Row gutter={20} className='reservation__row'>
                  <Col xs={24} md={12}>
                    <Input placeholder='Nhập tên của bạn' size='large' />
                  </Col>
                  <Col xs={24} md={12}>
                    <Input placeholder='Số điện thoại' size='large' />
                  </Col>
                </Row>
              </FormItemControl>

              <FormItemControl formik={formik}>
                <Row gutter={20} className='reservation__row'>
                  <Col xs={24} md={12}>
                    <DatePicker
                      size='large'
                      placeholder='Chọn ngày'
                      className='reservation__picker'
                    />
                  </Col>
                  <Col xs={24} md={12}>
                    <TimePicker
                      size='large'
                      placeholder='Chọn giờ'
                      format={format}
                      className='reservation__picker'
                    />
                  </Col>
                </Row>
              </FormItemControl>

              <FormItemControl>
                <Row gutter={20} className='reservation__row'>
                  <Col xs={24} md={12}>
                    <Select
                      size='large'
                      showSearch
                      placeholder='Loại bàn'
                      options={listOptionTable}
                      className='reservation__select'
                    />
                  </Col>
                  <Col xs={24} md={12}>
                    <Select
                      size='large'
                      showSearch
                      placeholder='Số khách'
                      options={listOptionSeat}
                      className='reservation__select'
                    />
                  </Col>
                </Row>
              </FormItemControl>

              <FormItemControl>
                <Input.TextArea
                  placeholder='Ghi chú'
                  rows={5}
                  className='reservation__textarea'
                />
              </FormItemControl>

              <Button
                type='primary'
                htmlType='submit'
                className='reservation__submit'
              >
                ĐẶT BÀN NGAY
              </Button>
            </Form>
          </div>
        </div>
      </section>
    </ReservationFormStyled>
  )
}
