import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useFormik } from 'formik'

import {
  fetchOrdersRequest,
  postCancelOrderRequest,
  postConfirmOrderRequest,
  resetOrder,
  resetPayment,
} from '@/sagas/orderManager/orderManagerSlice'

import useDebounceCallback from '@/hooks/useDebounceCallback'
import { getHasFilters } from '@/utils/getHasFilter'

const useOrderManagement = () => {
  const dispatch = useDispatch()

  const {
    orders,
    order,
    payment,
    cart,
    loading,
    actionLoading,
    pagination,
    filters,
  } = useSelector((state) => state.orderManager)

  const formikSearch = useFormik({
    initialValues: {
      status: '',
      tableNumber: '',
    },
  })

  const fetchOrders = async (params = {}) => {
    await dispatch(
      fetchOrdersRequest({
        params: {
          ...filters,
          page: 1,
          limit: pagination?.limit,
          ...params,
        },
      })
    )
  }

  const debounceSearch = useDebounceCallback((value) => {
    fetchOrders({ tableNumber: value })
  }, 500)

  const handleChangeFilter = (name, value) => {
    formikSearch.setFieldValue(name, value)

    if (name === 'tableNumber') {
      debounceSearch(value)
    } else {
      fetchOrders({ [name]: value, page: 1 })
    }
  }

  const handleResetFilters = () => {
    formikSearch.resetForm()
    fetchOrders({
      status: '',
      tableNumber: '',
      page: 1,
    })
  }

  const handlePagination = ({ page, limit }) => {
    fetchOrders({ ...filters, page, limit })
  }

  const [modalState, setModalState] = useState({ open: false, record: null })
  const [modalFoodState, setModalFoodState] = useState({
    open: false,
    record: null,
  })
  const [detailModalState, setDetailModalState] = useState({
    open: false,
    record: null,
  })

  const openModal = (record = null) => {
    setModalState({ open: true, record })
  }
  const closeModal = () => {
    setModalState({ open: false, record: null })
  }

  const openModalFood = (record = null) => {
    setModalFoodState({ open: true, record })
  }
  const closeModalFood = async () => {
    setModalFoodState({ open: false, record: null })
    await dispatch(resetOrder())
  }

  const openDetailModal = (record) => {
    setDetailModalState({ open: true, record })
  }
  const closeDetailModal = async () => {
    setDetailModalState({ open: false, record: null })
    await dispatch(resetPayment())
  }

  const handleChangeStatus = async (id, status) => {
    if (status === 'confirmed') {
      await dispatch(postConfirmOrderRequest({ id, callback: commonCallback }))
    } else {
      await dispatch(postCancelOrderRequest({ id, callback: commonCallback }))
    }
  }

  const commonCallback = async () => {
    await dispatch(fetchOrdersRequest({ params: {} }))
  }

  const hasFilterOrder = getHasFilters(formikSearch.values, ['page', 'limit'])

  const checkOrdered = (record) =>
    record?.normalDishes?.some((item) => item?.status === 'completed') ?? false

  const canUpdateStatus = (record) => {
    checkOrdered(record)
    if (!record) return false
    const excludedStatuses = ['paid', 'cancelled']
    return (
      (checkOrdered(record) === false || record.status === 'pending') &&
      !excludedStatuses.includes(record.status)
    )
  }

  return {
    orders,
    order,
    payment,
    cart,
    loading,
    actionLoading,
    pagination,
    filters,

    formikSearch,

    fetchOrders,
    handleChangeStatus,
    checkOrdered,
    canUpdateStatus,

    openModal,
    modalState,
    closeModal,
    openModalFood,
    modalFoodState,
    closeModalFood,
    openDetailModal,
    detailModalState,
    closeDetailModal,

    handleChangeFilter,
    handleResetFilters,
    handlePagination,
    hasFilterOrder,
  }
}

export default useOrderManagement
