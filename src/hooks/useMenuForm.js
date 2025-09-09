import * as Yup from 'yup'
import { useMemo } from 'react'
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
  const { menuList } = useMenuManagement()

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
    status: Yup.string().required(VALIDATION_MESSAGE.REQUIRED('Trạng thái')),
    comboItems: Yup.array(),
  })

  const defaultValues = {
    name: '',
    description: '',
    price: null,
    imageUrl: '',
    status: '',
    comboItems: [],
  }

  const normalizedInitialValues = useMemo(() => {
    if (!initialValues) return defaultValues

    return {
      ...initialValues,
      comboItems: initialValues.comboItems?.map((item) => item.id) || [],
    }
  }, [initialValues])

  const handleSubmit = async (values) => {
    if (initialValues?.id) {
      await dispatch(putMenuRequest({ values, callback: commonCallback }))
    } else {
      await dispatch(postMenuRequest({ values, callback: commonCallback }))
    }
  }

  const commonCallback = async () => {
    await dispatch(fetchMenuListRequest())
    formik.resetForm()
    onClose()
  }

  const formik = useFormik({
    initialValues: normalizedInitialValues,
    validationSchema,
    validateOnChange: false,
    validateOnBlur: true,
    onSubmit: handleSubmit,
    enableReinitialize: true,
  })

  const onChangeFormItem = (fieldName, value) => {
    formik.setFieldValue(fieldName, value)
  }

  const foodItemList = menuList
    .filter((item) => !item.isCombo && item.id !== initialValues?.id)
    .map((item) => ({
      label: item.name,
      value: item.id,
    }))

  const selectedComboItems = formik.values.comboItems || []

  const foodMap = (id) => {
    const map = foodItemList?.find((f) => f.value === id)?.label

    return map
  }

  return {
    formik,
    foodItemList,
    selectedComboItems,
    foodMap,
    onChangeFormItem,
  }
}

export default useMenuForm
