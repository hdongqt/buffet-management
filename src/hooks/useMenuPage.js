import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useFormik } from 'formik'

import { fetchMenuListRequest } from '@/sagas/menuManagement/menuSlice'

import useDebounceCallback from '@/hooks/useDebounceCallback'
import useMenuManagement from '@/hooks/useMenuManagement'
import { getHasFilters } from '@/utils/getHasFilter'

const useMenuPage = () => {
  const dispatch = useDispatch()
  const {
    menuList,
    listDish,
    cart,
    loading,
    actionLoading,
    pagination,
    filters,
    deleteMenu,
    fetchDishes,
  } = useMenuManagement()

  const [modalState, setModalState] = useState({ open: false, record: null })
  const openModal = (record = null) => setModalState({ open: true, record })
  const closeModal = () => setModalState({ open: false, record: null })

  const formikSearch = useFormik({
    initialValues: {
      search: '',
      isCombo: '',
      sortBy: '',
      order: '',
    },
  })

  const fetchMenuList = async (overrideParams) => {
    await dispatch(
      fetchMenuListRequest({
        params: overrideParams || filters,
      })
    )
  }

  const debouncedSearch = useDebounceCallback((val) => {
    fetchMenuList({ ...filters, search: val || undefined })
  }, 500)

  const handleFilter = (name, value) => {
    formikSearch.setFieldValue(name, value)

    if (name === 'search') {
      debouncedSearch(value)
    } else {
      fetchMenuList({ ...filters, [name]: value })
    }
  }

  const handlePageChange = (newPagination) => {
    fetchMenuList({
      ...filters,
      page: newPagination.page,
      limit: newPagination.limit,
    })
  }

  const handleDishPageChange = (newPagination) => {
    fetchDishes({
      page: newPagination.page,
      limit: newPagination.limit,
    })
  }

  const handleResetFilters = () => {
    formikSearch.resetForm()
    fetchMenuList({})
  }

  const hasFilterMenu = getHasFilters(formikSearch.values, ['page', 'limit'])

  return {
    menuList,
    listDish,
    cart,
    loading,
    actionLoading,
    pagination,

    fetchMenuList,
    deleteMenu,

    modalState,
    openModal,
    closeModal,

    formikSearch,
    handleFilter,
    handlePageChange,
    handleDishPageChange,
    handleResetFilters,
    hasFilterMenu,
  }
}

export default useMenuPage
