// hooks/useReservationFormAdmin.js
import { useFormik } from 'formik'
import { useDispatch, useSelector } from 'react-redux'
import dayjs from 'dayjs'
import * as Yup from 'yup'

import DATE_FORMAT from '@/constants/dateTimeFormat'
import REGEX from '@/constants/regex'
import VALIDATION_MESSAGE from '@/constants/validationMessage'

import {
  getReservationRequest,
  reservationRequest,
  updateReservationRequest,
  getTableAvailableRequest,
  getTableAvailableSuccess,
} from '@/sagas/reservation/reservationSlice'

export const useReservationFormAdminAction = (
  editingRecord,
  setIsModalOpen
) => {
  const dispatch = useDispatch()
  const { loading, success, filters } = useSelector(
    (state) => state.reservation
  )

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
    tableId: Yup.string().required(VALIDATION_MESSAGE.REQUIRED('Bàn')),
  })

  const initialValues = {
    fullname: editingRecord?.fullname || '',
    phone: editingRecord?.phone || '',
    dateBooking: editingRecord?.reservedAt
      ? dayjs(editingRecord.reservedAt)
      : null,
    timeBooking: editingRecord?.reservedAt
      ? dayjs(editingRecord.reservedAt)
      : null,
    numPeople: editingRecord?.numPeople || null,
    note: editingRecord?.note || '',
    tableId: editingRecord?.tableId || null,
    status: editingRecord?.status || '',
  }

  const handleSubmit = (values) => {
    const payload = {
      ...values,
      dateBooking: values.dateBooking
        ? dayjs(values.dateBooking).format(DATE_FORMAT.FULL_DATE)
        : null,
      timeBooking: values.timeBooking
        ? dayjs(values.timeBooking).format(DATE_FORMAT.TIME)
        : null,
    }

    if (editingRecord) {
      dispatch(
        updateReservationRequest({
          id: editingRecord._id || editingRecord.id,
          values: payload,
          callback: () => {
            dispatch(getReservationRequest({ params: filters }))
            dispatch(getTableAvailableSuccess([]))
            formik.resetForm()
            setIsModalOpen(false)
          },
        })
      )
    } else {
      dispatch(
        reservationRequest({
          values: payload,
          callback: () => {
            dispatch(getReservationRequest({ params: filters }))
            formik.resetForm()
            setIsModalOpen(false)
            dispatch(getTableAvailableSuccess([]))
          },
        })
      )
    }
  }

  const formik = useFormik({
    initialValues,
    enableReinitialize: true,
    validationSchema,
    onSubmit: handleSubmit,
  })

  const onChangeFormItem = (field, value) => {
    formik.setFieldValue(field, value)
  }

  const disabledDate = (current) => {
    return current && current < dayjs().startOf('day')
  }

  const handleGetTableAvailable = (date, time, numPeople) => {
    if (date && time && numPeople) {
      dispatch(
        getTableAvailableRequest({
          dateBooking: dayjs(date).format(DATE_FORMAT.FULL_DATE),
          timeBooking: dayjs(time).format(DATE_FORMAT.TIME),
          numPeople,
        })
      )

      if (editingRecord?.tableId) {
        formik.setFieldValue('tableId', editingRecord.tableId)
      }
    }
  }

  const handleDateChange = (date) => {
    formik.setFieldValue('tableId', null)
    formik.setFieldValue('dateBooking', date)
    handleGetTableAvailable(
      date,
      formik.values.timeBooking,
      formik.values.numPeople
    )
  }

  const handleTimeChange = (time) => {
    formik.setFieldValue('tableId', null)
    formik.setFieldValue('timeBooking', time)
    handleGetTableAvailable(
      formik.values.dateBooking,
      time,
      formik.values.numPeople
    )
  }

  const handleNumPeopleChange = (numPeople) => {
    formik.setFieldValue('tableId', null)
    formik.setFieldValue('numPeople', numPeople)
    handleGetTableAvailable(
      formik.values.dateBooking,
      formik.values.timeBooking,
      numPeople
    )
  }

  const fetchReservations = async (params) => {
    await dispatch(getReservationRequest({ params }))
  }

  const handlePaginationChange = ({ page, limit }) => {
    fetchReservations({ ...filters, page, limit })
  }

  return {
    formik,
    onChangeFormItem,
    loading,
    success,
    disabledDate,
    handleDateChange,
    handleTimeChange,
    handlePaginationChange,
    handleNumPeopleChange,
    fetchReservations,
  }
}
