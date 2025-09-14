import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useFormik } from 'formik'

import {
  fetchOrdersRequest,
  postCancelOrderRequest,
  postConfirmOrderRequest,
} from '@/sagas/orderManager/orderManagerSlice'

import useDebounceCallback from '@/hooks/useDebounceCallback'

const useOrderManagement = () => {
  const dispatch = useDispatch()

  const { orders, order, cart, loading, actionLoading, pagination, filters } =
    useSelector((state) => state.orderManager)

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
  const closeModalFood = () => {
    setModalFoodState({ open: false, record: null })
  }

  const openDetailModal = (record) => {
    setDetailModalState({ open: true, record })
  }
  const closeDetailModal = () => {
    setDetailModalState({ open: false, record: null })
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

  return {
    orders,
    order,
    cart,
    loading,
    actionLoading,
    pagination,
    filters,

    formikSearch,

    fetchOrders,
    handleChangeStatus,

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
  }
}

export default useOrderManagement
