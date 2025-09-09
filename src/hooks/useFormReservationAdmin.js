import { useFormik } from 'formik'
import { useDispatch, useSelector } from 'react-redux'
import dayjs from 'dayjs'

import DATE_FORMAT from '@/constants/dateTimeFormat'

import { getReservationRequest } from '@/sagas/reservation/reservationSlice'
import useDebounceCallback from '@/hooks/useDebounceCallback'
import { useState } from 'react'

export const useReservationFormAdmin = () => {
  const dispatch = useDispatch()
  const { loading, success, filters } = useSelector(
    (state) => state.reservation
  )

  const [editingRecord, setEditingRecord] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const showModal = () => {
    setEditingRecord(null)
    setIsModalOpen(true)
  }

  const handleEdit = (record) => {
    setEditingRecord(record)
    setIsModalOpen(true)
  }

  const fetchReservations = async (params) => {
    await dispatch(getReservationRequest({ params }))
  }

  const handlePaginationChange = ({ page, limit }) => {
    fetchReservations({ ...filters, page, limit })
  }

  const handleResetFilters = () => {
    formikSearch.resetForm()
    fetchReservations()
  }

  const formikSearch = useFormik({
    initialValues: {
      ...filters,
      dateFilter: filters?.reservedAt
        ? dayjs(filters.reservedAt, DATE_FORMAT.FULL_DATE)
        : null,
    },
  })

  const debouncedSearchInput = useDebounceCallback((value) => {
    fetchReservations({ ...filters, search: value, page: 1 })
  }, 500)

  const onChangeFilter = (name, value) => {
    formikSearch.setFieldValue(name, value)

    if (name === 'search') {
      debouncedSearchInput(value)
    } else if (name === 'dateFilter') {
      const dateString = value
        ? dayjs(value).format(DATE_FORMAT.FULL_DATE)
        : null
      fetchReservations({ ...filters, reservedAt: dateString, page: 1 })
    } else {
      fetchReservations({ ...filters, [name]: value, page: 1 })
    }
  }

  return {
    loading,
    success,
    handlePaginationChange,
    handleResetFilters,
    fetchReservations,
    debouncedSearchInput,
    formikSearch,
    onChangeFilter,
    editingRecord,
    isModalOpen,
    setIsModalOpen,
    showModal,
    handleEdit,
  }
}
