import { reservationRequest } from '@/sagas/reservation/reservationSlice'
import dayjs from 'dayjs'
import { useFormik } from 'formik'
import { useSelector, useDispatch } from 'react-redux'
import * as Yup from 'yup'

export const useReservationForm = () => {
  const dispatch = useDispatch()
  const { loading, success } = useSelector((state) => state.reservation)

  const validationSchema = Yup.object({
    fullname: Yup.string().required('Tên không được để trống'),
    phone: Yup.string()
      .matches(/^(0[3|5|7|8|9])[0-9]{8}$/, 'Số điện thoại không hợp lệ')
      .required('Số điện thoại không được để trống'),
    dateBooking: Yup.date()
      .required('Ngày không được để trống')
      .min(dayjs().startOf('day'), 'Ngày không hợp lệ'),
    timeBooking: Yup.mixed()
      .nullable()
      .required('Giờ không được để trống')
      .test(
        'time-range',
        'Giờ phải trong khoảng từ 10:00 - 20:00',
        function (value) {
          if (!value) return true
          const timeStr = dayjs(value).format('HH:mm')
          const hour = parseInt(timeStr.split(':')[0])
          return hour >= 10 && hour <= 20
        }
      )
      .test(
        'not-past-time',
        'Không được chọn giờ nhỏ hơn giờ hiện tại',
        function (value) {
          if (!value) return true

          const selectedDate = this.parent.dateBooking
          if (!selectedDate) return true

          const selectedDay = dayjs(selectedDate).format('YYYY-MM-DD')
          const currentDay = dayjs().format('YYYY-MM-DD')

          if (selectedDay === currentDay) {
            const selectedTime = dayjs(value).format('HH:mm')
            const currentTime = dayjs().format('HH:mm')

            return selectedTime >= currentTime
          }

          return true
        }
      ),
    numPeople: Yup.number()
      .nullable()
      .min(1, 'Ít nhất 1 khách là bắt buộc')
      .required('Số lượng khách là bắt buộc'),
  })

  const initialValues = {
    fullname: '',
    phone: '',
    dateBooking: null,
    timeBooking: null,
    numPeople: null,
    note: '',
  }

  const onSubmit = (data) => {
    const payload = {
      ...data,
      dateBooking: data.dateBooking
        ? dayjs(data.dateBooking).format('YYYY-MM-DD')
        : null,
      timeBooking: data.timeBooking
        ? dayjs(data.timeBooking).format('HH:mm')
        : null,
    }

    dispatch(reservationRequest({ values: payload }))
  }

  const formik = useFormik({
    initialValues,
    validationSchema,
    validateOnChange: false,
    validateOnBlur: true,
    onSubmit,
  })

  const onChangeFormItem = (fieldName, value) => {
    formik.setFieldValue(fieldName, value)
  }

  return { formik, onChangeFormItem, loading, success }
}
