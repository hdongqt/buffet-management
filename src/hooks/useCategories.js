import * as Yup from 'yup'
import { useState } from 'react'
import { useFormik } from 'formik'
import { useSelector, useDispatch } from 'react-redux'

import VALIDATION_MESSAGE from '@/constants/validationMessage'

import {
  createCategoriesRequest,
  deleteCategoriesRequest,
  fetchCategoriesRequest,
  updateCategoriesRequest,
} from '@/sagas/categories/categoriesSlice'

import useDebounceCallback from './useDebounceCallback'

const useCategoriesManagement = () => {
  const dispatch = useDispatch()
  const { categoriesList, loading, pagination, filters } = useSelector(
    (state) => state.categories
  )
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingRecord, setEditingRecord] = useState(null)

  const fetchCategories = async (params) => {
    await dispatch(fetchCategoriesRequest({ params }))
  }

  const showModal = () => {
    setEditingRecord(null)
    setIsModalOpen(true)
  }

  const deleteCategory = async (id) => {
    await dispatch(deleteCategoriesRequest({ id }))
    fetchCategories({ params: filters })
  }

  const handleEditCategory = (record) => {
    setEditingRecord(record)
    setIsModalOpen(true)
  }

  const initialValues = {
    name: editingRecord?.name || '',
  }

  const validationSchema = Yup.object({
    name: Yup.string().required(VALIDATION_MESSAGE.REQUIRED('Tên danh mục')),
  })

  const formik = useFormik({
    initialValues,
    validationSchema,
    enableReinitialize: true,
    onSubmit: (values, { resetForm }) => {
      if (editingRecord) {
        dispatch(
          updateCategoriesRequest({
            id: editingRecord.id,
            values,
            callback: () => {
              dispatch(fetchCategoriesRequest({ params: filters }))
              resetForm()
              setIsModalOpen(false)
              setEditingRecord(null)
            },
          })
        )
      } else {
        dispatch(
          createCategoriesRequest({
            values,
            callback: () => {
              dispatch(fetchCategoriesRequest({ params: filters }))
              resetForm()
              setIsModalOpen(false)
            },
          })
        )
      }
    },
  })

  const handleSubmit = (values) => {
    const payload = { ...values }
    dispatch(
      updateCategoriesRequest({
        id: values.id,
        values: payload,
        callback: () => {
          dispatch(fetchCategoriesRequest({ params: filters }))
          formik.resetForm()
        },
      })
    )
  }

  const formikSearch = useFormik({
    initialValues: { ...filters },
    onSubmit: handleSubmit,
  })

  const debounceSearchInput = useDebounceCallback((value) => {
    fetchCategories({ ...filters, search: value, page: 1 })
  }, 500)

  const onSearchChange = (value) => {
    formikSearch.setFieldValue('search', value)
    debounceSearchInput(value)
  }

  const handlePaginationChange = ({ page, limit }) => {
    fetchCategories({ ...filters, page, limit })
  }

  return {
    fetchCategories,
    categoriesList,
    loading,
    pagination,
    handlePaginationChange,
    onSearchChange,
    formikSearch,
    formik,
    handleSubmit,
    showModal,
    isModalOpen,
    setIsModalOpen,
    handleEditCategory,
    editingRecord,
    deleteCategory,
  }
}

export default useCategoriesManagement
