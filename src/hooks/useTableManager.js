import { useState } from 'react'
import { useFormik } from 'formik'
import { useDispatch, useSelector } from 'react-redux'
import {
  fetchTablesRequest,
  updateStatusTableRequest,
} from '@/sagas/tableManager/tableManagerSlice'

import { RESTAURANT_TABLE_STATUS } from '@/constants/status'

import { useDebounceCallback } from '@/hooks'
import { getHasFilters } from '@/utils/getHasFilter'

const useTableManager = () => {
  const { tables, loading, filters, pagination } = useSelector(
    (state) => state.tableManager
  )
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingTable, setEditingTable] = useState(null)

  const [reservationData, setReservationData] = useState(null)

  const dispatch = useDispatch()

  const formikSearch = useFormik({
    initialValues: {
      tableNumber: filters.tableNumber || '',
      status: filters.status || '',
      sortBy: filters.sortBy || 'createdAt',
      order: filters.order || '',
    },
    enableReinitialize: true,
  })

  const fetchTables = async (newFilters) => {
    await dispatch(fetchTablesRequest({ params: newFilters || filters }))
  }

  const debouncedSearchInput = useDebounceCallback((value) => {
    fetchTables({
      ...filters,
      search: value,
    })
  }, 500)

  const handleChangeStatus = (record) => {
    const newStatus =
      record.status === RESTAURANT_TABLE_STATUS.AVAILABLE
        ? RESTAURANT_TABLE_STATUS.DISABLED
        : RESTAURANT_TABLE_STATUS.AVAILABLE
    dispatch(
      updateStatusTableRequest({
        id: record.id,
        status: newStatus,
        callback: async () => {
          await fetchTables()
        },
      })
    )
  }

  const onChangeFilter = (name, value) => {
    formikSearch.setFieldValue(name, value)

    if (name === 'tableNumber') {
      debouncedSearchInput(value)
    } else {
      fetchTables({ ...filters, [name]: value })
    }
  }

  const handleResetFilters = () => {
    formikSearch.resetForm()
    fetchTables({
      page: 1,
      limit: 20,
      search: '',
    })
  }

  const onChangePagination = (newPagination) => {
    fetchTables({
      ...filters,
      page: newPagination.page,
      limit: newPagination.limit,
    })
  }

  const getTitleActionStatus = (record) => {
    const textAction = record?.status === 'disabled' ? 'Khôi phục' : 'Tạm dừng'
    return `${textAction} hoạt động bàn số ${record?.tableNumber} !`
  }

  const listTableOptions = (tables || []).map((item) => ({
    label: `Bàn ${item.tableNumber} - ${item.capacity} chỗ ngồi`,
    value: item.id,
  }))

  const hasFilterTable =
    getHasFilters(formikSearch.values, ['page', 'limit', 'sortBy']) ||
    formikSearch.values.sortBy !== 'createdAt'

  return {
    tables,
    listTableOptions,
    loading,
    filters,
    pagination,
    isModalOpen,
    setIsModalOpen,
    editingTable,
    setEditingTable,
    formikSearch,
    fetchTables,
    handleChangeStatus,
    debouncedSearchInput,
    onChangeFilter,
    onChangePagination,
    getTitleActionStatus,
    handleResetFilters,
    reservationData,
    setReservationData,
    hasFilterTable,
  }
}

export default useTableManager

