import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import dayjs from 'dayjs'
import { useFormik } from 'formik'

import { getReportRequest } from '@/sagas/reportManager/reportManagerSlice'

import DATE_FORMAT from '@/constants/dateTimeFormat'
import { PAYMENT_METHOD_OPTIONS } from '@/constants/options'

const DATE_START_MONTH = dayjs().startOf('month').format(DATE_FORMAT.FULL_DATE)
const TODAY = dayjs().format(DATE_FORMAT.FULL_DATE)

const useReportManager = () => {
  const dispatch = useDispatch()
  const [topTypeSelected, setTopTypeSelected] = useState('combo')
  const { reports, loading, filters } = useSelector(
    (state) => state.reportManager
  )

  const formik = useFormik({
    initialValues: {
      startDate: filters.startDate || DATE_START_MONTH,
      endDate: filters.endDate || TODAY,
      filterBy: filters.filterBy || 'thisMonth',
    },
    enableReinitialize: true,
  })

  const getReports = () => {
    dispatch(
      getReportRequest({
        params: {
          startDate: formik.values.startDate,
          endDate: formik.values.endDate,
          filterBy: formik.values.filterBy,
        },
      })
    )
  }

  const onChangeDate = (value, type) => {
    const dateString = dayjs(value).format(DATE_FORMAT.FULL_DATE)
    if (type === 'endDate') {
      dispatch(
        getReportRequest({
          params: { ...filters, endDate: dateString, filterBy: 'all' },
        })
      )
    } else {
      dispatch(
        getReportRequest({
          params: { ...filters, startDate: dateString, filterBy: 'all' },
        })
      )
    }
  }

  const handleResetFilters = () => {
    dispatch(
      getReportRequest({
        params: {
          startDate: DATE_START_MONTH,
          endDate: TODAY,
        },
        callback: () => formik.resetForm(),
      })
    )
  }

  const handleQuickFilter = async (type) => {
    let startDate, endDate
    if (type === 'today') {
      startDate = TODAY
      endDate = TODAY
    }

    if (type === 'thisMonth') {
      startDate = DATE_START_MONTH
      endDate = TODAY
    }

    await dispatch(
      getReportRequest({
        params: { startDate, endDate, filterBy: type },
      })
    )
  }

  const paymentData =
    reports &&
    Object.entries(reports.payments).map(([method]) => ({
      name:
        PAYMENT_METHOD_OPTIONS.find((item) => item.value === method)?.label ||
        '',
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
    handleQuickFilter,
  }
}

export default useReportManager
