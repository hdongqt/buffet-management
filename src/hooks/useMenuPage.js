import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useFormik } from 'formik'

import { fetchMenuListRequest } from '@/sagas/menuManagement/menuSlice'

import useDebounceCallback from '@/hooks/useDebounceCallback'
import useMenuManagement from '@/hooks/useMenuManagement'

const useMenuPage = () => {
  const dispatch = useDispatch()
  const { menuList, loading, actionLoading, pagination, filters, deleteMenu } =
    useMenuManagement()

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

  const handleTableChange = (newPagination) => {
    fetchMenuList({
      ...filters,
      page: newPagination.page,
      limit: newPagination.limit,
    })
  }

  const handleResetFilters = () => {
    formikSearch.resetForm()
    fetchMenuList()
  }

  return {
    menuList,
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
    handleTableChange,
    handleResetFilters,
  }
}

export default useMenuPage
