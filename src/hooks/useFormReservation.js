import DATE_FORMAT from '@/constants/dateTimeFormat'
import { reservationRequest } from '@/sagas/reservation/reservationSlice'
import REGEX from '@/constants/regex'
import VALIDATION_MESSAGE from '@/constants/validationMessage'
import dayjs from 'dayjs'
import { useFormik } from 'formik'
import { useSelector, useDispatch } from 'react-redux'
import * as Yup from 'yup'

export const useReservationForm = () => {
  const dispatch = useDispatch()
  const { loading, success } = useSelector((state) => state.reservation)

  const validationSchema = Yup.object({
    fullname: Yup.string().required(VALIDATION_MESSAGE.REQUIRED('Tên')),
    phone: Yup.string()
      .matches(REGEX.PHONE_VN, VALIDATION_MESSAGE.INVALID_PHONE)
      .required(VALIDATION_MESSAGE.REQUIRED('Số điện thoại')),
    dateBooking: Yup.date()
      .required(VALIDATION_MESSAGE.REQUIRED('Ngày'))
      .min(dayjs().startOf('day'), VALIDATION_MESSAGE.INVALID_DATE),
    timeBooking: Yup.mixed()
      .nullable()
      .required(VALIDATION_MESSAGE.REQUIRED('Giờ'))
      .test('time-range', VALIDATION_MESSAGE.INVALID_TIME, function (value) {
        if (!value) return true
        const timeStr = dayjs(value).format(DATE_FORMAT.TIME)
        const hour = parseInt(timeStr.split(':')[0])
        return hour >= 10 && hour <= 20
      })
      .test('not-past-time', VALIDATION_MESSAGE.TIME_PAST, function (value) {
        if (!value) return true

        const selectedDate = this.parent.dateBooking
        if (!selectedDate) return true

        const selectedDay = dayjs(selectedDate).format(DATE_FORMAT.FULL_DATE)
        const currentDay = dayjs().format(DATE_FORMAT.FULL_DATE)

        if (selectedDay === currentDay) {
          const selectedTime = dayjs(value).format(DATE_FORMAT.TIME)
          const currentTime = dayjs().format(DATE_FORMAT.TIME)

          return selectedTime >= currentTime
        }

        return true
      }),
    numPeople: Yup.number()
      .nullable()
      .min(1, VALIDATION_MESSAGE.MIN_PEOPLE(1))
      .required(VALIDATION_MESSAGE.REQUIRED('Số khách')),
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
        ? dayjs(data.dateBooking).format(DATE_FORMAT.FULL_DATE)
        : null,
      timeBooking: data.timeBooking
        ? dayjs(data.timeBooking).format(DATE_FORMAT.TIME)
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

  const disabledDate = (current) => {
    return current && current < dayjs().startOf('day')
  }

  return { formik, onChangeFormItem, disabledDate, loading, success }
}
