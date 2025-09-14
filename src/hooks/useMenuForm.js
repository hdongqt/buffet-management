import * as Yup from 'yup'
import { useDispatch } from 'react-redux'
import { useFormik } from 'formik'

import VALIDATION_MESSAGE from '@/constants/validationMessage'

import {
  fetchMenuListRequest,
  postMenuRequest,
  putMenuRequest,
} from '@/sagas/menuManagement/menuSlice'

import useMenuManagement from '@/hooks/useMenuManagement'

const useMenuForm = ({ initialValues, onClose }) => {
  const dispatch = useDispatch()
  const { menuList, filters } = useMenuManagement()

  const validationSchema = Yup.object({
    name: Yup.string()
      .required(VALIDATION_MESSAGE.REQUIRED('Tên món'))
      .min(2, VALIDATION_MESSAGE.MIN_LENGTH('Tên món', 2))
      .max(35, VALIDATION_MESSAGE.MAX_LENGTH('Tên món', 35)),
    description: Yup.string().max(
      255,
      VALIDATION_MESSAGE.MAX_LENGTH('Mô tả', 35)
    ),
    price: Yup.number()
      .required(VALIDATION_MESSAGE.REQUIRED('Giá'))
      .min(1, VALIDATION_MESSAGE.MIN_NUMBER('Giá', 1)),
    imageUrl: Yup.string().url(VALIDATION_MESSAGE.INVALID_URL),
    categoryId: Yup.string().when('isCombo', {
      is: false,
      then: (schema) =>
        schema.required(VALIDATION_MESSAGE.REQUIRED('Loại món ăn')),
      otherwise: (schema) => schema.notRequired(),
    }),
    status: Yup.string().when('isCombo', {
      is: false,
      then: (schema) =>
        schema.required(VALIDATION_MESSAGE.REQUIRED('Trạng thái')),
      otherwise: (schema) => schema.notRequired(),
    }),
    comboItems: Yup.array(),
  })

  const defaultValues = {
    name: initialValues?.name || '',
    description: initialValues?.description || '',
    price: initialValues?.price || '',
    imageUrl: initialValues?.imageUrl || '',
    status: initialValues?.status || '',
    categoryId: initialValues?.categoryId || '',
    comboItems: initialValues?.comboItems?.map((item) => item.id) || [],
    isCombo: initialValues?.isCombo || false,
  }

  const handleSubmit = async (values) => {
    const payload = { isCombo, ...values }

    if (isCombo) {
      delete payload.categoryId
      delete payload.status
    } else {
      delete payload.comboItems
    }

    if (initialValues?.id) {
      await dispatch(
        putMenuRequest({
          id: initialValues?.id,
          values: payload,
          callback: updateCallback,
        })
      )
    } else {
      await dispatch(
        postMenuRequest({
          values: payload,
          callback: addCallback,
        })
      )
    }
  }

  const formik = useFormik({
    initialValues: defaultValues,
    validationSchema,
    validateOnChange: false,
    validateOnBlur: true,
    onSubmit: handleSubmit,
    enableReinitialize: true,
  })

  const onChangeFormItem = (fieldName, value) => {
    formik.setFieldValue(fieldName, value)
  }

  const isCombo = formik.values.isCombo
  const selectedComboItems = formik.values.comboItems || []

  const foodItemList = menuList
    .filter((item) => !item.isCombo && item.id !== initialValues?.id)
    .map((item) => ({
      label: item.name,
      value: item.id,
    }))

  const foodMap = (id) => {
    const map = foodItemList?.find((f) => f.value === id)?.label

    return map
  }

  const addCallback = async () => {
    await dispatch(fetchMenuListRequest({ params: { ...filters, page: 1 } }))
    formik.resetForm()
    onClose()
  }

  const updateCallback = async () => {
    await dispatch(fetchMenuListRequest({ params: { ...filters } }))
    onClose()
  }

  return {
    formik,
    foodItemList,
    foodMap,
    selectedComboItems,
    isCombo,
    onChangeFormItem,
  }
}

export default useMenuForm
