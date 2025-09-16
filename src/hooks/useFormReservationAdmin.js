import { useFormik } from 'formik'
import { useDispatch, useSelector } from 'react-redux'
import dayjs from 'dayjs'

import DATE_FORMAT from '@/constants/dateTimeFormat'

import {
  getReservationRequest,
  getTableAvailableRequest,
} from '@/sagas/reservation/reservationSlice'
import useDebounceCallback from '@/hooks/useDebounceCallback'
import { useState } from 'react'
import { getHasFilters } from '@/utils/getHasFilter'

export const useReservationFormAdmin = () => {
  const dispatch = useDispatch()
  const {
    loading,
    success,
    filters,
    pagination,
    reservationList,
    actionLoading,
    availableTables,
  } = useSelector((state) => state.reservation)

  const [editingRecord, setEditingRecord] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const showModal = () => {
    setEditingRecord(null)
    setIsModalOpen(true)
  }

  const onCloseModal = () => {
    setEditingRecord(null)
    setIsModalOpen(false)
  }

  const handleEdit = (record) => {
    setEditingRecord(record)
    setIsModalOpen(true)

    dispatch(
      getTableAvailableRequest({
        dateBooking: dayjs(record.reservedAt).format(DATE_FORMAT.FULL_DATE),
        timeBooking: dayjs(record.reservedAt).format(DATE_FORMAT.TIME),
        numPeople: record.numPeople,
      })
    )
  }

  const fetchReservations = async (newFilters) => {
    await dispatch(getReservationRequest({ params: newFilters || filters }))
  }

  const handlePaginationChange = ({ page, limit }) => {
    fetchReservations({ ...filters, page, limit })
  }

  const handleResetFilters = () => {
    const initialValues = {
      status: '',
      search: '',
      reservedAt: null,
      page: 1,
      limit: 20,
    }
    formikSearch.resetForm()
    fetchReservations(initialValues)
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

  const hasFilter = getHasFilters(formikSearch.values, ['page', 'limit'])

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
    onCloseModal,
    pagination,
    availableTables,
    actionLoading,
    reservationList,
    hasFilter,
  }
}
