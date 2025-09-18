import { getReportRequest } from '@/sagas/reportManager/reportManagerSlice'
import { useDispatch, useSelector } from 'react-redux'

import dayjs from 'dayjs'
import * as Yup from 'yup'
import { useFormik } from 'formik'

import { useState } from 'react'
import DATE_FORMAT from '@/constants/dateTimeFormat'

const useReportManager = () => {
  const dispatch = useDispatch()
  const [topTypeSelected, setTopTypeSelected] = useState('combo')
  const { reports, loading, filters } = useSelector(
    (state) => state.reportManager
  )

  const formik = useFormik({
    initialValues: {
      startDate: dayjs().format(DATE_FORMAT.FULL_DATE),
      endDate: dayjs().format(DATE_FORMAT.FULL_DATE),
    },
    validationSchema: Yup.object({
      startDate: Yup.date().required('Ngày bắt đầu là bắt buộc'),
      endDate: Yup.date().required('Ngày kết thúc là bắt buộc'),
    }),
  })

  const getReports = () => {
    dispatch(
      getReportRequest({
        params: {
          startDate: formik.values.startDate,
          endDate: formik.values.endDate,
        },
      })
    )
  }

  const onChangeDate = (value, type) => {
    const dateString = dayjs(value).format(DATE_FORMAT.FULL_DATE)
    if (type === 'endDate') {
      dispatch(
        getReportRequest({ params: { ...filters, endDate: dateString } })
      )
    } else {
      dispatch(
        getReportRequest({ params: { ...filters, startDate: dateString } })
      )
    }
  }

  const handleResetFilters = () => {
    formik.resetForm()
    dispatch(
      getReportRequest({
        params: {
          startDate: dayjs().format('YYYY-MM-DD'),
          endDate: dayjs().format('YYYY-MM-DD'),
        },
      })
    )
  }

  const paymentData =
    reports &&
    Object.entries(reports.payments).map(([method]) => ({
      name: method === 'cash' ? 'Tiền mặt' : 'Chuyển khoản',
      value: reports.payments[method].total,
    }))

  return {
    topTypeSelected,
    setTopTypeSelected,
    reports,
    loading,
    formik,
    startDate: formik.values.startDate,
    endDate: formik.values.endDate,
    onChangeDate,
    getReports,
    handleResetFilters,
    paymentData,
  }
}

export default useReportManager
